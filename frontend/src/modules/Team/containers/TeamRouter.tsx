import TeamIndex from '@/modules/Team/containers/TeamIndex';
import { Route, Routes } from 'react-router-dom';
import TeamAdd from '@/modules/Team/containers/TeamAdd';
import TeamMenu from '@/modules/Team/containers/TeamMenu';
import TeamEdit from '@/modules/Team/containers/TeamEdit';
import TeamShow from '@/modules/Team/containers/TeamShow';

const TeamRouter = () => {
  return (
    <>
    <TeamMenu />
    <Routes>
      <Route path="/" Component={TeamIndex} />
      <Route path="/add" Component={TeamAdd} />
      <Route path="/:id" Component={TeamShow} />
      <Route path="/:id/edit" Component={TeamEdit} />
    </Routes>
    </>
  );
};

export default TeamRouter;
