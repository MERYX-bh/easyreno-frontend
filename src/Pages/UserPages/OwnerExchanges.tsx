import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Exchange {
  id: number;
  business: { nomEntreprise: string };
}

const OwnerExchanges: React.FC = () => {
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Vous devez être connecté.");
          return;
        }

        const response = await axios.get('http://localhost:3000/exchange/owner', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExchanges(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des échanges.");
      }
    };

    fetchExchanges();
  }, []);

  console.log("exchange",exchanges)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes échanges</h1>
      {error && <p className="text-red-500">{error}</p>}

      {exchanges.length === 0 ? (
        <p className="text-gray-500 text-center">Aucun échange pour le moment.</p>
      ) : (
        <ul className="space-y-2">
          {exchanges.map((exchange) => (
            <li key={exchange.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
              <h2 className="font-semibold">{exchange.company.nomEntreprise}</h2>
              <Link 
                to={`/owner/exchanges/${exchange.id}`} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Voir
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerExchanges;
