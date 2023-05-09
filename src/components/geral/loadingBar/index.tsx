import { useState, useEffect } from 'react';
import { Box, Progress } from '@chakra-ui/react';

interface LoadingProps {
  loadData: () => Promise<void>;
  showLoading: boolean;
  onFinish?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ loadData, showLoading, onFinish }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    if (showLoading) {
      setIsLoading(true);
      setProgress(0);

      const timer = setTimeout(() => {
        if (isMounted && progress < 99) {
          setHasError(true);
        }
      }, 10000); // Defina aqui o tempo limite em milissegundos

      loadData()
        .then(() => {
          if (isMounted) {
            setIsLoading(false);
            setProgress(100);
            if (onFinish) onFinish();
          }
        })
        .catch(() => {
          if (isMounted) {
            setIsLoading(false);
            setHasError(true);
          }
        });

      const intervalId = setInterval(() => {
        if (isMounted && progress < 99) {
          setProgress(progress + 1);
        }
      }, 50);

      return () => {
        clearTimeout(timer);
        clearInterval(intervalId);
        isMounted = false;
      };
    } else {
      setIsLoading(false);
      setProgress(0);
      setHasError(false);
    }
  }, [loadData, progress, showLoading, onFinish]);

  if (showLoading && isLoading) {
    return (
      <Box>
        <Progress size="xs" colorScheme="blue" value={progress} />
      </Box>
    );
  }

  if (hasError) {
    return <div>Ocorreu um erro ao carregar os dados</div>;
  }

  return null;
};

export default Loading;
