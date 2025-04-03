import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "@/common/components/base/Card/Card";
import CardBody from "@/common/components/base/Card/CardBody";
import CardFooter from "@/common/components/base/Card/CardFooter";
import Button from "@/common/components/base/Button/Button";
import { Link } from "react-router-dom";
import FieldsetInput from "@/common/components/base/FieldsetInput/FieldsetInput";
import { ITeam } from "@/modules/Team/models/ITeam";
import TeamService from "@/modules/Team/services/TeamService";

const TeamShow = () => {
    const { id: teamId } = useParams();
    const [team, setTeam] = useState<ITeam | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            if (teamId) {
                const data = await TeamService.getTeamById(teamId);
                setTeam(data);
            }
        } catch (err) {
            toast.error(`Erreur lors de la récupération de l'équipe`);
            console.error(`Erreur lors de la récupération de l'équipe`, err);
            navigate(-1)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onDelete = async (id: number) => {
        try {
            if (window.confirm("Voulez-vous vraiment supprimer cette équipe ?")) {
                await TeamService.deleteTeam(id);
                toast.success("Équipe supprimée avec succès");
                navigate(-1);
            }
        } catch (err) {
            toast.error("Une erreur est survenue lors de la suppression");
        }
    };

    return (
        <Card className="mx-3 card border-2 border-base-200 mt-3 pt-6">
            {error && <h4>Une erreur est survenue</h4>}
            {!error && !team && <h4>Chargement de la page en cours...</h4>}
            {!error && team && (
                <>
                    <CardBody className="space-y-3 m-3">
                        <div className="grid grid-cols-2 gap-4">
                            <FieldsetInput title="NOM" value={team.label} />
                            <FieldsetInput title="ENTÊTE" value={team.letterHead ?? ""} />
                        </div>

                        <div>
                            <FieldsetInput title="DESCRIPTION" value={team.description ?? ""} />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <FieldsetInput title="MAIL DE CONTACT" value={team.contactEmail} />
                            <FieldsetInput title="NUMÉRO DE CONTACT" value={team.contactPhone} />
                            <FieldsetInput title="DATE DE CRÉATION" value={team.createdAt ? new Date(team.createdAt).toLocaleDateString('fr-FR') : ""} />
                        </div>

                    </CardBody>

                    <CardFooter className="justify-content-center space-x-1 mb-3">
                        <Button className="btn btn-warning" onClick={() => navigate(-1)}>Retour</Button>
                        <Link className="btn btn-success" to={`/teams/${team.id}/edit`}>Modifier</Link>
                        <Button className="btn btn-error" onClick={() => onDelete(team.id)}>
                            Supprimer
                        </Button>
                    </CardFooter>
                </>
            )}
        </Card>
    );
};

export default TeamShow;
