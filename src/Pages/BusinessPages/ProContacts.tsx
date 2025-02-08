import React, { useState, useEffect } from "react";
import { Button, Textarea, Typography, Card } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

function ProContacts() {
  const { id: adId } = useParams<{ id: string }>(); // 🔥 Récupérer l'ID de l'annonce depuis l'URL
  const [quoteId, setQuoteId] = useState<number | null>(null);
  const [quoteDetails, setQuoteDetails] = useState("");
  const [quotes, setQuotes] = useState<{ id: number; title: string; ownerId: number }[]>([]);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🟢 Charger les devis liés à cette annonce
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Vous devez être connecté.");
          return;
        }

        // ✅ Récupérer les devis liés à l'annonce spécifique
        const response = await axios.get(`http://localhost:3000/business/my-quotes`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Filtrer les devis en fonction de l'annonce actuelle
        const filteredQuotes = response.data.filter((quote: any) => quote.adId === Number(adId));
        setQuotes(filteredQuotes);
console.log("filteredQuotes",filteredQuotes)
        // ✅ Récupérer le `ownerId` du premier devis (si disponible)
        if (filteredQuotes.length > 0) {
          setOwnerId(filteredQuotes[0].ownerId);
        }
      } catch (error) {
        setError("Erreur lors du chargement des devis.");
        console.error("❌ Erreur lors du chargement des devis", error);
      }
    };

    fetchQuotes();
  }, [adId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
        setError("❌ Vous devez être connecté.");
        return;
    }

    console.log("📩 Tentative d'envoi du message avec :", { ownerId, quoteId, content: quoteDetails });

    if (!quoteId || !ownerId) {
        setError("❌ Veuillez sélectionner un devis valide.");
        return;
    }

    try {
        const response = await axios.post(
            "http://localhost:3000/exchange/company/message",
            {
                ownerId,
                quoteId,
                content: quoteDetails,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        console.log("✅ Message envoyé avec succès :", response.data);
        navigate("/business/exchanges");
    } catch (error) {
        setError("❌ Erreur lors de l'envoi du message.");
        console.error("❌ Erreur lors de l'envoi du message", error.response?.data);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="px-6 py-8">
          <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
            Contacter le client
          </Typography>
          <Typography color="gray" className="text-center mb-8">
            Envoyez un devis ou un message à votre client
          </Typography>

          {error && <Typography color="red" className="text-center mb-4">{error}</Typography>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 🟢 Sélectionner un devis */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Sélectionner un devis
              </Typography>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                value={quoteId || ""}
                onChange={(e) => setQuoteId(Number(e.target.value))}
                required
              >
                <option value="">Choisir un devis</option>
                {quotes.map((quote) => (
                  <option key={quote.id} value={quote.id}>
                    {quote.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 🟢 Message */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Message au client
              </Typography>
              <Textarea
                placeholder="Expliquez votre devis..."
                value={quoteDetails}
                onChange={(e) => setQuoteDetails(e.target.value)}
                required
                className="focus:border-blue-500 min-h-[200px]"
              />
            </div>

            {/* 🟢 Bouton d'envoi */}
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <PaperAirplaneIcon className="h-5 w-5 mr-2" />
              Envoyer le message
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ProContacts;
