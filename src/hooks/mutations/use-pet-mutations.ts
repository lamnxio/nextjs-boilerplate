import api from '@/configs/api'
import { QUERY_KEY } from '@/constants/query-key'
import type { Pet } from '@/generated/petstore/petstore-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddPet = () => {
  const queryClient = useQueryClient()

  const mutationFn = async (pet: Pet) => {
    const response = await api.pet.addPet(pet)
    return response.data
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PET] })
    },
  })
}

export const useUpdatePet = () => {
  const queryClient = useQueryClient()

  const mutationFn = async (pet: Pet) => {
    const response = await api.pet.updatePet(pet)
    return response.data
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PET] })
    },
  })
}

export const useDeletePet = () => {
  const queryClient = useQueryClient()

  const mutationFn = async (petId: number) => {
    const response = await api.pet.deletePet(petId)
    return response.data
  }

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.PET] })
    },
  })
}
