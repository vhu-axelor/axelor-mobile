/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2023 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {
  searchSaleOrderLines,
  createSaleOrderLine as _createSaleOrderLine,
} from '../api/sale-order-line-api';

export const fetchSaleOrderLines = createAsyncThunk(
  'saleOrderLine/fetchSaleOrderLines',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSaleOrderLines,
      data,
      action: 'Sales_SliceAction_FetchSaleOrderLines',
      getState,
      responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
    });
  },
);

export const createSaleOrderLine = createAsyncThunk(
  'saleOrderLine/createSaleOrderLine',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _createSaleOrderLine,
      data,
      action: 'Sales_SliceAction_CreateSaleOrderLine',
      getState,
      responseOptions: {isArrayResponse: false, showToast: true},
    }).then(res => {
      console.log('Line ID: ', res.id);
      return handlerApiCall({
        fetchFunction: searchSaleOrderLines,
        data,
        action: 'Sales_SliceAction_FetchSaleOrderLines',
        getState,
        responseOptions: {isArrayResponse: true, resturnTotalWithData: true},
      });
    });
  },
);

const initialState = {
  loadingSOLines: false,
  moreLoading: false,
  isListEnd: false,
  saleOrderLineList: [],
  totalNumberLines: 0,
};

const SaleOrderLineSlice = createSlice({
  name: 'saleOrderLine',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(
      builder,
      fetchSaleOrderLines,
      {
        loading: 'loadingSOLines',
        moreLoading: 'moreLoading',
        isListEnd: 'isListEnd',
        list: 'saleOrderLineList',
        total: 'totalNumberLines',
      },
      {
        manageTotal: true,
      },
    );
    builder.addCase(createSaleOrderLine.pending, (state, action) => {
      state.loadingSOLines = true;
    });
    builder.addCase(createSaleOrderLine.fulfilled, (state, action) => {
      state.loadingSOLines = false;
      state.saleOrderLineList = action.payload.data;
      state.totalNumberLines = action.payload.total;
    });
  },
});

export const saleOrderLineReducer = SaleOrderLineSlice.reducer;
