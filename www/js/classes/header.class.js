class Header extends REST {
  constructor() {
    super();
    this.items = [
      new HeaderItem('Start', '/'),
      new HeaderItem('Materiel', '/materiel'),
      new HeaderItem('Böcker', '/bocker'),
      new HeaderItem('Ingredienser', '/ingredienser'),
      new HeaderItem('Om oss', '/om_oss'),
      new HeaderItem('Kassa', '/kassa', app)
    ];
    this.button = new HeaderButton();
  }

  async setActive(url) {
    for (let item of this.items) {
      item.active = url == item.url;
    }
    app.header.render();
  }

}
