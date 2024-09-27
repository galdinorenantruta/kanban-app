import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store";
import { useRouter } from "expo-router";

import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  addProject,
  selectProject,
  deleteProject,
} from "../store/projectSlice";

import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledButton = styled(Button);

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // Função para adicionar novo projeto
  const handleAddProject = () => {
    if (projectTitle && projectDescription) {
      dispatch(
        addProject({ title: projectTitle, description: projectDescription })
      );
      setProjectTitle("");
      setProjectDescription("");
    }
  };

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject({ projectId }));
  };

  return (
    <StyledSafeAreaView className="p-4">
      <StyledView className="mb-4">
        <StyledText className="text-xl font-bold text-blue-600">
          Criar Novo Projeto
        </StyledText>
        <StyledTextInput
          placeholder="Título do Projeto"
          value={projectTitle}
          onChangeText={setProjectTitle}
          className="border p-2 mt-2 rounded"
        />
        <StyledTextInput
          placeholder="Descrição do Projeto"
          value={projectDescription}
          onChangeText={setProjectDescription}
          className="border p-2 mt-2 rounded"
        />
        <StyledButton title="Adicionar Projeto" onPress={handleAddProject} />
      </StyledView>

      <StyledText className="text-xl font-bold text-gray-800 mb-2">
        Projetos Criados
      </StyledText>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className="p-2 bg-white border mb-2 rounded">
            <StyledText className="text-lg text-gray-700">
              {item.title}
            </StyledText>
            <StyledText className="text-sm text-gray-500">
              {item.description}
            </StyledText>

            <Button
              title="Ver Detalhes"
              onPress={() => {
                dispatch(selectProject(item.id)); // Despacha a ação
                router.push("/explore"); // Navega para a página do projeto
              }}
            />
            <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
              <Text>X</Text>
            </TouchableOpacity>
          </StyledView>
        )}
      />
    </StyledSafeAreaView>
  );
};

export default Header;
