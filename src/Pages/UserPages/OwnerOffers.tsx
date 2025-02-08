import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface Offer {
  id: number;
  company: {
    id: number;
    nomEntreprise: string;
  };
  price: number;
  description: string;
  fileUrl: string;
  status: string;
  duration: string;
}

const OwnerOffers: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // ID de l'annonce
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Vous devez être connecté.");
          return;
        }

        const response = await axios.get(`http://localhost:3000/owner/ad/${id}/offers`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOffers(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des offres.");
      }
    };

    fetchOffers();
  }, [id]);

  const handleAccept = async (offerId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setError("Vous devez être connecté.");
  
      const response = await axios.post(
        `http://localhost:3000/owner/quote/${offerId}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setMessage("L'offre a été acceptée et transformée en chantier !");
      setOffers(offers.map(offer =>
        offer.id === offerId
          ? { ...offer, status: "accepted" }
          : { ...offer, status: "rejected" }
      ));
  
      // 🔥 Supprimer l'annonce de la liste des annonces après acceptation
      setTimeout(() => navigate("/owner/projects"), 2000);
    } catch {
      setError("Erreur lors de l'acceptation de l'offre.");
    }
  };
  
  

  const handleRefuse = async (offerId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return setError("Vous devez être connecté.");

      await axios.post(`http://localhost:3000/owner/quote/${offerId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("L'offre a été refusée !");
      setOffers(offers.map(offer => offer.id === offerId ? { ...offer, status: "rejected" } : offer));
    } catch {
      setError("Erreur lors du refus de l'offre.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to={`/owner/ad/${id}`} className="text-blue-500 hover:underline mb-4 inline-block">&larr; Retour aux détails de l'annonce</Link>
      
      <h1 className="text-2xl font-bold mb-6">Offres reçues pour votre annonce</h1>
      {message && <p className="text-green-500">{message}</p>}

      {offers.length === 0 ? (
        <p>Aucune offre reçue pour le moment.</p>
      ) : (
        offers.map(offer => (
          <div key={offer.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-bold">{offer.company.nomEntreprise}</h3>
            <p><strong>Prix:</strong> {offer.price}€</p>
            <p><strong>Description:</strong> {offer.description}</p>
            <p><strong>Durée estimée:</strong> {offer.duration}</p>
            {offer.fileUrl && (
              <a href={offer.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Voir le fichier joint
              </a>
            )}
            <p><strong>Statut:</strong> <span className={offer.status === "accepted" ? "text-green-500" : "text-red-500"}>{offer.status}</span></p>

            {offer.status === "pending" && (
              <div className="mt-2 space-x-2">
                <button onClick={() => handleAccept(offer.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                  Accepter
                </button>
                <button onClick={() => handleRefuse(offer.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                  Refuser
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerOffers;
