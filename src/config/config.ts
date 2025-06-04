
export const config = {
  defaultWebhookUrl: 'https://api.exemplo.com/webhook',
  templateDownloadUrl: 'https://repositorio.externo.com/template.xlsx',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroEnabled.12'
  ]
};
