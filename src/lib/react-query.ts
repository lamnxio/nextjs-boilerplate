import { QueryClient, QueryClientConfig } from "@tanstack/react-query"

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 60 * 1000,
      retry: 1,
    },
  },
}

export const queryClient = new QueryClient(queryClientConfig)
