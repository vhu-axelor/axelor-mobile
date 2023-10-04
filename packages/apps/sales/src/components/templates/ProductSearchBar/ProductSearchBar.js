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

import React, {useCallback} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {
  AutoCompleteSearch,
  FormInput,
  Text,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchProducts} from '../../../features/productSlice';

const ProductSearchBar = ({
  title = 'Sales_Product',
  defaultValue = null,
  onChange = () => {},
  showDetailsPopup = true,
  oneFilter = false,
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {productList, loadingProduct, moreLoadingProduct, isListEndProduct} =
    useSelector(state => state.sales_product);

  const fetchProductsAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchProducts({page, searchValue}));
    },
    [dispatch],
  );

  if (readonly) {
    return (
      <FormInput
        title={I18n.t(title)}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }

  return (
    <View style={[Platform.OS === 'ios' ? styles.container : null]}>
      <Text style={styles.title}>{I18n.t(title)}</Text>
      <AutoCompleteSearch
        objectList={productList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={fetchProductsAPI}
        displayValue={displayItemName}
        placeholder={I18n.t(title)}
        showDetailsPopup={showDetailsPopup}
        loadingList={loadingProduct}
        moreLoading={moreLoadingProduct}
        isListEnd={isListEndProduct}
        oneFilter={oneFilter}
        style={
          required && !defaultValue
            ? {borderColor: Colors.errorColor.background}
            : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginHorizontal: 30,
  },
  container: {
    zIndex: 41,
  },
});

export default ProductSearchBar;
