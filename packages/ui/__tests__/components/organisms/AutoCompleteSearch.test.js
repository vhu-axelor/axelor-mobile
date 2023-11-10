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
import {TouchableOpacity, View} from 'react-native';
import {shallow} from 'enzyme';
import {AutoCompleteSearch, SearchBar} from '@axelor/aos-mobile-ui';
import {getGlobalStyles} from '../../tools';

describe('AutoCompleteSearch Component', () => {
  const props = {
    objectList: [{name: 'Name 1'}],
    displayValue: value => value.name,
  };

  it('should render without crashing', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should render a SearchBar with title when provided', () => {
    const title = 'Title';
    const wrapper = shallow(<AutoCompleteSearch {...props} title={title} />);

    expect(wrapper.find(SearchBar).prop('title')).toBe(title);
  });

  it('should render a SearchBar with value displayed by displayValue function when provided', () => {
    const value = props.objectList[0];
    const wrapper = shallow(<AutoCompleteSearch {...props} value={value} />);

    expect(wrapper.find(SearchBar).prop('valueTxt')).toBe(
      props.displayValue(value),
    );
  });

  it('should render a required SearchBar when required is true', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} required />);

    expect(wrapper.find(SearchBar).prop('required')).toBe(true);
  });

  it('should render a readonly SearchBar when readonly is true', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} readonly />);

    expect(wrapper.find(SearchBar).prop('readonly')).toBe(true);
  });

  it('should apply custom style when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <AutoCompleteSearch {...props} style={customStyle} />,
    );

    expect(getGlobalStyles(wrapper.find(View))).toMatchObject(customStyle);
  });

  it('should display SearchDetailsPopUp when click on search icon and showDetailsPopup is true', () => {
    const wrapper = shallow(<AutoCompleteSearch {...props} showDetailsPopup />);

    expect(wrapper.find('SearchDetailsPopUp').prop('isVisible')).toBe(false);

    wrapper.find(SearchBar).simulate('searchPress');

    expect(wrapper.find('SearchDetailsPopUp').prop('isVisible')).toBe(true);
  });

  it('should call onChangeValue when value change', () => {
    const onChangeValue = jest.fn();
    const wrapper = shallow(
      <AutoCompleteSearch {...props} onChangeValue={onChangeValue} />,
    );

    wrapper.find(SearchBar).simulate('clearPress');
    wrapper.find(SearchBar).simulate('changeTxt', 'New value');
    wrapper.find('SearchDetailsPopUp').simulate('select', {name: 'Name 2'});

    expect(onChangeValue).toHaveBeenCalledTimes(3);
  });
});