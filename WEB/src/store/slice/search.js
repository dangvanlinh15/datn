import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../service/axiosClient";

const initialState = {
    listProvince: [],
    listDistrict: [],
    listWard: [],
    list: [],
    currentProvince: "",
    currentDistrict: "",
    currentWard: "",
    currentStreet: "",
    loading: "",
    error: "",
};

const addressSelectReducer = createSlice({
    name: "addressSelect",
    initialState,
    reducers: {},
});

const getAllProvince = createAsyncThunk(
    "addressSelect/getAllProvince",
    (params, thunkAPI) => {
        const res = axiosClient("get", "/provinces/getAll");
    }
);
