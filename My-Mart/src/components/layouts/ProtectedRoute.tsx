import { Navigate, Outlet } from "react-router-dom"
import { useMeLogin } from "./query/authentication.ts"
import Loader from "./resuable/Loader.jsx"

const ProtectedRoute = () => {
    const {data: user, isLoading, isError} = useMeLogin()

    if(isLoading)
      return  <div><Loader/></div>

    if (isError || !user) {
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
}

export default ProtectedRoute