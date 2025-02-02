import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

interface QuoteItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Quote {
  id: string;
  companyName: string;
  companyAddress: string;
  companySIRET: string;
  companyVAT: string;
  quoteNumber: string;
  issueDate: string;
  validUntil: string;
  clientName: string;
  clientAddress: string;
  projectTitle: string;
  items: QuoteItem[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  paymentTerms: string[];
  estimatedDuration: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companySIRET: string;
  companyVAT: string;
  clientName: string;
  clientAddress: string;
  projectTitle: string;
  items: QuoteItem[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  paymentTerms: string;
  paymentInstructions: string;
}

const OwnerProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'quote' | 'invoice'>('details');

 
  const project = {
    id: id,
    title: "Rénovation salle de bain",
    description: "Rénovation complète de la salle de bain principale",
    status: "En cours",
  };

  const quote: Quote = {
    id: "Q001",
    companyName: "Entreprise A",
    companyAddress: "123 Rue des Artisans, 75001 Paris, France",
    companySIRET: "123 456 789 00001",
    companyVAT: "FR 12 345678900",
    quoteNumber: "D2024-001",
    issueDate: "04/10/2024",
    validUntil: "04/11/2024",
    clientName: "M. Jean Dupont",
    clientAddress: "456 Avenue des Clients, 75002 Paris, France",
    projectTitle: "Rénovation salle de bain",
    items: [
      { description: "Démontage et évacuation des anciens éléments", quantity: 1, unitPrice: 500, totalPrice: 500 },
      { description: "Fourniture et pose carrelage sol (m²)", quantity: 15, unitPrice: 80, totalPrice: 1200 },
      { description: "Fourniture et pose carrelage mural (m²)", quantity: 25, unitPrice: 70, totalPrice: 1750 },
      { description: "Installation nouvelle douche", quantity: 1, unitPrice: 1200, totalPrice: 1200 },
      { description: "Installation nouveau lavabo", quantity: 1, unitPrice: 600, totalPrice: 600 },
      { description: "Plomberie", quantity: 1, unitPrice: 800, totalPrice: 800 },
      { description: "Électricité", quantity: 1, unitPrice: 500, totalPrice: 500 },
      { description: "Main d'œuvre (heures)", quantity: 40, unitPrice: 50, totalPrice: 2000 },
    ],
    totalHT: 8550,
    tva: 1710,
    totalTTC: 10260,
    paymentTerms: [
      "Acompte de 30% à la signature du devis",
      "40% au démarrage des travaux",
      "Solde à la fin des travaux"
    ],
    estimatedDuration: "2 semaines"
  };

  const invoice: Invoice = {
    id: "I001",
    invoiceNumber: "F2024-001",
    issueDate: "04/10/2024",
    dueDate: "18/10/2024",
    companyName: "Entreprise A",
    companyAddress: "123 Rue des Artisans, 75001 Paris, France",
    companyPhone: "+33 1 23 45 67 89",
    companyEmail: "contact@entreprisea.fr",
    companySIRET: "123 456 789 00001",
    companyVAT: "FR 12 345678900",
    clientName: "M. Jean Dupont",
    clientAddress: "456 Avenue des Clients, 75002 Paris, France",
    projectTitle: "Rénovation salle de bain",
    items: quote.items, 
    totalHT: quote.totalHT,
    tva: quote.tva,
    totalTTC: quote.totalTTC,
    paymentTerms: "Paiement à réception de facture",
    paymentInstructions: "Veuillez effectuer le paiement par virement bancaire sur le compte suivant : IBAN FR76 1234 5678 9012 3456 7890 123"
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to="/owner/projects" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Retour aux projets
      </Link>

      <h1 className="text-3xl font-bold mb-6">{project.title}</h1>

      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'details' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('details')}
        >
          Détails du projet
        </button>
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'quote' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('quote')}
        >
          Devis
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'invoice' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('invoice')}
        >
          Facture
        </button>
      </div>

      {activeTab === 'details' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Détails du projet</h2>
          <p><strong>Description:</strong> {project.description}</p>
          <p><strong>Statut:</strong> {project.status}</p>
         
        </div>
      )}

      {activeTab === 'quote' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-semibold mb-4">Devis du projet</h2>
          <p><strong>{quote.companyName}</strong></p>
          <p>{quote.companyAddress}</p>
          <p>SIRET : {quote.companySIRET}</p>
          <p>TVA : {quote.companyVAT}</p>

          <h3 className="text-lg font-semibold mt-4 mb-2">DEVIS N° {quote.quoteNumber}</h3>
          <p>Date d'émission : {quote.issueDate}</p>
          <p>Valable jusqu'au : {quote.validUntil}</p>

          <div className="mt-4">
            <h4 className="font-semibold">Client :</h4>
            <p>{quote.clientName}</p>
            <p>{quote.clientAddress}</p>
          </div>

          <table className="w-full mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Quantité</th>
                <th className="px-4 py-2 text-right">Prix unitaire HT</th>
                <th className="px-4 py-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{item.unitPrice.toFixed(2)} €</td>
                  <td className="px-4 py-2 text-right">{item.totalPrice.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <p>Total HT : {quote.totalHT.toFixed(2)} €</p>
            <p>TVA (20%) : {quote.tva.toFixed(2)} €</p>
            <p className="font-bold">Total TTC : {quote.totalTTC.toFixed(2)} €</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Conditions de paiement :</h4>
            <ul className="list-disc list-inside">
              {quote.paymentTerms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4">Durée estimée des travaux : {quote.estimatedDuration}</p>
        </div>
      )}

      {activeTab === 'invoice' && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">{invoice.companyName}</h2>
              <p>{invoice.companyAddress}</p>
              <p>Tél : {invoice.companyPhone}</p>
              <p>Email : {invoice.companyEmail}</p>
              <p>SIRET : {invoice.companySIRET}</p>
              <p>N° TVA : {invoice.companyVAT}</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">FACTURE</h3>
              <p>N° {invoice.invoiceNumber}</p>
              <p>Date d'émission : {invoice.issueDate}</p>
              <p>Date d'échéance : {invoice.dueDate}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-2">Facturé à :</h4>
            <p>{invoice.clientName}</p>
            <p>{invoice.clientAddress}</p>
          </div>

          <h4 className="font-semibold mb-4">Objet : {invoice.projectTitle}</h4>

          <table className="w-full mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Quantité</th>
                <th className="px-4 py-2 text-right">Prix unitaire HT</th>
                <th className="px-4 py-2 text-right">Total HT</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">{item.quantity}</td>
                  <td className="px-4 py-2 text-right">{item.unitPrice.toFixed(2)} €</td>
                  <td className="px-4 py-2 text-right">{item.totalPrice.toFixed(2)} €</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mb-8">
            <div className="text-right">
              <p>Total HT : {invoice.totalHT.toFixed(2)} €</p>
              <p>TVA (20%) : {invoice.tva.toFixed(2)} €</p>
              <p className="font-bold text-lg">Total TTC : {invoice.totalTTC.toFixed(2)} €</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-2">Conditions de paiement :</h4>
            <p>{invoice.paymentTerms}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Instructions de paiement :</h4>
            <p>{invoice.paymentInstructions}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerProjectDetails;