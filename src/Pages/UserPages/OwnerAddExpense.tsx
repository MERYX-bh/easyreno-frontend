import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface Depense {
  categorie: string;
  montant: number;
  date: string;
  description: string;
}

const OwnerAddExpense: React.FC = () => {
  const navigate = useNavigate();
  const [nouvelleDepense, setNouvelleDepense] = useState<Depense>({
    categorie: '',
    montant: 0,
    date: '',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNouvelleDepense(prev => ({
      ...prev,
      [name]: name === 'montant' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ajout la dépense à votre état global ou l'enverriez à une API

    console.log('Nouvelle dépense:', nouvelleDepense);
    
    // Redirige  la page du budget après l'ajout

    navigate('/owner/budget');
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Ajouter une dépense</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categorie">
            Catégorie
          </label>
          <select
            name="categorie"
            value={nouvelleDepense.categorie}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Matériaux">Matériaux</option>
            <option value="Main d'œuvre">Main d'œuvre</option>
            <option value="Équipement">Équipement</option>
            <option value="Permis">Permis</option>
            <option value="Autres">Autres</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="montant">
            Montant
          </label>
          <input
            type="number"
            name="montant"
            value={nouvelleDepense.montant}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={nouvelleDepense.date}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={nouvelleDepense.description}
            onChange={handleInputChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ajouter la dépense
          </button>
          <Link
            to="/owner/budget"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
};

export default OwnerAddExpense;