import { Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

function OwnerAds() {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8">
            <Typography variant="h2" className="mb-6">Mes annonces en ligne</Typography>
            
            <div className="mb-8">
                <Button color="blue" onClick={() => navigate('/owner/create-ad')}>
                    Créer une annonce
                </Button>
            </div>

            <Typography className="text-gray-600 italic mb-8">
                Vous n'avez pas d'annonce en ligne.
            </Typography>

            <Button color="gray" onClick={() => navigate('/owner/dashboard')}>
                Retour au tableau de bord
            </Button>
        </div>
    );
}

export default OwnerAds;