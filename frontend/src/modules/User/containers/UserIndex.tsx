import Card from '@/common/components/base/Card/Card';
import UserIndexDatatable from '../components/UserIndexDatatable';

const InfoIndex = () => {
  return (
    <div className="mx-3 mb-10">
      <Card className="rounded-l-none">
        <UserIndexDatatable />
      </Card>
    </div>
  );
};

export default InfoIndex;
