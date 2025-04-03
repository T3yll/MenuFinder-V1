import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ITeam } from "@/modules/Team/models/ITeam";
import TeamService from "@/modules/Team/services/TeamService";
import { toast } from "react-toastify";
import TeamForm from "@/modules/Team/components/TeamForm";

const TeamEdit = () => {
  const [team, setTeam] = useState<ITeam | null>(null);
  const { id: teamId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) return;
      try {
        const data = await TeamService.getTeamById(teamId);
        setTeam(data);
      } catch (err) {
        toast.error(`Erreur lors de la récupération de l'équipe`);
        console.error(`Erreur lors de la récupération de l'équipe`, err);
        navigate(-1);
      }
    };

    fetchData();
  }, [teamId]);

  if (!team) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
    <div className="w-full max-w-6xl rounded-lg text-center">
    <h1 className="text-xl font-bold mb-4">Gestion de l'équipe</h1>
    <TeamForm initialData={team}/>
    </div>
    </div>
  );
};

export default TeamEdit;
