import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Ad {
  id: number;
  title: string;
  location: string;
  workArea: string;
  maxBudget: string;
  description: string;
}

const AdDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ad, setAd] = useState<Ad | null>(null);
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Aucun token trouvé, utilisateur non authentifié.');
          return;
        }

        const response = await axios.get(`http://localhost:3000/owner/ads/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAd(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l’annonce:', error);
      }
    };

    fetchAdDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Aucun token trouvé, utilisateur non authentifié.');
        return;
      }

      await axios.delete(`http://localhost:3000/owner/ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowModal(false); // Ferme le modal après suppression
      navigate('/owner/view-ads'); // Redirige vers la liste des annonces
    } catch (error) {
      console.error('Erreur lors de la suppression de l’annonce:', error);
    }
  };

  if (!ad) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{ad.title}</h1>
      <p className="mb-2"><strong>Localisation:</strong> {ad.location}</p>
      <p className="mb-2"><strong>Zone de chantier:</strong> {ad.workArea}</p>
      <p className="mb-2"><strong>Budget max:</strong> {ad.maxBudget} €</p>
      <p className="mb-4"><strong>Description:</strong> {ad.description}</p>

      <div className="mt-4 space-x-4">
        <Link 
          to={`/owner/ad/${id}/offers`}
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Voir les offres des entreprises
        </Link>
        <button 
          onClick={() => setShowModal(true)} // Afficher le modal
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Supprimer mon annonce
        </button>
      </div>

      {/* ✅ Modal de confirmation avant suppression */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p>Voulez-vous vraiment supprimer cette annonce ?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdDetails;
