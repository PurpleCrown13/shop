
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    name: string;
    size: string;
    image: string;
    price: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload);
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
