// src/Pages/UserPages/OwnerOffers.tsx

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface Offer {
  id: number;
  companyName: string;
  price: string;
  duration: string;
  description: string;
}

const offers: Offer[] = [
  {
    id: 1,
    companyName: "Garage Pro SARL",
    price: "13500€",
    duration: "4 semaines",
    description: "Extension de garage de 20m² avec espace de rangement intégré. Matériaux de qualité et finitions soignées."
  },
  {
    id: 2,
    companyName: "Constructions Rapides",
    price: "12000€",
    duration: "3 semaines",
    description: "Extension de garage standard de 20m². Travail rapide et efficace."
  }
];

const OwnerOffers: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleAccept = (offer: Offer) => {
    setMessage(`Vous avez accepté l'offre de ${offer.companyName}. Un email a été envoyé à l'entreprise.`);

    // ajoutde la logique pour envoyer un email à l'entreprise
    
    setTimeout(() => {
      navigate('/owner/view-ads');
    }, 3000);
  };

  const handleRefuse = (offer: Offer) => {
    setMessage(`Vous avez refusé l'offre de ${offer.companyName}.`);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <Link to={`/owner/ad/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">&larr; Retour aux détails de l'annonce</Link>
      
      <h1 className="text-2xl font-bold mb-6">Offres reçues pour votre annonce</h1>
      
      {offers.map(offer => (
        <div key={offer.id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-bold">{offer.companyName}</h3>
          <p><strong>Prix:</strong> {offer.price}</p>
          <p><strong>Durée estimée:</strong> {offer.duration}</p>
          <p><strong>Description:</strong> {offer.description}</p>
          <div className="mt-2 space-x-2">
            <button 
              onClick={() => handleAccept(offer)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
              Accepter
            </button>
            <button 
              onClick={() => handleRefuse(offer)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Refuser
            </button>
          </div>
        </div>
      ))}

      {message && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default OwnerOffers;