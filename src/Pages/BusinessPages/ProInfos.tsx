import { useState, useMemo } from 'react';
import { Card, CardBody, Typography, Button, Chip } from "@material-tailwind/react";

interface Task {
    id: number;
    description: string;
    completed: boolean;
    date: Date;
    delayed?: boolean;
}

interface Project {
    id: number;
    clientName: string;
    projectTitle: string;
    startDate: Date;
    endDate: Date;
    status: 'En cours' | 'À venir' | 'Terminé';
    tasks: Task[];
    foreman: string;
    employees: string[];
}

const statusColors = { 'En cours': 'blue', 'À venir': 'yellow', 'Terminé': 'green' } as const;
const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

function ProPlanning() {
    const generateRandomWorkdays = (start: Date, end: Date): Date[] => {
        const workdays = [];
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            if (d.getDay() !== 0 && d.getDay() !== 6 && Math.random() > 0.3) {
                workdays.push(new Date(d));
            }
        }
        return workdays;
    };

    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1,
            clientName: "M. Dupont",
            projectTitle: "Rénovation cuisine",
            startDate: new Date(2024, 8, 1),
            endDate: new Date(2024, 8, 22),
            status: 'En cours',
            tasks: generateRandomWorkdays(new Date(2024, 8, 1), new Date(2024, 8, 22)).map((date, index) => ({
                id: index + 1,
                description: `Tâche ${index + 1}`,
                completed: false,
                date
            })),
            foreman: "Le Nguyen Tien",
            employees: ["Sung Jin-Woo", "Mitsuko Lee"]
        },
        {
            id: 2,
            clientName: "Mme Potter",
            projectTitle: "Rénovation salle de bain",
            startDate: new Date(2024, 8, 15),
            endDate: new Date(2024, 9, 5),
            status: 'À venir',
            tasks: generateRandomWorkdays(new Date(2024, 8, 15), new Date(2024, 9, 5)).map((date, index) => ({
                id: index + 1,
                description: `Tâche ${index + 1}`,
                completed: false,
                date
            })),
            foreman: "Celine Blanc",
            employees: ["Jean Bernard, Paul Pinpin"]
        },
        {
            id: 3,
            clientName: "M. Bernard",
            projectTitle: "Extension maison",
            startDate: new Date(2024, 9, 1),
            endDate: new Date(2024, 10, 15),
            status: 'À venir',
            tasks: generateRandomWorkdays(new Date(2024, 9, 1), new Date(2024, 10, 15)).map((date, index) => ({
                id: index + 1,
                description: `Tâche ${index + 1}`,
                completed: false,
                date
            })),
            foreman: "Alexandre Petit",
            employees: ["Julie Rousseau", "Thomas Leroy"]
        }
    ]);

    const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleCompleteTask = (projectId: number, taskId: number) => {
        setProjects(prevProjects => prevProjects.map(project =>
            project.id === projectId ? {
                ...project,
                tasks: project.tasks.map(task =>
                    task.id === taskId ? { ...task, completed: true } : task
                )
            } : project
        ));
    };

    const handleDelayTask = (projectId: number, taskId: number) => {
        setProjects(prevProjects => prevProjects.map(project =>
            project.id === projectId ? {
                ...project,
                tasks: project.tasks.map(task =>
                    task.id === taskId ? {
                        ...task,
                        delayed: true,
                        date: new Date(task.date.getTime() + 24 * 60 * 60 * 1000) // Ajoute un jour
                    } : task
                )
            } : project
        ));
    };

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        return Array.from({ length: 42 }, (_, i) => {
            const day = i - firstDayOfMonth + 1;
            return day > 0 && day <= daysInMonth ? new Date(year, month, day) : null;
        });
    }, [currentDate]);

    const getTasksForDate = (date: Date) => projects.flatMap(project =>
        project.tasks.filter(task => task.date.toDateString() === date.toDateString())
    );

    const renderCalendar = () => calendarDays.map((date, index) => {
        if (!date) return <div key={index} className="p-2"></div>;
        const tasks = getTasksForDate(date);
        const isSelected = selectedDate?.toDateString() === date.toDateString();
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const projectsForDate = projects.filter(project =>
            project.tasks.some(task => task.date.toDateString() === date.toDateString())
        );
        const hasDupontProject = projectsForDate.some(project => project.clientName === "M. Dupont");

        return (
            <div
                key={index}
                className={`p-2 border ${isSelected ? 'bg-blue-100' : ''} ${isWeekend ? 'bg-gray-200' : 'cursor-pointer'}`}
                onClick={() => !isWeekend && setSelectedDate(date)}
            >
                <Typography>{date.getDate()}</Typography>
                {projectsForDate.map((project, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full mx-auto mt-1 ${project.clientName === "M. Dupont" ? 'bg-orange-500' : 'bg-blue-500'}`}
                    ></div>
                ))}
            </div>
        );
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <Typography variant="h2" color="blue-gray" className="mb-4">Planning des Projets</Typography>
                <Card className="mb-4">
                    <CardBody>
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <Button color="blue" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>Précédent</Button>
                                <Typography variant="h6">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</Typography>
                                <Button color="blue" size="sm" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>Suivant</Button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {DAYS.map(day => (
                                    <div key={day} className="p-2 text-center font-bold">
                                        <Typography>{day}</Typography>
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {renderCalendar()}
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="mt-4">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    Tâches pour le {selectedDate.toLocaleDateString()}:
                                </Typography>
                                {projects.map(project => {
                                    const tasksForDate = project.tasks.filter(task => task.date.toDateString() === selectedDate.toDateString());
                                    if (tasksForDate.length === 0) return null;
                                    return (
                                        <div key={project.id} className="mb-4">
                                            <Typography color="blue-gray" className="font-bold">{project.projectTitle}</Typography>
                                            <Typography color="gray">Client : {project.clientName}</Typography>
                                            <Typography color="gray">Chef de chantier : {project.foreman}</Typography>
                                            <Typography color="gray">Employés : {project.employees.join(', ')}</Typography>
                                            {tasksForDate.map(task => (
                                                <div key={task.id} className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded">
                                                    <Typography color={task.completed ? "green" : task.delayed ? "orange" : "gray"}>
                                                        {task.description} {task.delayed && "(Retardée)"}
                                                    </Typography>
                                                    {!task.completed && (
                                                        <div>
                                                            <Button color="green" size="sm" onClick={() => handleCompleteTask(project.id, task.id)} className="mr-2">
                                                                Valider
                                                            </Button>
                                                            <Button color="orange" size="sm" onClick={() => handleDelayTask(project.id, task.id)}>
                                                                Retarder
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ProPlanning;