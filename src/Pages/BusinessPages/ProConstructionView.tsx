import React from 'react';
import { Card, CardBody, Typography, Button, Progress } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { BriefcaseIcon, ClockIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';

function ProConstructionView() {
  const ongoingProjects = [
    { 
      id: 1, 
      title: "Rénovation cuisine M. Dupont",
      progress: 60,
      startDate: "15/05/2024",
      estimatedEndDate: "30/07/2024",
      budget: "15 000 €"
    },
    { 
      id: 2, 
      title: "Installation électrique Mme Martin",
      progress: 30,
      startDate: "01/06/2024",
      estimatedEndDate: "15/08/2024",
      budget: "8 500 €"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-orange-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
          Mes chantiers en cours
        </Typography>
        {ongoingProjects.map((project) => (
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
                    Budget: {project.budget}
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
        ))}
      </div>
    </div>
  );
}

export default ProConstructionView;