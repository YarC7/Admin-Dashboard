import { createSlice } from "@reduxjs/toolkit";

// Initial state object
const initialState = {
  avatar: '',
  username: '',
  email: '',
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setAvatar: (state, action) => {
        state.avatar = action.payload;
      },
      setUsername: (state, action) => {
        state.username = action.payload;
      },
      setEmail: (state, action) => {
        state.email = action.payload;
      },
    },
  });
  
  export const { setAvatar, setUsername, setEmail } = userSlice.actions;
  
  export default userSlice.reducer;