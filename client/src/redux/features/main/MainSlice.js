import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    computers: [],
    reviews: [],
    classification: [],
    grades: [],
    cases:[],
    customSlider: [10000, 200000],
    menu: false,
    loading: false,
}

export const getAllItems = createAsyncThunk('main/getAllItems', async () => {
    try {
        const {data} = await axios.get('/')
        return data
    } catch (e) {
        console.log(e)
    }
})



export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        handleMenu: (state, action) => {
            state.menu = action.payload
        },
        handleSlide: (state, action) => {
            state.customSlider = action.payload
        }
    },
    extraReducers: {
        [getAllItems.pending]: (state) => {
            state.loading = true
        },
        [getAllItems.fulfilled]: (state, action) => {
            state.loading = false
            state.computers = action.payload.computers
            state.reviews = action.payload.reviews
            state.classification = action.payload.classification
            state.grades = action.payload.grades
            state.cases = action.payload.cases
        },
        [getAllItems.rejected]: (state) => {
            state.loading = false
        },


    }
})

export const {handleMenu, handleSlide} = mainSlice.actions

export default mainSlice.reducer