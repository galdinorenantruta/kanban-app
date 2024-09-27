import React from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { ScrollView } from "react-native";
import { styled } from "nativewind";

const StyledScrollView = styled(ScrollView);

const Home: React.FC = () => {
  return (
    <StyledScrollView className="">
      <Navbar />
      <Header />
    </StyledScrollView>
  );
};

export default Home;
