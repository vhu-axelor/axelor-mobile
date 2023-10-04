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
import {FormView, useSelector} from '@axelor/aos-mobile-core';
import {createSaleOrderLine} from '../../features/saleOrderLineSlice';

const saleOrderLineSelect = {
  Standard: 0,
  Titre: 1,
};

const SaleOrderLineFormScreen = ({route, navigation}) => {
  const {saleOrderId} = route.params;

  const {saleOrder} = useSelector(state => state.saleOrder);

  const createSaleOrderLineAPI = useCallback(
    (objectState, dispatch) => {
      const dataToSend = {
        productName: objectState?.product?.name,
        qty: objectState?.qty,
        unit: objectState?.unit,
        saleOrder: saleOrder,
        typeSelect: saleOrderLineSelect.Standard,
        description: objectState?.description,
        estimatedDeliveryDate: objectState?.expectedDeliveryDate,
      };
      dispatch(
        createSaleOrderLine({
          saleOrderLine: dataToSend,
          saleOrderId: saleOrder?.id,
        }),
      );

      navigation.navigate('SaleOrderDetailsScreen', {
        saleOrderId: saleOrder.id,
      });
    },
    [navigation, saleOrder],
  );

  if (saleOrder?.id !== saleOrderId) {
    return null;
  }

  return (
    <FormView
      actions={[
        {
          key: 'create-sale-order-line',
          type: 'create',
          needValidation: true,
          needRequiredFields: true,
          customAction: ({dispatch, objectState}) => {
            return createSaleOrderLineAPI(objectState, dispatch);
          },
        },
      ]}
      formKey="sales_saleOrderLine"
    />
  );
};

export default SaleOrderLineFormScreen;
