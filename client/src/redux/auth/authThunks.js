// src/redux/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", credentials);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || "Login failed");
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/profile");
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/logout");
      return res.data;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);
