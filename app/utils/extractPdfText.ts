import PDFParser from "pdf2json";

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();
    
    pdfParser.on("pdfParser_dataError", (errData) => {
      console.error("PDF parsing error:", errData);
      reject(new Error(`PDF parsing failed: ${errData.parserError}`));
    });
    
    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      try {
        // Extract text from parsed PDF data
        let text = '';
        if (pdfData.Pages) {
          pdfData.Pages.forEach((page) => {
            if (page.Texts) {
              page.Texts.forEach((textItem) => {
                if (textItem.R) {
                  textItem.R.forEach((textRun) => {
                    if (textRun.T) {
                      text += decodeURIComponent(textRun.T) + ' ';
                    }
                  });
                }
              });
            }
            text += '\n'; // Add line break between pages
          });
        }
        resolve(text.trim());
      } catch (error) {
        reject(new Error(`Text extraction failed: ${error}`));
      }
    });
    
    // Parse the PDF buffer
    pdfParser.parseBuffer(buffer);
  });
}