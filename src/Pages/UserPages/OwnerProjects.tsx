import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Project {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  description: string;
}

const OwnerProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();


  const project: Project = {
    id: Number(id),
    name: "Rénovation salle de bain",
    status: "En cours",
    startDate: "2023-05-01",
    endDate: "2023-06-23",
    description: "Rénovation complète de la salle de bain, incluant le remplacement de la baignoire par une douche à l'italienne, l'installation d'un nouveau lavabo et la pose de nouveaux carrelages."
  };

  return (
    <div className="container mx-auto p-4">
     
      
      <h1 className="text-2xl font-bold mb-4">{project.name}</h1>
      <p><strong>Statut:</strong> {project.status}</p>
      <p><strong>Date de début:</strong> {project.startDate}</p>
      <p><strong>Date de fin prévue:</strong> {project.endDate}</p>
      <p><strong>Description:</strong> {project.description}</p>

      <div className="mt-4 space-x-4">
        <Link 
          to={`/owner/project/${id}/timeline`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Voir la timeline
        </Link>
        <Link 
          to={`/owner/project/${id}/documents`}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Voir les documents
        </Link>
      </div>
    </div>
  );
};

export default OwnerProjectDetails;