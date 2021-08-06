import { Component } from 'react';
import { connect } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';

import { ProductList } from './styles';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('products');

        const data = response.data.map(product => ({
            ...product,
            priceFormatted: formatPrice(product.price),
        }));

        this.setState({ products: data });
    }

    handleAddProduct = product => {
        const { dispatch } = this.props;

        dispatch(CartActions.addToCart(product));
    };

    render() {
        const { products } = this.state;
        const { amount } = this.props;

        return (
            <ProductList>
                { products.map(product => (
                      <li key={product.id}> 
                      <img 
                          src= {product.title}
                          alt={product.title}
                      />
                      <strong>{product.title}</strong>
                      <span>{product.priceFormatted}</span>
      
                      <button type="button" onClick={() => this.handleAddProduct(product)}>
                          <div>
                              <MdShoppingCart size={16} color="#FFF" />{''}
                          </div>
      
                          <span>ADICIONAR AO CARRINHO</span>
                      </button>
                  </li>
                ))}
            </ProductList>
        );
    }
}

const mapStateToProps = state => ({
    amount: state.CartActions.reduce((amount, product) => {
       amount[product.id] = product.amount || 0;

       return amount;
    }, {}),
});

export default connect()(Home);