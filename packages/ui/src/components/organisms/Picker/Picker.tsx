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

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useThemeColor} from '../../../theme/ThemeContext';
import {getCommonStyles} from '../../../utils/commons-styles';
import {Icon, Text} from '../../atoms';
import {FormInput, SelectionContainer, RightIconButton} from '../../molecules';
import {getFromList} from '../../../utils/list';
import {
  OUTSIDE_INDICATOR,
  useClickOutside,
} from '../../../hooks/use-click-outside';
import {ThemeColors} from '../../../theme';

const ITEM_HEIGHT = 40;

interface PickerProps {
  style?: any;
  pickerStyle?: any;
  styleTxt?: any;
  title: string;
  onValueChange: (any) => void;
  defaultValue?: string;
  listItems: any[];
  labelField: string;
  valueField: string;
  emptyValue?: boolean;
  isValueItem?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  disabledValue?: string;
  required?: boolean;
  isScrollViewContainer?: boolean;
}

const Picker = ({
  style,
  pickerStyle,
  styleTxt,
  title,
  onValueChange,
  defaultValue = '',
  listItems,
  labelField,
  valueField,
  emptyValue = true,
  isValueItem = false,
  disabled = false,
  readonly = false,
  disabledValue = null,
  required = false,
  isScrollViewContainer = false,
}: PickerProps) => {
  const Colors = useThemeColor();

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    !isValueItem
      ? getFromList(listItems, valueField, defaultValue)
      : defaultValue,
  );

  const wrapperRef = useRef(null);
  const clickOutside = useClickOutside({
    wrapperRef,
    visible: isOpen,
  });

  useEffect(() => {
    setSelectedItem(
      !isValueItem
        ? getFromList(listItems, valueField, defaultValue)
        : defaultValue,
    );
  }, [defaultValue, isValueItem, listItems, valueField]);

  useEffect(() => {
    if (clickOutside === OUTSIDE_INDICATOR && isOpen) {
      setIsOpen(false);
      setIsFocused(false);
    }
  }, [clickOutside, isOpen]);

  const togglePicker = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isFocused);
  };

  const handleValueChange = itemValue => {
    setIsOpen(false);
    setIsFocused(false);
    setSelectedItem(itemValue);
    itemValue
      ? onValueChange(
          isValueItem
            ? getFromList(listItems, valueField, itemValue[valueField])
            : itemValue[valueField],
        )
      : onValueChange(itemValue);
  };

  const marginBottom = useMemo(() => {
    const listLength = listItems?.length ?? 0;

    if (isScrollViewContainer && isOpen) {
      return emptyValue
        ? listLength * ITEM_HEIGHT + ITEM_HEIGHT + 5
        : listLength * ITEM_HEIGHT + 5;
    }

    return null;
  }, [emptyValue, isScrollViewContainer, listItems, isOpen]);

  const _readonly = useMemo(() => disabled || readonly, [disabled, readonly]);

  const _required = useMemo(
    () => required && selectedItem == null,
    [required, selectedItem],
  );

  const commonStyles = useMemo(
    () => getCommonStyles(Colors, _required),
    [Colors, _required],
  );

  const styles = useMemo(
    () => getStyles(Colors, _required, marginBottom, isOpen),
    [Colors, _required, marginBottom, isOpen],
  );

  if (_readonly) {
    return (
      <FormInput
        style={[styles.container, style]}
        title={title}
        defaultValue={disabledValue || ''}
        readOnly
      />
    );
  }

  return (
    <View
      ref={wrapperRef}
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.containerZIndex : null,
        style,
      ]}>
      {title && <Text style={[styles.title, styleTxt]}>{title}</Text>}
      <RightIconButton
        onPress={togglePicker}
        icon={
          <Icon
            name="chevron-down"
            color={Colors.secondaryColor_dark.background}
          />
        }
        title={selectedItem ? selectedItem[labelField] : ''}
        styleText={styles.textPicker}
        style={[
          commonStyles.filter,
          commonStyles.filterSize,
          commonStyles.filterAlign,
          isFocused && commonStyles.inputFocused,
          styles.content,
          pickerStyle,
        ]}
      />
      {isOpen && (
        <SelectionContainer
          style={pickerStyle}
          emptyValue={emptyValue}
          objectList={listItems}
          keyField={valueField}
          displayValue={item => item[labelField]}
          handleSelect={handleValueChange}
          isPicker={true}
          selectedItem={[selectedItem]}
        />
      )}
    </View>
  );
};

const getStyles = (
  Colors: ThemeColors,
  _required: boolean,
  marginBottom: number,
  isOpen: boolean,
) =>
  StyleSheet.create({
    container: {
      width: '90%',
      marginBottom: marginBottom,
    },
    containerZIndex: {
      zIndex: isOpen ? 45 : 0,
    },
    content: {
      width: '100%',
      borderColor: _required
        ? Colors.errorColor.background
        : Colors.secondaryColor.background,
      borderWidth: 1,
      marginHorizontal: 0,
      minHeight: 40,
    },
    textPicker: {
      left: '-20%',
    },
    title: {
      marginLeft: 10,
    },
  });

export default Picker;
