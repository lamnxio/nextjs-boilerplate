import api from '@/configs/api'
import { QUERY_KEY } from '@/constants/query-key'
import { RequestParams } from '@/generated/petstore/petstore-api'
import { useQuery } from '@tanstack/react-query'

export const useGetPetById = (petId: number, params?: RequestParams) => {
  const queryFn = async () => {
    const response = await api.pet.getPetById(petId, params)
    return response.data
  }

  return useQuery({
    queryKey: [QUERY_KEY.PET, petId, params],
    queryFn,
  })
}

export const useFindPetsByStatus = (status: ('available' | 'pending' | 'sold')[], params?: RequestParams) => {
  const queryFn = async () => {
    const response = await api.pet.findPetsByStatus({ status }, params)
    return response.data
  }

  return useQuery({
    queryKey: [QUERY_KEY.PET, 'status', status, params],
    queryFn,
  })
}
