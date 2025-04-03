import FeatureIndex from '@/modules/Feature/containers/FeatureIndex';
import { Route, Routes } from 'react-router-dom';
import FeatureAdd from './FeatureAdd';
import FeatureMenu from './FeatureMenu';

const FeatureRouter = () => {
  return (
    <>
    <FeatureMenu />
    <Routes>
      <Route path="/" Component={FeatureIndex} />
      /* <Route path="/add" Component={FeatureAdd} /> */
      {/* <Route path="/:id" Component={} />
      <Route path="/:id/edit" Component={} /> */}
    </Routes>
    </>
  );
};

export default FeatureRouter;
