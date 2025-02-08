import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Typography, Button, Progress } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BriefcaseIcon, ClockIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';

function ProConstructionView() {
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // ✅ Récupérer le token JWT

  useEffect(() => {
    const fetchConstructions = async () => {
      try {
        if (!token) {
          setError("Token manquant, veuillez vous reconnecter.");
          return;
        }

        const response = await axios.get("http://localhost:3000/business/chantiers", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Chantiers récupérés :", response.data);
        setOngoingProjects(response.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des chantiers :", err);
        setError("Impossible de charger les chantiers.");
      } finally {
        setLoading(false);
      }
    };

    fetchConstructions();
  }, [token]);

  if (loading) return <Typography variant="h5">Chargement...</Typography>;
  if (error) return <Typography variant="h5" color="red">{error}</Typography>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
          Mes chantiers en cours
        </Typography>
        {ongoingProjects.length === 0 ? (
          <Typography variant="h6" color="gray" className="text-center">
            Aucun chantier en cours.
          </Typography>
        ) : (
          ongoingProjects.map((project) => (
            <Card key={project.id} className="w-full mb-6 overflow-hidden">
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-2 flex items-center">
                      <BriefcaseIcon className="h-6 w-6 mr-2 text-blue-500" />
                      {project.title}
                    </Typography>
                    <Typography color="gray" className="mb-2 flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Du {project.startDate} au {project.estimatedEndDate}
                    </Typography>
                    <Typography color="gray" className="flex items-center">
                      <CurrencyEuroIcon className="h-5 w-5 mr-2 text-green-500" />
                      Budget: {project.budget} €
                    </Typography>
                  </div>
                  <Link to={`/business/construction/${project.id}`} className="mt-4 md:mt-0">
                    <Button color="blue" ripple="light" className="flex items-center">
                      Voir les détails
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="small" color="blue-gray">Progression</Typography>
                    <Typography variant="small" color="blue-gray">{project.progress}%</Typography>
                  </div>
                  <Progress value={project.progress} color="blue" className="h-2" />
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default ProConstructionView;
