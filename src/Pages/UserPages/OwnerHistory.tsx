import React, { useState } from 'react';

interface HistoryItem {
  id: number;
  date: string;
  time: string;
  action: string;
  details: string;
  project: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const OwnerHistory: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const history: HistoryItem[] = [
    { id: 1, date: '2024-09-15', time: '09:30', action: "Création d'une annonce", details: "Rénovation salle de bain", project: "Salle de bain", status: 'completed' },
    { id: 2, date: '2024-09-16', time: '14:15', action: "Réception de devis", details: "Entreprise A - 5000€", project: "Salle de bain", status: 'completed' },
    { id: 3, date: '2024-09-17', time: '11:00', action: "Réception de devis", details: "Entreprise B - 5500€", project: "Salle de bain", status: 'completed' },
    { id: 4, date: '2024-09-20', time: '16:45', action: "Acceptation d'un devis", details: "Entreprise A - 5000€", project: "Salle de bain", status: 'completed' },
    { id: 5, date: '2024-09-25', time: '10:00', action: "Signature du contrat", details: "Contrat signé avec Entreprise A", project: "Salle de bain", status: 'completed' },
    { id: 6, date: '2024-10-01', time: '08:00', action: "Début des travaux", details: "Démontage de l'ancienne salle de bain", project: "Salle de bain", status: 'in-progress' },
    { id: 7, date: '2024-10-05', time: '17:30', action: "Mise à jour du projet", details: "Installation de la plomberie terminée", project: "Salle de bain", status: 'in-progress' },
    { id: 8, date: '2024-10-10', time: '12:00', action: "Paiement effectué", details: "Premier versement de 2000€", project: "Salle de bain", status: 'completed' },
    { id: 9, date: '2024-10-15', time: '09:45', action: "Création d'une annonce", details: "Rénovation cuisine", project: "Cuisine", status: 'pending' },
    { id: 10, date: '2024-10-20', time: '14:30', action: "Réception de devis", details: "Entreprise C - 8000€", project: "Cuisine", status: 'pending' },
  ];

  const filteredHistory = filter === 'all' ? history : history.filter(item => item.project === filter);

  const projects = Array.from(new Set(history.map(item => item.project)));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Historique</h1>
      
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filtrer par projet:</label>
        <select 
          id="filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="all">Tous les projets</option>
          {projects.map(project => (
            <option key={project} value={project}>{project}</option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {filteredHistory.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{item.date} à {item.time}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                item.status === 'completed' ? 'bg-green-200 text-green-800' :
                item.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {item.status === 'completed' ? 'Terminé' :
                 item.status === 'in-progress' ? 'En cours' :
                 'En attente'}
              </span>
            </div>
            <p className="font-medium">{item.action}</p>
            <p className="text-sm text-gray-600">{item.details}</p>
            <p className="text-sm text-gray-500 mt-1">Projet: {item.project}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerHistory;