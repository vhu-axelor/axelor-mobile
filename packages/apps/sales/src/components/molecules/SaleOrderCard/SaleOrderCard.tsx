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
import {formatDate, useTranslator, useSelector} from '@axelor/aos-mobile-core';
import {ObjectCard, useThemeColor} from '@axelor/aos-mobile-ui';
import SaleOrder from '../../../types/sale-orders';

interface SaleOrderCardProps {
  style?: any;
  sequence: string;
  status: number;
  client: string;
  date: string;
  company: string;
  totalPrice: number;
  saleOrderType: number;
  onPress: () => void;
}

const SaleOrderCard = ({
  style,
  sequence,
  status,
  client,
  date,
  company,
  totalPrice,
  saleOrderType,
  onPress,
}: SaleOrderCardProps) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {user} = useSelector((state: any) => state.user);

  const borderStyle = useMemo(() => {
    return getStyles(SaleOrder.getStatusColor(status, Colors).background)
      ?.border;
  }, [Colors, status]);

  return (
    <ObjectCard
      onPress={onPress}
      showArrow={true}
      style={[borderStyle, style]}
      lowerTexts={{
        items: [
          {displayText: sequence, isTitle: true},
          {
            displayText: date
              ? formatDate(date, I18n.t('Base_DateFormat'))
              : null,
            hideIfNull: true,
          },
          {displayText: client, hideIfNull: true},
          {displayText: company, hideIfNull: true},
        ],
      }}
      sideBadges={{
        items: [
          {
            displayText: SaleOrder.getTypeName(saleOrderType, I18n),
            color: Colors.infoColor,
          },
          {
            displayText:
              String(totalPrice) + user?.activeCompany?.currency?.symbol,
            color: Colors.plannedColor,
          },
        ],
      }}
    />
  );
};

const getStyles = color =>
  StyleSheet.create({
    border: {
      borderLeftWidth: 7,
      borderLeftColor: color,
    },
  });

export default SaleOrderCard;
