import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from "@material-tailwind/react";
import logoEasyReno from '../images/easyreno.jpg';

function ResetPasswordConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="mx-auto mb-4 w-40 h-auto" />
        <Typography variant="h1" color="orange">EasyReno</Typography>
      </div>

      <Card className="p-8 bg-white rounded-xl shadow-lg w-full max-w-screen-sm">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Mot de passe réinitialisé
        </Typography>
        <Typography color="gray" className="mb-8 text-center">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
        </Typography>
        <div className="space-y-4">
          <Button 
            color="orange"
            fullWidth
            onClick={() => navigate('/login')}
          >
            Aller à la page de connexion
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

export default ResetPasswordConfirmation;