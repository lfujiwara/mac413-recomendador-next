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
import { Input } from "@chakra-ui/input";

export const GerenciadorDisciplinasCursadas = () => {
  const view = useGerenciadorDisciplinasCursadasView();

  return (
    <Box pt="4">
      <Input
        placeholder="Buscar disciplina"
        value={view.termoDeBuscaDisciplinas}
        onChange={(evt) =>
          view.atualizarTermoDeBuscaDisciplinas(evt.target.value)
        }
        mb="2"
      />
      <SimpleGrid minChildWidth="200px" spacing="4">
        {view.disciplinasAExibir.map((disciplina) => (
          <Box
            key={disciplina.codigo}
            p="4"
            transition="linear"
            transitionProperty="all"
            transitionDuration="300ms"
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
            <VStack h="full">
              <Text textAlign="center">{disciplina.codigo}</Text>
              <Text textAlign="center" fontSize="sm">
                {disciplina.nome}
              </Text>
              <Box flex="1" />
              <Text
                p="2"
                fontSize="xs"
                bgColor={
                  view.disciplinaFoiCursada(disciplina.codigo)
                    ? "green"
                    : "gray"
                }
                color="white"
                rounded="md"
                transition="linear"
                transitionProperty="all"
                transitionDuration="300ms"
              >
                {view.disciplinaFoiCursada(disciplina.codigo)
                  ? "CURSADA"
                  : "NÃO CURSADA"}
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
