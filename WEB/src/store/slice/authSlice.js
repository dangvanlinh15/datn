import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { storage1 } from "../../service/storage";

const initialState = {
  loading: false,
  code: 200,
  message: "",
  user: {
    firstName: "",
    lastName: "",
    role: "",
    phoneNumber: "",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async (params, thunkAPI) => {
    const data = {
      email: params.phoneNumber,
      passWord: params.password,
    };
    try {
      const res = await axiosClient("post", "/auth/login", data);
      // console.log(res)
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params, thunkAPI) => {
    const data = {
      phone: params.phoneNumber,
      passWord: params.password,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email,
      citizenIdentification: params.citizenIdentification,
      location: params.location,
      role: "user",
    };
    try {
      const res = await axiosClient("post", "/auth/registerUser", data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getInfoUser = createAsyncThunk(
  "auth/getInfo",
  async (params, thunkAPI) => {
    try {
      const res = await axiosClient("get", "api/v1/auth/info");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logout = () => {
  storage1.removeItem("token");
  storage1.removeItem("email");
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
        console.log(action.payload)
        storage1.setItem("token", action.payload.email);
        storage1.setItem("email", action.payload.email);
        storage1.setItem("firstName", action.payload.firstName);
        storage1.setItem("lastName", action.payload.lastName);
        storage1.setItem("phone", action.payload.phone);
        storage1.setItem("citizenIdentification", action.payload.citizenIdentification);
        storage1.setItem("location", action.payload.location);
        // state.user.firstName = action.payload.data.firstName;
        // state.user.lastName = action.payload.data.lastName;
        // state.user.username = action.payload.data.username;
        // state.user.role = action.payload.data.role;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
      })
      .addCase(getInfoUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInfoUser.rejected, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
      })
      .addCase(getInfoUser.fulfilled, (state, action) => {
        state.loading = false;
        state.code = action.payload.code;
        state.message = action.payload.message;
        state.user.firstName = action.payload.data.firstName;
        state.user.lastName = action.payload.data.lastName;
        state.user.username = action.payload.data.username;
        state.user.role = action.payload.data.role;
      });
  },
});

export default authSlice.reducer;
