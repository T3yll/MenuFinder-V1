import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IUser } from "@/modules/User/models/IUser";
import UserService from "@/modules/User/services/UserService";
import { toast } from "react-toastify";
import Card from "@/common/components/base/Card/Card";
import CardBody from "@/common/components/base/Card/CardBody";
import CardFooter from "@/common/components/base/Card/CardFooter";
import Button from "@/common/components/base/Button/Button";
import { Link } from "react-router-dom";
import FieldsetInput from "@/common/components/base/FieldsetInput/FieldsetInput";

const UserShow = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (userId) {
        const data = await UserService.getUserById(userId);
        setUser(data);
      }
    } catch (err) {
      setError("Erreur lors de la récupération des informations utilisateur. Veuillez recharger la page ou réessayer plus tard.");
      console.error(`Erreur lors de la récupération de l'utilisateur ${userId}`, err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id: string) => {
    try {
      if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
        await UserService.deleteUser(id);
        toast.success("Utilisateur supprimé avec succès");
        navigate("/users");
      }
    } catch (err) {
      toast.error("Une erreur est survenue lors de la suppression");
    }
  };

  return (
    <Card className="mx-3 card border-2 border-base-200 mt-3 pt-6">
      {error && <h4>Une erreur est survenue</h4>}
      {!error && !user && <h4>Chargement de la page en cours...</h4>}
      {!error && user && (
        <>
          <CardBody className="space-y-3 m-3">
            <div className="grid grid-cols-3 gap-4">
              <FieldsetInput title="Utilisateur" value={user?.username} />
              <FieldsetInput title="Nom" value={user?.nomUsage || "Non renseigné"} />
              <FieldsetInput title="Email" value={user?.contactEmail || "Non renseigné"} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FieldsetInput title="Téléphone" value={user?.contactPhone || "Non renseigné"} />
              <FieldsetInput title="Date de création" value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : ""} />
              <FieldsetInput title="Équipe de travail" value={user?.teams.map(team => team.label).join(', ') || "Aucune équipe"} />
            </div>
          </CardBody>

          <CardFooter className="justify-content-center space-x-1 mb-3">
            <Link className="btn btn-warning" to="/users?tab=datatable">Retour</Link>
            <Link className="btn btn-success" to={`/users/${user.id}/edit`}>Modifier</Link>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default UserShow;
