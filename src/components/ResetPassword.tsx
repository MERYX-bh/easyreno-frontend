import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import logoEasyReno from '../images/easyreno.jpg';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const token = location.state?.token;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    const storedToken = localStorage.getItem('resetToken');
    if (token !== storedToken) {
      setError('Token invalide ou expiré.');
      return;
    }

    
    const userType = localStorage.getItem('ownerEmail') === email ? 'owner' : 'company';
    localStorage.setItem(`${userType}Password`, newPassword);

  
    localStorage.removeItem('resetToken');

    navigate('/reset-confirmation');
  };

  if (!email || !token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Typography variant="h4" color="red">Erreur: Informations manquantes</Typography>
        <Button color="blue-gray" className="mt-4" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="mx-auto mb-4 w-40 h-auto" />
        <Typography variant="h1" color="orange">EasyReno</Typography>
      </div>

      <Card className="p-8 bg-white rounded-xl shadow-lg w-full max-w-screen-sm">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Réinitialisation du mot de passe
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-4">
          <Input
            type="password"
            size="lg"
            label="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            size="lg"
            label="Confirmer le nouveau mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <Typography color="red">{error}</Typography>}
          <Button type="submit" color="orange" fullWidth>
            Réinitialiser le mot de passe
          </Button>
        </form>
        <Button 
          variant="outlined" 
          color="blue-gray" 
          fullWidth 
          className="mt-4"
          onClick={() => navigate('/')}
        >
          Annuler et retourner à l'accueil
        </Button>
      </Card>
    </div>
  );
}

export default ResetPassword;