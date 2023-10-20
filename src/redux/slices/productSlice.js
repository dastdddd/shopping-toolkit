import { createSlice } from '@reduxjs/toolkit';
import data from '../../products.json';

const initialState = {
  products: data,
  cart: JSON.parse(localStorage.getItem('sopping-cart')) || [],
  open: false,
}

export const productSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {//карзинага кошотурган функция
      const newItem = state.products.find(item=>item.id===action.payload);
      state.cart = [newItem, ...state.cart]
      //find - ошол IDни тандайт
    },
    deleteItem: (state, action) => {//карзинадан очуротурган функция
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    openToggleModal:(state, action)=> {
      state.open = action.payload
    },
    removeCart:(state) => {
      localStorage.removeItem('sopping-cart')
      state.cart = []
    }
  },
})


export const {addToCart, deleteItem, openToggleModal, removeCart } = productSlices.actions

export default productSlices.reducer