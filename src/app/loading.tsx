'use client'
import React,{ useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

function Loading() {
  const [dotCount, setDotCount] = useState(1);
  const [sizeIndex, setSizeIndex] = useState(0);
  const sizes1 = ["1rem", "1.8rem", "2.5rem", "2rem", "1rem", "2.5rem", "2.5rem",];
  const sizes2 = ["1.7rem", "1rem", "2.5rem", "3rem", "1.8rem", "2.2rem", "1.2rem",];
  const sizes3 = ["3rem", "2rem", "2.5rem", "2.8rem", "1.2rem", "1.5rem", "2rem",];
  const sizes4 = ["2rem", "3rem", "2.5rem", "1rem", "1.5rem", "3rem", "1rem",];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount(prevCount => prevCount === 4 ? 1 : prevCount + 1);
    }, 1000);

    const sizeIntervalId = setInterval(() => {
      setSizeIndex(prevIndex => (prevIndex + 1) % sizes1.length);
      setSizeIndex(prevIndex => (prevIndex + 1) % sizes2.length);
      setSizeIndex(prevIndex => (prevIndex + 1) % sizes3.length);
      setSizeIndex(prevIndex => (prevIndex + 1) % sizes4.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
      clearInterval(sizeIntervalId);
    };
  }, [sizes1.length, sizes2.length, sizes3.length, sizes4.length]);

  const size = sizes1[sizeIndex];
  const size2 = sizes2[sizeIndex];
  const size3 = sizes3[sizeIndex];
  const size4 = sizes4[sizeIndex];

  return (
    <>
      <Flex w={'100%'} h={"100vh"} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} gap={'5rem'}>
        <style>{`
        @keyframes moveRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-30px);
          }
        }
        @keyframes moveDown {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(30px);
          }
        }
        @keyframes moveLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(30px);
          }
        }
        @keyframes moveUp {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-30px);
          }
        }
      `}</style>
        <Box textAlign="center" position="relative">
          <Box bg="red.400" width={size} height={size} animation="moveRight 1s ease-in-out infinite alternate" position="absolute" top="0" left="0" />
          <Box bg="blackAlpha.400" width={size2} height={size2} animation="moveDown 1s ease-in-out infinite alternate" position="absolute" bottom="0" left="0" />
          <Box bg="blue.400" width={size3} height={size3} animation="moveLeft 1s ease-in-out infinite alternate" position="absolute" bottom="0" right="0" />
          <Box bg="green.400" width={size4} height={size4} animation="moveUp 1s ease-in-out infinite alternate" position="absolute" top="0" right="0" />
        </Box>
        <Box>
          <Text fontSize="xl" fontWeight="bold" marginTop="4">{`Carregando${".".repeat(dotCount)}`}</Text>
        </Box>
      </Flex>

    </>
  );
};

export default Loading;

