import React, { useState } from 'react';
import { Button, Input, Textarea, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

function ProContacts() {
    const [quoteTitle, setQuoteTitle] = useState('');
    const [quoteDetails, setQuoteDetails] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const newExchange = { id: Date.now(), title: quoteTitle, details: quoteDetails };
        
        const existingExchanges = JSON.parse(localStorage.getItem('exchanges') || '[]');
        const updatedExchanges = [...existingExchanges, newExchange];
        
        localStorage.setItem('exchanges', JSON.stringify(updatedExchanges));

        navigate('/business/exchanges');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="px-6 py-8">
                    <Typography variant="h3" color="blue-gray" className="mb-2 text-center">
                        Contacter le client
                    </Typography>
                    <Typography color="gray" className="text-center mb-8">
                        Envoyez un devis ou un message à votre client
                    </Typography>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Titre du devis
                            </Typography>
                            <Input
                                type="text"
                                placeholder="Ex: Devis pour rénovation cuisine"
                                value={quoteTitle}
                                onChange={(e) => setQuoteTitle(e.target.value)}
                                required
                                className="focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Détails du devis
                            </Typography>
                            <Textarea
                                placeholder="Décrivez les détails de votre devis ici..."
                                value={quoteDetails}
                                onChange={(e) => setQuoteDetails(e.target.value)}
                                required
                                className="focus:border-blue-500 min-h-[200px]"
                            />
                        </div>

                        <Button 
                            type="submit" 
                            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                        >
                            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                            Envoyer le devis
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default ProContacts;