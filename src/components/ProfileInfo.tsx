import React from 'react';
import { Typography, Card, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import logoEasyReno from '../images/easyreno.jpg';

function ProfileInfo() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('ownerEmail') ? 'owner' : 'company';
  const userData = JSON.parse(localStorage.getItem(`${userType}Data`) || '{}');

  const renderUserInfo = () => {
    if (userType === 'company') {
      return (
        <>
          <p><strong>Nom de l'entreprise:</strong> {userData.nomEntreprise}</p>
          <p><strong>SIRET:</strong> {userData.SIRET}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Adresse:</strong> {userData.adresse}</p>
          <p><strong>Complément d'adresse:</strong> {userData.complementAdresse}</p>
          <p><strong>Ville:</strong> {userData.ville}</p>
          <p><strong>Code Postal:</strong> {userData.codePostal}</p>
          <p><strong>Corps d'état:</strong> {userData.corpsEtat?.join(', ')}</p>
          {userData.autreCorpsEtat && <p><strong>Autre corps d'état:</strong> {userData.autreCorpsEtat}</p>}
        </>
      );
    } else {
      return (
        <>
          <p><strong>Nom:</strong> {userData.nom}</p>
          <p><strong>Prénom:</strong> {userData.prenom}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Adresse:</strong> {userData.adresse}</p>
          <p><strong>Complément d'adresse:</strong> {userData.complementAdresse}</p>
          <p><strong>Ville:</strong> {userData.ville}</p>
          <p><strong>Code Postal:</strong> {userData.codePostal}</p>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="mx-auto mb-4 w-40 h-auto" />
        <Typography variant="h1" color="orange">EasyReno</Typography>
      </div>

      <Card className="p-6 w-full max-w-screen-sm bg-white rounded-xl shadow-lg">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Profil Utilisateur
        </Typography>
        <div className="space-y-2">
          {renderUserInfo()}
        </div>
        <div className="mt-6 space-y-2">
          <Button 
            color="orange" 
            fullWidth 
            onClick={() => navigate('/edit-profile')}
          >
            Modifier le profil
          </Button>
          <Button 
            variant="outlined" 
            color="blue-gray" 
            fullWidth 
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default ProfileInfo;