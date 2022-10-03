const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  paperCode: "",
  paperLang: "",
  createdAt: "",
  paperName: "",
  paperDesc: "",
  paperOwner: "",
};

const CodeEnviroment = createSlice({
  name: "CodeEnvironment",
  initialState,
  reducers: {
    createPaper: (state, { payload }) => {
      return { ...payload, createdAt: new Date() };
    },
  },
});

const { createPaper } = CodeEnviroment.actions;
export default CodeEnviroment.reducer;
export { createPaper };
