class Ingredient extends REST {
  constructor(result){
    super(result);
    Ingredient.title = 'Ingredienser';
    Ingredient.breadText = `
    För att kunna utföra dom mest magiska trollformlerna behöver man bra ingredienser. Och då finns Dajmman för dig, vi har ett stort utbud av dom mest sällsynta produkterna. Skulle det vara så att något saknas så kontakta Dajmman så hör vi med våra kontakter.
    `;
    Ingredient.img = '/img/ingredients.jpg';
    Ingredient.icon = `<i class="fas fa-magic awesomeness"></i>`;
  }

}
