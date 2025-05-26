import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import toast from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/products");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch product"
      );
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/products", data);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to create product");
      return rejectWithValue(
        err.response?.data?.error || "Failed to create product"
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/products/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to update product"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/products/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to delete product"
      );
    }
  }
);
