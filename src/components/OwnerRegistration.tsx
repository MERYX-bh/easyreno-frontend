import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Checkbox, Button, Typography, Alert } from "@material-tailwind/react";
import axios from 'axios';

interface OwnerFormData {
  nom: string;
  prenom: string;
  adresse: string;
  complementAdresse: string;
  ville: string;
  codePostal: string;
  email: string;
  motDePasse: string;
  confirmationMotDePasse: string;
  accepterConditions: boolean;
}

const initialState: OwnerFormData = {
  nom: '',
  prenom: '',
  adresse: '',
  complementAdresse: '',
  ville: '',
  codePostal: '',
  email: '',
  motDePasse: '',
  confirmationMotDePasse: '',
  accepterConditions: false
};

function OwnerRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<OwnerFormData>(initialState);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  // Vérification des mots de passe
  useEffect(() => {
    if (formData.motDePasse && formData.confirmationMotDePasse) {
      setPasswordError(
        formData.motDePasse !== formData.confirmationMotDePasse
          ? 'Les mots de passe ne correspondent pas'
          : ''
      );
    }
  }, [formData.motDePasse, formData.confirmationMotDePasse]);

  const handleChange = (name: keyof OwnerFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordError) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await axios.post('http://localhost:3000/register/owner', formData);

      alert(response.data.message);
      navigate('/confirmation', { state: { email: formData.email } });
    } catch (error) {
      console.error("❌ Erreur API:", error.response?.data || error);
      setServerError(error.response?.data?.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 p-6 md:p-10">
      <Card color="transparent" shadow={false} className="p-8 bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-screen-md">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center font-bold">
          Inscription Propriétaire
        </Typography>
        {serverError && <Alert color="red" className="mb-4">{serverError}</Alert>}
        <form onSubmit={handleSubmit} className="mt-8 mb-2 space-y-6">
          {(Object.keys(initialState) as Array<keyof OwnerFormData>).map((key) => {
            if (key !== 'accepterConditions') {
              return (
                <div key={key}>
                  <Input
                    type={key.includes('motDePasse') ? 'password' : key === 'email' ? 'email' : 'text'}
                    size="lg"
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    required={key !== 'complementAdresse'}
                    onChange={(e) => handleChange(key, e.target.value)}
                    value={formData[key] as string}
                    error={(key.includes('motDePasse') ? !!passwordError : key === 'email' ? !!emailError : false)}
                    className="bg-white bg-opacity-70"
                  />
                  {key === 'confirmationMotDePasse' && passwordError && (
                    <Typography color="red" className="mt-1 text-xs">{passwordError}</Typography>
                  )}
                  {key === 'email' && emailError && (
                    <Typography color="red" className="mt-1 text-xs">{emailError}</Typography>
                  )}
                </div>
              );
            }
            return null;
          })}
          <Checkbox
            label="J'accepte les conditions d'utilisation"
            required
            onChange={(e) => handleChange('accepterConditions', e.target.checked)}
            checked={formData.accepterConditions}
            color="orange"
          />
          <div className="flex flex-col gap-4">
            <Button 
              type="submit" 
              fullWidth 
              disabled={!!passwordError || !!emailError || !formData.accepterConditions || loading}
              className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 py-3 text-lg font-semibold"
            >
              {loading ? "Inscription en cours..." : "Valider"}
            </Button>
            <Button 
              variant="outlined" 
              color="blue-gray" 
              fullWidth 
              onClick={() => navigate('/')}
              className="hover:bg-blue-gray-50 transition-all duration-300 py-3 text-lg font-semibold"
            >
              Précédent
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default OwnerRegistration;
