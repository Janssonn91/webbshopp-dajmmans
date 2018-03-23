class ProductAvatar extends REST {
  constructor(product, category) {
    super();
    this.category = category;
    this.quantity = 1;
    for (let value in product) {
      this[value] = product[value];
    }

  }

  click() {
    if ($(event.target).hasClass('addToCart') && this.stockBalance) {
      const checkShoppingCart = (checkObj) => {
        for (let product of app.shoppingCart) {
          if (product._id == checkObj._id) {
            product.quantity += 1;
            return false;
          }
        }
        app.cart.saveCart();
        return true;
      }
      if (app.shoppingCart == [] || checkShoppingCart(this)) app.shoppingCart.push({_id: this._id, quantity: this.quantity, category: this.category});

      app.header.render();
      $(event.target).addClass("btn-danger").text('Tillagd').delay(1000).queue(function(next) {
        $(this).removeClass('btn-danger').text('Köp');
        next();
      });
    }
  }

}
