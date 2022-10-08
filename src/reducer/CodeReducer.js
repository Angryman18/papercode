const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  paperCode: "",
  paperLang: "",
  paperLangExt: "",
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
