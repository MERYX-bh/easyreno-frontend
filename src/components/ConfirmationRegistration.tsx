import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardBody, Typography, Button, Alert } from "@material-tailwind/react";
import logoEasyReno from '../images/easyreno.jpg';

function ConfirmationRegistration() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      setError('Aucune adresse email fournie.');
    }
  }, [location.state]);

  const handleConnexion = () => {
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6 md:p-10">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="w-32 h-32 object-contain mx-auto mb-6 rounded-full shadow-lg" />
        <Typography variant="h3" color="blue-gray" className="mb-2 font-semibold">Bienvenue sur</Typography>
        <Typography variant="h1" color="orange" className="font-bold text-4xl md:text-5xl mb-8">EasyReno</Typography>
      </div>

      <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
        <CardBody className="text-center p-8">
          {error ? (
            <Alert color="red" className="mb-4">{error}</Alert>
          ) : (
            <>
              <Typography variant="h3" color="blue-gray" className="mb-6 font-bold leading-tight">
                Votre compte est désormais créé !
              </Typography>
              <Typography color="gray" className="mb-6 text-lg">
                Un email de confirmation a été envoyé à l'adresse :
                <br/>
                <span className="font-semibold text-blue-600 break-all">{email}</span>
              </Typography>
            </>
          )}
          <Button
            color="orange"
            fullWidth
            onClick={handleConnexion}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-3 text-lg font-semibold mt-4"
          >
            Me connecter
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default ConfirmationRegistration;