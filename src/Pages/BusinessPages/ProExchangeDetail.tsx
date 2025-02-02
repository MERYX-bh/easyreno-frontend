import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, Card, CardBody, CardFooter, Textarea } from "@material-tailwind/react";

interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

interface ExchangeData {
    id: number;
    title: string;
    object: string;
    messages: Message[];
}

function ProExchangeDetail() {
    const { id } = useParams<{ id: string }>();
    const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [replyText, setReplyText] = useState("");
    const [lastSender, setLastSender] = useState("");

    useEffect(() => {
        // Simulate fetching data based on the id
        const fetchExchangeData = () => {
            // This is where you would normally fetch data from an API
            const dummyData: ExchangeData = {
                id: parseInt(id || "0"),
                title: `M. Dupont Rénovation cuisine ${id}`,
                object: "Rénovation complète de cuisine",
                messages: [
                    { id: 1, sender: "Accorus", content: "Bonjour, nous venons de voir votre Rénovation de cuisine, pouvez-vous nous en dire plus afin que nous puissions vous proposer un devis ?", timestamp: "2024-09-20 10:00" },
                    { id: 2, sender: "M. Dupont", content: "Oui, nous aimerions moderniser notre cuisine actuelle. Nous pensons à un design ouvert avec un îlot central. Nous aimerions également des armoires en bois clair et un plan de travail en diamant.", timestamp: "2024-09-20 10:15" },
                    { id: 3, sender: "Accorus", content: "Avez-vous déjà des dimensions pour la cuisine ou des contraintes spécifiques dont nous devrions tenir compte ?", timestamp: "2024-09-20 10:30" },
                    { id: 4, sender: "M. Dupont", content: "Oui, la cuisine mesure environ 15 mètres carrés. Nous avons également une fenêtre sur le mur du fond, et nous aimerions maximiser la lumière naturelle.", timestamp: "2024-09-20 10:45" }
                ]
            };
            setExchangeData(dummyData);
            setMessages(dummyData.messages);
            setLastSender(dummyData.messages[dummyData.messages.length - 1].sender);
        };

        fetchExchangeData();
    }, [id]);

    const handleReply = () => {
        if (replyText.trim()) {
            const newSender = lastSender === "M. Dupont" ? "Accorus" : "M. Dupont";
            const newMessage = {
                id: messages.length + 1,
                sender: newSender,
                content: replyText,
                timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
            };
            setMessages([...messages, newMessage]);
            setReplyText("");
            setLastSender(newSender);
        }
    };

    const handleAttachment = () => {
        console.log("Envoyer une pièce jointe");
    };

    if (!exchangeData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <Card className="max-w-4xl mx-auto">
                <CardBody>
                    <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
                        {exchangeData.title}
                    </Typography>
                    <Typography variant="h4" color="gray" className="mb-4 text-center">
                        Objet : {exchangeData.object}
                    </Typography>
                    <div className="space-y-4 mb-6">
                        {messages.map((message) => (
                            <Card key={message.id} className={`p-4 ${message.sender === "Accorus" ? "bg-blue-50 ml-auto mr-0 md:w-3/4" : "bg-gray-50 mr-auto ml-0 md:w-3/4"}`}>
                                <Typography variant="h6" color="blue-gray">
                                    {message.sender}
                                </Typography>
                                <Typography>{message.content}</Typography>
                                <Typography variant="small" color="gray" className="mt-1">
                                    {message.timestamp}
                                </Typography>
                            </Card>
                        ))}
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
                    <Button onClick={handleReply} color="blue">
                        Envoyer la réponse
                    </Button>
                    <Button onClick={handleAttachment} color="green">
                        Envoyer une pièce jointe
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ProExchangeDetail;