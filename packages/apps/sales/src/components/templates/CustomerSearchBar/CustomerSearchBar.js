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
import {filterCustomer} from '../../../features/customerSlice';

const CustomerSearchBar = ({
  defaultValue = '',
  navigate = false,
  onChange = () => {},
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingCustomer,
    moreLoadingCustomer,
    isListEndCustomer,
    customerList,
  } = useSelector(state => state.sales_customer);

  const fetchPartnerAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(filterCustomer({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={customerList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchPartnerAPI}
      displayValue={displayItemName}
      placeholder={I18n.t('Sales_Customer')}
      loadingList={loadingCustomer}
      moreLoading={moreLoadingCustomer}
      isListEnd={isListEndCustomer}
      showDetailsPopup={true}
      oneFilter={false}
      navigate={navigate}
    />
  );
};

export default CustomerSearchBar;
