import React from 'react';
import { Card, CardBody, Typography } from "@material-tailwind/react";

interface ActivityItem {
    id: number;
    action: string;
    date: string;
    projectTitle: string;
}

const ProHistory: React.FC = () => {
    const activities: ActivityItem[] = [
        { id: 1, action: "Vous avez accepté le devis", date: "15/08/2024", projectTitle: "Rénovation cuisine" },
        { id: 2, action: "Vous avez refusé le devis", date: "22/07/2024", projectTitle: "Installation domotique" },
        { id: 3, action: "Vous avez envoyé un devis", date: "10/06/2024", projectTitle: "Réfection toiture" },
        { id: 4, action: "Vous avez modifié le devis", date: "05/05/2024", projectTitle: "Aménagement combles" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-6 text-center font-bold">
                    Historique des Activités
                </Typography>
                <Card className="mb-6 shadow-lg">
                    <CardBody>
                        {activities.map((activity, index) => (
                            <React.Fragment key={activity.id}>
                                <div className="flex items-start mb-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                                        {activity.id}
                                    </div>
                                    <div className="flex-grow">
                                        <Typography variant="h6" color="blue-gray" className="mb-1">
                                            {activity.action}
                                        </Typography>
                                        <Typography color="gray" className="mb-1">
                                            Projet : {activity.projectTitle}
                                        </Typography>
                                        <Typography color="gray" className="text-sm">
                                            Date : {activity.date}
                                        </Typography>
                                    </div>
                                </div>
                                {index < activities.length - 1 && <hr className="my-4" />}
                            </React.Fragment>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ProHistory;