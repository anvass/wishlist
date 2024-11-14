import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

function UserRequired() {
  const { user, setUser } = useOutletContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user, setUser }} />;
}

export default UserRequired;
