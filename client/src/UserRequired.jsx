import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

function UserRequired() {
  const { user, setUser, load } = useOutletContext();

  if (load) {
    return <div className='text-center'>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ user, setUser }} />;
}

export default UserRequired;
