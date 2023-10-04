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
import {StyleSheet, View} from 'react-native';
import {useTranslator, formatDate} from '@axelor/aos-mobile-core';
import {Badge, Text, useThemeColor} from '@axelor/aos-mobile-ui';
import SaleOrders from '../../../types/sale-orders';

const SaleOrderDetailsHeader = ({saleOrder}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        <View style={styles.headerTitle}>
          <Text writingType="title">{saleOrder.saleOrderSeq}</Text>
          <View style={styles.headerBadges}>
            <Badge
              color={SaleOrders.getTypeColor(
                saleOrder.saleOrderTypeSelect,
                Colors,
              )}
              title={SaleOrders.getTypeName(
                saleOrder.saleOrderTypeSelect,
                I18n,
              )}
            />
            <Badge
              color={SaleOrders.getStatusColor(saleOrder.statusSelect, Colors)}
              title={SaleOrders.getStatus(saleOrder.statusSelect, I18n)}
            />
          </View>
        </View>
        {saleOrder.orderDate && (
          <Text writingType="subtitle">
            {formatDate(saleOrder.orderDate, I18n.t('Base_DateFormat'))}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  headerInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerBadges: {
    flexDirection: 'row',
  },
});

export default SaleOrderDetailsHeader;
