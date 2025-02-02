import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import axios from 'axios';

interface CompanyFormData {
  nomEntreprise: string;
  siret: string;
  adresse: string;
  complementAdresse: string;
  ville: string;
  codePostal: string;
  email: string;
  motDePasse: string;
  confirmationMotDePasse: string;
  corpsEtat: string[];
  autreCorpsEtat: string;
  accepterConditions: boolean;
}

const initialState: CompanyFormData = {
  nomEntreprise: '',
  siret: '',
  adresse: '',
  complementAdresse: '',
  ville: '',
  codePostal: '',
  email: '',
  motDePasse: '',
  confirmationMotDePasse: '',
  corpsEtat: [],
  autreCorpsEtat: '',
  accepterConditions: false
};

const corpsEtats = ['Plomberie', 'Électricité', 'Maçonnerie', 'Peinture', 'Menuiserie',
  'Carrelage', 'Charpente', 'Couverture', 'Isolation', 'Chauffage'];

function CompanyRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CompanyFormData>(initialState);
  const [siretError, setSiretError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const siretRegex = /^\d{14}$/;
    setSiretError(formData.siret && !siretRegex.test(formData.siret) ? 'Le SIRET doit contenir exactement 14 chiffres' : '');

    setPasswordError(
      formData.motDePasse && formData.confirmationMotDePasse &&
        formData.motDePasse !== formData.confirmationMotDePasse ?
        'Les mots de passe ne correspondent pas' : ''
    );
  }, [formData]);

  const handleChange = (name: keyof CompanyFormData, value: string | boolean | string[]) => {
    if (name === "siret") {
      value = (value as string).replace(/\D/g, '').slice(0, 14);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === "email") {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (siretError || passwordError) return;
  
    try {
      const response = await axios.post("http://localhost:3000/register/company", formData);
      
      console.log("📢 Réponse API:", response); // 🔍 Ajoute un log pour voir la réponse complète
      console.log("📢 Data:", response.data); // 🔍 Vérifie ce qui est retourné
  
      if (response.data && response.data.message) {
        console.log(response.data.message); // ✅ Affiche le message seulement s'il existe
        navigate('/confirmation', { state: { email: formData.email } });
      } else {
        console.log("Réponse inattendue du serveur.");
      }
  
    } catch (error) {
      console.error("❌ Erreur API:", error.response?.data || error);
      console.log("Erreur : " + (error.response?.data?.message || "Erreur inconnue"));
    }
  };
  

  const handleSelectAllCorpsEtat = () => {
    setFormData(prev => ({ ...prev, corpsEtat: [...corpsEtats] }));
  };

  const handleDeselectAllCorpsEtat = () => {
    setFormData(prev => ({ ...prev, corpsEtat: [] }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card color="transparent" shadow={false} className="p-8 bg-white rounded-xl shadow-lg w-full max-w-screen-md">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">Inscription Entreprise</Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          {(Object.keys(initialState) as Array<keyof CompanyFormData>).map((key) => {
            if (!['corpsEtat', 'accepterConditions', 'autreCorpsEtat'].includes(key)) {
              return (
                <div key={key} className="mb-4">
                  <Input
                    type={key === 'motDePasse' || key === 'confirmationMotDePasse' ? 'password' : key === 'email' ? 'email' : 'text'}
                    size="lg"
                    label={key}
                    required={key !== 'complementAdresse'}
                    onChange={(e) => handleChange(key, e.target.value)}
                    value={formData[key] as string}
                    error={(key === 'motDePasse' || key === 'confirmationMotDePasse') ? !!passwordError : key === 'email' ? !!emailError : key === 'siret' ? !!siretError : false}
                    maxLength={key === 'siret' ? 14 : undefined}
                  />
                  {key === 'confirmationMotDePasse' && passwordError && <Typography color="red" className="mt-1 text-xs">{passwordError}</Typography>}
                  {key === 'email' && emailError && <Typography color="red" className="mt-1 text-xs">{emailError}</Typography>}
                  {key === 'siret' && siretError && <Typography color="red" className="mt-1 text-xs">{siretError}</Typography>}
                </div>
              );
            }
            return null;
          })}
          <div className="flex justify-between items-center mb-3">
            <Typography variant="h6" color="blue-gray">Corps d'état :</Typography>
            <div className="flex gap-2">
              <Button size="sm" color="blue" variant="outlined" onClick={handleSelectAllCorpsEtat}>
                Tout sélectionner
              </Button>
              <Button size="sm" color="red" variant="outlined" onClick={handleDeselectAllCorpsEtat}>
                Tout désélectionner
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {corpsEtats.map(corps => (
              <Checkbox
                key={corps}
                label={corps}
                onChange={(e) => handleChange('corpsEtat', e.target.checked ? [...formData.corpsEtat, corps] : formData.corpsEtat.filter(c => c !== corps))}
                checked={formData.corpsEtat.includes(corps)}
              />
            ))}
          </div>
          <Input
            type="text"
            size="lg"
            label="Autre corps d'état"
            onChange={(e) => handleChange('autreCorpsEtat', e.target.value)}
            value={formData.autreCorpsEtat}
            className="mb-4"
          />
          <Checkbox
            label="J'accepte les conditions d'utilisation"
            required
            onChange={(e) => handleChange('accepterConditions', e.target.checked)}
            checked={formData.accepterConditions}
          />
          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit" fullWidth disabled={!!passwordError || !!siretError}>
              Valider
            </Button>
            <Button variant="outlined" color="blue-gray" fullWidth onClick={() => navigate('/')}>
              Précédent
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CompanyRegistration;
