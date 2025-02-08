import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Card, CardBody, CardFooter, Textarea } from "@material-tailwind/react";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

interface ExchangeData {
    id: number;
    owner: { nom: string };
    quote?: { title: string };
    adId: number; // ✅ Ajout de l'ID de l'annonce pour la redirection
    messages: Message[];
}

function ProExchangeDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [replyText, setReplyText] = useState("");
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false); // ✅ Gérer l'absence d'échange

    useEffect(() => {
        const fetchExchangeData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Vous devez être connecté.");
                    return;
                }

                const response = await axios.get(`http://localhost:3000/exchange/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setExchangeData(response.data);
                setMessages(response.data.messages);
            } catch (err: any) {
                console.error("Erreur lors du chargement des messages :", err.response?.data || err.message);
                
                if (err.response?.status === 404) {
                    setNotFound(true); // ✅ Marquer l'échange comme inexistant
                } else {
                    setError("Erreur lors du chargement des messages.");
                }
            }
        };

        fetchExchangeData();
    }, [id]);

    const handleReply = async () => {
        if (!replyText.trim()) return;

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Vous devez être connecté.");
                return;
            }

            const response = await axios.post(
                `http://localhost:3000/exchange/message/${id}`,
                { content: replyText },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newMessage: Message = {
                id: response.data.id,
                sender: response.data.sender,
                content: replyText,
                timestamp: new Date().toISOString(),
            };

            setMessages((prev) => [...prev, newMessage]);
            setReplyText("");
        } catch (err: any) {
            console.error("🚨 Erreur lors de l'envoi du message :", err.response?.data || err.message);
            setError("Erreur lors de l'envoi du message.");
        }
    };

    if (notFound) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <Typography className="text-gray-600 text-xl">
                    Aucun échange pour le moment. Vous devez contacter le propriétaire en premier.
                </Typography>
                <Button
                    className="mt-4"
                    color="blue"
                    onClick={() => navigate(`/business/pro-contacts/${id}`)}
                >
                    Contacter le propriétaire
                </Button>
            </div>
        );
    }

    if (!exchangeData) {
        return <Typography className="text-center">Chargement...</Typography>;
    }

    console.log(exchangeData)
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <Card className="max-w-4xl mx-auto">
                <CardBody>
                    <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
                        {exchangeData.owner.nom}
                    </Typography>

        

                    <div className="space-y-4 mb-6">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <Card
                                    key={message.id}
                                    className={`p-4 ${
                                        message.sender === "company"
                                            ? "bg-blue-50 ml-auto mr-0 md:w-3/4"
                                            : "bg-gray-50 mr-auto ml-0 md:w-3/4"
                                    }`}
                                >
                                    <Typography variant="h6" color="blue-gray">
                                        {message.sender === "company" ? "Vous (entreprise)" : "Propriétaire"}
                                    </Typography>
                                    <Typography>{message.content}</Typography>
                                    <Typography variant="small" color="gray" className="mt-1">
                                        {new Date(message.timestamp).toLocaleString("fr-FR", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </Typography>
                                </Card>
                            ))
                        ) : (
                            <Typography className="text-gray-500 text-center">Aucun message.</Typography>
                        )}
                    </div>

                    <div className="mb-4">
                        <Textarea
                            label="Votre réponse"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                        />
                    </div>
                </CardBody>

                <CardFooter className="pt-0 flex justify-center space-x-4">
                    <Button
                        onClick={handleReply}
                        color="blue"
                        disabled={replyText.trim() === ""}
                    >
                        Envoyer la réponse
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ProExchangeDetail;
