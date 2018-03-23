class Search extends REST {
  constructor(query) {
    super();
    this.query = query;
    this.searchResult = [];
    this.getSearchResult();
    this.setupHandler();
  }

  async getSearchResult() {
    // Hardcoded search on ingredients collection with title
    // let searchResultFromMongo = await Ingredient.request('ingredients', 'GET', `title[$regex]=${Search.searchQuery}`);
    const mongoCollection = String($('#search-in-category').val());
    const searchObj = {title: {$regex: this.query, $options: 'i'}};
    let mongoResult = [];
    if(mongoCollection === 'Ingredient') mongoResult = await Ingredient.find(searchObj);
    if(mongoCollection === 'Materiel') mongoResult = await Materiel.find(searchObj);
    if(mongoCollection === 'Book') mongoResult = await Book.find(searchObj);
    if(mongoCollection === 'All') {
      let all = new All();
      mongoResult = await all.getResult(searchObj);
    }
    try {
      mongoResult.forEach( (product) => {
        this.searchResult.push(new ProductAvatar(product, product.constructor.name.toLowerCase()));        
      });
    } catch(e){
      console.error('Problem med collections \n', e);
    }

    return await this.render();
  }

  setupHandler() {
    $(document).on('click', '#sortPriceLow, #sortPriceHigh, #sortNameLow, #sortNameHigh, #sortSold', (e) => {
      e.preventDefault();
      let method = $(e.target).attr('id');
      this[method](this.searchResult);
      this.render();
    });
  }
}
