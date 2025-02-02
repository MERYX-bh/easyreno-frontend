import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Depense {
  id: number;
  categorie: string;
  montant: number;
  date: string;
  description: string;
}

const OwnerBudget: React.FC = () => {
  const [activeTab, setActiveTab] = useState("apercu");
  const [depenses, setDepenses] = useState<Depense[]>([]);
  const [budgetTotal, setBudgetTotal] = useState(50000);

  useEffect(() => {
    
    // simulation du changement depuis de l'API

    const depensesInitiales: Depense[] = [
      { id: 1, categorie: 'Matériaux', montant: 15000, date: '2023-05-01', description: 'Achat de matériaux de construction' },
      { id: 2, categorie: 'Main d\'œuvre', montant: 12000, date: '2023-05-15', description: 'Paiement des ouvriers' },
      { id: 3, categorie: 'Équipement', montant: 5000, date: '2023-06-01', description: 'Location d\'équipement' },
      { id: 4, categorie: 'Permis', montant: 2000, date: '2023-04-15', description: 'Frais de permis de construction' },
      { id: 5, categorie: 'Autres', montant: 1000, date: '2023-06-15', description: 'Frais divers' },
    ];
    setDepenses(depensesInitiales);
  }, []);

  const depensesTotal = depenses.reduce((total, depense) => total + depense.montant, 0);
  const restant = budgetTotal - depensesTotal;
  const pourcentageUtilise = (depensesTotal / budgetTotal) * 100;

  const depensesParCategorie = depenses.reduce((acc, depense) => {
    const categorie = acc.find(cat => cat.name === depense.categorie);
    if (categorie) {
      categorie.value += depense.montant;
    } else {
      acc.push({ name: depense.categorie, value: depense.montant });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const depensesParMois = depenses.reduce((acc, depense) => {
    const date = new Date(depense.date);
    const mois = date.toLocaleString('fr-FR', { month: 'short' });
    const existingMonth = acc.find(item => item.mois === mois);
    if (existingMonth) {
      existingMonth.depenses += depense.montant;
    } else {
      acc.push({ mois, depenses: depense.montant });
    }
    return acc;
  }, [] as { mois: string; depenses: number }[]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Suivi de mon budget</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Aperçu du budget</h2>
          <span className="text-green-600 font-bold">
            {restant.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} restants
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${pourcentageUtilise}%` }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Budget total: {budgetTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
          <span>Dépensé: {depensesTotal.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex border-b border-gray-200">
          <button
            className={`py-2 px-4 ${activeTab === "apercu" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("apercu")}
          >
            Aperçu
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "categories" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Par catégorie
          </button>
          <button
            className={`py-2 px-4 ${activeTab === "mensuel" ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab("mensuel")}
          >
            Suivi mensuel
          </button>
        </div>

        <div className="mt-4">
          {activeTab === "apercu" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Répartition des dépenses</h3>
              <div className="space-y-4">
                {depensesParCategorie.map((categorie, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{categorie.name}</span>
                      <span>{categorie.value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(categorie.value / depensesTotal) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Dépenses par catégorie</h3>
              <ul className="space-y-2">
                {depensesParCategorie.map((categorie, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{categorie.name}</span>
                    <span>{categorie.value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "mensuel" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Suivi mensuel des dépenses</h3>
              <ul className="space-y-2">
                {depensesParMois.map((mois, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{mois.mois}</span>
                    <span>{mois.depenses.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Link to="/owner/dashboard" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Retour au tableau de bord
        </Link>
        <Link to="/owner/budget/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ajouter une dépense
        </Link>
      </div>
    </div>
  );
};

export default OwnerBudget;