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

import {
  axiosApiProvider,
  createStandardFetch,
  createStandardSearch,
  getSearchCriterias,
} from '@axelor/aos-mobile-core';

const createSearchCriteria = searchValue => {
  return [getSearchCriterias('sales_order', searchValue)];
};

export async function searchSalesOrdersFilter({searchValue, page = 0}) {
  return createStandardSearch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    criteria: createSearchCriteria(searchValue),
    fieldKey: 'sales_order',
    sortKey: 'sales_order',
    page,
  });
}

export async function getSaleOrder({saleOrderId}) {
  return createStandardFetch({
    model: 'com.axelor.apps.sale.db.SaleOrder',
    id: saleOrderId,
    fieldKey: 'sales_order',
  });
}

export async function modifyDescriptionSaleOrder({
  saleOrderId,
  description,
  version,
}) {
  return axiosApiProvider.post({
    url: `/ws/rest/com.axelor.apps.sale.db.SaleOrder/${saleOrderId}`,
    data: {
      data: {
        id: saleOrderId,
        description: description,
        version: version,
      },
    },
  });
}

export async function validateSaleOrder({saleOrderId, version}) {
  return axiosApiProvider.put({
    url: '/ws/aos/sale-order/confirm',
    data: {
      saleOrderId: saleOrderId,
      version: version,
    },
  });
}
