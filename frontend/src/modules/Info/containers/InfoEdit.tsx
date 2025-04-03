import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import InfoForm from "@/modules/Info/components/InfoForm";
import infoService from "@/modules/Info/services/InfoService";
import { IInfo } from "@/modules/Info/models/IInfo";
import { toast } from "react-toastify";

const InfoEdit = () => {
  const [info, setInfo] = useState<IInfo | null>(null);
  const { id: infoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!infoId) return;
      try {
        const data = await infoService.getInfoById(infoId);
        setInfo(data);
      } catch (err) {
        toast.error(`Erreur lors de la récupération de la fiche info`);
        console.error(`Erreur lors de la récupération de la fiche info`, err);
        navigate(-1);
      }
    };

    fetchData();
  }, [infoId]);

  if (!info) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
    <div className="w-full max-w-6xl rounded-lg text-center">
    <h1 className="text-xl font-bold mb-4">Gestion Fiche Info</h1>
    <InfoForm
      initialData={info}
    />
    </div>
    </div>
  );
};

export default InfoEdit;
