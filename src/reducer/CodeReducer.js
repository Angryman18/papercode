const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  paperCode: "",
  paperLang: "",
  paperExt: "",
  createdAt: "",
  paperName: "",
  paperDesc: "",
  paperOwner: "",
  paperSync: false,
};

const CodeEnviroment = createSlice({
  name: "CodeEnvironment",
  initialState,
  reducers: {
    createPaper: (state, { payload }) => {
      console.log(payload)
      return { ...state, ...payload, createdAt: new Date() };
    },
    writeCode: (state, { payload }) => {
      state.paperCode = payload.paperCode;
    },
  },
});

const { createPaper, writeCode } = CodeEnviroment.actions;
export default CodeEnviroment.reducer;
export { createPaper, writeCode };
