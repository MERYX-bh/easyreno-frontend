import { useState } from 'react';
import { Card, CardBody, Typography, Button, Checkbox } from "@material-tailwind/react";
import { Link, useParams, useNavigate } from 'react-router-dom';

function ProConstructionInfos() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [steps, setSteps] = useState([
    { 
      id: 1, 
      name: "Démontage de l'ancienne cuisine", 
      completed: true,
      details: [
        "Retirer tous les meubles existants",
        "Déconnecter et enlever les appareils électroménagers",
        "Protéger le sol et les zones adjacentes",
        "Enlever les éléments fixés aux murs"
      ]
    },
    { 
      id: 2, 
      name: "Travaux de plomberie", 
      completed: true,
      details: [
        "Installer de nouvelles conduites d'eau",
        "Mettre en place le système d'évacuation",
        "Préparer les raccordements pour le nouvel évier et le lave-vaisselle",
        "Vérifier l'étanchéité de toutes les connexions"
      ]
    },
    { 
      id: 3, 
      name: "Travaux d'électricité", 
      completed: true,
      details: [
        "Installer de nouveaux circuits électriques",
        "Mettre en place les prises et interrupteurs",
        "Préparer les connexions pour l'éclairage",
        "Vérifier la conformité aux normes électriques"
      ]
    },
    { 
      id: 4, 
      name: "Installation des nouveaux meubles", 
      completed: true,
      details: [
        "Assembler les caissons de base",
        "Fixer les meubles au mur",
        "Installer les tiroirs et les portes",
        "Ajuster l'alignement de tous les éléments"
      ]
    },
    { 
      id: 5, 
      name: "Pose du plan de travail", 
      completed: false,
      details: [
        "Mesurer et découper le plan de travail",
        "Installer le plan de travail sur les meubles de base",
        "Sceller les joints et les bords",
        "Installer l'évier et la plaque de cuisson"
      ]
    },
    { 
      id: 6, 
      name: "Installation des électroménagers", 
      completed: false,
      details: [
        "Mettre en place le réfrigérateur",
        "Installer le four et le micro-ondes",
        "Connecter et tester le lave-vaisselle",
        "Vérifier le bon fonctionnement de tous les appareils"
      ]
    },
    { 
      id: 7, 
      name: "Finitions et nettoyage", 
      completed: false,
      details: [
        "Poser les plinthes et les caches",
        "Installer les poignées et les boutons",
        "Effectuer les retouches de peinture nécessaires",
        "Nettoyer en profondeur toute la cuisine"
      ]
    },
  ]);

  const completedSteps = steps.filter(step => step.completed).length;

  const handleStepClick = (step: typeof steps[0]) => {
    navigate(`/business/pro-infos/${id}/${step.id}`, { state: { stepDetails: step } });
  };

  const toggleStepCompletion = (stepId: number) => {
    setSteps(prevSteps => prevSteps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
      <div className="container mx-auto">
        <Typography variant="h2" color="blue-gray" className="mb-6">
          Rénovation cuisine
        </Typography>
        
        <div className="flex space-x-4 mb-6">
          <Link to={`/business/exchange/${id}`}>
            <Button color="blue" ripple="light">
              Contacter le client
            </Button>
          </Link>
          <Button color="green" ripple="light">
            Devis
          </Button>
        </div>

        <Card className="w-full max-w-[48rem] mx-auto mb-6">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Résumé du chantier
            </Typography>
            <Typography color="gray" className="mb-1">
              <strong>Titre :</strong> Rénovation cuisine
            </Typography>
            <Typography color="gray" className="mb-1">
              <strong>Localisation :</strong> Paris, Île-de-France
            </Typography>
            <Typography color="gray" className="mb-1">
              <strong>Zone de chantier :</strong> Cuisine
            </Typography>
            <Typography color="gray" className="mb-1">
              <strong>Budget max :</strong> 8000€
            </Typography>
            <Typography color="gray" className="mb-1">
              <strong>Description :</strong> Je souhaiterais refaire à neuf ma cuisine. Je souhaiterais pouvoir la rénover en cuisine moderne, à l'américaine, donc avoir une ouverture sur le salon.
            </Typography>
          </CardBody>
        </Card>

        <div className="mb-6">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Avancement du chantier
          </Typography>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progression
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round((completedSteps / steps.length) * 100)}%
                </span>
              </div>
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
                  <div className={`rounded-full h-3 w-3 ${step.completed ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
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
                    checked={step.completed}
                    onChange={() => toggleStepCompletion(step.id)}
                    className="mr-2"
                  />
                  <span 
                    className={`${step.completed ? "text-blue-500" : "text-gray-500"} cursor-pointer hover:underline`}
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
          <Button 
            color="red" 
            ripple="light" 
            onClick={() => navigate(`/business/construction/end-project`)}
          >
            Mettre fin au chantier
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProConstructionInfos;