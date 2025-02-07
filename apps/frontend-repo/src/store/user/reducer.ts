import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: "",
    email: "",
    age: "",
    city: ""
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.age = action.payload.age;
      state.city = action.payload.city;
    },
    logout: (state) => {
      state.name= "";
      state.email= "";
      state.age= "";
      state.city= "";
    }
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
