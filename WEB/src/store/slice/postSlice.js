import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

const initialState = {
  listItem: [],
  pageNumber: 0,
  totalPages: 0,
  pageSize: 0,
  item: {},
  listRecommendation: [],
};

export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  async (params, thunkAPI) => {
    try {
      const rest = await axiosClient("post", "posts/findPage", params, {});
      // console.log(rest.data);
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFindPost = createAsyncThunk(
  "post/getFindPost",
  async (params, thunkAPI) => {
    try {
      const rest = await axiosClient("post", "posts/findByTitle", params, {});
      console.log("rest.data");
      console.log(rest.data);
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSearchPost = createAsyncThunk(
  "post/getSearchPost",
  async (params, thunkAPI) => {
    try {
      const rest = await axiosClient("post", "posts/search", params, {});
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (params, thunkAPI) => {
    // console.log(params);
    try {
      const rest = await axiosClient("get", `posts/find/${params}`);
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getListRecommendation = createAsyncThunk(
  "post/getListRecommendation",
  async (params, thunkAPI) => {
    const data = {
      title: params.title,
      description: params.description,
      province: params.province,
    };
    console.log("gợi ý");

    console.log(params);
    try {
      const rest = await axiosClient(
        "post",
        "post_data",
        data,
        {},
        "http://localhost:5000"
      );
      console.log("gợi ý 1");
      console.log(rest.data);
      return rest.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPost.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
        console.log(action.payload);
        state.listItem = action.payload.content;
        state.pageNumber = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
        // state.listItem = action.payload.data.content;
        // state.pageNumber = action.payload.data.pageable.pageNumber;
        // state.pageSize = action.payload.data.pageable.pageSize;
        // state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getFindPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFindPost.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
      })
      .addCase(getFindPost.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
        console.log(action.payload);
        state.listItem = action.payload.content;
        state.pageNumber = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
        // state.listItem = action.payload.data.content;
        // state.pageNumber = action.payload.data.pageable.pageNumber;
        // state.pageSize = action.payload.data.pageable.pageSize;
        // state.totalPages = action.payload.data.totalPages;
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.code = action.payload.code;
        state.item = action.payload;
        console.log(action.payload);
      })
      .addCase(getListRecommendation.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListRecommendation.fulfilled, (state, action) => {
        state.loading = false;
        state.listRecommendation = action.payload;
        console.log("action.payload");
        console.log(action.payload);
      })
      .addCase(getSearchPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSearchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.listItem = action.payload.content;
        state.pageNumber = action.payload.pageable.pageNumber;
        state.pageSize = action.payload.pageable.pageSize;
        state.totalPages = action.payload.totalPages;
      });
  },
});

// export const {  } = postSlice.actions

export default postSlice.reducer;
