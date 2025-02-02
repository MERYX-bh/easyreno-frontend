import React, { useState, useEffect } from 'react';
import { Button, Typography, Input } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import logoEasyReno from '../images/easyreno.jpg';

type ViewState = 'main' | 'login' | 'choice';

function HomePage(): JSX.Element {
  const [currentView, setCurrentView] = useState<ViewState>('main');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const userType = localStorage.getItem('userType');
    if (userType === 'owner') {
      navigate('/owner/dashboard');
    } else if (userType === 'company') {
      navigate('/business/pro-dashboard');
    }
  }, [navigate]);

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');

    const companyEmail = localStorage.getItem('companyEmail');
    const companyPassword = localStorage.getItem('companyPassword');
    const ownerEmail = localStorage.getItem('ownerEmail');
    const ownerPassword = localStorage.getItem('ownerPassword');

    console.log('Attempting login:', { email, password });
    console.log('Stored credentials:', { companyEmail, ownerEmail });

    if (email === companyEmail && password === companyPassword) {
      console.log('Logging in as company');
      localStorage.setItem('userType', 'company');
      navigate('/business/pro-dashboard');
    } else if (email === ownerEmail && password === ownerPassword) {
      console.log('Logging in as owner');
      localStorage.setItem('userType', 'owner');
      navigate('/owner/dashboard');
    } else {
      console.log('Login failed');
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6 md:p-10">
      <div className="text-center mb-12">
        <img src={logoEasyReno} alt="Logo EasyReno" className="w-32 h-32 object-contain mx-auto mb-6 rounded-full shadow-md" />
        <Typography variant="h3" color="blue-gray" className="mb-2">Bienvenue sur</Typography>
        <Typography variant="h1" color="orange" className="font-bold text-4xl md:text-5xl">EasyReno</Typography>
      </div>

      {currentView === 'main' && (
        <div className="w-full max-w-md space-y-6">
          <Button 
            onClick={() => setCurrentView('login')} 
            className="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            Me connecter
          </Button>
          <Button 
            onClick={() => setCurrentView('choice')} 
            className="w-full py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            M'inscrire
          </Button>
        </div>
      )}

      {currentView === 'login' && (
        <form onSubmit={handleSubmitLogin} className="w-full max-w-md space-y-6">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
            className="bg-white bg-opacity-70 text-lg"
          />
          <Input
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
            className="bg-white bg-opacity-70 text-lg"
          />
          {error && <Typography color="red" className="text-center">{error}</Typography>}
          <Button 
            type="submit" 
            className="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            Valider
          </Button>
          <Typography 
            className="text-center text-blue-600 cursor-pointer hover:underline transition-all duration-300"
            onClick={() => navigate('/forgot-password')}
          >
            Mot de passe oublié ?
          </Typography>
        </form>
      )}

      {currentView === 'choice' && (
        <div className="w-full max-w-md space-y-6">
          <Typography variant="h5" color="blue-gray" className="mb-6 text-center">
            Êtes-vous :
          </Typography>
          <Button 
            onClick={() => navigate('/inscription-proprietaire')} 
            className="w-full py-3 bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            Un propriétaire
          </Button>
          <Button 
            onClick={() => navigate('/inscription-entreprise')} 
            className="w-full py-3 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
          >
            Une entreprise
          </Button>
        </div>
      )}

      {currentView !== 'main' && (
        <Button 
          onClick={() => setCurrentView('main')} 
          className="mt-8 text-blue-gray-600 hover:bg-blue-gray-50 transition-all duration-300 px-6 py-2 rounded-full"
        >
          Retour
        </Button>
      )}

      <div className="mt-12 text-center text-gray-700 max-w-lg">
        <Typography variant='h6' className="font-light">
          Découvrez comment EasyReno peut vous aider à réaliser vos projets de rénovation facilement et efficacement.
        </Typography>
      </div>

      <footer className="w-full text-center py-6 mt-auto">
        <Typography variant="small" className="text-black font-bold text-lg">
          &copy; {new Date().getFullYear()} EasyReno. Tous droits réservés.
        </Typography>
        <Typography variant="small" className="text-black font-bold text-lg mt-1">
          Développé par LE NGUYEN TIEN.
        </Typography>
      </footer>
    </div>
  );
}

export default HomePage;