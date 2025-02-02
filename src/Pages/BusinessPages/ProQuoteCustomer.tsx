import { useState, useEffect } from 'react';
import { Button, Typography, Card, CardBody, CardFooter } from "@material-tailwind/react";
import axios from 'axios';

function Customer() {
    const [devisList, setDevisList] = useState<any[]>([]);
    const [showDetails, setShowDetails] = useState<number | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDevis = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("Aucun token trouvé, veuillez vous reconnecter.");
                    return;
                }

                const response = await axios.get('http://localhost:3000/business/my-quotes', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDevisList(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération des devis.");
                console.error("Erreur:", err);
            }
        };

        fetchDevis();
    }, []);

    const handleViewDetails = (id: number) => {
        setShowDetails(showDetails === id ? null : id);
    };

    const handleDownloadFile = (devis: any) => {
        if (devis.fileUrl) {
            const fileUrl = `http://localhost:3000${devis.fileUrl}`;
            console.log("🔍 Tentative de téléchargement du fichier :", fileUrl);
    
            fetch(fileUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erreur lors du téléchargement: ${response.statusText}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = devis.fileUrl.split('/').pop(); // Garde le nom original
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                })
                .catch(error => {
                    console.error("❌ Erreur de téléchargement :", error);
                });
        } else {
            console.error("❌ Aucun fichier disponible pour ce devis.");
        }
    };    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Mes devis clients
                </Typography>

                {error && <Typography color="red" className="text-center mb-4">{error}</Typography>}

                <div className="space-y-6">
                    {devisList.map((devis) => (
                        <Card key={devis.id} className="mb-6 shadow-lg">
                            <CardBody>
                                <Typography variant="h4" color="blue-gray" className="mb-2">
                                    Devis pour {devis.ad.owner.nom} - {devis.ad.title}
                                </Typography>
                                <Typography variant="h6" color="blue-gray" className="mb-4">
                                    Budget max : {devis.ad.maxBudget}€
                                </Typography>
                                <Button 
                                    color="blue" 
                                    onClick={() => handleViewDetails(devis.id)}
                                    className="mb-4"
                                >
                                    {showDetails === devis.id ? "Masquer les détails" : "Voir les détails"}
                                </Button>

                                {showDetails === devis.id && (
                                    <div className="space-y-3 mt-4">
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow">
                                            <span className="font-medium">Description</span>
                                            <span className="font-bold">{devis.description}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow">
                                            <span className="font-medium">Prix proposé</span>
                                            <span className="font-bold">{devis.price}€</span>
                                        </div>
                                        
                                        <CardFooter className="pt-4">
                                            <Button 
                                                color="green" 
                                                onClick={() => handleDownloadFile(devis)}
                                                className="w-full"
                                            >
                                                Télécharger le PDF
                                            </Button>
                                        </CardFooter>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Customer;
