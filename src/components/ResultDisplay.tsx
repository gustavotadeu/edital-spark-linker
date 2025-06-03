
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultDisplayProps {
  link: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ link }) => {
  const { toast } = useToast();

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

  return (
    <Card className="shadow-lg border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          Análise Concluída
        </CardTitle>
        <CardDescription className="text-green-700">
          Sua análise foi processada com sucesso. Acesse o resultado através do link abaixo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-white border border-green-200 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Link do resultado:</p>
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
            Abrir Resultado
          </Button>
          
          <Button 
            onClick={handleCopyLink}
            variant="outline"
            className="border-[#005AFF] text-[#005AFF] hover:bg-[#005AFF] hover:text-white"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copiar Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;
