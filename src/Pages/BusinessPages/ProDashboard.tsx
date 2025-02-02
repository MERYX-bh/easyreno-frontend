import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from "@material-tailwind/react";
import { EyeIcon, BriefcaseIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const ProDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("Aucun token trouvé, utilisateur non authentifié.");
                    return;
                }

                const response = await axios.get('http://localhost:3000/business/ads', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAds(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        };

        fetchAds();
    }, []);

    const handleViewDetails = (id: number) => {
        navigate(`/business/pro-details/${id}`);
    };

    const handleViewConstructionInfo = (id: number) => {
        navigate(`/business/construction/${id}`);
    };

    const ongoingProjects = [
        { id: 1, title: "Rénovation cuisine M. Dupont", progress: 60 },
    ];

    const completedProjects = [
        { 
            id: 101, 
            title: "Réfection salle de bain M. Bernard",
            date: "15/07/2024",
            description: "Rénovation complète avec installation d'une douche à l'italienne et double vasque",
            cost: "9 680 €"
        },
        { 
            id: 102, 
            title: "Installation domotique Mme Dubois",
            date: "22/06/2024",
            description: "Mise en place d'un système domotique complet pour la gestion de l'éclairage, du chauffage et de la sécurité",
            cost: "8 760 €"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6">
            <div className="max-w-7xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="text-center mb-8 font-bold">
                    Tableau de bord Pro
                </Typography>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Annonces dynamiques du backend */}
                    <Card className="p-4 shadow-lg rounded-lg bg-white">
                        <Typography variant="h5" color="blue-gray" className="flex items-center mb-4">
                            <EyeIcon className="h-6 w-6 mr-2 text-blue-600" /> Annonces récentes
                        </Typography>
                        {ads.length > 0 ? (
                            ads.map((ad: any) => (
                                <div key={ad.id} className="mb-4 flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm">
                                    <div>
                                        <Typography variant="paragraph">{ad.title}</Typography>
                                        <span className={`inline-block mt-1 px-2 py-1 text-xs font-semibold ${ad.status === 'Urgent' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} rounded-full`}>
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

                    {/* Chantiers en cours */}
                    <Card className="p-4 shadow-lg rounded-lg bg-white">
                        <Typography variant="h5" color="blue-gray" className="flex items-center mb-4">
                            <BriefcaseIcon className="h-6 w-6 mr-2 text-blue-600" /> Chantiers en cours
                        </Typography>
                        {ongoingProjects.length > 0 ? (
                            ongoingProjects.map(project => (
                                <div key={project.id} className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
                                    <span>{project.title}</span>
                                    <Button color="blue" size="sm" onClick={() => handleViewConstructionInfo(project.id)}>Détails</Button>
                                    <div className="relative w-full h-2 bg-gray-300 rounded-full mx-2">
                                        <div className={`absolute h-full bg-blue-600 rounded-full`} style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                    <span>{project.progress}%</span>
                                </div>
                            ))
                        ) : (
                            <Typography variant="paragraph" color="gray">Vous n'avez pas de chantiers en cours</Typography>
                        )}
                    </Card>

                    {/* Chantiers terminés */}
                    <Card className="p-4 shadow-lg rounded-lg bg-white">
                        <Typography variant="h5" color="blue-gray" className="flex items-center mb-4">
                            <CheckCircleIcon className="h-6 w-6 mr-2 text-blue-600" /> Chantiers terminés
                        </Typography>
                        {completedProjects.length > 0 ? (
                            completedProjects.map(project => (
                                <div key={project.id} className="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm">
                                    <Typography variant="h6" color="blue-gray">{project.title}</Typography>
                                    <Typography variant="small" color="gray">Terminé le : {project.date}</Typography>
                                    <Typography variant="paragraph" className="mt-2">{project.description}</Typography>
                                    <Typography variant="lead" color="green" className="mt-2 font-medium">Coût total : {project.cost}</Typography>
                                </div>
                            ))
                        ) : (
                            <Typography variant="paragraph" color="gray">Vous n'avez pas de chantiers terminés</Typography>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProDashboard;
