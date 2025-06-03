
export const generateTemplateExcel = () => {
  // Create a simple CSV content that can be opened in Excel
  const headers = [
    'Item',
    'Descrição',
    'Categoria',
    'Valor',
    'Quantidade',
    'Unidade',
    'Observações'
  ];

  const sampleData = [
    ['1', 'Exemplo de item 1', 'Categoria A', '100.00', '2', 'unidade', 'Observação exemplo'],
    ['2', 'Exemplo de item 2', 'Categoria B', '250.50', '1', 'peça', 'Outra observação'],
    ['3', 'Exemplo de item 3', 'Categoria A', '75.25', '5', 'metro', 'Mais uma observação']
  ];

  // Create CSV content
  const csvContent = [headers, ...sampleData]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template_edital.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  console.log('Template Excel gerado e baixado');
};
