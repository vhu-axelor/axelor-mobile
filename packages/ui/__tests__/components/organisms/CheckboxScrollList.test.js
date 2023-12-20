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
import {View} from 'react-native';

import {shallow} from 'enzyme';
import {CheckboxScrollList, ScrollList, Checkbox} from '@axelor/aos-mobile-ui';

describe('CheckboxScrollList Component', () => {
  const mockData = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
  ];
  const onCheckedChange = jest.fn();
  const renderItem = jest.fn(item => <View>{item.name}</View>);

  const props = {
    data: mockData,
    onCheckedChange,
    renderItem,
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('toggles all items when main checkbox is clicked', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    wrapper.find(Checkbox).at(0).simulate('change', true);
    expect(onCheckedChange).toHaveBeenCalledWith(mockData);
    wrapper.find(Checkbox).at(0).simulate('change', false);
    expect(onCheckedChange).toHaveBeenCalledWith([]);
  });

  it('toggles individual items', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);
    wrapper
      .find(ScrollList)
      .renderProp('renderItem')({item: mockData[0], index: 0})
      .find(Checkbox)
      .simulate('change', true);
    expect(onCheckedChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it('renders each item with a checkbox', () => {
    const wrapper = shallow(<CheckboxScrollList {...props} />);

    mockData.forEach((item, index) => {
      const itemRender = wrapper.find(ScrollList).renderProp('renderItem')({
        item,
        index,
      });

      expect(itemRender.find(Checkbox).exists()).toBe(true);

      expect(itemRender.contains(renderItem({item, index}))).toBe(true);
    });
  });

  it('passes loadingList, moreLoading, isListEnd, filter, horizontal, disabledRefresh props to ScrollList', () => {
    const additionalProps = {
      loadingList: true,
      moreLoading: true,
      isListEnd: true,
      filter: true,
      horizontal: true,
      disabledRefresh: true,
    };
    const wrapper = shallow(
      <CheckboxScrollList {...props} {...additionalProps} />,
    );
    expect(wrapper.find(ScrollList).props()).toMatchObject(additionalProps);
  });

  it('should apply custom style checkbox width when provided', () => {
    const customStyle = {width: 200};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleCheckbox={customStyle} />,
    );

    expect(wrapper.find(Checkbox).prop('style')).toContain(customStyle);
  });

  it('should apply custom style to ScrollList', () => {
    const customStyleScrollList = {margin: 10};
    const wrapper = shallow(
      <CheckboxScrollList {...props} styleScrollList={customStyleScrollList} />,
    );

    expect(wrapper.find(ScrollList).prop('style')).toContain(
      customStyleScrollList,
    );
  });
});