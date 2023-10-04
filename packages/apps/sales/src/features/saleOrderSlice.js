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
  searchSalesOrdersFilter,
  getSaleOrder,
  modifyDescriptionSaleOrder,
  validateSaleOrder as _validateSaleOrder,
} from '../api/sale-order-api';

export const searchSalesOrders = createAsyncThunk(
  'saleOrder/searchSalesOrders',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchSalesOrdersFilter,
      data,
      action: 'Sales_SliceAction_SearchSalesOrders',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const getSaleOrderbyId = createAsyncThunk(
  'saleOrder/getSaleOrderbyId',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: getSaleOrder,
      data,
      action: 'Sales_SliceAction_GetSaleOrderbyId',
      getState,
      responseOptions: {isArrayResponse: false},
    });
  },
);

export const modifyDescription = createAsyncThunk(
  'saleOrder/modifyDescription',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: modifyDescriptionSaleOrder,
      data,
      action: 'Sales_SliceAction_ModifyDescription',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(object =>
      handlerApiCall({
        fetchFunction: getSaleOrder,
        data: {saleOrderId: object.id},
        action: 'Sales_SliceAction_GetSaleOrderbyId',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

export const validateSaleOrder = createAsyncThunk(
  'saleOrder/validateSaleOrder',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: _validateSaleOrder,
      data,
      action: 'Sales_SliceAction_ValidateSaleOrder',
      getState,
      responseOptions: {showToast: true, isArrayResponse: false},
    }).then(object =>
      handlerApiCall({
        fetchFunction: getSaleOrder,
        data,
        action: 'Sales_SliceAction_GetSaleOrderbyId',
        getState,
        responseOptions: {isArrayResponse: false},
      }),
    );
  },
);

const initialState = {
  loadingSaleOrder: false,
  moreLoadingSaleOrder: false,
  isListEndSaleOrder: false,
  saleOrderList: [],
  saleOrder: {},
};

const saleOrderSlice = createSlice({
  name: 'saleOrder',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchSalesOrders, {
      loading: 'loadingSaleOrder',
      moreLoading: 'moreLoadingSaleOrder',
      isListEnd: 'isListEndSaleOrder',
      list: 'saleOrderList',
    });
    builder.addCase(getSaleOrderbyId.pending, state => {
      state.loadingSaleOrder = true;
    });
    builder.addCase(getSaleOrderbyId.fulfilled, (state, action) => {
      state.loadingSaleOrder = false;
      state.saleOrder = action.payload;
    });
    builder.addCase(modifyDescription.pending, state => {
      state.loadingSaleOrder = true;
    });
    builder.addCase(modifyDescription.fulfilled, (state, action) => {
      state.loadingSaleOrder = false;
      state.saleOrder = action.payload;
    });
    builder.addCase(validateSaleOrder.pending, state => {
      state.loadingSaleOrder = true;
    });
    builder.addCase(validateSaleOrder.fulfilled, (state, action) => {
      state.loadingSaleOrder = false;
      state.saleOrder = action.payload;
    });
  },
});

export const saleOrderReducer = saleOrderSlice.reducer;
