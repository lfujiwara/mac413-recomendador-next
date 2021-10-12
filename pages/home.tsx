import {
  Box,
  Container,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/layout";
import {
  GerenciadorDisciplinasCursadasViewProvider,
  useGerenciadorDisciplinasCursadasView,
} from "../lib/views/gerenciador-disciplinas-cursadas-view";

import { Header } from "../components/Header";

export const GerenciadorDisciplinasCursadas = () => {
  const view = useGerenciadorDisciplinasCursadasView();

  return (
    <Box>
      <SimpleGrid minChildWidth="200px" spacing="4">
        {view.disciplinasAExibir.map((disciplina) => (
          <Box
            key={disciplina.codigo}
            p="4"
            border={
              view.disciplinaFoiCursada(disciplina.codigo)
                ? "4px solid green"
                : "4px solid transparent"
            }
            onClick={
              view.disciplinaFoiCursada(disciplina.codigo)
                ? () => view.removerDisciplina(disciplina.codigo)
                : () => view.adicionarDisciplina(disciplina.codigo)
            }
          >
            <VStack>
              <Text textAlign="center">{disciplina.codigo}</Text>
              <Text textAlign="center" fontSize="sm">
                {disciplina.nome}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default function Home() {
  return (
    <>
      <Header />
      <GerenciadorDisciplinasCursadasViewProvider>
        <Container maxW="container.md">
          <GerenciadorDisciplinasCursadas />
        </Container>
      </GerenciadorDisciplinasCursadasViewProvider>
    </>
  );
}
