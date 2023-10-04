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

import React, {useCallback} from 'react';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';
import {searchSalesOrders} from '../../../features/saleOrderSlice';

const SequenceSearchBar = ({onChange = () => {}, navigate = false}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingSaleOrder,
    moreLoadingSaleOrder,
    isListEndSaleOrder,
    saleOrderList,
  } = useSelector(state => state.saleOrder);

  const fetchSalesOrdersAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchSalesOrders({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={saleOrderList}
      value={''}
      onChangeValue={onChange}
      fetchData={fetchSalesOrdersAPI}
      displayValue={displayItemName}
      placeholder={I18n.t('Sales_Sequence')}
      loadingList={loadingSaleOrder}
      moreLoading={moreLoadingSaleOrder}
      isListEnd={isListEndSaleOrder}
      showDetailsPopup={false}
      oneFilter={true}
      navigate={navigate}
    />
  );
};

export default SequenceSearchBar;
