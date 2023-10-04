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

import {useEffect} from 'react';
import {headerActionsProvider, useSelector} from '@axelor/aos-mobile-core';

const useSaleOrderDetailsActions = () => {
  const {mobileSettings} = useSelector((state: any) => state.config);
  const {saleOrder} = useSelector((state: any) => state.saleOrder);

  useEffect(() => {
    headerActionsProvider.registerModel('sales_saleOrder_saleOrderDetails', {
      model: 'com.axelor.apps.sale.db.SaleOrder',
      modelId: saleOrder?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageEnabled,
      attachedFileScreenTitle: saleOrder?.saleOrderSeq,
    });
  }, [mobileSettings, saleOrder]);
};

export const useSalesHeaders = () => {
  useSaleOrderDetailsActions();
};
