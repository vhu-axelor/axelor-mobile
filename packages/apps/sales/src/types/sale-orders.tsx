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

import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';

class SalesOrders {
  static status = {
    Draft: 1,
    Finalized: 2,
    Confirmed: 3,
    Completed: 4,
  };

  static saleOrderType = {
    Standard: 1,
    Subscription: 2,
  };

  static getStatus = (select: number, I18n: TranslatorProps): string => {
    switch (select) {
      case this.status.Draft:
        return I18n.t('Sales_Status_Draft');
      case this.status.Finalized:
        return I18n.t('Sales_Status_Finalized');
      case this.status.Confirmed:
        return I18n.t('Sales_Status_Confirmed');
      case this.status.Completed:
        return I18n.t('Sales_Status_Completed');
      default:
        console.warn(
          `Status provided with value ${select} is not supported by sale orders`,
        );
        return null;
    }
  };

  static getStatusColor = (status: number, Colors: ThemeColors): Color => {
    switch (status) {
      case this.status.Draft:
        return Colors.secondaryColor;
      case this.status.Finalized:
        return Colors.progressColor;
      case this.status.Confirmed:
        return Colors.infoColor;
      case this.status.Completed:
        return Colors.primaryColor;
      default:
        console.warn(
          `Status provided with value ${status} is not supported by sale orders`,
        );
        return null;
    }
  };

  static getTypeName = (select: number, I18n: TranslatorProps): string => {
    switch (select) {
      case this.saleOrderType.Standard:
        return I18n.t('Sales_SaleOrderType_Standard');
      case this.saleOrderType.Subscription:
        return I18n.t('Sales_SaleOrderType_Subscription');
      default:
        console.warn(
          `SaleOrderType provided with value ${select} is not supported by sale orders`,
        );
        return null;
    }
  };

  static getTypeColor = (type: number, Colors: ThemeColors): Color => {
    switch (type) {
      case this.saleOrderType.Standard:
        return Colors.infoColor;
      case this.saleOrderType.Subscription:
        return Colors.successColor;
      default:
        console.warn(
          `SaleOrderType provided with value ${type} is not supported by sale orders`,
        );
        return null;
    }
  };
}

export default SalesOrders;
