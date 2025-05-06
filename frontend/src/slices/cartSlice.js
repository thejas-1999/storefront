import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("/api/cart");
  return response.data;
});

export const addOrUpdateCart = createAsyncThunk(
  "cart/addOrUpdateCart",
  async ({ productId, quantity }) => {
    const response = await axios.post("/api/cart", { productId, quantity });
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrUpdateCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;

        const index = state.items.findIndex(
          (item) => item.productId === updatedItem.productId
        );

        if (index !== -1) {
          state.items[index].quantity = updatedItem.quantity;
        } else {
          state.items.push(updatedItem);
        }
      });
  },
});

export default cartSlice.reducer;
