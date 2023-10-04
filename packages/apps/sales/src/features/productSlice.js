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
import {searchProductsFilter} from '../api/product-api';

export const searchProducts = createAsyncThunk(
  'sales_product/searchProducts',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchProductsFilter,
      data,
      action: 'Sales_SliceAction_SearchProducts',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingProduct: false,
  moreLoadingProduct: false,
  isListEndProduct: false,
  productList: [],
};

const productSlice = createSlice({
  name: 'sales_product',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchProducts, {
      loading: 'loadingProduct',
      moreLoading: 'moreLoadingProduct',
      isListEnd: 'isListEndProduct',
      list: 'productList',
    });
  },
});

export const productReducer = productSlice.reducer;
