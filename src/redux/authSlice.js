import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  userId: null,
  email: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
    },
    clearUser: () => {
      return {
        ...initialState
      }
    },
  },
})

export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer