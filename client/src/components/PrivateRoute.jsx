import { useSelector } from "react-redux/es/hooks/useSelector"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute = () => {
  const {currentUser} = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to='sign-in' />
  
}
