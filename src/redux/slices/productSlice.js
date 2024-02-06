import { createSlice } from '@reduxjs/toolkit';
import data from '../../products.json';

const initialState = {
  products: data,//полный продукт
  cart: JSON.parse(localStorage.getItem('sopping-cart')) || [],//корзина
  open: false,//модальный окно
}

export const productSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {//list.js тен --> карзинага кошотурган функция
      const newItem = state.products.find(item=>item.id===action.payload);
      state.cart = [newItem, ...state.cart]
      //find - ошол IDни тандайт
    },
    deleteItem: (state, action) => {//карзинадан очуротурган функция
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    openToggleModal:(state, action)=> {
      state.open = action.payload // true или false
    },
    removeCart:(state) => {//оформление заказа болгодон кийин
      localStorage.removeItem('sopping-cart')//хранилища очуробуз
      state.cart = [] // кайра пустой массив кылабыз
    }
  },
})


export const {addToCart, deleteItem, openToggleModal, removeCart } = productSlices.actions

export default productSlices.reducer