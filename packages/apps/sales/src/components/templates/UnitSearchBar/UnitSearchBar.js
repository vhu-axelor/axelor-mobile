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
  Text,
  FormInput,
  useThemeColor,
} from '@axelor/aos-mobile-ui';
import {searchUnit} from '../../../features/unitSlice';

const UnitSearchBar = ({
  title = 'Sales_Unit',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  oneFilter = false,
  required = false,
  readonly = false,
}) => {
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const {unitList, loadingUnit, moreLoadingUnit, isListEndUnit} = useSelector(
    state => state.sales_unit,
  );

  const fetchUnitAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(searchUnit({page, searchValue}));
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
        objectList={unitList}
        value={defaultValue}
        onChangeValue={onChange}
        fetchData={fetchUnitAPI}
        displayValue={displayItemName}
        placeholder={I18n.t(title)}
        showDetailsPopup={showDetailsPopup}
        loadingList={loadingUnit}
        moreLoading={moreLoadingUnit}
        isListEnd={isListEndUnit}
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

export default UnitSearchBar;
