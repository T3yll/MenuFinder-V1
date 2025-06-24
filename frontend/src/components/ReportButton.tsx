import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { FaFlag } from 'react-icons/fa';
import { CreateReportDto } from "../types/Report";
import { ReportService } from "../services/report.service";
import { useAppDispatch } from "../hooks/storeToast";
import { showToast } from '../store/slice/toastSlice';


interface ReportButtonProps {
    RestaurantId : number
}

const ReportButton: React.FC<ReportButtonProps> = ({RestaurantId}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [motif, setMotif] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(RestaurantId);
    setMotif("");
    setDescription("");

    const reportData :CreateReportDto = {
      userId: 1, // Remplacez par l'ID de l'utilisateur actuel
      restaurantId: RestaurantId, // ID du restaurant concerné
      motif: motif,
      description: description,
    };
    ReportService.create(reportData)
      .then(() => {
        dispatch(showToast({
                    message: 'Le signalement a été pris en compte',
                    severity: 'success',
                    duration: 3000
                  }));
      })
      .catch((error) => {
       dispatch(showToast({
                    message: 'Une erreur est survenue lors du signalement',
                    severity: 'error',
                    duration: 3000
                }));
      });

    closeModal();
  };

  return (
    <>
     <button 
            onClick={openModal}  
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            className="bookmark-button action-button"
        >
            <FaFlag/>
            Signaler
        </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white w-full h-full p-6 sm:max-w-2xl sm:h-auto sm:rounded-md overflow-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4">Signaler un problème</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="subject" className="block font-medium text-sm mb-1">
                  Motif
                </label>
                <input
                  value={motif}
                  onChange={(e) => setMotif(e.target.value)}
                  type="text"
                  id="subject"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-medium text-sm mb-1">
                  Description
                </label>
                <textarea
                  id="message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded text-gray-700"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportButton;