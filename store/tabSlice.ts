import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabState {
  selectedTab: string;
}

const initialState: TabState = {
  selectedTab: "Inicio",
};

const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<string>) {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = tabSlice.actions;
export default tabSlice.reducer;
