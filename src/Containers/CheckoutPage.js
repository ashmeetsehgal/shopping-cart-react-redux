import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartItemCard from '../Components/CartItemCard';
import PriceBar from '../Components/PriceBar';
import './checkout-page.scss';

const renderCartItems = (details) => {
  const cartItems = details.map(item => (
    <CartItemCard key={item.id} item={item} />
  ));
  return cartItems;
};

const renderPriceBar = (price, discount, typeDiscount, cartCount) => (<PriceBar
  price={price}
  discount={discount}
  typeDiscount={typeDiscount}
  cartCount={cartCount}
/>);

const priceCalculate = (itemDetails, cartCount) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  let totalTypeDiscount = 0;
  itemDetails.map((item) => { // eslint-disable-line
    totalPrice += item.price * item.count;
    totalDiscount += item.price * (item.discount / 100) * item.count;
    totalTypeDiscount += (item.type === 'fiction') ? (item.price * 0.15) * item.count : 0;
  });
  return renderPriceBar(totalPrice, totalDiscount, totalTypeDiscount, cartCount);
};

const goBack = (props) => {
  props.router.push('/home');
};

const CheckoutPage = (props) => {
  const { cartCount } = props;
  if (cartCount <= 0) {
    goBack(props);
  }
  const cartDetails = Object.keys(props.cartList).map(key => props.cartList[key]);
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <button onClick={() => goBack(props)}> Go Back </button>
        <div className='summary'>Order Summary</div>
      </div>
      <div className='checkout-view'>
        <div className='cart-item-list'>
          {renderCartItems(cartDetails)}
        </div>
        {priceCalculate(cartDetails, cartCount)}
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
  cartCount: state.listingReducer.cartCount,
});

export default connect(mapStateToProps)(CheckoutPage);

CheckoutPage.propTypes = {
  cartList: PropTypes.PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  cartCount: PropTypes.number.isRequired,
};
