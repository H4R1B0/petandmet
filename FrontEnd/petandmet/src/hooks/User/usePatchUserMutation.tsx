import { useMutation, UseMutationResult } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { useCookies } from 'react-cookie'
import { useAccessToken } from 'hooks/useAccessToken'

export interface ModifyUser {
  phone: string
  name: string
}

export function useModifyMutation(): UseMutationResult<
  void,
  unknown,
  ModifyUser
> {
  const [cookies, setCookie] = useCookies(['access_token'])
  const { accessToken, setAccessToken } = useAccessToken()
  const axiosModify = async (data: ModifyUser) => {
    try {
      const accessToken = cookies.access_token
      const config = {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
      const response = await customAxios.patch('/user', data, config)
      if (response.config.headers.Authorization !== accessToken) {
        console.log('쿠키 저장', response.config.headers.Authorization)
        setCookie('access_token', response.config.headers.Authorization, {
          secure: true,
          sameSite: 'strict',
          path: '/',
        })
        setAccessToken(response.config.headers.Authorization)
        console.log('저장 후', accessToken)
        console.log('쿠키', cookies.access_token)
      }
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useMutation(axiosModify)
}
