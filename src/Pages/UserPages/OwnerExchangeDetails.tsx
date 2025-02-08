import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Exchange {
  id: number;
  company: { nomEntreprise: string };
  messages: Message[];
}

const OwnerExchangeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("🔍 Param ID:", id);

  const [exchange, setExchange] = useState<Exchange | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false); // ✅ Gère l'erreur 404

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("🔐 TOKEN récupéré :", token);

        if (!token) {
          setError("Vous devez être connecté.");
          return;
        }

        const response = await axios.get(`http://localhost:3000/exchange/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Réponse API :", response.data);
        setExchange(response.data);
      } catch (err: any) {
        console.error("❌ Erreur API :", err.response?.data || err.message);
        
        if (err.response?.status === 404) {
          setNotFound(true); // ✅ Marquer comme non trouvé
        } else {
          setError(`Erreur lors du chargement des messages : ${err.message}`);
        }
      }
    };

    fetchExchange();
  }, [id]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Vous devez être connecté.");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/exchange/message/${id}`,
        { content: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newMsg: Message = {
        id: response.data.id,
        sender: "owner",
        content: newMessage,
        timestamp: new Date().toISOString(),
      };

      setExchange((prev) => prev ? { ...prev, messages: [...prev.messages, newMsg] } : prev);
      setNewMessage('');
    } catch (err: any) {
      console.error("❌ Erreur lors de l'envoi du message :", err.response?.data || err.message);
      setError("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/owner/exchanges" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour aux échanges
      </Link>

      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Affichage spécial pour une erreur 404 */}
      {notFound ? (
        <p className="text-gray-500 italic">
          Aucun échange pour le moment, l'entreprise doit vous contacter en premier.
        </p>
      ) : (
        <>
          {exchange?.messages?.length ? (
            exchange.messages.map((msg) => (
              <div key={msg.id} className={`p-3 my-2 rounded-lg ${msg.sender === "owner" ? "bg-blue-200" : "bg-gray-200"}`}>
                <p><strong>{msg.sender === "owner" ? "Vous" : "Entreprise"}:</strong> {msg.content}</p>
                <p className="text-xs text-gray-600">
                  {new Date(msg.timestamp).toLocaleString("fr-FR", {
                    day: "2-digit", month: "long", year: "numeric",
                    hour: "2-digit", minute: "2-digit"
                  })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucun message.</p>
          )}

          {/* ✅ Zone de saisie du message */}
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border p-2 w-full mt-4"
            placeholder="Écrivez votre message..."
            disabled={notFound} // Désactiver si aucun échange
          />
          <button 
            onClick={handleSendMessage} 
            className={`px-4 py-2 mt-2 rounded text-white ${newMessage.trim() === '' ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={newMessage.trim() === '' || notFound}
          >
            Envoyer
          </button>
        </>
      )}
    </div>
  );
};

export default OwnerExchangeDetails;
