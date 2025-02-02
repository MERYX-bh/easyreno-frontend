import React from 'react';
import { useParams, Link } from 'react-router-dom';

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
}

const ProjectDocuments: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const documents: Document[] = [
    { id: 1, name: 'Plan initial de la salle de bain', type: 'PDF', date: '2023-05-01', size: '2.3 MB' },
    { id: 2, name: 'Devis détaillé', type: 'PDF', date: '2023-05-03', size: '1.5 MB' },
    { id: 3, name: 'Contrat signé', type: 'PDF', date: '2023-05-05', size: '3.1 MB' },
    { id: 4, name: 'Catalogue des matériaux choisis', type: 'PDF', date: '2023-05-10', size: '5.7 MB' },
    { id: 5, name: 'Photos avant travaux', type: 'ZIP', date: '2023-05-15', size: '15.2 MB' },
    { id: 6, name: 'Rapport d\'avancement - Semaine 1', type: 'PDF', date: '2023-05-22', size: '1.1 MB' },
    { id: 7, name: 'Facture d\'acompte', type: 'PDF', date: '2023-05-25', size: '0.8 MB' },
  ];

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to={`/owner/project/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">&larr; Retour aux détails du projet</Link>
      
      <h1 className="text-3xl font-bold mb-6">Documents du Projet</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taille</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Télécharger</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document) => (
              <tr key={document.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{document.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{document.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{document.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {document.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Télécharger</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDocuments;