import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  sizes: [];
  type: [];
  count: number;
  imageUrl: string;
}


interface PizzaSliceState {
  items: PizzaItem []  
}

const initialState: PizzaSliceState = {
  items: []  
};

export const fetchPizza = createAsyncThunk<PizzaItem[],Record<string,string>>("fetch/pizza", async (params) => {
  try {
    const { pageCount, category, sortBy, search, order } = params;
    const { data } = await axios.get (
      `https://640a2f9d81d8a32198c303be.mockapi.io/items?page=${pageCount}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data
  } catch (error) {
    console.log(error);   
  }
});

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (biulder) => {
    biulder.addCase(fetchPizza.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});
export default pizzaSlice.reducer;
