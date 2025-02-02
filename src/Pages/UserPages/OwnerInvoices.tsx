import React from 'react';

interface Invoice {
  id: number;
  projectName: string;
  amount: number;
  status: 'Payée' | 'En attente' | 'En retard';
  invoiceNumber: string;
  date: string;
  dueDate: string;
}

const OwnerInvoices: React.FC = () => {
  const invoices: Invoice[] = [
    { id: 1, projectName: "Rénovation salle de bain", amount: 5000, status: "Payée", invoiceNumber: "F-2024-001", date: "2024-01-15", dueDate: "2024-02-15" },
    { id: 2, projectName: "Peinture salon", amount: 1500, status: "En attente", invoiceNumber: "F-2024-002", date: "2024-02-01", dueDate: "2024-03-01" },
    { id: 3, projectName: "Installation cuisine", amount: 8000, status: "En retard", invoiceNumber: "F-2024-003", date: "2024-02-15", dueDate: "2024-03-15" },
  ];

  const handleDownload = (invoice: Invoice) => {
    const invoiceContent = `
Facture N° ${invoice.invoiceNumber}
Date d'émission: ${invoice.date}
Date d'échéance: ${invoice.dueDate}
Projet: ${invoice.projectName}
Montant: ${invoice.amount} €
Statut: ${invoice.status}
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Facture_${invoice.invoiceNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'Payée':
        return 'text-green-600';
      case 'En attente':
        return 'text-yellow-600';
      case 'En retard':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mes factures</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">N° Facture</th>
              <th className="px-4 py-2 text-left">Date d'émission</th>
              <th className="px-4 py-2 text-left">Date d'échéance</th>
              <th className="px-4 py-2 text-left">Projet</th>
              <th className="px-4 py-2 text-right">Montant</th>
              <th className="px-4 py-2 text-center">Statut</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{invoice.invoiceNumber}</td>
                <td className="px-4 py-2">{invoice.date}</td>
                <td className="px-4 py-2">{invoice.dueDate}</td>
                <td className="px-4 py-2">{invoice.projectName}</td>
                <td className="px-4 py-2 text-right">{invoice.amount.toFixed(2)} €</td>
                <td className={`px-4 py-2 text-center ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </td>
                <td className="px-4 py-2 text-center">
                  <button 
                    onClick={() => handleDownload(invoice)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                  >
                    Télécharger
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerInvoices;