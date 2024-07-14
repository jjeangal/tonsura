// components/SongPlatforms.tsx

import { Box, Button, Checkbox, VStack, Text, HStack, Circle, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from 'next/router';

const platforms = [
  { name: "Deezer", icon: "D" },
  { name: "Apple Music", icon: "A" },
  { name: "Spotify", icon: "S" },
];

export function SongPlatforms(){
  const router = useRouter();
  const cardBg = useColorModeValue("purple.50", "purple.900");
  const iconBg = useColorModeValue("purple.100", "purple.700");
  const iconColor = useColorModeValue("purple.800", "purple.200");

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        This song is available in the following platforms
      </Text>
      <VStack spacing={4} align="start" bg={cardBg} p={4} borderRadius="md">
        {platforms.map((platform) => (
          <HStack key={platform.name} spacing={4}>
            <Circle size="40px" bg={iconBg} color={iconColor}>
              {platform.icon}
            </Circle>
            <Text>{platform.name}</Text>
          </HStack>
        ))}
      </VStack>
      <HStack mt={4} spacing={4}>
        <Checkbox>Set default</Checkbox>
        <Button colorScheme="blackAlpha">Go listen</Button>
      </HStack>
      <Button mt={4} colorScheme="blackAlpha" onClick={() => router.push('/add-your-own')}>Add your own</Button>
    </Box>
  );
};

