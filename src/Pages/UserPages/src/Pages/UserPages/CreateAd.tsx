/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [description, setDescription] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer les données du formulaire à votre backend
    console.log({ title, location, workArea, maxBudget, description });
    // Après avoir soumis, redirigez l'utilisateur vers le tableau de bord ou une page de confirmation
    navigate('/owner/dashboard');
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Créer une nouvelle annonce</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localisation</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="workArea" className="block text-sm font-medium text-gray-700">Zone de chantier</label>
          <input
            type="text"
            id="workArea"
            value={workArea}
            onChange={(e) => setWorkArea(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700">Budget max</label>
          <input
            type="number"
            id="maxBudget"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Postuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;