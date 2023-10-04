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

import {FormConfigs} from '@axelor/aos-mobile-core';
import {ProductSearchBar, UnitSearchBar} from '../components';

export const sales_formsRegister: FormConfigs = {
  sales_saleOrderLine: {
    modelName: 'com.axelor.apps.sale.db.SaleOrderLine',
    fields: {
      product: {
        titleKey: 'Sales_Product',
        type: 'object',
        widget: 'custom',
        customComponent: ProductSearchBar,
        required: true,
      },
      qty: {
        titleKey: 'Sales_Qty',
        type: 'number',
        widget: 'increment',
        required: true,
      },
      unit: {
        titleKey: 'Sales_Unit',
        type: 'object',
        widget: 'custom',
        customComponent: UnitSearchBar,
        required: true,
      },
      expectedDeliveryDate: {
        titleKey: 'Sales_ExpectedDeliveryDate',
        type: 'date',
        widget: 'date',
      },
      description: {
        titleKey: 'Sales_Description',
        type: 'string',
        widget: 'default',
        options: {
          multiline: true,
          adjustHeightWithLines: true,
          style: {marginBottom: 180, width: '90%', alignSelf: 'center'},
        },
      },
    },
  },
};
