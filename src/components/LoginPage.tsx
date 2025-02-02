import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Input, Button, Typography, Alert } from "@material-tailwind/react";
import axios from 'axios';  // 📌 Intégration API
import logoEasyReno from '../images/easyreno.jpg'; 

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, motDePasse: password });

      const { token, userType, companyId } = response.data;  // ✅ Récupération de companyId

      // 📌 Stocker les informations dans localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      if (companyId) {
        localStorage.setItem('companyId', companyId.toString()); // ✅ Stockage sécurisé
      }

      console.log("companyId stocké :", companyId); // ✅ Vérifier si bien stocké

      // ✅ Redirection selon le type d'utilisateur
      if (userType === 'company') {
        navigate('/business/pro-dashboard');
      } else if (userType === 'owner') {
        navigate('/owner/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur s'est produite.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6 md:p-10">
      <div className="text-center mb-8">
        <img src={logoEasyReno} alt="Logo EasyReno" className="w-32 h-32 object-contain mx-auto mb-6 rounded-full shadow-md" />
        <Typography variant="h3" color="blue-gray" className="mb-2">Bienvenue sur</Typography>
        <Typography variant="h1" color="orange" className="font-bold text-4xl md:text-5xl">EasyReno</Typography>
      </div>

      <Card color="transparent" shadow={false} className="p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-screen-sm">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold">Connexion</Typography>
        {error && <Alert color="red" className="mb-4">{error}</Alert>}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-6">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white bg-opacity-70 text-lg"
          />
          <Input
            type="password"
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white bg-opacity-70 text-lg"
          />
          <Button 
            color="orange" 
            fullWidth 
            type="submit"
            className="py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Se connecter
          </Button>
        </form>
        <div className="mt-6 flex flex-col gap-4">
          <Link to="/forgot-password">
            <Typography color="blue" className="text-center cursor-pointer hover:underline">
              Mot de passe oublié ?
            </Typography>
          </Link>
          <Link to="/">
            <Button 
              variant="outlined" 
              color="blue-gray" 
              fullWidth
              className="py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </Card>

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

export default LoginPage;
