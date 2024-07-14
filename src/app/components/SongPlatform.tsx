import { Box, Button, Checkbox, VStack, Text, HStack, Circle, useColorModeValue } from "@chakra-ui/react";

const platforms = [
  { name: "Deezer", icon: "D" },
  { name: "Apple Music", icon: "A" },
  { name: "Spotify", icon: "S" },
];

export function SongPlatforms(){
  const cardBg = useColorModeValue("yellow.50", "yellow.900");
  const iconBg = useColorModeValue("blue.100", "blue.700");
  const iconColor = useColorModeValue("blue.800", "blue.200");

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
      <Button mt={4} colorScheme="blackAlpha">Add your own</Button>
    </Box>
  );
};
