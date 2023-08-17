import { useQuery, UseQueryResult } from 'react-query'
import customAxios from 'utils/axiosUtil'
import { AninmalSearchListStore } from 'hooks/Animal/AnimalListStore'

export interface CenterUuidCredential {
  center_uuid: string | undefined
  adoptionStatus: string | undefined
  size: number | undefined
}

export function useAnimalSearch(credential: CenterUuidCredential) {
  const animalList = AninmalSearchListStore()
  const axiosData = async () => {
    try {
      const center = credential.center_uuid
      const adoptionStatus = credential.adoptionStatus
      const size = credential.size
      let url = `/animal/search`
      if (center !== undefined) {
        url += `?centerUuid=${center}`
      }
      if (adoptionStatus !== undefined) {
        url += `?adoptionStatus=${adoptionStatus}`
      }
      if (size !== undefined) {
        url += `&size=${size}`
      }
      const response = await customAxios.get(url)
      return response.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  return useQuery('animalSearch', axiosData, {
    onSuccess: data => {
      if (data && data.response !== undefined) {
        console.log(data.response)
        animalList.setAnimals(data.response.animals)
        animalList.setTotal(data.response.total)
      }
    },
  })
}
