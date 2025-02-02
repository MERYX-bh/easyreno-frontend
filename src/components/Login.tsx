import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Button, Typography } from '@material-tailwind/react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simuler une requête d'authentification
    try {
      // Remplacez cette logique par votre appel API
      if (email === 'user@example.com' && password === 'Password123!') {
        // Authentification réussie
        localStorage.setItem('userEmail', email); // Exemple de stockage d'email
        navigate('/accueil'); // Rediriger vers la page d'accueil
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message); // Utilisez err.message si err est une instance d'Error
      } else {
        setError('Une erreur est survenue'); // Message générique pour d'autres types d'erreurs
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6 md:p-10">
      <Card color="transparent" shadow={false} className="p-8 bg-white bg-opacity-80 rounded-xl shadow-lg w-full max-w-screen-md">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold">
          Connexion
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-6">
          <div>
            <Input
              type="email"
              label="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              data-testid="input-email"
            />
          </div>
          <div>
            <Input
              type="password"
              label="Mot De Passe"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              data-testid="input-password"
            />
          </div>
          {error && (
            <Typography color="red" className="mt-1 text-xs">
              {error}
            </Typography>
          )}
          <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading ? 'Chargement...' : 'Se Connecter'}
            </Button>
            <Button 
              variant="outlined" 
              color="blue-gray" 
              fullWidth 
              onClick={() => navigate('/inscription')}
              data-testid="button-register"
            >
              Créer un compte
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
