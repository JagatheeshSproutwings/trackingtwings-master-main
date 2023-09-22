import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "constants/AuthConstant";
import FirebaseService from "services/FirebaseService";
import AuthService from "services/AuthService";
import api, { setTokenInHeaders } from "configs/apiConfig";
import persistApi from "configs/persistedApi"

export const initialState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  token: localStorage.getItem("refresh_token") || null,
  user_info: localStorage.getItem("token")||{},
};

export const signIn = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.login({ email, password });

      if (response?.data?.status_code === 200) {
        const refresh_token = response.data.data.token;
        const role_id = response.data.data.user.role_id;
        const id = response.data.data.user.id;
        const user_name = response.data.data.user.name;
        const user_email = response.data.data.user.email;
        const token = response.data.data.user;
        const admin_id = response.data.data.user.admin_id;
        const distributor_id = response.data.data.user.distributor_id;
        const dealer_id = response.data.data.user.dealer_id;
        const subdealer_id = response.data.data.user.subdealer_id;

        console.log(token);
        localStorage.setItem("token", refresh_token);
        localStorage.setItem("role", role_id);
        localStorage.setItem("user_name", user_name);
        localStorage.setItem("id", id);
        localStorage.setItem("email", user_email);
        localStorage.setItem("admin_id", admin_id);
        localStorage.setItem("distributor_id", distributor_id);
        localStorage.setItem("dealer_id", dealer_id);
        localStorage.setItem("subdealer_id", subdealer_id);
        setTokenInHeaders();

        return { token, refresh_token };
      } else { 
        
        console.log(response);
        return rejectWithValue("Invalid Login Credentials");
      }
    } catch (err) {
      localStorage.removeItem("token");
      console.log(err.response);
      return rejectWithValue("Invalid Login Credentials");
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    const { email, password } = data;
    try {
      const response = await AuthService.register({ email, password });
      if (response.data.status_code === 200) {
        const token = response.data.data.user;
        const refresh_token = response.data.token;
        localStorage.setItem(AUTH_TOKEN, refresh_token);
        return token;
      } else {
        return rejectWithValue(response.message?.message || "Invalid Login Credentials");
      }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid Login Credentials");
    }
  }
);

export const signOut = createAsyncThunk("auth/logout", async () => {
  const response = await AuthService.signOut();
  //const response = await FirebaseService.signOutRequest()
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user_name");
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("user_info");
  setTokenInHeaders();
  return response.data;
});

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const signInWithFacebook = createAsyncThunk(
  "auth/signInWithFacebook",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.loginInOAuth();
      const token = response.data.token;
      localStorage.setItem(AUTH_TOKEN, token);
      return token;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, action) => {
      state.loading = false;
      state.redirect = "/dashboard";
      state.token = action.payload.refresh_token.refresh_token;
      state.user_info = action.payload.refresh_token.token;
    },
    showAuthMessage: (state, action) => {
      state.message = action.payload;
      state.showMessage = true;
      state.loading = false;
    },
    hideAuthMessage: (state) => {
      state.message = "";
      state.showMessage = false;
    },
    signOutSuccess: (state) => {
      state.loading = false;
      state.token = null;
      state.redirect = "/";
    },
    showLoading: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.user_info = action.payload.refresh_token.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/dashboard";
        state.token = action.payload.refresh_token;
        state.user_info = action.payload.token;
        console.log(action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.redirect = "/";
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
        state.token = null;
        state.redirect = "/";
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.token = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.token = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      })
      .addCase(signInWithFacebook.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithFacebook.fulfilled, (state, action) => {
        state.loading = false;
        state.redirect = "/";
        state.token = action.payload;
      })
      .addCase(signInWithFacebook.rejected, (state, action) => {
        state.message = action.payload;
        state.showMessage = true;
        state.loading = false;
      });
  },
});

export const {
  authenticated,
  showAuthMessage,
  hideAuthMessage,
  signOutSuccess,
  showLoading,
  signInSuccess,
} = authSlice.actions;

export default authSlice.reducer;
