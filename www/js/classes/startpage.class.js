class Startpage extends REST {
  constructor() {
    super();
  	this.homepageAvatars = [];
		let result1 = All.allProducts.filter(ingredients => 'Ingredient' == ingredients.constructor.name).splice(0, 4);
		let result2 = All.allProducts.filter(materiel => 'Materiel' == materiel.constructor.name).splice(0, 4);
		let result3 = All.allProducts.filter(book => 'Book' == book.constructor.name).splice(0, 4);
		this.result = result1.concat(result2, result3);
  	this.renderAvatarsStartpage();
	}

  renderAvatarsStartpage(){
  	for(let product of this.result) {
	  	this.homepageAvatars.push(new ProductAvatar(product, product.constructor.name.toLowerCase()));
  	}
	}


}
