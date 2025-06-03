
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface ProjectNameInputProps {
  projectName: string;
  setProjectName: (name: string) => void;
}

const ProjectNameInput: React.FC<ProjectNameInputProps> = ({ projectName, setProjectName }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#005AFF]" />
          Identificação do Projeto
        </CardTitle>
        <CardDescription>
          Dê um nome para identificar este ponto a ponto
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="project-name" className="text-sm font-medium">
            Nome do Projeto
          </Label>
          <Input
            id="project-name"
            type="text"
            placeholder="Ex: Edital Prefeitura 2024"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1 focus:ring-[#005AFF] focus:border-[#005AFF]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Este nome ajudará a identificar o processamento
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectNameInput;
