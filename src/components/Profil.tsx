import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import logoEasyReno from '../images/easyreno.jpg';

function Profile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [userType, setUserType] = useState<'company' | 'owner' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as 'company' | 'owner' | null;
    setUserType(storedUserType);

    const data = storedUserType === 'company' 
      ? JSON.parse(localStorage.getItem('companyData') || '{}')
      : JSON.parse(localStorage.getItem('ownerData') || '{}');
    setProfileData(data);
  }, []);

  if (!profileData || !userType) return <div>Chargement...</div>;

  const formatLabel = (label: string) => label.split(' ').join(', ');
  const formatMultipleChoices = (choices: string[]) => choices.map(choice => choice.split(' ').join(', ')).join(' ; ');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="mx-auto mb-4 w-40 h-auto" />
        <Typography variant="h1" color="orange">EasyReno</Typography>
      </div>

      <Card className="p-6 w-full max-w-screen-sm bg-white rounded-xl shadow-lg">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Profil {userType === 'company' ? "de l'entreprise" : "du propriétaire"}
        </Typography>
        <div className="space-y-2">
          {userType === 'company' ? (
            <>
              <Typography variant="h6">{formatLabel("Nom Entreprise")}: {profileData["Nom Entreprise"]}</Typography>
              <Typography>SIRET: {profileData.SIRET}</Typography>
              <Typography>Email: {profileData.Email}</Typography>
              <Typography>Adresse: {profileData.Adresse}</Typography>
              <Typography>{formatLabel("Complement Adresse")}: {profileData["Complement Adresse"]}</Typography>
              <Typography>Ville: {profileData.Ville}</Typography>
              <Typography>{formatLabel("Code Postal")}: {profileData["Code Postal"]}</Typography>
              <Typography>{formatLabel("Corps Etat")}: {formatMultipleChoices(profileData["Corps Etat"])}</Typography>
              {profileData["Autre Corps Etat"] && (
                <Typography>{formatLabel("Autre Corps Etat")}: {profileData["Autre Corps Etat"]}</Typography>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6">Nom: {profileData.Nom}</Typography>
              <Typography>Prénom: {profileData.Prenom}</Typography>
              <Typography>Email: {profileData.Email}</Typography>
              <Typography>Adresse: {profileData.Adresse}</Typography>
              <Typography>{formatLabel("Complement Adresse")}: {profileData["Complement Adresse"]}</Typography>
              <Typography>Ville: {profileData.Ville}</Typography>
              <Typography>{formatLabel("Code Postal")}: {profileData["Code Postal"]}</Typography>
            </>
          )}
        </div>
        <div className="mt-6">
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
            className="mt-2"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Profile;