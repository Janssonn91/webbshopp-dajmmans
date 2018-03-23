class All extends REST {

  constructor(){
    super();
  }

  async getResult(searchObj) {
    let ingredients = await Ingredient.find(searchObj);
    let materiels = await Materiel.find(searchObj);
    let books = await Book.find(searchObj);

    for (let product of [...ingredients, ...materiels, ...books]) {
      // product.quality ska in i product.result
      Object.assign(product, {category: product.constructor.name.toLowerCase()});
    }
    return [...ingredients, ...materiels, ...books];
  }
}
