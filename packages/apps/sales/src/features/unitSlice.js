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
import {searchUnitFilter} from '../api/unit-api';

export const searchUnit = createAsyncThunk(
  'sales_unit/searchUnit',
  async function (data = {}, {getState}) {
    return handlerApiCall({
      fetchFunction: searchUnitFilter,
      data,
      action: 'Sales_SliceAction_searchUnit',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingUnit: false,
  moreLoadingUnit: false,
  isListEndUnit: false,
  unitList: [],
};

const unitSlice = createSlice({
  name: 'sales_unit',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, searchUnit, {
      loading: 'loadingUnit',
      moreLoading: 'moreLoadingUnit',
      isListEnd: 'isListEndUnit',
      list: 'unitList',
    });
  },
});

export const unitReducer = unitSlice.reducer;
