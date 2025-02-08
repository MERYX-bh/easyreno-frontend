import { useState, useEffect } from 'react';
import axios from 'axios';
import {   Card, 
  CardBody, 
  Typography, 
  Button, 
  Checkbox, 
  Dialog, 
  DialogHeader, 
  DialogBody, 
  DialogFooter } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProConstructionInfos() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false); 

  // ✅ Récupérer le token JWT depuis le stockage local
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          setError("Token d'authentification manquant");
          return;
        }
  
        const response = await axios.get(`http://localhost:3000/business/chantier/${id}/steps`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // ✅ Transformation correcte des étapes en s'assurant que companyValidated est un booléen
        const formattedSteps = response.data.map(step => ({
          ...step,
          companyValidated: !!step.companyValidated, // ✅ Convertit en boolean
          completed: !!step.companyValidated, // ✅ Assure la cohérence
          details: typeof step.details === "string" ? JSON.parse(step.details) : step.details,
        }));
  
        console.log("✅ Étapes récupérées :", formattedSteps); // Debug
        setSteps(formattedSteps);
      } catch (err) {
        console.error("Erreur lors du chargement des étapes:", err);
        setError("Erreur lors du chargement des étapes.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchSteps();
  }, [id]);  
  
  const completedSteps = steps.filter(step => step.companyValidated).length;

  const toggleStepCompletion = async (stepId: number, isChecked: boolean) => {
    try {
      const url = isChecked
        ? `http://localhost:3000/business/chantier/validate-step/${stepId}`
        : `http://localhost:3000/business/chantier/invalidate-step/${stepId}`;
  
      const response = await axios.patch(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log(`✅ Étape ${isChecked ? "validée" : "invalidée"} :`, response.data);
  
      // ✅ Mise à jour réactive du state
      setSteps(prevSteps =>
        prevSteps.map(step =>
          step.id === stepId
            ? { ...step, companyValidated: isChecked, completed: isChecked }
            : step
        )
      );
    } catch (error) {
      console.error("Erreur lors de la validation/invalidation de l'étape", error);
    }
  };
  
  const handleStepClick = (step: typeof steps[0]) => {
    navigate(`/business/pro-infos/${id}/${step.id}`, { state: { stepDetails: step } });
  };

  const handleDeleteChantier = async () => {
    try {
      await axios.delete(`http://localhost:3000/business/chantier/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("🏗️ Chantier supprimé avec succès !");
      navigate("/business/pro-construction-view"); // Redirection après suppression
    } catch (error) {
      console.error("❌ Erreur lors de la suppression du chantier :", error);
    }
    setOpenDialog(false);
  };
  const handleDialogToggle = () => setOpenDialog(!openDialog);

  if (loading) return <Typography variant="h5">Chargement...</Typography>;
  if (error) return <Typography variant="h5" color="red">{error}</Typography>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
      <div className="container mx-auto">
        <Typography variant="h2" color="blue-gray" className="mb-6">
          Rénovation cuisine
        </Typography>

        <div className="flex space-x-4 mb-6">
          <Link to={`/business/exchange/${id}`}>
            <Button color="blue" ripple="light">Contacter le client</Button>
          </Link>
          <Button color="green" ripple="light">Devis</Button>
        </div>

        <Card className="w-full max-w-[48rem] mx-auto mb-6">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Résumé du chantier
            </Typography>
            <Typography color="gray" className="mb-1"><strong>Titre :</strong> Rénovation cuisine</Typography>
            <Typography color="gray" className="mb-1"><strong>Localisation :</strong> Paris, Île-de-France</Typography>
            <Typography color="gray" className="mb-1"><strong>Zone de chantier :</strong> Cuisine</Typography>
            <Typography color="gray" className="mb-1"><strong>Budget max :</strong> 8000€</Typography>
            <Typography color="gray" className="mb-1">
              <strong>Description :</strong> Je souhaiterais refaire à neuf ma cuisine et l'ouvrir sur le salon.
            </Typography>
          </CardBody>
        </Card>

        <div className="mb-6">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Avancement du chantier
          </Typography>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                Progression
              </span>
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round((completedSteps / steps.length) * 100)}%
              </span>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div 
                style={{ width: `${(completedSteps / steps.length) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`rounded-full h-3 w-3 ${step.companyValidated ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
                  <span className="text-xs mt-1">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex mb-6">
          <div className="w-1 bg-blue-500 mr-4"></div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Détail de l'avancement
            </Typography>
            <ul className="list-none">
  {steps.map((step) => (
    <li key={step.id} className="flex items-center mb-2">
      <Checkbox
        color="blue"
        checked={step.companyValidated === true} // ✅ Vérification correcte
        onChange={(e) => toggleStepCompletion(step.id, e.target.checked)}
        className="mr-2"
      />
      <span 
        className={`${step.companyValidated === 1 ? "text-blue-500" : "text-gray-500"} cursor-pointer hover:underline`}
        onClick={() => handleStepClick(step)}
      >
        {step.name}
      </span>
    </li>
  ))}
</ul>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button color="blue" ripple="light" onClick={() => navigate(`/business/construction/${id}/add-step`)}>
            Ajouter une étape
          </Button>
          <Button color="red" ripple="light" onClick={handleDialogToggle}>
            Mettre fin au chantier
          </Button>
        </div>

          {/* ✅ Popup de confirmation */}
          <Dialog open={openDialog} handler={handleDialogToggle}>
          <DialogHeader>Confirmer la suppression</DialogHeader>
          <DialogBody>Êtes-vous sûr de vouloir mettre fin à ce chantier ? Cette action est irréversible.</DialogBody>
          <DialogFooter>
            <Button color="gray" onClick={handleDialogToggle}>Annuler</Button>
            <Button color="red" onClick={handleDeleteChantier}>Confirmer</Button>
          </DialogFooter>
        </Dialog>

      </div>
    </div>
  );
}

export default ProConstructionInfos;
