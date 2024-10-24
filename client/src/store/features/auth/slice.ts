import { SignUpSchemaType } from "@/components/auth/form/signup";
import ApiClient from "@/lib/ApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginSchemaType } from "@/components/auth/form/login";
import { AxiosError } from "axios";

interface Auth {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: null | {
    message: string;
    success: boolean;
    data: {
      _id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

const initialState: Auth = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData: SignUpSchemaType) => {
    try {
      const response = await ApiClient.post("/auth/signup", formData);
      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) throw error;
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData: LoginSchemaType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post("/auth/login", formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "/user/get",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get("/user/get");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await ApiClient.get("/auth/logout");
  return response.data;
});

export const refreshUserToken = createAsyncThunk(
  "/auth/refresh-token",
  async () => {
    const response = await ApiClient.get("/auth/refresh-token");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // redux reguser handler
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
    // redux login handler
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
    // redux user handler
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
    // redux logout handler
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(refreshUserToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
