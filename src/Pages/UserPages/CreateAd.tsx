import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [workArea, setWorkArea] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token'); // Récupération du token JWT
        console.log("Token récupéré :", token); // 🔍 Vérifie si un token est bien récupéré
        
        if (!token) {
            throw new Error("Aucun token trouvé, l'utilisateur n'est pas authentifié.");
        }

        const response = await axios.post(
            'http://localhost:3000/owner/create-ad',
            { title, location, workArea, maxBudget, description },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Annonce créée:', response.data);
        navigate('/owner/view-ads'); // Rediriger vers la page des annonces
    } catch (error) {
        console.error('Erreur lors de la création de l’annonce:', error);
        alert(error.message);
    }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Créer une annonce</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Titre</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-2">Localisation</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="workArea" className="block mb-2">Zone de chantier</label>
          <input type="text" id="workArea" value={workArea} onChange={(e) => setWorkArea(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="maxBudget" className="block mb-2">Budget max</label>
          <input type="number" id="maxBudget" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className="w-full p-2 border rounded" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" rows={4} required></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300">
            Mettre en ligne
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAd;
