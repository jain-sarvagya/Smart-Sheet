// import fs from 'fs/promises';
// import { PDFParse } from 'pdf-parse';

// /**
//  * Extract text from PDF
//  * @param {string} filePath - Path to PDF file
//  * @returns {Promise<{text: string, numPages: number}>}
//  */

// export const extractTextFromPdf = async (filePath) => {
//   try {
//     // buffer contains raw binary data of file, Nodejs standard
//     const dataBuffer = await fs.readFile(filePath);

//     // pdf-parse expects web-standard Uint8 Array, not dataBuffer
//     const parser = new PDFParse(new Uint8Array(dataBuffer));
//     const data = await parser.getText();

//     return {
//       text: data.text,
//       numPages: data.numPages,
//       info: data.info,
//     };
//   } catch (error) {
//     console.error('PDF Parsing Error:', error);
//     throw new Error('Failed to extract text from PDF');
//   }
// };


import fs from 'fs';
import PDFParser from 'pdf2json';

export const extractTextFromPdf = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err));
    
    pdfParser.on("pdfParser_dataReady", pdfData => {
      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(textItem => {
          text += decodeURIComponent(textItem.R[0].T) + " ";
        });
      });

      resolve({
        text,
        numPages: pdfData.Pages.length
      });
    });

    pdfParser.loadPDF(filePath);
  });
};
