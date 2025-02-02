import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewAds: React.FC = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate(); // Ajout de useNavigate pour la redirection

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Aucun token trouvé, utilisateur non authentifié.');
          return;
        }

        const response = await axios.get('http://localhost:3000/owner/ads', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.length === 0) {
          navigate('/owner/no-ads'); // Redirige vers la page "Aucune annonce trouvée"
        } else {
          setAds(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
        navigate('/owner/no-ads'); // Redirige si une erreur empêche le chargement des annonces
      }
    };

    fetchAds();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mes annonces en ligne</h1>

      <div className="mb-6 text-center">
        <Link to="/owner/create-ad" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 inline-block">
          Créer une annonce
        </Link>
      </div>

      <div className="space-y-4">
        {ads.map((ad: any) => (
          <div key={ad.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <span>{ad.title}</span>
            <Link to={`/owner/ad/${ad.id}`} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
              Voir
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAds;
