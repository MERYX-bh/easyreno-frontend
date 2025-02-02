import { useState, useEffect } from 'react';
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { EyeIcon, EyeSlashIcon, ArrowDownTrayIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Invoice {
    id: number;
    clientName: string;
    projectTitle: string;
    amount: number;
    date: string;
    status: 'Payée' | 'En attente' | 'En retard';
    details?: string;
}

function ProSendQuote() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [expandedInvoiceId, setExpandedInvoiceId] = useState<number | null>(null);

    useEffect(() => {
        const fetchInvoices = () => {
            const dummyInvoices: Invoice[] = [
                {
                    id: 1,
                    clientName: "M. Marchand",
                    projectTitle: "Rénovation piscine",
                    amount: 8500,
                    date: "15/09/2024",
                    status: 'Payée',
                    details: "Rénovation complète de la piscine, incluant le remplacement du liner, la réparation du système de filtration et l'installation d'un éclairage LED."
                },
                {
                    id: 2,
                    clientName: "Mme Martine",
                    projectTitle: "Rénovation salon",
                    amount: 6200,
                    date: "22/09/2024",
                    status: 'En attente',
                    details: "Rénovation du salon comprenant la pose d'un nouveau parquet, la peinture des murs et l'installation d'un système d'éclairage moderne."
                },
                {
                    id: 3,
                    clientName: "M. Bernard",
                    projectTitle: "Installation salle de bain",
                    amount: 3800,
                    date: "01/10/2024",
                    status: 'En retard',
                    details: "Installation complète d'une nouvelle salle de bain, incluant la pose de carrelage, l'installation d'une douche à l'italienne et d'un meuble vasque double."
                }
            ];
            setInvoices(dummyInvoices);
        };

        fetchInvoices();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Payée': return 'text-green-500';
            case 'En attente': return 'text-yellow-500';
            case 'En retard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const toggleDetails = (id: number) => {
        setExpandedInvoiceId(expandedInvoiceId === id ? null : id);
    };

    const handleDownloadPDF = (invoice: Invoice) => {
        // Simuler le téléchargement d'un PDF
        const pdfBlob = new Blob(['Contenu factice du PDF pour ' + invoice.clientName], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `Facture_${invoice.id}_${invoice.clientName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Factures Clients
                </Typography>

                {invoices.map((invoice) => (
                    <Card key={invoice.id} className="mb-6 shadow-lg">
                        <CardBody>
                            <div className="flex justify-between items-center mb-4">
                                <Typography variant="h5" color="blue-gray" className="font-bold">
                                    {invoice.clientName}
                                </Typography>
                                <Typography className={`${getStatusColor(invoice.status)} font-semibold`}>
                                    {invoice.status}
                                </Typography>
                            </div>
                            <Typography color="gray" className="mb-2">
                                {invoice.projectTitle}
                            </Typography>
                            <Typography variant="h6" color="blue-gray" className="mb-2">
                                Montant: {invoice.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                            </Typography>
                            <Typography color="gray" className="mb-4">
                                Date: {invoice.date}
                            </Typography>
                            <div className="flex justify-end space-x-2">
                                <Button 
                                    color="blue" 
                                    size="sm" 
                                    onClick={() => toggleDetails(invoice.id)}
                                    className="flex items-center"
                                >
                                    {expandedInvoiceId === invoice.id ? (
                                        <>
                                            <EyeSlashIcon className="h-4 w-4 mr-2" />
                                            Masquer détails
                                        </>
                                    ) : (
                                        <>
                                            <EyeIcon className="h-4 w-4 mr-2" />
                                            Voir détails
                                        </>
                                    )}
                                </Button>
                                <Button 
                                    color="indigo" 
                                    size="sm"
                                    onClick={() => handleDownloadPDF(invoice)}
                                    className="flex items-center"
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                                    Télécharger PDF
                                </Button>
                                <Button color="green" size="sm" className="flex items-center">
                                    <CheckCircleIcon className="h-4 w-4 mr-2" />
                                    Marquer comme payée
                                </Button>
                            </div>
                            {expandedInvoiceId === invoice.id && (
                                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner">
                                    <Typography variant="h6" color="blue-gray" className="mb-2 font-semibold">
                                        Détails de la facture
                                    </Typography>
                                    <Typography color="gray">
                                        {invoice.details}
                                    </Typography>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ProSendQuote;