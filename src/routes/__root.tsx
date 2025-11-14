import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-center" />
    <Outlet />
  </QueryClientProvider>
)

export const Route = createRootRoute({ component: RootLayout })
