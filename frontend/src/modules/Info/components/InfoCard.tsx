import Card from '@/common/components/base/Card/Card';
import CardBody from '@/common/components/base/Card/CardBody';
import CardFooter from '@/common/components/base/Card/CardFooter';
import { IInfo } from '@/modules/Info/models/IInfo';
import { useNavigate } from 'react-router-dom';

interface Props {
  info: IInfo;
}

const InfoCard = ({ info }: Props) => {
  const navigate = useNavigate();
  const module = location.pathname.split('/')[1];

  return (
    <Card
      className="shadow-md shadow-primary/20 border border-primary/30 rounded mx-2 my-2 hover:border-accent
                            hover:scale-101 hover:shadow-accent/30 transition-transform duration-100 cursor-pointer"
      onClick={() => navigate(`/${module}/${info.id}`, { state: info })}
    >
      <CardBody className="p-4 border-y">
        <div className="flex justify-between mb-2">
          <p className="font-semibold text-lg">{info.label}</p>
          <span className="badge badge-outline badge-primary badge-lg">
            Domaine
          </span>
        </div>
        <p>{info.description}</p>
      </CardBody>

      <CardFooter className="justify-start flex flex-col text-sm">
        <span className="flex items-center">
          <i className="mx-2 fa-solid fa-lg fa-user"></i>
          <p className="text-lg">{info.user?.username || "---"}</p>
        </span>
        {info.teams.length === 0 && (
          <span
            className="badge badge-info badge-lg"
            title="Les fiches sans équipe sont visibles par tous"
          >
            Publique
          </span>
        )}

        {info.teams.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {info.teams.slice(0, 1).map((team, id) => (
              <span
                key={id}
                className={`badge badge-soft badge-${id % 2 === 0 ? 'accent' : 'primary'} badge-lg`}
              >
                {team.label}
              </span>
            ))}
            {info.teams.length > 2 && (
              <span
                className="badge badge-soft badge-primary badge-lg"
                title="Cliquer pour voir les autres équipes"
              >
                {`+ ${info.teams.length - 1}`}
              </span>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
