import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TimelineItem {
  id: number;
  name: string;
  details: string[];
  completed: boolean;
  createdAt: string;
}

const ProjectTimeline: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID du chantier
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Récupération des étapes depuis l'API
  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Utilisateur non authentifié.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:3000/owner/chantier/${id}/steps`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTimeline(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des étapes :", error);
        setError("Impossible de charger les étapes.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [id]);

  // ✅ Redirections
  const handleContactClient = () => {
    navigate(`/owner/exchanges/${id}`);
  };

  const handleViewQuote = () => {
    navigate(`/owner/quotes`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to={`/owner/projects`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour aux chantiers
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-center">Timeline du Projet</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={handleContactClient} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Contacter l'entreprise
        </button>
      </div>

      {/* ✅ Gestion du chargement et des erreurs */}
      {loading && <p className="text-center text-gray-500">Chargement des étapes...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* ✅ Affichage des étapes sans redirection */}
      <div className="relative border-l-2 border-gray-200 ml-3">
        {timeline.map((item) => (
          <div key={item.id} className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{item.name}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </time>
            <p className="mb-4 text-base font-normal text-gray-500">{item.details.join(", ")}</p>
            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${
              item.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {item.completed ? 'Terminé' : 'En cours'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;
