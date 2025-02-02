import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Card, CardBody, Input, Textarea } from "@material-tailwind/react";

function ProAdd() {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const [stepTitle, setStepTitle] = useState('');
    const [stepDescription, setStepDescription] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPhoto(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        console.log("Nouvelle étape ajoutée:", { stepTitle, stepDescription, photo });
        navigate(`/business/construction/${projectId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="container mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center">
                    Ajouter une étape chantier
                </Typography>
                
                <Card className="w-full max-w-[48rem] mx-auto mb-6">
                    <CardBody>
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
                        
                        <div className="mb-4">
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Photo de l'étape
                            </Typography>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <Button
                                color="blue"
                                onClick={() => fileInputRef.current?.click()}
                                className="mr-2"
                            >
                                Choisir une photo
                            </Button>
                            {photo && <Typography color="gray">{photo.name}</Typography>}
                        </div>
                        
                        <Button color="green" onClick={handleSubmit} className="w-full">
                            Envoyer
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProAdd;