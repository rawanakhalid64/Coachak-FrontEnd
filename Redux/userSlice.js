import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const responseData = await response.json();

     
      const { user, accessToken, refreshToken } = responseData.data;

      if (accessToken && refreshToken) {
        Cookies.set("accessToken", accessToken, { expires: 1 / 24 }); 
        Cookies.set("refreshToken", refreshToken, { expires: 7 });
      }

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
