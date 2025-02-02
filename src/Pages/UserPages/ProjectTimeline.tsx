import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

const ProjectTimeline: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleContactClient = () => {
    navigate(`/owner/exchanges/${id}`);
  };

  const handleViewQuote = () => {
    navigate(`/owner/quotes`);
  };

  const timeline: TimelineItem[] = [
    { id: 1, date: '2023-05-01', title: 'Début du projet', description: 'Réunion initiale avec le client, prise de mesures', status: 'completed' },
    { id: 2, date: '2023-05-03', title: 'Conception et planification', description: 'Élaboration des plans, sélection des matériaux', status: 'completed' },
    { id: 3, date: '2023-05-10', title: 'Commande des matériaux', description: 'Carrelage, sanitaires, robinetterie', status: 'completed' },
    { id: 4, date: '2023-05-15', title: 'Démontage', description: 'Retrait des anciens équipements et revêtements', status: 'completed' },
    { id: 5, date: '2023-05-18', title: 'Plomberie - Phase 1', description: 'Installation des nouvelles canalisations', status: 'completed' },
    { id: 6, date: '2023-05-22', title: 'Électricité', description: 'Mise aux normes du circuit électrique, installation des points lumineux', status: 'in-progress' },
    { id: 7, date: '2023-05-25', title: 'Maçonnerie', description: 'Réparation des murs, préparation pour le carrelage', status: 'in-progress' },
    { id: 8, date: '2023-05-29', title: 'Pose du carrelage', description: 'Sol et murs', status: 'upcoming' },
    { id: 9, date: '2023-06-05', title: 'Plomberie - Phase 2', description: 'Installation de la douche, du lavabo et des toilettes', status: 'upcoming' },
    { id: 10, date: '2023-06-10', title: 'Menuiserie', description: 'Installation du meuble vasque et des rangements', status: 'upcoming' },
    { id: 11, date: '2023-06-15', title: 'Peinture', description: 'Finitions peinture du plafond et des zones non carrelées', status: 'upcoming' },
    { id: 12, date: '2023-06-18', title: 'Installation des accessoires', description: 'Miroir, porte-serviettes, etc.', status: 'upcoming' },
    { id: 13, date: '2023-06-20', title: 'Nettoyage final', description: 'Nettoyage en profondeur de la salle de bain', status: 'upcoming' },
    { id: 14, date: '2023-06-22', title: 'Inspection finale', description: 'Vérification de tous les travaux avec le client', status: 'upcoming' },
    { id: 15, date: '2023-06-23', title: 'Fin du projet', description: 'Remise des clés et documents au client', status: 'upcoming' },
  ];

  const handleStepClick = (stepId: number) => {
    navigate(`/owner/project/${id}/step/${stepId}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to={`/owner/project/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour aux détails du projet
      </Link>
      
      <h1 className="text-3xl font-bold mb-6 text-center">Timeline du Projet</h1>
      
      <div className="flex justify-center space-x-4 mb-6">
        <button onClick={handleContactClient} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Contacter le client
        </button>
        <button onClick={handleViewQuote} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors">
          Devis
        </button>
      </div>
      
      <div className="relative border-l-2 border-gray-200 ml-3">
        {timeline.map((item) => (
          <div key={item.id} className="mb-10 ml-6 cursor-pointer" onClick={() => handleStepClick(item.id)}>
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{item.title}</h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{item.date}</time>
            <p className="mb-4 text-base font-normal text-gray-500">{item.description}</p>
            <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${
              item.status === 'completed' ? 'bg-green-100 text-green-800' :
              item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status === 'completed' ? 'Terminé' :
               item.status === 'in-progress' ? 'En cours' :
               'À venir'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTimeline;