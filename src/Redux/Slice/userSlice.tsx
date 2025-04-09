// redux/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  currentUser: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    clearUser(state) {
      state.user = {};
    },
  },
});

export const { setUser, setCurrentUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
