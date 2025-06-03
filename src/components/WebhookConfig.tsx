
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

interface WebhookConfigProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({ webhookUrl, setWebhookUrl }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-[#005AFF]" />
          Configuração do Webhook
        </CardTitle>
        <CardDescription>
          Configure a URL do endpoint que receberá o arquivo para processamento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="webhook-url" className="text-sm font-medium">
            URL do Webhook
          </Label>
          <Input
            id="webhook-url"
            type="url"
            placeholder="https://api.exemplo.com/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            className="mt-1 focus:ring-[#005AFF] focus:border-[#005AFF]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Cole aqui a URL do seu endpoint que processará o arquivo Excel
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookConfig;
