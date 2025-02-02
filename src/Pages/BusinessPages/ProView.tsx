import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from "@heroicons/react/24/outline";

function ProView() {
    const navigate = useNavigate();
    const announcements = [
        { id: 1, title: "Rénovation cuisine" },
        { id: 2, title: "Construction d'une véranda" },
        { id: 3, title: "Aménagement garage en studio" },
    ];

    const handleViewDetails = (id: number) => {
        navigate(`/business/pro-details/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Consulter les annonces
                </Typography>

                <Card className="mb-6 shadow-lg">
                    <CardBody>
                        {announcements.map((announcement, index) => (
                            <div key={announcement.id}>
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <Typography variant="h6" color="blue-gray">
                                        {announcement.title}
                                    </Typography>
                                    <Button 
                                        color="blue" 
                                        size="sm" 
                                        onClick={() => handleViewDetails(announcement.id)}
                                        className="flex items-center"
                                    >
                                        <EyeIcon className="h-4 w-4 mr-2" />
                                        Voir
                                    </Button>
                                </div>
                                {index < announcements.length - 1 && <hr className="my-4" />}
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProView;