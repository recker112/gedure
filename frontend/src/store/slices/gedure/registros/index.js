import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  filterBox: false,
  filters: {
    type: 'all'
  },
  countFilters: 0,
};

const getData = () => {};

export const registrosSlices = createSlice({
  name: "registros",
  initialState,
  reducers: {
    setFilterBox: (state, action) => {
      state.filterBox = action.payload;
    },
    setFilters: (state, action) => {
      let data = action.payload;
      let count = 0;
      let keys = Object.keys(data);

      // NOTA(RECKER): Contador de filtros activos
      keys.map(key => {
        if (data[key] !== initialState.filters[key]) {
          count++;
        } else {
          count -= count > 0 ? -1 : 0;
        }
      })

      state.filters = action.payload;
      state.countFilters = count;
    }
  },
  extraReducers: {
    [getData.pending]: state => {
      state.value = 'LOADING';
    },
    [getData.rejected]: (state, action) => {
      state.value = 'ERROR';
      console.log(action);
    },
    [getData.fulfilled]: (state, action) => {
      state.value = 'FINITO';
      console.log(action);
    }
  }
});

export default registrosSlices.reducer;

export const { setFilterBox, setFilters } = registrosSlices.actions;