import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledHamburguer = styled(TouchableOpacity);

const Navbar = () => {
  const [selected, setSelected] = useState("Projetos");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: any) => {
    setSelected(item);
  };

  return (
    <StyledView className="relative flex flex-row justify-around items-end p-4 bg-indigo-400 h-32">
      <TouchableOpacity onPress={() => handleSelect("Projetos")}>
        <StyledText className="text-white text-xl">Projetos</StyledText>
        {selected === "Projetos" && (
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
            <StyledText className="text-black">Outras coisitas mais</StyledText>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <StyledText className="text-red-500">Fechar</StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    </StyledView>
  );
};

export default Navbar;
