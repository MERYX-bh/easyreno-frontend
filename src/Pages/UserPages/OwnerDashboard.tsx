import React from 'react';
import { Link } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Tableau de bord</h1>
      
      <div className="space-y-8 mb-8">
        <div>
          <Link to="/owner/create-ad" className="block text-blue-600 hover:text-blue-800 transition text-lg">
            Créer une nouvelle annonce
          </Link>
        </div>
        
        <div>
          <Link to="/owner/view-ads" className="block text-blue-600 hover:text-blue-800 transition text-lg">
            Voir mes annonces
          </Link>
        </div>
        
        <div>
          <div className="text-blue-600 text-lg">Mes chantiers en cours</div>
          <div className="text-gray-600 mt-2">Vous n'avez pas de chantiers en cours</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Link to="/owner/budget" className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-700 transition text-center">
          <h2 className="text-xl font-semibold">Suivi de mon budget</h2>
        </Link>
        
        <Link to="/owner/quotes" className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-700 transition text-center">
          <h2 className="text-xl font-semibold">Mes devis</h2>
        </Link>
        
        <Link to="/owner/history" className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-700 transition text-center">
          <h2 className="text-xl font-semibold">Historique</h2>
        </Link>
        
        <Link to="/owner/invoices" className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-700 transition text-center">
          <h2 className="text-xl font-semibold">Mes factures</h2>
        </Link>
      </div>
    </div>
  );
};

export default OwnerDashboard;