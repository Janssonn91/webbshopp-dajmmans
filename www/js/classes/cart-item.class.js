class CartItem extends REST {
  constructor(product, cart) {
    super();
    for (let value in product) {
      // This if statement is for fixing a bug in Base, else This gets wrong template
      if (value !== 'template') this[value] = product[value];
    }
    this.cart = cart;
    this.eventHandlers();
  }

  getVatPerItem(){
    let vat = 0;
    if (this.vatRate == 6) {
      vat += Math.round((this.price * 0.0566) * 10) / 10;
    } else if (this.vatRate == 12) {
      vat += Math.round((this.price * 0.1071) * 10) / 10;
    } else {
      vat += Math.round((this.price * 0.2) * 10) / 10;
    }
    if (vat == 0){return vat;}
    if (vat % 1 != 0) {
      return vat += '0';
    } else {
      return vat;
    }
  }

  getTotalPrice(){
    let totalprice = this.price * this.quantity;
    return totalprice;
  }

  renderCart(){
    $('main').empty();
    this.cart.render('main');
  }


  eventHandlers(){
    $(document).on('mouseenter', '.delete-cart-item', function(){
      $(this).closest(".cartitem-containers").addClass('cartitem-container-hover');
      $(this).addClass('hover-delete-item');
    })
    $(document).on('mouseleave', '.delete-cart-item', function(){
      $(this).closest(".cartitem-containers").removeClass('cartitem-container-hover');
      $(this).removeClass('hover-delete-item');
    })
  }


  click(event){
    if ($(event.target).hasClass('cart-item-button-plus')) {
      if (this.stockBalance == this.quantity) {
        return null;
      }
      else {
        let shoppingCartGlobal = app.shoppingCart.find((m) => this._id == m._id);
        shoppingCartGlobal.quantity += 1;
        this.quantity += 1;
        this.renderCart();
        app.cart.saveCart();
      }
    }

    if ($(event.target).hasClass('cart-item-button-minus')) {
      if (this.quantity == 1) {
        return null;
      }
      else {
        let shoppingCartGlobal = this.cart.app.shoppingCart.find((m) => this._id == m._id);
        shoppingCartGlobal.quantity -= 1;
        this.quantity -= 1;
        this.renderCart();
        app.cart.saveCart();
      }
    }

    if ($(event.target).hasClass('delete-cart-item')) {
      let globalShoppingIndex = app.shoppingCart.findIndex(x => x._id==this._id);
      let cartShoppingIndex = this.cart.cartItems.findIndex(x => x._id==this._id);
      app.shoppingCart.splice(globalShoppingIndex, 1);
      this.cart.cartItems.splice(cartShoppingIndex, 1);
      $(event.target).parent().parent().parent().slideUp(1000);
      setTimeout(() => {
        this.renderCart();
        app.header.render();
      }, 1000);
      app.cart.saveCart();
    }
  }
}
