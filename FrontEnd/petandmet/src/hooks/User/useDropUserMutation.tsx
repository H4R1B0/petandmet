import { useMutation, UseMutationResult } from 'react-query'
import { domain } from 'hooks/customQueryClient'
import { useCookies } from 'react-cookie'
import axios from 'axios'

interface Result {
  response: Object
}

export function useDropUser() {
  const [cookies] = useCookies(['access_token'])
  const accessToken = cookies.access_token
  const axiosDropUser = async (): Promise<Result> => {
    const response = await axios.delete(`${domain}/user/withdrawal`, {
      headers: {
        Authorization: `${accessToken}`,
      },
    })
    return response.data
  }
  return useMutation(axiosDropUser)
}
