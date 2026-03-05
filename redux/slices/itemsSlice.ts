import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  item_name: string;
  item_image: string;
  category: string;
  description: string;
  ingredients: string;
  price: number;
}

export interface ItemsState {
  id: string;
  type: string;
  items: Item[];
}

const initialState: ItemsState[] = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getItems() {},
    getItemsSuccess: (_state, action: PayloadAction<ItemsState[]>) => {
      return [...action.payload];
    },
  },
});

export const { getItems, getItemsSuccess } = itemsSlice.actions;
export default itemsSlice.reducer;