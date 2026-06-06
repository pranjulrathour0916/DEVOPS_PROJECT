import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    show : "from reduc"
}

export const navSlice = createSlice({
    name: 'navdisp',
    initialState,
    reducers : {
        ctrlNav : (state) =>{
            state.show = "from redux";
            console.log("this works")
        }
    } 
})

export const {ctrlNav} = navSlice.actions

export default navSlice.reducer