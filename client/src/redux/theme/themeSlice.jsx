// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//     theme: "light",
// };

// const themeSlice = createSlice({ 
//     name: "theme",
//     initialState,
//     reducers: {
//         toggleTheme: (state) => {
//             state.theme = state.theme === "light" ? "dark" : "light";
//         },

//     },

// });

// export const { toggleTheme } = themeSlice.actions;
// export default themeSlice.reducer;
// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
