import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Card,
  CardBody,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function ProEndProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleChoice = (selectedChoice: 'yes' | 'no') => {
    setChoice(selectedChoice);
  };

  const handleValidate = () => {
    if (choice === 'yes') {
      setOpenConfirmDialog(true);
    } else if (choice === 'no') {
      navigate(`/business/construction/${projectId}`);
    } else {
      alert("Veuillez faire un choix avant de valider.");
    }
  };

  const handleConfirm = () => {
    console.log("Fin du chantier confirmée");
    setOpenConfirmDialog(false);
    navigate(`/business/construction/${projectId}/end-invoice`);
  };

  const handleCancel = () => {
    setOpenConfirmDialog(false);
    setChoice(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full shadow-lg">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-6 text-center font-bold">
              Confirmation de fin de chantier
            </Typography>
            
            <Typography color="gray" className="mb-6 text-center">
              Êtes-vous sûr de vouloir mettre fin au chantier ? Cette action modifiera le statut du projet.
            </Typography>
            
            <div className="flex justify-center space-x-4 mb-6">
              <Button
                color={choice === 'yes' ? "green" : "blue-gray"}
                onClick={() => handleChoice('yes')}
                className="flex-1 max-w-xs"
              >
                Oui, terminer le chantier
              </Button>
              <Button
                color={choice === 'no' ? "red" : "blue-gray"}
                onClick={() => handleChoice('no')}
                className="flex-1 max-w-xs"
              >
                Non, continuer le chantier
              </Button>
            </div>
            
            <div className="flex justify-center">
              <Button color="blue" onClick={handleValidate} className="w-full max-w-xs">
                Valider la décision
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <Dialog open={openConfirmDialog} handler={() => setOpenConfirmDialog(false)}>
        <DialogHeader className="flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-2" />
          Confirmation finale
        </DialogHeader>
        <DialogBody divider>
          Vous êtes sur le point de mettre fin au chantier. Cette action est irréversible et générera la facture finale. Êtes-vous certain de vouloir procéder ?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleConfirm}>
            <span>Confirmer et générer la facture</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ProEndProject;