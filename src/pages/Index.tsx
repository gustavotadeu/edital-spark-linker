
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import ProjectNameInput from '@/components/ProjectNameInput';
import { config } from '@/config/config';

const Index = () => {
  const [projectName, setProjectName] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDownloadTemplate = () => {
    try {
      const link = document.createElement('a');
      link.href = config.templateDownloadUrl;
      link.download = 'template.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: 'Template baixado!',
        description: 'O arquivo modelo foi baixado com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao baixar template:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao baixar o arquivo modelo.',
        variant: 'destructive',
      });
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log('Arquivo carregado:', file.name);
  };

  const handleSendFile = async () => {
    if (!uploadedFile || !projectName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha o nome do projeto e carregue um arquivo.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log('Enviando arquivo via webhook:', config.defaultWebhookUrl);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('timestamp', new Date().toISOString());
      formData.append('project_name', projectName.trim());
      formData.append('filename', uploadedFile.name);

      const response = await fetch(config.defaultWebhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Resposta do webhook:', data);
        
        if (data.link || data.url || data.result_link) {
          const link = data.link || data.url || data.result_link;
          
          // Navigate to result page with the link and project name
          navigate('/result', { 
            state: { 
              link, 
              projectName: projectName.trim() 
            } 
          });
          
          toast({
            title: "Processamento iniciado!",
            description: "Redirecionando para a página de acompanhamento.",
          });
        } else {
          throw new Error('Link não encontrado na resposta');
        }
      } else {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);
      toast({
        title: "Erro no processamento",
        description: "Falha ao processar o arquivo. Verifique a configuração e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Análise de Editais
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Envie seu arquivo Excel para análise ponto a ponto e receba insights detalhados
          </p>
        </div>

        {/* Template Download */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-[#005AFF]" />
              Template Excel
            </CardTitle>
            <CardDescription>
              Baixe o modelo padrão para garantir a formatação correta dos seus dados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleDownloadTemplate}
              className="bg-[#005AFF] hover:bg-[#0048CC] text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Template
            </Button>
          </CardContent>
        </Card>

        {/* Project Name Input */}
        <ProjectNameInput projectName={projectName} setProjectName={setProjectName} />

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* Send Button */}
        {uploadedFile && projectName.trim() && (
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Projeto: <span className="font-medium">{projectName}</span>
                  </p>
                  <p className="text-gray-600">
                    Arquivo: <span className="font-medium">{uploadedFile.name}</span>
                  </p>
                </div>
                <Button 
                  onClick={handleSendFile}
                  disabled={isProcessing}
                  className="bg-[#005AFF] hover:bg-[#0048CC] text-white px-8 py-3 text-lg"
                >
                  {isProcessing ? 'Processando...' : 'Enviar para Análise'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isProcessing && (
          <Card className="shadow-lg border-[#005AFF]">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005AFF] mx-auto"></div>
                <p className="text-lg font-medium text-[#005AFF]">
                  Enviando arquivo...
                </p>
                <p className="text-gray-600">
                  Aguarde enquanto processamos sua solicitação
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
