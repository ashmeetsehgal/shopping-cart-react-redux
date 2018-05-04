import React from 'react';
import expect from 'expect';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import PriceBar from './PriceBar';

const PRICE_PROPS = {
  itemDetails: {
    typeDiscount: 10, cartCount: 11, price: 100, discount: 10,
  },
};

describe('Component: PriceBar', () => {
  it('rendering', () => {
    expect(shallow(<PriceBar {...PRICE_PROPS} />).length).toEqual(1);
  });
});

describe('Component: PriceBar', () => {
  const priceBar = mount(<PriceBar {...PRICE_PROPS} />,);
  it('should contain planet-card', () => {
    expect(priceBar.find('.price-container').hasClass('price-container')).toBe(true);
    expect(priceBar.find('.total').hasClass('total')).toBe(true);
  });
}); 

