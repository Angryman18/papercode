import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  runner: false,
};

const UtilReducer = createSlice({
  name: "UtilReducer",
  initialState,
  reducers: {
    utilStateSetter: (state, { payload }) => {
      state[payload.state] = payload.stateValue;
    },
  },
});

const { utilStateSetter } = UtilReducer.actions;
export default UtilReducer.reducer;

export { utilStateSetter };
