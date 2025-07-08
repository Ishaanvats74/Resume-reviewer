import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.js';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/legacy/build/pdf.worker.js');

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const loadingTask = getDocument({ data: buffer });
  const pdf: PDFDocumentProxy = await loadingTask.promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}
