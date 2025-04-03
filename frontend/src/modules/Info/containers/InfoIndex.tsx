import TabMenu from '@/common/components/base/Menu/TabMenu';
import InfoIndexDatatable from '@/modules/Info/components/InfoIndexDatatable';
import Card from '@/common/components/base/Card/Card';
import InfoIndexGallery from '@/modules/Info/components/InfoIndexGallery';

const InfoIndex = () => {
  const infoMenu = [
    { url: 'gallery', label: 'Galerie' },
    { url: 'map', label: 'Carte' },
    { url: 'datatable', label: 'Tableau' },
  ];
  return (
    <div className="mx-3 mb-10">
      <TabMenu tabs={infoMenu}>
        <Card className="rounded-l-none">
          <InfoIndexGallery />
        </Card>
        <Card className="rounded-l-none">
          <div>
            <p>map</p>
          </div>
        </Card>
        <Card className="rounded-l-none">
          <InfoIndexDatatable />
        </Card>
      </TabMenu>
    </div>
  );
};

export default InfoIndex;
