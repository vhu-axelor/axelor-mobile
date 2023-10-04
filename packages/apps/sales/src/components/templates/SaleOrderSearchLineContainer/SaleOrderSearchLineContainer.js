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

import React, {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  useDispatch,
  useNavigation,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {SaleOrderLineCard} from '../../templates';
import {SearchLineContainer} from '../../organisms';
import {fetchSaleOrderLines} from '../../../features/saleOrderLineSlice';
import {SalesOrders} from '../../../types';

const scanKey = 'unique-scan-key-04102023';

const SaleOrderSearchLineContainer = ({}) => {
  const I18n = useTranslator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {saleOrder} = useSelector(state => state.saleOrder);
  const {saleOrderLineList, totalNumberLines} = useSelector(
    state => state.saleOrderLine,
  );

  const handleNewLine = () => {
    navigation.navigate('SaleOrderLineFormScreen', {saleOrderId: saleOrder.id});
  };

  const handleViewAll = () => {
    console.log('OK');
  };

  const handleShowLine = () => {
    console.log('OK');
  };

  const handleLineSearch = item => {
    console.log('OK');
  };

  const fetchSaleOrderLinesAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(
        fetchSaleOrderLines({
          saleOrderId: saleOrder.id,
          searchValue,
          page: page,
        }),
      );
    },
    [dispatch, saleOrder],
  );

  const showLineAdditionIcon = useMemo(() => {
    if (
      saleOrder.statusSelect === SalesOrders.status.Draft ||
      saleOrder.statusSelect === SalesOrders.status.Finalized
    ) {
      return true;
    } else {
      return false;
    }
  }, [saleOrder]);

  return (
    <SearchLineContainer
      title={I18n.t('Sales_SaleOrderLines')}
      numberOfItems={totalNumberLines}
      objectList={saleOrderLineList}
      handleSelect={handleLineSearch}
      scanKey={scanKey}
      handleSearch={fetchSaleOrderLinesAPI}
      onViewPress={handleViewAll}
      showAction={showLineAdditionIcon}
      onAction={handleNewLine}
      renderItem={item => (
        <SaleOrderLineCard
          style={styles.item}
          productName={item?.productName}
          quantity={item?.qty}
          unit={item?.unit?.name}
          unitPrice={item?.price}
          onPress={() => handleShowLine(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 1,
    marginVertical: 4,
  },
});

export default SaleOrderSearchLineContainer;
