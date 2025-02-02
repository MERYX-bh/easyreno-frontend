import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const TimelineStepDetail: React.FC = () => {
  const { id, stepId } = useParams<{ id: string; stepId: string }>();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>(Array(4).fill(''));

  const step: TimelineStep = {
    id: Number(stepId),
    title: "Nom de l'étape",
    description: "Description détaillée de l'étape. Cette étape implique plusieurs tâches importantes qui contribuent à l'avancement du projet.",
    status: 'in-progress'
  };

  const handlePhotoUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const newPhoto = URL.createObjectURL(files[0]);
      setPhotos(prevPhotos => {
        const updatedPhotos = [...prevPhotos];
        updatedPhotos[index] = newPhoto;
        return updatedPhotos;
      });
    }
  };

  const handleValidateStep = () => {
    console.log("Étape validée");
    navigate(`/owner/project/${id}/timeline`);
  };

  const handleRejectStep = () => {
    navigate(`/owner/project/${id}/step/${stepId}/reject`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to={`/owner/project/${id}/timeline`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour à la timeline
      </Link>
      
      <h1 className="text-3xl font-bold mb-6 text-center">Détail de l'étape</h1>
      
      <h2 className="text-2xl font-semibold mb-4">{step.title}</h2>
      
      <p className="mb-4 text-gray-700">{step.description}</p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Photos</h3>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative w-full h-40 border border-gray-300 rounded">
              {photo ? (
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover rounded" />
              ) : (
                <label className="flex items-center justify-center h-full cursor-pointer">
                  <span className="text-gray-500">+ Ajouter une photo</span>
                  <input type="file" className="hidden" onChange={(e) => handlePhotoUpload(index, e)} accept="image/*" />
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Voulez-vous valider cette étape ?</p>
      </div>
      
      <div className="flex justify-center space-x-4">
        <button 
          onClick={handleValidateStep}
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
        >
          Oui
        </button>
        <button 
          onClick={handleRejectStep}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          Non
        </button>
      </div>
    </div>
  );
};

export default TimelineStepDetail;