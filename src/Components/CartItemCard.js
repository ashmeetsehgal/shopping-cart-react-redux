import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItemAction, removeItemAction, deleteItemAction } from '../Actions/listingPageActions';
import { calculateDiscount } from './ItemCard';

const CartItemCard = (props) => {
  const {
    item, addItemMethod, removeItemMethod, deleteItemMethod,
  } = props;
  return (
    <div className='cart-item'>
      <div className='cart-item-card'>
        <img
          src={item.img_url}
          className='cart-item-image'
          alt={item.name}
        />
        <div className='item-cart-name'>{item.name}</div>
        <div
          className='cart-item-delete'
          onClick={() => deleteItemMethod({ id: item.id })}
          onKeyPress={() => deleteItemMethod({ id: item.id })}
          role='button'
          tabIndex={0}
        >
          X
        </div>
      </div>
      <div className='cart-item-actions'>
        <div
          className='cart-item-remove'
          onClick={item.count === 1
            ? () => deleteItemMethod({ id: item.id })
            : () => removeItemMethod({ id: item.id })
          }
          onKeyPress={item.count === 1
            ? () => deleteItemMethod({ id: item.id })
            : () => removeItemMethod({ id: item.id })
          }
          role='button'
          tabIndex={0}
        >
          -
        </div>
        <div className='cart-item-quantity'>
          <p>{item.count}</p>
        </div>
        <div
          className='cart-item-add'
          onClick={() => addItemMethod({ id: item.id })}
          onKeyPress={() => addItemMethod({ id: item.id })}
          role='button'
          tabIndex={0}
        >
          +
        </div>
      </div>
      <div className='cart-item-price'>
        {item.count * calculateDiscount(item.price, item.discount)}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cartList: state.listingReducer.cartList,
});
const mapDispatchToProps = dispatch => ({
  addItemMethod: props => dispatch(addItemAction(props)),
  removeItemMethod: props => dispatch(removeItemAction(props)),
  deleteItemMethod: props => dispatch(deleteItemAction(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartItemCard);

CartItemCard.propTypes = {
  item: PropTypes.PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    count: PropTypes.number,
    img_url: PropTypes.string,
  }).isRequired,
  addItemMethod: PropTypes.func.isRequired,
  removeItemMethod: PropTypes.func.isRequired,
  deleteItemMethod: PropTypes.func.isRequired,
};
