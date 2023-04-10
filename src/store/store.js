import { configureStore, createSlice } from '@reduxjs/toolkit'
import {useState,useEffect} from 'react'

//컴포넌트간 state 공유 props 필요없
const fetchProducts = () => {
    return async (dispatch) => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      dispatch(products.actions.changeList(data));
    };
  };

let stock = createSlice({
    name: 'stock',
    initialState: [10,11,12]
})
let cart = createSlice({
    name : 'cart',
    initialState : [
      {id : 0, name : 'White and Black', count : 2},
      {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        increase(state, action){
          let number = state.findIndex(
            (a)=>a.id == action.payload
          )
            state[number].count++
           
          },
        decrease(state, id){
          if(state[id.payload].count == 0){
            return
          }
          state[id.payload].count--
        },
        addItem(state,action){
          state.push(action.payload)
        }
    }
  })
let products = createSlice({
    name: 'products',
    initialState:[],
    reducers: {
        changeList: (state, action) => {
            return action.payload;
          },
    }
})

export let {increase,decrease,addItem} = cart.actions
export default configureStore({
    reducer: { 
        stock: stock.reducer,
        products: products.reducer,
        cart: cart.reducer
    },
}) 
  