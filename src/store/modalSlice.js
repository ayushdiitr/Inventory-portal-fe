import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  header: "",
  component: null
}

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, actions) => {
      state.open = true;
      const { header, component } = actions.payload;
      state.header = header;
      state.component = component;
    },
    setModalClose: (state, action) => {
      state = initialState;
    }
  }
})

export const { setModalClose, setModalOpen } = ModalSlice.actions;

export default ModalSlice.reducer;