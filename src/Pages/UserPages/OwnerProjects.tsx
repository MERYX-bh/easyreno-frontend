import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Chantier {
  id: number;
  status: string;
  createdAt: string;
  ad: {
    id: number;
    title: string;
    location: string;
  };
}

const OwnerProjects: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chantiers, setChantiers] = useState<Chantier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChantiers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token d'authentification manquant");
          return;
        }

        const response = await axios.get(`http://localhost:3000/owner/chantiers`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setChantiers(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des chantiers:", err);
        setError("Erreur lors du chargement des chantiers.");
      } finally {
        setLoading(false);
      }
    };

    fetchChantiers();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Chantiers</h1>

      {chantiers.length === 0 ? (
        <p>Aucun chantier en cours.</p>
      ) : (
        chantiers.map((chantier) => (
          <div key={chantier.id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold">{chantier.ad.title}</h2>
            <p><strong>Localisation :</strong> {chantier.ad.location}</p>
            <p><strong>Statut :</strong> {chantier.status}</p>
            <p><strong>Date de création :</strong> {new Date(chantier.createdAt).toLocaleDateString()}</p>

            <div className="mt-2 space-x-4">
              <Link 
                to={`/owner/project/${chantier.id}/timeline`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Voir la timeline
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerProjects;
