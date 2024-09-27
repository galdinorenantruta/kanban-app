import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  addTaskToProject,
  moveTaskInProject,
  Task,
} from "../../store/projectSlice";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const projectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );

  const [taskTitle, setTaskTitle] = useState("");
  const [taskAuthor, setTaskAuthor] = useState("");
  const [taskResponsible, setTaskResponsible] = useState("");
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);

  const handleAddTask = () => {
    if (taskTitle && taskAuthor && taskResponsible && projectId) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        author: taskAuthor,
        responsible: taskResponsible,
        status: "Tarefas",
      };
      dispatch(addTaskToProject({ projectId, task: newTask }));
      setTaskTitle("");
      setTaskAuthor("");
      setTaskResponsible("");
    } else {
      console.log(
        "Erro: Todos os campos devem ser preenchidos e o projeto deve ser selecionado."
      );
    }
  };

  const handleDrop = (newStatus: string, taskId: string) => {
    if (projectId) {
      dispatch(moveTaskInProject({ projectId, taskId, newStatus }));
    }
  };

  if (!project) {
    return <StyledText>Projeto não encontrado</StyledText>;
  }

  return (
    <StyledSafeAreaView className="bg-indigo-700 h-screen">
      <StyledView>
        <StyledText className="text-2xl font-bold text-neutral-50 text-center">
          {project.title}
        </StyledText>
      </StyledView>
      <StyledView className="flex-1">
        {["Tarefas", "Fazendo", "Feito"].map((status) => (
          <StyledView key={status} className="bg-white m-2 p-4 rounded shadow">
            <TouchableOpacity
              onPress={() =>
                setExpandedStatus(expandedStatus === status ? null : status)
              }
            >
              <StyledText className="font-bold">{status}</StyledText>
            </TouchableOpacity>
            {expandedStatus === status && (
              <StyledView>
                {status === "Tarefas" && (
                  <StyledView className="p-2">
                    <StyledTextInput
                      value={taskTitle}
                      onChangeText={setTaskTitle}
                      placeholder="Título"
                      className="mb-2"
                    />
                    <StyledTextInput
                      value={taskAuthor}
                      onChangeText={setTaskAuthor}
                      placeholder="Autor"
                      className="mb-2"
                    />
                    <StyledTextInput
                      value={taskResponsible}
                      onChangeText={setTaskResponsible}
                      placeholder="Responsável"
                      className="mb-2"
                    />
                    <Button title="Adicionar Tarefa" onPress={handleAddTask} />
                  </StyledView>
                )}
                <FlatList
                  data={project.tasks.filter((task) => task.status === status)}
                  keyExtractor={(task) => task.id}
                  renderItem={({ item }) => (
                    <StyledView
                      {...PanResponder.create({
                        onMoveShouldSetPanResponder: () => true,
                        onPanResponderRelease: (evt, gestureState) => {
                          const newStatus =
                            status === "Tarefas"
                              ? "Fazendo"
                              : status === "Fazendo"
                              ? "Feito"
                              : "Tarefas";
                          handleDrop(newStatus, item.id);
                        },
                      }).panHandlers}
                      className="bg-gray-200 p-2 m-1 rounded"
                    >
                      <StyledText>{item.title}</StyledText>
                    </StyledView>
                  )}
                />
              </StyledView>
            )}
          </StyledView>
        ))}
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Project;
