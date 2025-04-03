import UserIndex from './UserIndex';
import { Route, Routes } from 'react-router-dom';
import UserMenu from './UserMenu';
import UserShow from './UserShow';

const UserRouter = () => {
  return (
    <>
    <UserMenu />
    <Routes>
      <Route path="/" Component={UserIndex} />
      <Route path="/:id" Component={UserShow} />
    </Routes>
    </>
  );
};

export default UserRouter;
