"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Base = { parentPath: string; name: string; path: string };

export type Directory = { files: Base[]; folders: Base[] } & Base;
type Directories = {
  [id: string]: Directory;
};
export type DirectoriesState = {
  directories: Directories;
  selectedDirectory: string;
};

const initialState: DirectoriesState = {
  directories: {},
  selectedDirectory: "",
};
export const DirectoriesSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    addDirectories: (state, action: PayloadAction<Directory>) => {
      const directoryKey = action.payload.path;
      state.directories[directoryKey] = action.payload;
    },
    deleteItem: (
      state,
      action: PayloadAction<{ path: string; itemType: "files" | "folders" }>
    ) => {
      const type = action.payload.itemType;
      const index = state.directories[state.selectedDirectory][type].findIndex(
        (item) => item.path === action.payload.path
      );
      if (index > -1) {
        state.directories[state.selectedDirectory][type].splice(index, 1);
      }
    },

    setSelectedDirectory: (state, action: PayloadAction<string>) => {
      state.selectedDirectory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addDirectories, setSelectedDirectory, deleteItem } =
  DirectoriesSlice.actions;
export default DirectoriesSlice.reducer;
