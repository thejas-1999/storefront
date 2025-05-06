import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch the cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get("/api/cart");
  return response.data;
});

// Add or update an item in the cart
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

        // Debug log (optional)
        console.log("Cart items before update:", state.items);
        console.log("Incoming item:", updatedItem);

        const index = state.items.findIndex(
          (item) =>
            item?.productId?.toString?.() ===
            updatedItem?.productId?.toString?.()
        );

        if (index !== -1) {
          state.items[index].quantity = updatedItem.quantity;
        } else {
          state.items.push({
            ...updatedItem,
            productId: updatedItem.productId,
          });
        }
      });
  },
});

export default cartSlice.reducer;
