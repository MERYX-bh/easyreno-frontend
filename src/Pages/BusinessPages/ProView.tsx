import { useState, useEffect } from 'react';
import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from 'axios';

interface Announcement {
    id: number;
    title: string;
}

function ProView() {
    const navigate = useNavigate();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ✅ Récupérer les annonces depuis l'API
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Vous devez être connecté.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:3000/business/ads", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // 🔥 Filtrer les annonces qui n'ont pas une quote acceptée
                const filteredAds = response.data.filter((ad: any) =>
                    !ad.quotes.some((quote: any) => quote.status === "accepted")
                );

                setAnnouncements(filteredAds);
            } catch (err: any) {
                console.error("❌ Erreur API :", err.response?.data || err.message);
                setError("Erreur lors du chargement des annonces.");
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    const handleViewDetails = (id: number) => {
        navigate(`/business/pro-details/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Consulter les annonces
                </Typography>

                {loading ? (
                    <Typography className="text-center text-gray-600">Chargement des annonces...</Typography>
                ) : error ? (
                    <Typography className="text-center text-red-500">{error}</Typography>
                ) : announcements.length === 0 ? (
                    <Typography className="text-center text-gray-600">
                        Aucune annonce disponible pour le moment.
                    </Typography>
                ) : (
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
                )}
            </div>
        </div>
    );
}

export default ProView;
