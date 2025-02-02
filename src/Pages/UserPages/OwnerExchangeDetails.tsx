import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface Exchange {
  id: number;
  with: string;
  messages: Message[];
}

const OwnerExchangeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newMessage, setNewMessage] = useState('');

  //  récupération des données d'échange
  
  const exchange: Exchange = {
    id: Number(id),
    with: "Renovite Rénovation cuisine",
    messages: [
      { id: 1, sender: "Entreprise", content: "Bonjour, suite à votre demande, voici notre devis pour la rénovation de votre cuisine.", timestamp: "2023-05-01 10:00" },
      { id: 2, sender: "Vous", content: "Merci pour votre devis. Pouvez-vous me donner plus de détails sur les matériaux utilisés ?", timestamp: "2023-05-01 14:30" },
      { id: 3, sender: "Entreprise", content: "Bien sûr, nous utilisons des matériaux de haute qualité...", timestamp: "2023-05-02 09:15" },
    ],
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      console.log("Message envoyé:", newMessage);
      setNewMessage('');
    }
  };

  const handleSendAttachment = () => {
    console.log("Envoi d'une pièce jointe");
  };

  const handleAccept = () => {
    console.log("Offre acceptée");
  };

  const handleReject = () => {
    console.log("Offre refusée");
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/owner/exchanges" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Retour aux échanges</Link>
      
      <h1 className="text-2xl font-bold mb-4 text-center">Échange avec {exchange.with}</h1>
      
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        {exchange.messages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="font-semibold">{message.sender}</p>
            <p>{message.content}</p>
            <p className="text-sm text-gray-500">{message.timestamp}</p>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Écrivez votre message ici..."
          rows={3}
        />
      </div>
      
      <div className="mb-4 flex justify-center space-x-2">
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Répondre
        </button>
        <button onClick={handleSendAttachment} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
          Envoyer une pièce jointe
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <p className="mb-2">Acceptez-vous que cette entreprise effectue vos travaux ?</p>
        <div className="flex justify-center space-x-2">
          <button onClick={handleAccept} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors">
            Oui
          </button>
          <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
            Non
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerExchangeDetails;