
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FileUpload from '@/components/FileUpload';
import WebhookConfig from '@/components/WebhookConfig';
import ResultDisplay from '@/components/ResultDisplay';
import { generateTemplateExcel } from '@/utils/templateUtils';

const Index = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultLink, setResultLink] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownloadTemplate = () => {
    try {
      generateTemplateExcel();
      toast({
        title: "Template baixado!",
        description: "O arquivo modelo foi baixado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao gerar template:', error);
      toast({
        title: "Erro",
        description: "Falha ao gerar o arquivo modelo.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setResultLink(null); // Reset previous results
    console.log('Arquivo carregado:', file.name);
  };

  const handleSendFile = async () => {
    if (!uploadedFile || !webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, carregue um arquivo e configure a URL do webhook.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    console.log('Enviando arquivo via webhook:', webhookUrl);

    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      formData.append('timestamp', new Date().toISOString());

      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Resposta do webhook:', data);
        
        // Assuming the webhook returns a link in the response
        if (data.link || data.url || data.result_link) {
          const link = data.link || data.url || data.result_link;
          setResultLink(link);
          toast({
            title: "Processamento concluído!",
            description: "A análise foi realizada com sucesso.",
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
        description: "Falha ao processar o arquivo. Verifique a URL do webhook e tente novamente.",
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

        {/* Webhook Configuration */}
        <WebhookConfig webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl} />

        {/* File Upload */}
        <FileUpload onFileUpload={handleFileUpload} />

        {/* Send Button */}
        {uploadedFile && webhookUrl && (
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Arquivo pronto: <span className="font-medium">{uploadedFile.name}</span>
                </p>
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
                  Analisando seu arquivo...
                </p>
                <p className="text-gray-600">
                  Este processo pode levar alguns minutos
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Display */}
        {resultLink && <ResultDisplay link={resultLink} />}
      </div>
    </div>
  );
};

export default Index;
