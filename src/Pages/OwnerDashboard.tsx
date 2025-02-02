import React from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const OwnerDashboard: React.FC = () => {
  const hasOngoingProjects = false; 
  const hasAds = false; 

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h2" className="mb-6">Tableau de bord du propriétaire</Typography>
      
      <div className="mb-8">
        <Typography variant="h4" className="mb-4">Mes annonces</Typography>
        {hasAds ? (
          <div>
            <Typography className="mb-4">Vous avez des annonces en ligne.</Typography>
          </div>
        ) : (
          <Typography className="mb-4">Vous n'avez pas d'annonce en ligne.</Typography>
        )}
        <Button color="blue" className="mr-4">
          <Link to="/owner/ads" className="text-white">Voir mes annonces</Link>
        </Button>
        <Button color="green">
          <Link to="/owner/create-ad" className="text-white">Créer une nouvelle annonce</Link>
        </Button>
      </div>

      <div className="mb-8">
        <Typography variant="h4" className="mb-4">Mes chantiers en cours</Typography>
        {hasOngoingProjects ? (
          <div>
            <Typography>Vos chantiers en cours s'afficheront ici.</Typography>
          </div>
        ) : (
          <Typography>Vous n'avez pas de chantier en cours.</Typography>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <Typography variant="h5">Suivi de mon budget</Typography>
          <Link to="/owner/budget">Voir détails</Link>
        </Card>
        <Card className="p-4">
          <Typography variant="h5">Mes devis</Typography>
          <Link to="/owner/quotes">Voir détails</Link>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <Typography variant="h5">Historique</Typography>
          <Link to="/owner/history">Voir détails</Link>
        </Card>
        <Card className="p-4">
          <Typography variant="h5">Mes factures</Typography>
          <Link to="/owner/invoices">Voir détails</Link>
        </Card>
      </div>
    </div>
  );
};

export default OwnerDashboard;