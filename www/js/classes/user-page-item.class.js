class UserpageItem extends REST {
  constructor(product, co) {
  	super();
    this.co = co;
    this.productName = [];
    for (let value in product) {
      this[value] = product[value];
    }
    this.orderdate = this.orderdate.substring(0,10);
    this.findProducts();
  }

  async findProducts() {
    let all = new All();

    this.products.forEach( async (product) => {
      let skatt = await all.getResult({_id: product._id});
      await this.productName.push(skatt[0].title);
    });

    // Teknisk skuld
    setTimeout(() => {
      $('main').empty();
      app.user.render('main', 1);
    }, 100);

  }

}
