import React from 'react';
import expect from 'expect';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import ItemCard from './ItemCard';

const ITEM_PROPS = {
  itemDetails: {
    name: 'abc', id: 9090, img_url: 'url', price: 100, discount: 10,
  },
};

describe('Component: Item Card', () => {
  it('rendering', () => {
    expect(shallow(<ItemCard {...ITEM_PROPS} />).length).toEqual(1);
  });
});

describe('Component: Item Card', () => {
  const itemCard = mount(<ItemCard {...ITEM_PROPS} />, );
  it('should contain Item-card', () => {
    expect(itemCard.find('.item-card').hasClass('item-card')).toBe(true);
    expect(itemCard.find('.item-display').hasClass('item-display')).toBe(true);
    expect(itemCard.find('.item-image').hasClass('item-image')).toBe(true);
    expect(itemCard.find('.item-prices').hasClass('item-prices')).toBe(true);
    expect(itemCard.find('.item-name').hasClass('item-name')).toBe(true);
  });
});

