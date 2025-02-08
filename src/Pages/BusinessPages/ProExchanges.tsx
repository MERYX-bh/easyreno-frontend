import { useEffect, useState } from 'react';
import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

interface Exchange {
  id: number;
  owner: {
    id: number;
    nom: string;
  };
  messages: { content: string; timestamp: string }[];
}

function ProExchanges() {
  const navigate = useNavigate();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vous devez être connecté.");
          return;
        }
  
        const response = await axios.get("http://localhost:3000/exchange/company", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("📩 Réponse de l'API exchanges:", response.data);
  
        // ✅ Ensure response is always an array
        if (response.data && Array.isArray(response.data)) {
          setExchanges(response.data);
        } else {
          setExchanges([]); // Prevent undefined state
        }
      } catch (err) {
        setError("Erreur lors du chargement des échanges.");
        setExchanges([]); // ✅ Ensure it's never undefined
      }
    };
  
    fetchExchanges();
  }, []);
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
          Mes échanges
        </Typography>

        {error && <Typography color="red" className="text-center">{error}</Typography>}

        <Card className="mb-6 shadow-lg">
          <CardBody>
            {exchanges.length === 0 ? (
              <Typography color="gray" className="text-center">
                Aucun échange pour le moment.
              </Typography>
            ) : (
              <div className="space-y-4">
              {exchanges?.length > 0 ? (
  exchanges.map((exchange, index) => (
    <div key={exchange.id}>
      <div className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
        <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500 mr-4 mt-1" />
        <div className="flex-grow">
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {exchange?.owner?.nom || "Nom inconnu"} {/* ✅ Prevents undefined errors */}
          </Typography>
          {exchange?.messages?.length > 0 && (
            <Typography color="gray" className="text-sm mb-1 line-clamp-2">
              {exchange.messages[0].content}
            </Typography>
          )}
          {exchange?.messages?.length > 0 && (
            <Typography color="blue-gray" className="text-xs">
              Dernier message : {new Date(exchange.messages[0].timestamp).toLocaleDateString()}
            </Typography>
          )}
        </div>
        <Button 
          onClick={() => navigate(`/business/exchange/${exchange.id}`)} 
          color="blue"
          size="sm"
          className="flex items-center"
        >
          <EyeIcon className="h-4 w-4 mr-2" />
          Voir
        </Button>
      </div>
      {index < exchanges.length - 1 && <hr className="my-4" />}
    </div>
  ))
) : (
  <Typography color="gray" className="text-center">
    Aucun échange pour le moment.
  </Typography>
)}

              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ProExchanges;
