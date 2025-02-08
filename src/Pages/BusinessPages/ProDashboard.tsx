import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from "@material-tailwind/react";
import { EyeIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface Announcement {
    id: number;
    title: string;
    status?: string;
}

interface Chantier {
    id: number;
    title: string;
    status: string;
    progress: number;
    estimatedEndDate?: string;
    companyName: string;
}

const ProDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [ads, setAds] = useState<Announcement[]>([]);
    const [ongoingProjects, setOngoingProjects] = useState<Chantier[]>([]);
    const [completedProjects, setCompletedProjects] = useState<Chantier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Vous devez être connecté.");
                    setLoading(false);
                    return;
                }

                // 🔥 Récupérer les annonces disponibles
                const adsResponse = await axios.get('http://localhost:3000/business/ads', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // ✅ Filtrer les annonces pour exclure celles qui ont un devis accepté
                const filteredAds = adsResponse.data.filter((ad: any) =>
                    !ad.quotes.some((quote: any) => quote.status === "accepted")
                );

                setAds(filteredAds);

                // 🔥 Récupérer les chantiers
                const chantiersResponse = await axios.get('http://localhost:3000/business/chantiers', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // ✅ Séparer les chantiers en cours et terminés
                const ongoing = chantiersResponse.data.filter((chantier: any) => chantier.status !== "terminé");
                const completed = chantiersResponse.data.filter((chantier: any) => chantier.status === "terminé");

                setOngoingProjects(ongoing);
                setCompletedProjects(completed);
            } catch (error: any) {
                console.error('❌ Erreur lors du chargement des données:', error.response?.data || error.message);
                setError("Erreur lors du chargement des données.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (id: number) => {
        navigate(`/business/pro-details/${id}`);
    };

    const handleViewConstructionInfo = (id: number) => {
        navigate(`/business/construction/${id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6">
            <div className="max-w-7xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="text-center mb-8 font-bold">
                    Tableau de bord Pro
                </Typography>

                {loading ? (
                    <Typography className="text-center text-gray-600">Chargement...</Typography>
                ) : error ? (
                    <Typography className="text-center text-red-500">{error}</Typography>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        
                        {/* ✅ Annonces dynamiques du backend */}
                        <Card className="p-4 shadow-lg rounded-lg bg-white">
                            <Typography variant="h5" color="blue-gray" className="flex items-center mb-4">
                                <EyeIcon className="h-6 w-6 mr-2 text-blue-600" /> Annonces récentes
                            </Typography>
                            {ads.length > 0 ? (
                                ads.map((ad) => (
                                    <div key={ad.id} className="mb-4 flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                                        <div>
                                            <Typography variant="paragraph">{ad.title}</Typography>
                                            <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                                                {ad.status || "En attente"}
                                            </span>
                                        </div>
                                        <Button color="blue" size="sm" onClick={() => handleViewDetails(ad.id)}>Voir</Button>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="paragraph" color="gray">Aucune annonce disponible.</Typography>
                            )}
                        </Card>

                        {/* ✅ Chantiers en cours */}
                        <Card className="p-4 shadow-lg rounded-lg bg-white">
                            <Typography variant="h5" color="blue-gray" className="flex items-center mb-4">
                                <BriefcaseIcon className="h-6 w-6 mr-2 text-blue-600" /> Mes Chantiers
                            </Typography>
                            {ongoingProjects.length > 0 ? (
                                ongoingProjects.map(project => (
                                    <div key={project.id} className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                                        <span>{project.title}</span>
                                        <Button color="blue" size="sm" onClick={() => handleViewConstructionInfo(project.id)}>Détails</Button>
                                        <div className="relative w-full h-2 bg-gray-300 rounded-full mx-2">
                                            <div className="absolute h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                        </div>
                                        <span>{project.progress}%</span>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="paragraph" color="gray">Aucun chantier en cours</Typography>
                            )}
                        </Card>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProDashboard;
