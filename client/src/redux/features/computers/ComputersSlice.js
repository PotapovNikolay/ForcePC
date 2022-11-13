import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";


const initialState = {

    computers: [],
    loading: false,
}

export const getComputers = createAsyncThunk('computers/getComputers', async () => {

    try {

        const {data} = await axios.get('/store')
        return data
    } catch (e) {

        console.log(e)
    }
})

export const computersSlice = createSlice({

    name: 'computers',
    initialState,
    reducers: {},
    extraReducers: {
        [getComputers.pending]: (state) => {

            state.loading = true
        },
        [getComputers.fulfilled]: (state, action) => {

            state.loading = false
            console.log(action.payload)
            state.computers = action.payload
        },
        [getComputers.rejected]: (state) => {

            state.loading = false
        }
    }
})

export default computersSlice.reducer