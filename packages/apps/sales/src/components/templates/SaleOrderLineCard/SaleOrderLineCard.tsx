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

import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ObjectCard, useDigitFormat, useThemeColor} from '@axelor/aos-mobile-ui';
import {useSelector, useTranslator} from '@axelor/aos-mobile-core';

interface SaleOrderLineCardProps {
  style?: any;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  onPress: () => void;
}

const SaleOrderLineCard = ({
  style,
  productName,
  quantity,
  unit,
  unitPrice,
  onPress,
}: SaleOrderLineCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();
  const formatNumber = useDigitFormat();

  const {user} = useSelector((state: any) => state.user);

  const borderStyle = useMemo(() => {
    return getStyles(Colors.secondaryColor.background)?.border;
  }, [Colors]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: productName, isTitle: true},
          {
            displayText: formatNumber(quantity) + ' ' + unit,
            indicatorText: `${I18n.t('Sales_Qty')} :`,
          },
          {
            displayText:
              formatNumber(unitPrice) +
              user?.activeCompany?.currency?.symbol +
              '/' +
              unit,
            indicatorText: `${I18n.t('Sales_UnitPrice')} :`,
          },
        ],
      }}
    />
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    border: {
      borderWidth: 1.5,
      borderColor: color,
    },
  });

export default SaleOrderLineCard;
