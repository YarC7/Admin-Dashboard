// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  token: ''
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

})
export const { setUser, setIsAuthenticated, setToken, setLoading } = authSlice.actions;

export default authSlice.reducer