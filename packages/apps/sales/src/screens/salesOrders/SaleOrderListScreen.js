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

import React, {useState, useMemo, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {
  ChipSelect,
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {
  filterList,
  useDispatch,
  useSelector,
  useTranslator,
  filterChip,
} from '@axelor/aos-mobile-core';
import {
  SequenceSearchBar,
  CustomerSearchBar,
  SaleOrderCard,
} from '../../components';
import SaleOrders from '../../types/sale-orders';
import {searchSalesOrders} from '../../features/saleOrderSlice';

const SaleOrderListScreen = ({navigation}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {
    loadingSaleOrder,
    moreLoadingSaleOrder,
    isListEndSaleOrder,
    saleOrderList,
  } = useSelector(state => state.saleOrder);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [partner, setPartner] = useState(null);

  const filterOnStatus = useCallback(
    list => {
      return filterChip(list, selectedStatus, 'statusSelect');
    },
    [selectedStatus],
  );

  const filteredList = useMemo(
    () =>
      filterOnStatus(
        filterList(saleOrderList, 'clientPartner', 'id', partner?.id ?? ''),
      ),
    [saleOrderList, partner, filterOnStatus],
  );

  const fetchSaleOrdersAPI = useCallback(
    (page = 0) => {
      dispatch(searchSalesOrders({page: page}));
    },
    [dispatch],
  );

  const showSaleOrderDetails = useCallback(
    saleOrder => {
      if (saleOrder != null) {
        navigation.navigate('SaleOrderDetailsScreen', {
          saleOrderId: saleOrder.id,
        });
      }
    },
    [navigation],
  );

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        chipComponent={
          <ChipSelect
            mode="switch"
            onChangeValue={chiplist => setSelectedStatus(chiplist)}
            width={Dimensions.get('window').width * 0.2}
            marginHorizontal={5}
            selectionItems={[
              {
                title: I18n.t('Sales_Status_Draft'),
                color: SaleOrders.getStatusColor(
                  SaleOrders.status.Draft,
                  Colors,
                ),
                key: SaleOrders.status.Draft,
              },
              {
                title: I18n.t('Sales_Status_Finalized'),
                color: SaleOrders.getStatusColor(
                  SaleOrders.status.Finalized,
                  Colors,
                ),
                key: SaleOrders.status.Finalized,
              },
              {
                title: I18n.t('Sales_Status_Confirmed'),
                color: SaleOrders.getStatusColor(
                  SaleOrders.status.Confirmed,
                  Colors,
                ),
                key: SaleOrders.status.Confirmed,
              },
              {
                title: I18n.t('Sales_Status_Completed'),
                color: SaleOrders.getStatusColor(
                  SaleOrders.status.Completed,
                  Colors,
                ),
                key: SaleOrders.status.Completed,
              },
            ]}
          />
        }>
        <SequenceSearchBar />
        <CustomerSearchBar onChange={setPartner} defaultValue={partner} />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingSaleOrder}
        data={filteredList}
        renderItem={({item}) => (
          <SaleOrderCard
            sequence={item.saleOrderSeq}
            client={item.clientPartner?.fullName}
            status={item.statusSelect}
            date={item.orderDate}
            company={item.company.name}
            totalPrice={item.totalCostPrice}
            saleOrderType={item.saleOrderTypeSelect}
            onPress={() => showSaleOrderDetails(item)}
          />
        )}
        fetchData={fetchSaleOrdersAPI}
        moreLoading={moreLoadingSaleOrder}
        isListEnd={isListEndSaleOrder}
        translator={I18n.t}
      />
    </Screen>
  );
};

export default SaleOrderListScreen;
