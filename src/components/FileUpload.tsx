import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { config } from '@/config/config';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    if (!config.allowedFileTypes.includes(file.type) && !file.name.endsWith('.xlsx')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, envie apenas arquivos Excel (.xlsx).",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > config.maxFileSize) {
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    console.log('Processando arquivo:', file.name, file.type);

    if (validateFile(file)) {
      setUploadedFile(file);
      onFileUpload(file);
      toast({
        title: "Arquivo carregado!",
        description: `${file.name} foi carregado com sucesso.`,
      });
    }
  }, [onFileUpload, toast]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-[#005AFF]" />
          Upload do Arquivo
        </CardTitle>
        <CardDescription>
          Arraste e solte seu arquivo Excel ou clique para selecionar
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer hover:border-[#005AFF] hover:bg-blue-50 ${
              dragActive 
                ? 'border-[#005AFF] bg-blue-50' 
                : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileInput}
              className="hidden"
            />
            <Upload className={`h-12 w-12 mx-auto mb-4 ${dragActive ? 'text-[#005AFF]' : 'text-gray-400'}`} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Envie seu arquivo Excel
            </h3>
            <p className="text-gray-600 mb-4">
              Arraste e solte ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500">
              Apenas arquivos .xlsx • Máximo 10MB
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-medium text-green-900">{uploadedFile.name}</p>
                <p className="text-sm text-green-700">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 hover:bg-green-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-green-600" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUpload;
