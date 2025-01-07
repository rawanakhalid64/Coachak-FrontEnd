import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../utils/axios"; 
import Cookies from "js-cookie";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/users/me");

      const { user, accessToken, refreshToken } = response.data.data;

      // if (accessToken && refreshToken) {
      //   Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); 
      //   Cookies.set("refreshToken", refreshToken, { expires: 7 }); 
      // }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
