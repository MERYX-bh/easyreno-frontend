import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const RejectStepForm: React.FC = () => {
  const { id, stepId } = useParams<{ id: string; stepId: string }>();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState<string[]>(Array(4).fill(''));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Raison du rejet:", reason);
    console.log("Photos:", photos.filter(p => p !== ''));
    
    //  envoyer les infos de l'annonce à la base de données du site, puis rediriger l'utilisateur vers la page où il peut voir toutes ses annonces
   
    navigate(`/owner/exchanges/${id}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to={`/owner/project/${id}/step/${stepId}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour aux détails de l'étape
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">Étape non validée</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Raison</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={4}
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Photos</h3>
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

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default RejectStepForm;