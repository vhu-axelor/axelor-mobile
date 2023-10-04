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

import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {
  Screen,
  HeaderContainer,
  EditableInput,
  Text,
  ScrollView,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';
import {
  SaleOrderDetailsHeader,
  SaleOrderLabelTextList,
  SaleOrderDetailsValidateButton,
  SaleOrderSearchLineContainer,
} from '../../components';
import {
  getSaleOrderbyId,
  modifyDescription,
} from '../../features/saleOrderSlice';

const SaleOrderDetailsScreen = ({route}) => {
  const {saleOrderId} = route.params;
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {saleOrder} = useSelector(state => state.saleOrder);

  useEffect(() => {
    dispatch(getSaleOrderbyId({saleOrderId: saleOrderId}));
  }, [dispatch, saleOrderId]);

  const handleDescriptionChange = useCallback(
    input => {
      dispatch(
        modifyDescription({
          saleOrderId: saleOrder?.id,
          description: input.toString(),
          version: saleOrder?.version,
        }),
      );
    },
    [dispatch, saleOrder],
  );

  if (saleOrder?.id !== saleOrderId) {
    return null;
  }

  return (
    <Screen
      removeSpaceOnTop={true}
      fixedItems={<SaleOrderDetailsValidateButton />}>
      <HeaderContainer
        fixedItems={<SaleOrderDetailsHeader saleOrder={saleOrder} />}
        expandableFilter={false}
      />
      <ScrollView>
        <SaleOrderLabelTextList />
        <SaleOrderSearchLineContainer />
        <Text writingType="title" style={styles.title}>
          {I18n.t('Sales_Comment')}
        </Text>
        <EditableInput
          onValidate={input => handleDescriptionChange(input)}
          defaultValue={saleOrder?.description}
          multiline={true}
          numberOfLines={3}
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 16,
  },
});

export default SaleOrderDetailsScreen;
