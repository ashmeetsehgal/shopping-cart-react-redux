import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setProductsAction, addItemAction } from '../Actions/listingPageActions';
import showHideToastAction from '../Actions/toastActions';
import ItemCard from '../Components/ItemCard';
import Data from '../data/data.json';
import './toast.scss';

class ListingPage extends Component {
  constructor(props) {
    super(props);
    const { setProductList } = props;
    setProductList({ productList: Data });
  }
  showToast = (id) => {
    const {
      showHideToastMethod,
    } = this.props;
    showHideToastMethod({
      isToastActive: true,
      toastMessage: `Item id ${id} added successfully!!`,
    });
  }
  hideToast = () => {
    const {
      showHideToastMethod,
    } = this.props;
    showHideToastMethod({ isToastActive: false });
  }
  addItem = (id) => {
    const {
      addItemMethod,
    } = this.props;
    addItemMethod({ id });
    this.showToast(id);
  }
  checkout = () => {
    this.props.router.push('/checkout');
  }
  renderItemCard = (productList) => {
    if (productList.length > 0) {
      const itemCards = productList.map(i => (
        <ItemCard key={i.id} itemDetails={i} addItem={this.addItem} />
      ));
      return itemCards;
    } return <div className='text-center'> No results found </div>;
  }

  render() {
    const { props, renderItemCard } = this;
    const {
      productList, cartCount, isToastActive, toastMessage,
    } = props;
    if (isToastActive) {
      setTimeout(this.hideToast, 3000);
    }
    return (
      <div>
        {isToastActive && <div className='toast-bar'> {toastMessage} </div>}
        <div className='header'>
          <div className='all-items'>All Items</div>
          {cartCount > 0 &&
            <button onClick={this.checkout}> Go to cart ({cartCount})
            </button>
          }
        </div>
        <hr />
        <div className='list-container'>
          {renderItemCard(productList)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productList: state.listingReducer.productList,
  cartList: state.listingReducer.cartList,
  cartCount: state.listingReducer.cartCount,
  isToastActive: state.toastReducer.isToastActive,
  toastMessage: state.toastReducer.toastMessage,
});

const mapDispatchToProps = dispatch => ({
  setProductList: props => dispatch(setProductsAction(props)),
  addItemMethod: props => dispatch(addItemAction(props)),
  showHideToastMethod: props => dispatch(showHideToastAction(props)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);

ListingPage.propTypes = {
  setProductList: PropTypes.func.isRequired,
  addItemMethod: PropTypes.func.isRequired,
  router: PropTypes.PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  showHideToastMethod: PropTypes.func.isRequired,
};
