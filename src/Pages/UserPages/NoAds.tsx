import React from 'react';
import { Link } from 'react-router-dom';

const NoAds: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Mes annonces en ligne</h1>
      
      <div className="mb-6 text-center">
        <Link to="/owner/create-ad" className="text-blue-500 hover:text-blue-700 transition duration-300">
          Créer une nouvelle annonce
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <p>Vous n'avez pas d'annonces en ligne</p>
      </div>
      
      <div className="text-center mt-8"> 
        <Link to="/owner/dashboard" className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition duration-300 inline-block">
          Retour à mon tableau de bord
        </Link>
      </div>
    </div>
  );
};

export default NoAds;