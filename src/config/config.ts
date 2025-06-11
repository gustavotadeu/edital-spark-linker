
export const config = {
  defaultWebhookUrl: 'https://n8noci.gustavotadeu.com.br/webhook/fa8000c5-84a9-420a-a3a1-c91f18cf8027',
  templateDownloadUrl: 'https://minio.oci.gustavotadeu.com.br/bucket/Template.xlsx',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroEnabled.12'
  ]
};
