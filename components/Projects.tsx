import { FlatList, Text, View, Button, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { styled } from "nativewind";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../store/tabSlice";
import { RootState } from "../store";
import { useRouter } from "expo-router";
import { deleteProject, selectProject } from "@/store/projectSlice";

const StyledView = styled(View);
const StyledText = styled(Text);

const StyledTouchableOpacity = styled(TouchableOpacity);

const Projects = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.tabs.selectedTab);

  const projects = useSelector((state: RootState) => state.projects.projects);

  const handleDeleteProject = (projectId: string) => {
    dispatch(deleteProject({ projectId }));
  };

  return (
    <StyledView className="mt-4">
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className="bg-sky-700 rounded-lg p-4 mb-2"
            onPress={() => {
              dispatch(selectProject(item.id)); // Despacha a ação
              dispatch(setSelectedTab("Projeto")); // Navega para a página do projeto
            }}
          >
            <StyledText className="text-xl font-bold text-amber-100 mb-1">
              {item.title}
            </StyledText>
            <StyledText className="text-sm text-lime-200">
              {item.description}
            </StyledText>

            <StyledTouchableOpacity
              onPress={() => handleDeleteProject(item.id)}
            >
              <StyledText className="ml-auto font-bold">
                <TabBarIcon name="trash-bin" color={"#e25c5c"} />
              </StyledText>
            </StyledTouchableOpacity>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );
};

export default Projects;
