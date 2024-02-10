import React from 'react'
import jspdf from 'jspdf/dist/jspdf.umd.js';
import img from '../assets/cert.jpg'
import { Button } from '@chakra-ui/react';

const generateCertificate = (name, course) => {
   // Create a new jsPDF instance
  const doc = new jspdf();
  const upperCaseName = name.toUpperCase();
  // Add background image
  doc.addImage(img, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  // Add recipient name
  doc.setFontSize(36);
  doc.setFont('helvetica'); // Change the font family and style
  doc.text(upperCaseName, 105, 160, { align: 'center' }); // 105 and 160: horizontal and vertical positions of the text

  // Add course name
  doc.setFontSize(20);
  doc.text(course, 137, 184, { align: 'center' }); // 105 and 195: horizontal and vertical positions of the text

  // Save the PDF
  doc.save(`${name}-${course}.pdf`);
};


function Certificate({name, hours}) {
  return (
    <div>
      <Button colorScheme="twitter" onClick={() => generateCertificate(name, hours)}>Generate Certificate</Button>
    </div>
  );
}

export default Certificate