class Book extends REST {
  constructor(result){
    super(result);
    Book.title = 'Böcker';
    Book.breadText = `
    Här hos Dajmmans erbjuder vi det mest unika utbudet av böcker för den magiska världen. Vårt utbud utökas kontinuerligt, så skulle vi inte ha en produkt på lager så kontakta oss via mail eller telefon.
    `;
    Book.img = '/img/books.jpg';
    Book.icon = `<i class="fas fa-book awesomeness"></i>`;
  }


}
