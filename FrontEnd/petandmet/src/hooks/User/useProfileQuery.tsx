import { useQuery, UseQueryResult } from 'react-query'
import { useProfile } from 'hooks/User/useProfile'
import { useCookies } from 'react-cookie'
import customAxios from 'utils/axiosUtil'
import { useAccessToken } from 'hooks/useAccessToken'
interface Result {
  response: ProfileData
}

export interface ProfileData {
  attendance: number
  name: string
  email: string
  phone: string
  donate_grade: string
  walk_grade: string
  response: Object
}

export function useProfileQuery(): UseQueryResult<Result> {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()
  const profileStore = useProfile()
  const axiosProfile = async (): Promise<Result> => {
    try {
      // const accessToken = cookies.access_token
      console.log('zustand', accessToken)
      console.log('cookie', cookies.access_token)
      let token = accessToken
      if (token === '') {
        console.log('세팅')
        setAccessToken(cookies.access_token)
        token = cookies.access_token
      }
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      }
      const response = await customAxios.get('/user', config)
      if (response.config.headers.Authorization !== token) {
        setCookie('access_token', response.config.headers.Authorization, {
          secure: true,
          sameSite: 'strict',
          path: '/',
        })
        setAccessToken(response.config.headers.Authorization)
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery<Result>('userProfile', axiosProfile, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        profileStore.setAttendance(data.response.attendance)
        profileStore.setName(data.response.name)
        profileStore.setEmail(data.response.email)
        profileStore.setPhone(data.response.phone)
        profileStore.setDonate_grade(data.response.donate_grade)
        profileStore.setWalk_grade(data.response.walk_grade)
      }
    },
  })
}
