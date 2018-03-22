class ProductPage extends REST {
  constructor() {
    super();
  }

  async getProduct(productId){
    this.productId = productId;
    this.productSelected = All.allProducts.find( selectedProduct => selectedProduct._id === productId);
    this.productSelected.quantity = 1;

  }

  click() {
    console.log(this)
    if ($(event.target).hasClass('addToCart') && this.productSelected.stockBalance) {
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
      if (app.shoppingCart == [] || checkShoppingCart(this.productSelected)) app.shoppingCart.push({
          _id: this.productSelected._id,
          quantity: this.productSelected.quantity,
          category: this.productSelected.category
        });

      app.header.render();
      $(event.target).addClass("bg-danger").text('Tillagd').delay(1000).queue(function(next) {
        $(this).removeClass('bg-danger').text('Köp');
        next();
      });
    }
  }

}
