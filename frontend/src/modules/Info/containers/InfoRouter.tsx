import InfoIndex from '@/modules/Info/containers/InfoIndex';
import InfoAdd from '@/modules/Info/containers/InfoAdd';
import { Route, Routes, useParams } from 'react-router-dom';
import InfoShow from './InfoShow';
import InfoMenu from './InfoMenu';
import InfoEdit from './InfoEdit';

const InfoRouter = () => {


  return (
    <>
      <InfoMenu />
      <Routes>
        <Route path="/" Component={InfoIndex} />
        <Route path="/add" Component={InfoAdd} />
        <Route path="/:id" Component={InfoShow} />
        <Route path="/:id/edit" Component={InfoEdit} />
      </Routes>
    </>
  );
};

export default InfoRouter;
