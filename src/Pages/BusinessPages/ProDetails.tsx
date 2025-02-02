import { Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface Ad {
  id: number;
  title: string;
  location: string;
  workArea: string;
  maxBudget: string;
  description: string;
}

const ProDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [announcementDetails, setAnnouncementDetails] = useState<Ad | null>(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("Aucun token trouvé, utilisateur non authentifié.");
                    return;
                }

                const response = await axios.get(`http://localhost:3000/business/ads/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAnnouncementDetails(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'annonce:", error);
            }
        };

        fetchAdDetails();
    }, [id]);

    const handleProposeQuote = () => {
        navigate(`/business/pro-quotes/${id}`);
    };

    const handleContactClient = () => {
        navigate(`/business/pro-contacts/${id}`); 
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!announcementDetails) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 flex items-center justify-center">
            <Typography variant="h4" color="blue-gray">Chargement...</Typography>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Card className="w-full shadow-lg">
                    <CardBody>
                        <div className="flex justify-between items-center mb-6">
                            <Typography variant="h3" color="blue-gray" className="font-bold">
                                Détail de l'annonce
                            </Typography>
                            <Button color="blue-gray" variant="text" className="flex items-center" onClick={handleGoBack}>
                                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                                Retour
                            </Button>
                        </div>
                        
                        <Typography variant="h4" color="blue-gray" className="mb-4">
                            {announcementDetails.title}
                        </Typography>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div>
                                <Typography variant="h6" color="blue-gray">Localisation:</Typography>
                                <Typography color="gray">{announcementDetails.location}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">Zone de chantier:</Typography>
                                <Typography color="gray">{announcementDetails.workArea}</Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="blue-gray">Budget max:</Typography>
                                <Typography color="gray">{announcementDetails.maxBudget} €</Typography>
                            </div>
                        </div>
                        
                        <div className="mb-6">
                            <Typography variant="h6" color="blue-gray">Description:</Typography>
                            <Typography color="gray">{announcementDetails.description}</Typography>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <Button color="blue" className="flex items-center justify-center" onClick={handleProposeQuote}>
                                <DocumentTextIcon className="h-5 w-5 mr-2" />
                                Proposer un devis
                            </Button>
                            <Button color="green" className="flex items-center justify-center" onClick={handleContactClient}>
                                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2" />
                                Contacter le client
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default ProDetails;
