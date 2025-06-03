
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { link, projectName } = location.state || {};

  if (!link) {
    navigate('/');
    return null;
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast({
        title: "Erro",
        description: "Falha ao copiar o link.",
        variant: "destructive",
      });
    }
  };

  const handleOpenLink = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Processamento Iniciado
          </h1>
          {projectName && (
            <p className="text-lg text-gray-600">
              Projeto: <span className="font-semibold">{projectName}</span>
            </p>
          )}
        </div>

        <Card className="shadow-lg border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              Arquivo Enviado com Sucesso
            </CardTitle>
            <CardDescription className="text-green-700">
              Acompanhe o processamento do seu ponto a ponto no link:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white border border-green-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Link de acompanhamento:</p>
              <p className="font-mono text-sm text-gray-800 break-all">
                {link}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={handleOpenLink}
                className="bg-[#005AFF] hover:bg-[#0048CC] text-white flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Link
              </Button>
              
              <Button 
                onClick={handleCopyLink}
                variant="outline"
                className="border-[#005AFF] text-[#005AFF] hover:bg-[#005AFF] hover:text-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={handleBackHome}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
