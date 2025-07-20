import Tesseract from 'tesseract.js';

const handleReceiptUpload = (file) => {
  Tesseract.recognize(file, 'eng')
    .then(({ data: { text } }) => {
      console.log('Raw OCR text:', text);
      // Optionally use regex or GPT to extract data
      const amount = extractTotal(text); // custom function
      const date = extractDate(text);
      // Pre-fill form here
    });
};
