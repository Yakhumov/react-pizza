import {  PayloadAction, createSlice } from "@reduxjs/toolkit"; 

 export type CartItem = {   
  id: string,
  title: string,
  price: number,
  count: number,
  imageUrl: string,   
  sizes:  number,
  types: string
}

interface cartSliceState  {
  totalPrice: number,
  totalCount: number
  items: CartItem[]   
}


const initialState: cartSliceState =  {
   totalPrice:0,
   totalCount:0,
   items: []
};

  export const cartSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
     addItems:(state, action: PayloadAction<CartItem>) =>{
       const findItem = state.items.find((obj) => obj.id == action.payload.id)     

       if(findItem){ 
         findItem.count++  
       }else{
         state.items.push({
            ...action.payload,   
            count:1
         })
       }
       state.totalPrice = state.items.reduce((sum, item) =>{  
         return item.price  *  item.count   + sum  
       },0) 
     },

     removeItems:(state, action: PayloadAction<string>)=>{
        state.items =  state.items.filter((obj)=> obj.id !== action.payload)
     },

     clearItems:(state) =>{
        state.items = []
        state.totalPrice = 0  
     },

     itemMinus:(state,action: PayloadAction<string>) =>{
       const findItem =  state.items.find((obj) => obj.id == action.payload)  
      if(findItem){
        findItem.count --  
      }
     }
  },
});

export const  {addItems,  removeItems, clearItems, itemMinus} = cartSlice.actions

export default cartSlice.reducer