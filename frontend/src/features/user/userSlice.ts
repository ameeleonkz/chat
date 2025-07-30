import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  value: string;
  isLoaded?: boolean;
}

const initialState: UserState = { value: "" };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      state.isLoaded = true;
    },
    clearUser: state => {
      state.value = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
