import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../store/tabSlice"; // Ajuste o caminho conforme necessário
import Header from "@/components/Header";
import MainProject from "../../components/MainProject";
import { RootState } from "../../store";
import Explore from "./explore";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledHamburguer = styled(TouchableOpacity);

const Home = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.tabs.selectedTab);

  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: string) => {
    dispatch(setSelectedTab(item));
  };

  return (
    <>
      <StyledView className="relative flex flex-row justify-around items-end p-4 bg-indigo-400 h-32">
        <TouchableOpacity onPress={() => handleSelect("Inicio")}>
          <StyledText className="text-white text-xl">Início</StyledText>
          {selected === "Inicio" && (
            <StyledView className="mt-4 h-2 w-24 bg-white rounded" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect("Projeto")}>
          <StyledText className="text-white text-xl">Projeto</StyledText>
          {selected === "Projeto" && (
            <StyledView className="mt-4 h-2 w-24 bg-white rounded" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect("Meu time")}>
          <StyledText className="text-white text-xl">Meu time</StyledText>
          {selected === "Meu time" && (
            <StyledView className="mt-4 h-2 w-24 bg-white rounded" />
          )}
        </TouchableOpacity>

        {/* Menu de Hambúrguer */}
        <StyledHamburguer
          className="absolute top-8 right-7"
          onPress={() => setModalVisible(true)}
        >
          <StyledText className="text-white text-3xl">☰</StyledText>
        </StyledHamburguer>

        {/* Menu de Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <StyledView className="flex-1 justify-center items-center bg-black opacity-75">
            <StyledView className="bg-white p-4 rounded">
              <StyledText className="text-black">Menu</StyledText>
              <StyledText className="text-black">
                Outras coisitas mais
              </StyledText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <StyledText className="text-red-500">Fechar</StyledText>
              </TouchableOpacity>
            </StyledView>
          </StyledView>
        </Modal>
      </StyledView>
      {selected === "Inicio" ? (
        <Header />
      ) : selected === "Projeto" ? (
        <MainProject />
      ) : (
        <Explore />
      )}
    </>
  );
};

export default Home;
