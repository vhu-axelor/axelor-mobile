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

import {Module} from '@axelor/aos-mobile-core';
import SaleOrdersScreens from './screens/salesOrders';
import enTranslations from './i18n/en.json';
import frTranslations from './i18n/fr.json';
import * as salesReducers from './features';
import {
  sales_modelAPI,
  sales_searchFields,
  sales_formsRegister,
  sales_sortFields,
} from './models';
import {useSalesHeaders} from './hooks/use-sales-header-actions';

export const SalesModule: Module = {
  name: 'app-sales',
  title: 'Sales_Sales',
  subtitle: 'Sales_Sales',
  icon: 'chart-line',
  compatibilityAOS: {
    moduleName: 'axelor-sale',
    downToVersion: '7.1.0',
  },
  menus: {
    sales_menu_saleOrder: {
      title: 'Sales_SalesOrders',
      icon: 'shopping-cart',
      screen: 'SaleOrdersListScreen',
    },
  },
  screens: {
    ...SaleOrdersScreens,
  },
  translations: {
    en: enTranslations,
    fr: frTranslations,
  },
  reducers: {
    ...salesReducers,
  },
  models: {
    formsRegister: {...sales_formsRegister},
    objectFields: {...sales_modelAPI},
    searchFields: {...sales_searchFields},
    sortFields: {...sales_sortFields},
    headerRegisters: useSalesHeaders,
  },
};

export * from './components';

export * from './types';
export * from './api';
