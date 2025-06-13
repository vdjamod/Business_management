import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  role: "",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { role, id, workpage } = action.payload;
      state.status = true;
      state.workpage = workpage;
      state.role = role;
      state.id = id;
    },
    signout: (state) => {
      state.status = false;
      state.workpage = "";
      state.role = "";
      state.id = "";
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
