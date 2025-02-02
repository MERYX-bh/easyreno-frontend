import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const ownerEmail = localStorage.getItem('ownerEmail');
    const companyEmail = localStorage.getItem('companyEmail');

    if (email === ownerEmail || email === companyEmail) {
      // pour simuler envoi mail
      setMessage('Un email de réinitialisation a été envoyé à votre adresse.');
      
      // pour generer token unique
      const resetToken = 'uniqueToken123';
      localStorage.setItem('resetToken', resetToken);
      
      setTimeout(() => {
        navigate('/reset-password', { state: { email, token: resetToken } });
      }, 3000);
    } else {
      setError('Aucun compte n\'est associé à cette adresse email.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card color="transparent" shadow={false} className="p-8 bg-white rounded-xl shadow-lg w-full max-w-screen-sm">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Mot de passe oublié
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          <div className="mb-4">
            <Input
              type="email"
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <Typography color="green" className="mb-4">{message}</Typography>}
          {error && <Typography color="red" className="mb-4">{error}</Typography>}
          <Button type="submit" fullWidth className="mb-4">
            Réinitialiser le mot de passe
          </Button>
          <Button 
            variant="outlined" 
            color="blue-gray" 
            fullWidth 
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ForgotPassword;