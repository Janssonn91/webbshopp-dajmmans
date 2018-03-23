class ProductCategory extends REST {
  constructor(category){
    super();
    this.myProducts = [];
    this.getRightCategory(category);
    this.category = category;
    this.setupHandler();

  }

  async getRightCategory(category){
    let collection = await category.find({});
    let categoryName = collection[0].constructor.name.toLowerCase();
    try {
      collection.forEach( (product) => {
        this.myProducts.push(new ProductAvatar(product, categoryName));

      });
    } catch(e){
      console.error('Problem med collections \n', e);
    }
    $('main').empty();
    this.render('main', '3');
  }

  setupHandler() {
    $(document).on('click', '#sortPriceLow, #sortPriceHigh, #sortNameLow, #sortNameHigh, #sortSold', (e) => {
      e.preventDefault();
      let method = $(e.target).attr('id');
      this[method](this.myProducts);
      $('main').empty();
      this.render('main', '3');
    });
  }

}
