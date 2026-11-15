import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RecipeApp } from './RecipeApp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <RecipeApp />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
