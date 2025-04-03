import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IInfo } from '@/modules/Info/models/IInfo';
import InfoService from '@/modules/Info/services/InfoService';
import { toast } from 'react-toastify';
import Card from '@/common/components/base/Card/Card';
import CardBody from '@/common/components/base/Card/CardBody';
import CardFooter from '@/common/components/base/Card/CardFooter';
import Button from '@/common/components/base/Button/Button';
import { Link } from 'react-router-dom';
import FieldsetInput from '@/common/components/base/FieldsetInput/FieldsetInput';

const InfoShow = () => {
  const { id: infoId } = useParams();
  const [info, setInfo] = useState<IInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (infoId) {
        const data = await InfoService.getInfoById(infoId);
        setInfo(data);
      }
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'info`);
      console.error(`Erreur lors de la récupération de la fiche info`, err);
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id: number) => {
    try {
      if (
        window.confirm('Voulez-vous vraiment supprimer cette information ?')
      ) {
        await InfoService.deleteInfo(id);
        toast.success('Information supprimée avec succès');
        navigate('/infos');
      }
    } catch (err) {
      toast.error('Une erreur est survenue lors de la suppression');
    }
  };

  return (
    <Card className="mx-3 card border-2 border-base-200 mt-3 pt-6">
      {error && <h4>Une erreur est survenue</h4>}
      {!error && !info && <h4>Chargement de la page en cours...</h4>}
      {!error && info && (
        <>
          <CardBody className="space-y-3 m-3">
            <div className="grid grid-cols-3 gap-4">
              <FieldsetInput title="TITRE" value={info.label} />
              <FieldsetInput title="DESCRIPTION" value={info.description} />
              <FieldsetInput title="CONTENU" value={info.content} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FieldsetInput
                title="MAIL DE CONTACT"
                value={info.contactEmail}
              />
              <FieldsetInput
                title="NUMÉRO DE CONTACT"
                value={info.contactPhone}
              />
              <FieldsetInput
                title="DATE DE CRÉATION"
                value={
                  info.createdAt
                    ? new Date(info.createdAt).toLocaleDateString('fr-FR')
                    : ''
                }
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FieldsetInput
                title="CRÉE PAR"
                value={info.user?.username || '---'}
              />
              <FieldsetInput
                title="ÉQUIPES"
                value={info.teams.map((team) => team.label).join(' - ')}
              />
            </div>
          </CardBody>

          <CardFooter className="justify-content-center space-x-1 mb-3">
            <Button className="btn btn-warning" onClick={() => navigate(-1)}>
              Retour
            </Button>
            <Link className="btn btn-success" to={`/infos/${info.id}/edit`}>
              Modifier
            </Link>
            <Button className="btn btn-error" onClick={() => onDelete(info.id)}>
              Supprimer
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default InfoShow;
