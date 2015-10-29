// global shared variables
"use strict";

var products = {
  "jameson-vulc": {
    id: "jameson-vulc",
    name: "Jameson Vulc",
    price: 64.99,
    imagePath: "img/shoes/jameson-vulc-brown-gum-orig.png",
    gender: "man"
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    name: "Marana X Hook-Up",
    price: 79.99,
    imagePath: "img/shoes/marana-x-hook-ups-black-orig.png",
    gender: "man"
  },

  "jameson-e-lite": {
    id: "jameson-e-lite",
    name: "Jameson E-Lite",
    price: 69.99,
    imagePath: "img/shoes/jameson-e-lite-maroon-orig.png",
    gender: "man"
  },

  "jameson-e-lite-julian-davidson-4": {
    id: "jameson-e-lite-julian-davidson-4",
    name: "Jameson E-Lite Julian Davidson",
    price: 74.99,
    imagePath: "img/shoes/jameson-e-lite-julian-davidson-4-black-gum-orig.png",
    gender: "man"
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    name: "Scout Women's",
    imagePath: "img/shoes/scout-womens-6-teal-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    name: "Scout Women's Coco Ho",
    imagePath: "img/shoes/scout-womens-coco-ho-5-olive-white-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    name: "Jameson 2 Women's",
    imagePath: "img/shoes/jameson-2-womens-8-black-white-gum-orig.png",
    price: 59.99,
    gender: "woman"
  },

  "corby-womens-2": {
    id: "corby-womens-2",
    name: "Corby Women's",
    imagePath: "img/shoes/corby-womens-2-tan-white-orig.png",
    price: 44.99,
    gender: "woman"
  }
};

var cartItems = {
  "jameson-vulc": {
    id: "jameson-vulc",
    quantity: 1
  },

  "marana-x-hook-ups": {
    id: "marana-x-hook-ups",
    quantity: 2
  },

  "scout-womens-6": {
    id: "scout-womens-6",
    quantity: 2
  },

  "scout-womens-coco-ho-5": {
    id: "scout-womens-coco-ho-5",
    quantity: 1
  },

  "jameson-2-womens-8": {
    id: "jameson-2-womens-8",
    quantity: 1
  }
};

var Product = React.createClass({
  displayName: "Product",

  renderControl: function renderControl() {
    var id = this.props.product.id;
    if (cartItems[id]) {
      return React.createElement(QuantityControl, { item: cartItems[id], variant: "gray" });
    } else {
      return React.createElement(
        "a",
        { className: "product__add" },
        React.createElement("img", { className: "product__add__icon", src: "img/cart-icon.svg" })
      );
    }
  },
  render: function render() {
    var _props$product = this.props.product;
    var name = _props$product.name;
    var price = _props$product.price;
    var imagePath = _props$product.imagePath;

    return React.createElement(
      "div",
      { className: "product" },
      React.createElement(
        "div",
        { className: "product__display" },
        React.createElement("img", { className: "product__img", src: imagePath, alt: name }),
        this.renderControl(),
        React.createElement(
          "div",
          { className: "product__price" },
          price
        )
      ),
      React.createElement(
        "div",
        { className: "product__description" },
        React.createElement(
          "div",
          { className: "product__name" },
          name
        ),
        React.createElement("img", { className: "product__heart", src: "img/heart.svg", alt: "" })
      )
    );
  }
});

var Products = React.createClass({
  displayName: "Products",

  render: function render() {
    var _this = this;

    var productList = Object.keys(this.props.products).map(function (key) {
      return React.createElement(Product, { key: key, product: _this.props.products[key] });
    });
    return React.createElement(
      "div",
      { className: "products" },
      productList
    );
  }
});

var QuantityControl = React.createClass({
  displayName: "QuantityControl",

  render: function render() {
    var quantity = this.props.item.quantity;
    var className = "adjust-qty__button";
    if (this.props.variant) className += " adjust-qty__button--" + this.props.variant;

    return React.createElement(
      "div",
      { className: "adjust-qty" },
      React.createElement(
        "a",
        { className: className },
        "—"
      ),
      React.createElement(
        "div",
        { className: "adjust-qty__number" },
        quantity
      ),
      React.createElement(
        "a",
        { className: className },
        "+"
      )
    );
  }
});

var Cart = React.createClass({
  displayName: "Cart",

  renderItem: function renderItem(item) {
    var id = item.id;
    var quantity = item.quantity;
    var name = item.name;
    var imagePath = item.imagePath;
    var price = item.price;

    if (quantity > 1) price = price + ' x ' + quantity;
    return React.createElement(
      "div",
      { key: id, className: "cart-item" },
      React.createElement(
        "div",
        { className: "cart-item__top-part" },
        React.createElement(
          "div",
          { className: "cart-item__image" },
          React.createElement("img", { src: imagePath, alt: name })
        ),
        React.createElement(
          "div",
          { className: "cart-item__top-part__middle" },
          React.createElement(
            "div",
            { className: "cart-item__title" },
            name
          ),
          React.createElement(
            "div",
            { className: "cart-item__price" },
            price
          )
        ),
        React.createElement("img", { className: "cart-item__trash", src: "img/trash-icon.svg", alt: "" })
      ),
      React.createElement(
        "div",
        { className: "cart-item__qty" },
        React.createElement(QuantityControl, { item: item })
      )
    );
  },
  componentDidMount: function componentDidMount() {
    var $cart = React.findDOMNode(this.refs.cart);

    Ps.initialize($cart);
  },

  render: function render() {
    var _this2 = this;

    var cartItemList = Object.keys(this.props.items).map(function (key) {
      var item = Object.assign({}, _this2.props.items[key]);
      item.name = key;
      item.imagePath = products[key].imagePath;
      item.price = products[key].price;
      return _this2.renderItem(item);
    });
    return React.createElement(
      "div",
      { ref: "cart", className: "cart" },
      React.createElement(
        "div",
        { className: "cart__title" },
        "Shopping Cart"
      ),
      React.createElement(
        "div",
        { className: "cart__content" },
        cartItemList
      )
    );
  }
});

var Checkout = React.createClass({
  displayName: "Checkout",

  render: function render() {
    var _this3 = this;

    var items = Object.keys(this.props.items).map(function (key) {
      var item = Object.assign({}, _this3.props.items[key]);
      item.price = products[key].price;
      return item;
    });

    var total = items.reduce(function (prev, currItem) {
      return prev + currItem.quantity * currItem.price;
    }, 0);
    // this.props.items
    //let total =
    return React.createElement(
      "div",
      { className: "checkout" },
      React.createElement("hr", { className: "checkout__divider" }),
      React.createElement("input", { className: "checkout__coupon-input", type: "text", placeholder: "coupon code" }),
      React.createElement(
        "p",
        { className: "checkout__help-block" },
        "No such coupon code!"
      ),
      React.createElement(
        "div",
        { className: "checkout__summary" },
        React.createElement(
          "div",
          { className: "checkout__row checkout__row--subtotal" },
          React.createElement(
            "div",
            { className: "checkout__row-title subtotal" },
            "Subtotal"
          ),
          React.createElement(
            "div",
            { className: "checkout__total" },
            React.createElement(
              "div",
              { className: "checkout__amount checkout__amount--saving" },
              total
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "checkout__confirm-wrapper" },
        React.createElement(
          "div",
          { className: "checkout__confirm" },
          React.createElement("img", { className: "checkout__cart-icon", src: "img/cart-icon.svg", alt: "" }),
          React.createElement(
            "div",
            { className: "checkout__confirm-text" },
            "Checkout"
          )
        )
      )
    );
  }
});

// The App Component

var App = React.createClass({
  displayName: "App",

  // Generate `buyshoes` site's virtual DOM
  render: function render() {
    return React.createElement(
      "div",
      { className: "site" },
      React.createElement(
        "div",
        { className: "site__main" },
        React.createElement(
          "div",
          { className: "site__left-sidebar" },
          React.createElement(
            "h2",
            null,
            "Buy Some Shoes"
          )
        ),
        React.createElement(
          "div",
          { className: "site__content" },
          React.createElement(Products, { products: products })
        )
      ),
      React.createElement(
        "div",
        { className: "site__right-sidebar" },
        React.createElement(Cart, { items: cartItems }),
        React.createElement(Checkout, { items: cartItems })
      ),
      React.createElement(
        "a",
        { className: "site__right-sidebar-toggle" },
        React.createElement("img", { src: "img/arrow-icon.svg", alt: "" })
      )
    );
  }
});

window.onload = function () {
  // Replace innerHTML of `#root` with the App component
  React.render(React.createElement(App, null), document.querySelector('#root'));
};
/* product__description */
