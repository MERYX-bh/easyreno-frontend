import React from 'react';
import { Typography, Button, Card } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import logoEasyReno from '../images/easyreno.jpg';

const UserPages: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Créer une annonce", route: "/create-ad" },
    { title: "Voir mes annonces", route: "/my-ads" },
    { title: "Mon planning", route: "/planning" },
    { title: "Mes chantiers", route: "/projects" },
    { title: "Mes échanges", route: "/messages" },
    { title: "Mes devis", route: "/quotes" },
    { title: "Mes factures", route: "/invoices" },
    { title: "Historique", route: "/history" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="text-center mb-8">
          <img src={logoEasyReno} alt="Logo EasyReno" className="mx-auto mb-4 w-40 h-auto" />
          <Typography variant="h1" color="orange">EasyReno</Typography>
        </div>

        <Card className="p-6 bg-white rounded-xl shadow-lg">
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Tableau de bord Propriétaire
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                color="orange"
                className="normal-case text-lg py-4"
                fullWidth
                onClick={() => navigate(item.route)}
              >
                {item.title}
              </Button>
            ))}
          </div>
        </Card>

        <Button 
          variant="outlined" 
          color="blue-gray" 
          className="mt-6"
          onClick={() => navigate('/')}
        >
          Déconnexion
        </Button>
      </main>
    </div>
  );
};

export default UserPages;