import { Container, Flex, Heading, Text } from "@chakra-ui/layout"

export const Header = () => {
  return <Flex w="full" p="4" borderBottomWidth="thin" borderBottomColor="gray.100">
    <Container maxW="container.xl">
      <Heading>Recomendador de disciplinas</Heading>
      <Text>MAC413/5714 - Tópicos Avançados de Programação Orientada a Objetos (2021)</Text>
    </Container>
  </Flex>
}