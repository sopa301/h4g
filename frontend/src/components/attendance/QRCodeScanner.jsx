import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Center, Text } from '@chakra-ui/react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

const QRCodeScanner = () => {
  const webcamRef = useRef(null);
  const [qrCode, setQRCode] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = webcamRef.current.video.clientWidth;
    canvas.height = webcamRef.current.video.clientHeight;
    ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });


    if (code) {
      setQRCode(code.data);
    } else {
      setQRCode(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, 1000); // Adjust the interval based on your requirements

    return () => clearInterval(interval);
  }, []);

  const videoConstraints = {
    // facingMode: "user"
    facingMode: { exact: "environment" }
  };

  return (
    <Box 
      display="flex"
      flexDirection="column"
      alignItems="center" 
      px="5px">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      {qrCode === null ? <Text>Reading...</Text> : <></>}
      {/* {qrCode && <p>QR Code Data: {qrCode}</p>} */}
      {qrCode && (
        <Center pt="40px">
          <Button colorScheme='teal'>Take Attendance</Button>
        </Center>)}
    </Box>
  );
};

export default QRCodeScanner;