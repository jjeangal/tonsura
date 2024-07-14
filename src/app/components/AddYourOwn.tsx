// pages/add-your-own.tsx

import { Box, Button, VStack, Text, HStack, Circle, useColorModeValue } from "@chakra-ui/react";

const platforms = [
  { name: "Deezer", icon: "D" },
  { name: "Apple Music", icon: "A" },
  { name: "Spotify", icon: "S" },
  { name: "Platform 4", icon: "P" },
  { name: "Platform 5", icon: "P5" },
];

export function AddYourOwn(){
  const cardBg = useColorModeValue("purple.50", "purple.900");
  const iconBg = useColorModeValue("purple.100", "purple.700");
  const iconColor = useColorModeValue("purple.800", "purple.200");

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} bg="white" borderRadius="md" boxShadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
        Select the platform
      </Text>
      <HStack justify="center" spacing={4} mb={4}>
        {platforms.map((platform) => (
          <Circle key={platform.name} size="40px" bg={iconBg} color={iconColor}>
            {platform.icon}
          </Circle>
        ))}
      </HStack>
      <Text fontSize="lg" fontWeight="medium" mb={4} textAlign="center">
        We found the following track:
      </Text>
      <Box bg="gray.200" height="150px" mb={4} borderRadius="md" />
      <Text fontSize="lg" fontWeight="medium" mb={4} textAlign="center">
        Is that right?
      </Text>
      <HStack justify="center" spacing={4}>
        <Button colorScheme="blackAlpha">WTF?</Button>
        <Button colorScheme="blackAlpha">Yes</Button>
      </HStack>
    </Box>
  );
};
