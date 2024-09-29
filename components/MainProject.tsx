import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import {
  addTaskToProject,
  moveTaskInProject,
  Task,
} from "../store/projectSlice";
import { Picker } from "@react-native-picker/picker";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  FlatList,
  PanResponder,
  TouchableOpacity,
  Modal,
} from "react-native";
import { styled } from "nativewind";

const StyledSafeAreaView = styled(SafeAreaView);
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledPicker = styled(Picker);

const MainProject: React.FC = () => {
  const dispatch = useDispatch();
  const projectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId
  );
  const project = useSelector((state: RootState) =>
    state.projects.projects.find((p) => p.id === projectId)
  );

  const [taskTitle, setTaskTitle] = useState("");
  const [taskAuthor, setTaskAuthor] = useState("Eu");
  const [taskResponsible, setTaskResponsible] = useState("User1");
  const [expandedStatus, setExpandedStatus] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // Estado do modal
  const [taskDescription, setTaskDescription] = useState("");

  const users = ["User1", "User2", "User3"]; // Exemplo de usuários

  const handleAddTask = () => {
    if (
      taskTitle &&
      taskDescription &&
      taskAuthor &&
      taskResponsible &&
      projectId
    ) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDescription, // Inclui descrição
        author: taskAuthor,
        responsible: taskResponsible,
        status: "Tarefas",
      };
      console.log(newTask);
      dispatch(addTaskToProject({ projectId, task: newTask }));
      setTaskTitle("");
      setTaskDescription(""); // Limpa a descrição

      setTaskResponsible("");
      setModalVisible(false);
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
      <StyledView className="flex-1 ">
        {["Tarefas", "Fazendo", "Feito"].map((status) => (
          <StyledView
            key={status}
            className="bg-orange-200 m-2 p-4 rounded shadow "
          >
            <StyledTouchableOpacity
              className="flex-row justify-between items-center"
              onPress={() =>
                setExpandedStatus(expandedStatus === status ? null : status)
              }
            >
              <StyledText className="font-bold">{status}</StyledText>

              {status === "Tarefas" && (
                <StyledView className="p-2">
                  {/* Botão para abrir o modal */}
                  <StyledTouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="bg-slate-100 rounded-full p-2 mb-2"
                  >
                    <StyledText className="text-white text-lg">
                      <TabBarIcon name="add" color={"#078035"} size={30} />
                    </StyledText>
                  </StyledTouchableOpacity>

                  {/* Modal para adicionar nova tarefa */}
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                  >
                    <StyledView className="flex-1 justify-center items-center bg-indigo-600 bg-opacity-50">
                      <StyledView className=" rounded-lg p-5 w-80 bg-slate-50 ">
                        <StyledText className="text-xl font-bold text-black mb-2">
                          Adicionar Nova Tarefa
                        </StyledText>
                        <StyledTextInput
                          value={taskTitle}
                          onChangeText={setTaskTitle}
                          placeholder="Título"
                          className="border border-gray-600 bg-slate-200  p-2 mt-2 rounded "
                        />
                        <StyledTextInput
                          value={taskDescription}
                          onChangeText={setTaskDescription}
                          placeholder="Descrição"
                          className="border border-gray-600 bg-slate-200 p-2 mt-2 rounded h-16  "
                        />

                        <StyledPicker
                          selectedValue={taskResponsible}
                          onValueChange={(
                            itemValue: unknown,
                            itemIndex: number
                          ) => setTaskResponsible(itemValue as string)}
                          placeholder="Responsável"
                          className="border border-gray-600 bg-slate-200  p-2 mt-2 rounded "
                        >
                          {users.map((user) => (
                            <Picker.Item label={user} value={user} key={user} />
                          ))}
                        </StyledPicker>
                        <StyledTouchableOpacity
                          className="bg-sky-500  h-16 items-center justify-center rounded-2xl mx-4 my-4"
                          onPress={handleAddTask}
                        >
                          <Text>Adicionar tarefa</Text>
                        </StyledTouchableOpacity>
                        <StyledTouchableOpacity
                          className="bg-red-300 h-16 items-center justify-center rounded-2xl mx-4  "
                          onPress={() => setModalVisible(false)}
                        >
                          <Text>Cancelar</Text>
                        </StyledTouchableOpacity>
                      </StyledView>
                    </StyledView>
                  </Modal>
                </StyledView>
              )}
            </StyledTouchableOpacity>
            {expandedStatus === status && (
              <StyledView>
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

export default MainProject;
