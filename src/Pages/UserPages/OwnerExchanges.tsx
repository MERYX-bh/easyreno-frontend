import React from 'react';
import { Link } from 'react-router-dom';

interface Exchange {
  id: number;
  with: string;
}

const OwnerExchanges: React.FC = () => {
  const exchanges: Exchange[] = [
    { id: 1, with: "Renovite Rénovation cuisine" },
    { id: 2, with: "Echange Entreprise 2" },
    { id: 3, with: "Echange contact direct entreprise" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes échanges</h1>
      <ul className="space-y-2">
        {exchanges.map((exchange) => (
          <li key={exchange.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{exchange.with}</h2>
            </div>
            <Link 
              to={`/owner/exchanges/${exchange.id}`} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Voir
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerExchanges;