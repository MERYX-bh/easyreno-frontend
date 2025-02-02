import { useEffect, useState } from 'react';
import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, EyeIcon } from "@heroicons/react/24/outline";

interface Exchange {
    id: number;
    client: string;
    title: string;
    lastMessage?: string;
    date?: string;
}

function ProExchanges() {
    const navigate = useNavigate();
    const [exchanges, setExchanges] = useState<Exchange[]>([]);

    useEffect(() => {
        const initialExchanges: Exchange[] = [
            { 
                id: 1, 
                client: "M. Dupont",
                title: "Rénovation cuisine",
                lastMessage: "D'accord pour le devis, quand pouvez-vous commencer ?",
                date: "15/09/2024"
            },
            // Vous pouvez ajouter d'autres échanges ici si nécessaire
        ];
        setExchanges(initialExchanges);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Mes échanges
                </Typography>

                <Card className="mb-6 shadow-lg">
                    <CardBody>
                        {exchanges.length === 0 ? (
                            <Typography color="gray" className="text-center">
                                Aucun échange à afficher.
                            </Typography>
                        ) : (
                            <div className="space-y-4">
                                {exchanges.map((exchange, index) => (
                                    <div key={exchange.id}>
                                        <div className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500 mr-4 mt-1" />
                                            <div className="flex-grow">
                                                <Typography variant="h6" color="blue-gray" className="mb-1">
                                                    {exchange.client} - {exchange.title}
                                                </Typography>
                                                {exchange.lastMessage && (
                                                    <Typography color="gray" className="text-sm mb-1 line-clamp-2">
                                                        {exchange.lastMessage}
                                                    </Typography>
                                                )}
                                                {exchange.date && (
                                                    <Typography color="blue-gray" className="text-xs">
                                                        Dernier message : {exchange.date}
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
                                ))}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProExchanges;