import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@/api/utils';
import {
  searchClientsFilter,
  searchSuppliersFilter,
} from '@/modules/stock/api/partner-api';

export const filterClients = createAsyncThunk(
  'partners/filterClients',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchClientsFilter},
      data,
      'filter clients',
      {getState},
      {array: true},
    );
  },
);

export const filterSuppliers = createAsyncThunk(
  'partners/filterSuppliers',
  async function (data, {getState}) {
    return handlerApiCall(
      {fetchFunction: searchSuppliersFilter},
      data,
      'filter suppliers',
      {getState},
      {array: true},
    );
  },
);

const initialState = {
  loadingPartners: false,
  clientList: [],
  supplierList: [],
};

const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  extraReducers: builder => {
    builder.addCase(filterClients.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(filterClients.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.clientList = action.payload;
    });
    builder.addCase(filterSuppliers.pending, state => {
      state.loadingPartners = true;
    });
    builder.addCase(filterSuppliers.fulfilled, (state, action) => {
      state.loadingPartners = false;
      state.supplierList = action.payload;
    });
  },
});

export const partnerReducer = partnerSlice.reducer;
