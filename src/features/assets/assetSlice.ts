// features/assets/assetsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Asset {
  id: string;
  name: string;
  type: string;
  status: "active" | "maintenance" | "retired";
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
}

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetsState = {
  assets: [],
  loading: false,
  error: null,
};

const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export default assetsSlice.reducer;
