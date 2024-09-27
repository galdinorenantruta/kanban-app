import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface para a Tarefa com autor e responsável
export interface Task {
  id: string;
  title: string;
  author: string;
  responsible: string;
  status: string;
}

// Interface para o Projeto
export interface Project {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

// Estado inicial contendo uma lista de projetos
export interface ProjectState {
  projects: Project[];
  selectedProjectId: string | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProjectId: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // Adiciona um novo projeto com título e descrição
    addProject: (
      state,
      action: PayloadAction<{ title: string; description: string }>
    ) => {
      const newProject: Project = {
        id: Date.now().toString(), // ID único para o projeto
        title: action.payload.title,
        description: action.payload.description,
        tasks: [], // Nenhuma tarefa inicialmente
      };
      state.projects.push(newProject);
    },
    selectProject: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
    deleteProject: (state, action: PayloadAction<{ projectId: string }>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload.projectId
      );
    },

    addTaskToProject: (
      state,
      action: PayloadAction<{ projectId: string; task: Task }>
    ) => {
      const { projectId, task } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        project.tasks.push({ ...task, status: "Tarefas" }); // Define o status como "Tarefas" ao adicionar
      }
    },
    moveTaskInProject: (
      state,
      action: PayloadAction<{
        projectId: string;
        taskId: string;
        newStatus: string;
      }>
    ) => {
      const { projectId, taskId, newStatus } = action.payload;
      const project = state.projects.find((p) => p.id === projectId);
      if (project) {
        const task = project.tasks.find((t) => t.id === taskId);
        if (task) {
          task.status = newStatus; // Atualiza o status da tarefa
        }
      }
    },
  },
});

export const {
  addProject,
  addTaskToProject,
  selectProject,
  deleteProject,
  moveTaskInProject,
} = projectSlice.actions;
export default projectSlice.reducer;
