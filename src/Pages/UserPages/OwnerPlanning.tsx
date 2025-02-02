import React, { useState } from 'react';

type Task = {
  id: number;
  title: string;
  start: number; 
  duration: number; 
  color: string;
};

const OwnerPlanning: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(0);


  const tasks: Task[] = [
    { id: 1, title: 'Démolition', start: 1, duration: 2, color: 'bg-red-200' },
    { id: 2, title: 'Plomberie', start: 3, duration: 4, color: 'bg-blue-200' },
    { id: 3, title: 'Électricité', start: 4, duration: 4, color: 'bg-yellow-200' },
    { id: 4, title: 'Maçonnerie', start: 5, duration: 2, color: 'bg-gray-200' },
    { id: 5, title: 'Menuiserie', start: 6, duration: 4, color: 'bg-green-200' },
    { id: 6, title: 'Carrelage', start: 8, duration: 4, color: 'bg-purple-200' },
    { id: 7, title: 'Peinture', start: 10, duration: 4, color: 'bg-pink-200' },
    { id: 8, title: 'Pose meubles', start: 11, duration: 2, color: 'bg-indigo-200' },
    { id: 9, title: 'Électroménager', start: 12, duration: 1, color: 'bg-blue-300' },
    { id: 10, title: 'Finitions', start: 12, duration: 1, color: 'bg-green-300' },
  ];

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const months = ['Mois 1', 'Mois 2', 'Mois 3'];

  const handlePrevMonth = () => setCurrentMonth(prev => Math.max(0, prev - 1));
  const handleNextMonth = () => setCurrentMonth(prev => Math.min(2, prev + 1));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Planning de rénovation de cuisine</h1>
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevMonth} disabled={currentMonth === 0} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">Mois précédent</button>
        <span className="text-xl font-bold">{months[currentMonth]}</span>
        <button onClick={handleNextMonth} disabled={currentMonth === 2} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">Mois suivant</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-40 p-2 border">Tâche</th>
              {weeks.slice(currentMonth * 4, (currentMonth + 1) * 4).map(week => (
                <th key={week} className="w-24 p-2 border">Semaine {week}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td className="p-2 border">{task.title}</td>
                {weeks.slice(currentMonth * 4, (currentMonth + 1) * 4).map(week => (
                  <td key={week} className="p-2 border relative">
                    {week >= task.start && week < task.start + task.duration && (
                      <div 
                        className={`${task.color} h-full w-full rounded flex items-center justify-center`}
                        style={{ height:'100%' }}
                      >
                        {task.title}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Zones de chantier */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Zones de chantier :</h2>
        <ol className="list-decimal list-inside">
          <li>Zone de démolition</li>
          <li>Zone de travaux (plomberie, électricité, maçonnerie)</li>
          <li>Zone de finition (carrelage, peinture)</li>
          <li>Zone d'installation (meubles, électroménager)</li>
        </ol>
      </div>

    </div>
  );
};

export default OwnerPlanning;