// global shared variables
let products = {
  "jameson-vulc": {
    id: "jameson-vulc",
    name: "Jameson Vulc",
    price: 64.99,
    imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
    gender: "man",
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    name: "Marana X Hook-Up",
    price: 79.99,
    imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
    gender: "man",
  },

  "jameson-e-lite": {
    id: "jameson-e-lite",
    name: "Jameson E-Lite",
    price: 69.99,
    imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
    gender: "man",
  },

  "jameson-e-lite-julian-davidson-4": {
    id: "jameson-e-lite-julian-davidson-4",
    name: "Jameson E-Lite Julian Davidson",
    price: 74.99,
    imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
    gender: "man",
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    name: "Scout Women's",
    imagePath: "img/shoes/scout-womens-6-teal-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    name: "Scout Women's Coco Ho",
    imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    name: "Jameson 2 Women's",
    imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
    price: 59.99,
    gender: "woman",
  },

  "corby-womens-2": {
    id: "corby-womens-2",
    name: "Corby Women's",
    imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
    price: 44.99,
    gender: "woman",
  },
};

let cartItems = {
  "jameson-vulc": {
    id: "jameson-vulc",
    quantity: 1,
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    quantity: 2,
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    quantity: 2,
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    quantity: 1,
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    quantity: 1,
  },
};

let Product = React.createClass({
  renderControl() {
    let id = this.props.product.id;
    if (cartItems[id]) {
      return <QuantityControl item={cartItems[id]} variant="gray" />;
    } else {
      return (
        <a className="product__add">
          <img className="product__add__icon" src="img/cart-icon.svg" />
        </a>
      );
    }
  },
  render() {
    let {name, price, imagePath} = this.props.product;

    return (
      <div className="product">

        <div className="product__display">
          <img className="product__img" src={imagePath} alt={name} />
          { this.renderControl() }
          <div className="product__price">
            {price}
          </div>
        </div>

        <div className="product__description">
          <div className="product__name">
            {name}
          </div>

          <img className="product__heart" src="img/heart.svg" alt="" />
        </div>{/* product__description */}

      </div>
    );
  }
});

let Products = React.createClass({
  render() {
    let productList = Object.keys(this.props.products).map((key) => {
      return <Product key={key} product={this.props.products[key]} />;
    })
    return (
      <div className="products">
        { productList }
      </div>
    )
  }
});

let QuantityControl = React.createClass({
  render() {
    let quantity = this.props.item.quantity;
    let className = "adjust-qty__button";
    if (this.props.variant) className += " adjust-qty__button--" + this.props.variant;

    return (
      <div className="adjust-qty">
        <a className={ className }>—</a>
        <div className="adjust-qty__number">{quantity}</div>
        <a className={ className }>+</a>
      </div>
    );
  }
});

let Cart = React.createClass({
  renderItem(item) {
    let {id, quantity, name, imagePath, price} = item; 
    if (quantity > 1) price = price + ' x ' + quantity;
    return (
      <div key={id} className="cart-item">

        <div className="cart-item__top-part">

          <div className="cart-item__image">
            <img src={imagePath} alt={name} />
          </div>

          <div className="cart-item__top-part__middle">
            <div className="cart-item__title">{name}</div>
            <div className="cart-item__price">{price}</div>
          </div>

          <img className="cart-item__trash" src="img/trash-icon.svg" alt="" />

        </div>

        <div className="cart-item__qty">
          <QuantityControl item={item} />
        </div>

      </div>
    );
  },
  componentDidMount() {
    let $cart = React.findDOMNode(this.refs.cart);

    Ps.initialize($cart);
  },

  render() {
    let cartItemList = Object.keys(this.props.items).map((key) => {
      let item = Object.assign({}, this.props.items[key]);
      item.name = key;
      item.imagePath = products[key].imagePath;
      item.price = products[key].price;
      return this.renderItem(item); 
    }); 
    return (
      <div ref="cart" className="cart">
        <div className="cart__title">Shopping Cart</div>
        <div className="cart__content">
          { cartItemList }
        </div>
      </div>
    );
  }
})

let Checkout = React.createClass({
  render() {
    let items = Object.keys(this.props.items).map((key) => {
      let item = Object.assign({}, this.props.items[key]);
      item.price = products[key].price;
      return item;
    });

    let total = items.reduce((prev, currItem) => {
      return prev + currItem.quantity * currItem.price;
    }, 0);
    // this.props.items
    //let total = 
    return (
      <div className="checkout">
        <hr className="checkout__divider" />
        <input className="checkout__coupon-input" type="text" placeholder="coupon code" />
        <p className="checkout__help-block">No such coupon code!</p>

        <div className="checkout__summary">
          <div className="checkout__row checkout__row--subtotal">

            <div className="checkout__row-title subtotal">
              Subtotal
            </div>
            <div className="checkout__total">
              <div className="checkout__amount checkout__amount--saving">
                { total }       
              </div>
            </div>

          </div>
        </div>

        <div className="checkout__confirm-wrapper">
          <div className="checkout__confirm">
            <img className="checkout__cart-icon" src="img/cart-icon.svg" alt="" />
            <div className="checkout__confirm-text">
              Checkout
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// The App Component

let App = React.createClass({
  // Generate `buyshoes` site's virtual DOM
  render() {
    return (
      <div className="site">
        <div className="site__main">
          <div className="site__left-sidebar">
            <h2>Buy Some Shoes</h2>
          </div>
          <div className="site__content">
            <Products products={products} />
          </div>
        </div>

        <div className="site__right-sidebar">
          <Cart items={cartItems} />
          <Checkout items={cartItems} />
        </div>

        <a className="site__right-sidebar-toggle">
          <img src="img/arrow-icon.svg" alt="" />
        </a>
      </div>
    )
  }
});

window.onload = () => {
  // Replace innerHTML of `#root` with the App component
  React.render(<App />, document.querySelector('#root'));
}
