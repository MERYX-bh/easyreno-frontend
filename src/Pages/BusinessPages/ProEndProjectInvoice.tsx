import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Typography,
  Input,
  Textarea,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";

function ProEndProjectInvoice() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ title, amount, description, file });
    navigate(`/business/construction/${projectId}`);
  };

  const handleCancel = () => {
    navigate(`/business/construction/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full shadow-lg">
          <CardBody>
            <Typography variant="h4" color="blue-gray" className="mb-6 text-center font-bold">
              Finalisation du chantier - Facture client
            </Typography>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Input
                label="Titre de la facture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-white bg-opacity-70"
              />
              
              <Input
                label="Montant (en euros)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="bg-white bg-opacity-70"
              />
              
              <Textarea
                label="Description détaillée"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="bg-white bg-opacity-70"
              />
              
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition duration-300"
                >
                  <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                  Importer la facture (PDF)
                </label>
                {file && (
                  <Typography variant="small" color="gray" className="ml-2">
                    {file.name}
                  </Typography>
                )}
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex justify-between mt-6">
              <Button color="red" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit" color="green" onClick={handleSubmit}>
                Envoyer et finaliser
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ProEndProjectInvoice;