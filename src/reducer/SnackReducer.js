import { createSlice } from "@reduxjs/toolkit";

const initialObj = {
  status: false,
  message: "",
};

const SnackReducer = createSlice({
  initialState: initialObj,
  name: "SnackReducer",
  reducers: {
    getSnacks(state, action) {
      state.status = true;
      state.message = action.payload;
    },
    deleteSnack(state) {
      state.status = false;
      state.message = "";
    },
  },
});

export default SnackReducer.reducer;
const { getSnacks, deleteSnack } = SnackReducer.actions;
export { getSnacks, deleteSnack };
