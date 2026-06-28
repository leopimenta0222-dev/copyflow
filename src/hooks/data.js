import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as generationsDb from '../lib/db/generations'
import { generate } from '../lib/db/generate'

/* ---------- Histórico de gerações ---------- */
export const useGenerations = () =>
  useQuery({ queryKey: ['generations'], queryFn: generationsDb.listGenerations })

export const useGenerationCount = () =>
  useQuery({ queryKey: ['generations', 'count'], queryFn: generationsDb.countGenerations })

export function useCreateGeneration() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: generationsDb.createGeneration,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['generations'] }),
  })
}

export function useToggleFavorite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, favorito }) => generationsDb.toggleFavorite(id, favorito),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['generations'] }),
  })
}

/* ---------- Geração via /api/generate ---------- */
export function useGenerate() {
  return useMutation({ mutationFn: generate })
}
