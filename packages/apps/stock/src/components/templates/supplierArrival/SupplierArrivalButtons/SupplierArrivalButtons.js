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

import React from 'react';
import {Button, useThemeColor} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useNavigation,
  useTranslator,
} from '@axelor/aos-mobile-core';
import StockMove from '../../../../types/stock-move';
import {realizeSupplierArrival} from '../../../../features/supplierArrivalSlice';

const SupplierArrivalButtons = ({supplierArrival}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRealize = () => {
    dispatch(
      realizeSupplierArrival({
        version: supplierArrival.version,
        stockMoveId: supplierArrival.id,
      }),
    );
    navigation.popToTop();
  };

  if (supplierArrival.statusSelect !== StockMove.status.Realized) {
    return (
      <Button
        onPress={handleRealize}
        color={Colors.successColor}
        title={I18n.t('Base_Realize')}
      />
    );
  }

  return null;
};

export default SupplierArrivalButtons;
