import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { Sort } from './filterSlice';

export type SearchPizzaParams = {
	order:string, sortBy:string, category:string, search:string, currentPage:string
};
type Pizza = {title: string, price: number, imageUrl: string, sizes:number[], types:number[], id:number, rating: number};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
	
}

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus',async (params: SearchPizzaParams) => {
	const{order, sortBy, category, search, currentPage} = params;
	const {data} = await axios.get<Pizza[]>(`https://62d7c00c49c87ff2af3bebec.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);

	return data as Pizza[];   
})



interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}



export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
	setItems(state, action) {
		state.items = action.payload;
	},

  },
  extraReducers: (builder) => {
	builder.addCase(fetchPizzas.pending,(state, action) => {
		state.status = Status.LOADING
		state.items = [];
	});

	builder.addCase(fetchPizzas.fulfilled,(state, action) => {
		state.status = Status.SUCCESS
		state.items = action.payload;
	});

	builder.addCase(fetchPizzas.rejected,(state, action) => {
		state.status = Status.ERROR
		state.items = [];
	});
  }
})

export const selectPizza = (state:RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer