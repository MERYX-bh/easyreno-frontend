import React, { useState, useEffect } from 'react';
import { Button, Input, Textarea, Typography, Card, CardBody } from "@material-tailwind/react";
import { useNavigate, useParams } from 'react-router-dom';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function ProQuotes() {
    const navigate = useNavigate();
    const { adId } = useParams<{ adId: string }>(); // Récupérer l'ID de l'annonce depuis l'URL

    console.log("aaaaaaaaaaaddddddddd", adId)
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [companyId, setCompanyId] = useState<string | null>(null);

    useEffect(() => {
        // 🔹 Récupérer l'ID de l'entreprise stocké dans le token
        const storedCompanyId = localStorage.getItem('companyId');
        if (storedCompanyId) {
            setCompanyId(storedCompanyId);
        }
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
    
        if (!title || !price || !description) {
            setErrorMessage("Tous les champs sont obligatoires.");
            return;
        }
    
        try {
            const token = localStorage.getItem('token');
            const companyId = localStorage.getItem('companyId');
    
            if (!token) {
                setErrorMessage("Aucun token trouvé, veuillez vous reconnecter.");
                return;
            }
            if (!companyId) {
                setErrorMessage("ID de l'entreprise introuvable.");
                return;
            }
    
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('companyId', companyId);
            if (file) {
                formData.append('file', file);
            }
    
            console.log("📤 Debug - Données envoyées :", formData);
    
            await axios.post(`http://localhost:3000/business/quote/${adId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setSuccessMessage("Le devis a été soumis avec succès !");
            setTimeout(() => navigate('/business/history'), 2000);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Erreur lors de la soumission du devis.");
            }
            console.error('Erreur:', error);
        }
    };
    
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Proposer un devis
                </Typography>

                {errorMessage && (
                    <Typography color="red" className="text-center mb-4">
                        {errorMessage}
                    </Typography>
                )}

                {successMessage && (
                    <Typography color="green" className="text-center mb-4">
                        {successMessage}
                    </Typography>
                )}

                <Card className="mb-6 shadow-lg">
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input type="text" label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            <Input type="number" label="Tarif (en euros)" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            <div className="flex items-center space-x-4">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition duration-300"
                                >
                                    <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                                    Uploader le devis
                                </label>
                                {file && (
                                    <Typography variant="small" color="gray" className="ml-2">
                                        {file.name}
                                    </Typography>
                                )}
                            </div>
                            <Button type="submit" color="blue">Valider</Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProQuotes;
