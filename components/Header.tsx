import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import { addProject } from "../store/projectSlice";
import { styled } from "nativewind";
import Projects from "./Projects";

const StyledSafeAreaView = styled(SafeAreaView);

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledTextInput = styled(TextInput);

const StyledTouchableOpacity = styled(TouchableOpacity);

const Header = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleAddProject = () => {
    if (projectTitle && projectDescription) {
      dispatch(
        addProject({ title: projectTitle, description: projectDescription })
      );
      setProjectTitle("");
      setProjectDescription("");
      setModalVisible(false); // Fechar o modal após adicionar
    }
  };

  return (
    <StyledSafeAreaView className="p-4 bg-slate-200 h-full ">
      <StyledTouchableOpacity
        className="bg-indigo-600 h-16 items-center justify-center rounded-2xl mx-4 flex-row "
        onPress={() => setModalVisible(true)} // Abre o modal
      >
        <TabBarIcon name="briefcase" color={"#84b98d"} />
        <StyledText className="ml-4 text-gray-50 text-2xl font-extrabold">
          Novo Projeto
        </StyledText>
      </StyledTouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <StyledView className=" relative flex-1 justify-center items-center   bg-indigo-600 rounded-2xl">
          <StyledView className="w-80 p-4 bg-slate-50 rounded-lg  ">
            <StyledText className="text-xl font-bold text-black mb-2 ">
              Crie um Novo Projeto
            </StyledText>
            <StyledTextInput
              placeholder="Título do Projeto"
              value={projectTitle}
              onChangeText={setProjectTitle}
              className="border border-gray-600 bg-slate-200 p-2 mt-2 rounded"
            />
            <StyledTextInput
              placeholder="Descrição do Projeto"
              value={projectDescription}
              onChangeText={setProjectDescription}
              className="border border-gray-600 bg-slate-200  p-2 mt-2 rounded h-20"
            />
            <StyledTouchableOpacity
              className="bg-sky-500  h-16 items-center justify-center rounded-2xl mx-4 my-7"
              onPress={handleAddProject}
            >
              <StyledText className="text-gray-50 text-2xl font-extrabold">
                Adicionar Projeto
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          <StyledTouchableOpacity
            onPress={() => setModalVisible(false)}
            className="mt-4 absolute top-10 right-10"
          >
            <StyledText className="   text-red-500 font-bold ">
              <TabBarIcon name="close-circle" color={"#f33a3a"} size={35} />
            </StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </Modal>

      <StyledView
        className="border mt-6 border-gray-500
      "
      ></StyledView>

      <Projects />
    </StyledSafeAreaView>
  );
};

export default Header;
