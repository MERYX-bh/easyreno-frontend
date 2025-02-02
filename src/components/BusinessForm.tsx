import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";

const initialState = {
  nomEntreprise: '', SIRET: '', adresse: '', complementAdresse: '', ville: '',
  codePostal: '', email: '', motDePasse: '', confirmationMotDePasse: '',
  corpsEtat: [], autreCorpsEtat: '', acceptConditions: false
};

const corpsEtats = ['Plomberie', 'Électricité', 'Maçonnerie', 'Peinture', 'Menuiserie',
  'Carrelage', 'Charpente', 'Couverture', 'Isolation', 'Chauffage'];

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [siretError, setSiretError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const siretRegex = /^\d{14}$/;
    setSiretError(formData.SIRET && !siretRegex.test(formData.SIRET) ? 'Le SIRET doit contenir exactement 14 chiffres' : '');

    setPasswordError(
      formData.motDePasse && formData.confirmationMotDePasse &&
        formData.motDePasse !== formData.confirmationMotDePasse ?
        'Les mots de passe ne correspondent pas' : ''
    );
  }, [formData.SIRET, formData.motDePasse, formData.confirmationMotDePasse]);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'corpsEtat'
        ? (value.checked ? [...prev.corpsEtat, value.corps] : prev.corpsEtat.filter(item => item !== value.corps))
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!siretError && !passwordError) {
      // Sauvegarder l'email et le mot de passe dans le localStorage
      localStorage.setItem('companyEmail', formData.email);
      localStorage.setItem('companyPassword', formData.motDePasse);

      // Vous pouvez également sauvegarder d'autres informations si nécessaire
      localStorage.setItem('companyData', JSON.stringify({
        nomEntreprise: formData.nomEntreprise,
        SIRET: formData.SIRET,
        email: formData.email,
        corpsEtat: formData.corpsEtat
      }));

      navigate('/confirmation', { state: { email: formData.email } });
    }
  };

  const handlePrevious = () => {
    navigate('/'); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card color="transparent" shadow={false} className="p-8 bg-white rounded-xl shadow-lg w-full max-w-screen-md">
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">Inscription Entreprise</Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          {Object.keys(initialState).map(key =>
            !['corpsEtat', 'acceptConditions', 'autreCorpsEtat'].includes(key) && (
              <div key={key} className="mb-4">
                <Input
                  type={key === 'motDePasse' || key === 'confirmationMotDePasse' ? 'password' : key === 'email' ? 'email' : 'text'}
                  size="lg"
                  label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  required={key !== 'complementAdresse'}
                  onChange={(e) => handleChange(key, e.target.value)}
                  value={formData[key] || ''}
                  error={key === 'SIRET' ? !!siretError : (key === 'motDePasse' || key === 'confirmationMotDePasse') ? !!passwordError : false}
                />
                {key === 'SIRET' && siretError && <Typography color="red" className="mt-1 text-xs">{siretError}</Typography>}
                {key === 'confirmationMotDePasse' && passwordError && <Typography color="red" className="mt-1 text-xs">{passwordError}</Typography>}
              </div>
            )
          )}
          <Typography variant="h6" color="blue-gray" className="mb-3">Corps d'état :</Typography>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {corpsEtats.map(corps => (
              <Checkbox
                key={corps}
                label={corps}
                onChange={(e) => handleChange('corpsEtat', { corps, checked: e.target.checked })}
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
            onChange={(e) => handleChange('acceptConditions', e.target.checked)}
            checked={formData.acceptConditions}
          />
          <div className="mt-6 flex flex-col gap-4">
            <Button type="submit" fullWidth>
              Valider
            </Button>
            <Button 
              variant="outlined" 
              color="blue-gray" 
              fullWidth 
              onClick={handlePrevious}
            >
              Précédent
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CompanyRegistration;