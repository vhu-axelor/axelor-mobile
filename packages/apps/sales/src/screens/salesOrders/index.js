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

import SaleOrderListScreen from './SaleOrderListScreen';
import SaleOrderDetailsScreen from './SaleOrderDetailsScreen';
import SaleOrderLineFormScreen from './SaleOrderLineFormScreen';

export default {
  SaleOrdersListScreen: {
    title: 'Sales_SalesOrders',
    component: SaleOrderListScreen,
    options: {
      shadedHeader: false,
    },
  },
  SaleOrderDetailsScreen: {
    title: 'Sales_SaleOrderDetails',
    component: SaleOrderDetailsScreen,
    actionID: 'sales_saleOrders_saleOrderDetails',
  },
  SaleOrderLineFormScreen: {
    title: 'Sales_SaleOrderLineFormScreen',
    component: SaleOrderLineFormScreen,
    actionID: 'sales_saleOrders_saleOrderLineForm',
  },
};
