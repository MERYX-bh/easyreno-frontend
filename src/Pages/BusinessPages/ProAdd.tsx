import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Card, CardBody, Input, Textarea } from "@material-tailwind/react";
import axios from 'axios';

function ProAdd() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [stepTitle, setStepTitle] = useState('');
    const [stepDescription, setStepDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async () => {
        if (!stepTitle || !stepDescription) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Token d'authentification manquant.");
                setLoading(false);
                return;
            }

            const response = await axios.post(
                `http://localhost:3000/business/chantier/${projectId}/add-step`,
                {
                    stepName: stepTitle,
                    details: [stepDescription],
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("✅ Étape ajoutée :", response.data);
            setSuccess("Étape ajoutée avec succès !");
            setTimeout(() => navigate(`/business/construction/${projectId}`), 1500);
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout de l'étape :", error);
            setError("Erreur lors de l'ajout de l'étape.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="container mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center">
                    Ajouter une étape chantier
                </Typography>
                
                <Card className="w-full max-w-[48rem] mx-auto mb-6">
                    <CardBody>
                        {error && <Typography color="red" className="mb-4">{error}</Typography>}
                        {success && <Typography color="green" className="mb-4">{success}</Typography>}
                        
                        <div className="mb-4">
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Titre de l'étape
                            </Typography>
                            <Input
                                type="text"
                                value={stepTitle}
                                onChange={(e) => setStepTitle(e.target.value)}
                                placeholder="Entrez le titre de l'étape"
                                className="bg-white bg-opacity-70"
                            />
                        </div>
                        
                        <div className="mb-4">
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Description de l'étape
                            </Typography>
                            <Textarea
                                value={stepDescription}
                                onChange={(e) => setStepDescription(e.target.value)}
                                placeholder="Décrivez l'étape"
                                className="bg-white bg-opacity-70"
                            />
                        </div>

                        <Button 
                            color="green" 
                            onClick={handleSubmit} 
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Envoi en cours..." : "Envoyer"}
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProAdd;
