class PopStateHandler extends REST {

  // Note: Only instantiate PopStateHandler once!

  constructor(){
    super();
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());
  }

  addEventHandler(){
    // Our search function
    $(document).on('click', '.searchbtn', (event) => {
      event.preventDefault();
      this.search();
      $('.inputsearch').val('');
    });

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click','a.pop',function(e){

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }



  changePage(){
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;
    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');
    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startpage',
      '/materiel': 'materiel',
      '/ingredienser': 'ingredienser',
      '/bocker': 'bocker',
      '/search': 'search',
      '/om_oss': 'about',
      '/kassa' : 'cart',
      '/login': 'login',
      '/register': 'register',
      '/mina_sidor': 'userPage',
      '/mina_sidor_info': 'userPage2',
      '/admin': 'admin'
    };

    //looping through ID
    for (let i = 0; i < All.allProducts.length; i++){
      let url = `/${All.allProducts[i].constructor.name.toLowerCase()}/produkt/${All.allProducts[i]._id}`;
      Object.assign(All.allProducts[i], {category: All.allProducts[i].constructor.name.toLowerCase()});
      let target = 'product';
      Object.assign(urls, {[url] : target});
    }
    // Call the right method
    let methodName = urls[url];
    
    if (methodName =='product') {
      let productId = url.split('/')[3];
      this[methodName](productId);
    }
    else{
      this[methodName]();
    }

    // Set the right menu item active
    app.header.setActive(url);

     window.scrollTo(0, 0);

  }

  //Methods for rendering in our templates in the SPA

  startpage(){
    this.empty();
    app.banner = new Banner();
    app.banner.render('.banner-row');
    $('.carousel').carousel({
      interval: 3500,
      pause: false
    });
    app.startPage.render('main');
  }

  materiel(){
    this.empty();
    app.productcategory = new ProductCategory(Materiel);
    app.productcategory.render('main', '3');
  }

  ingredienser(){
    this.empty();
    app.productcategory = new ProductCategory(Ingredient);
    app.productcategory.render('main', '3');
  }

  bocker(){
    this.empty();
    app.productcategory = new ProductCategory(Book);
    app.productcategory.render('main', '3');

  }

  product(productId){
    this.empty();
    app.productPage = new ProductPage();
    app.productPage.getProduct(productId);
    app.productPage.render('main');
  }

  about(){
    this.empty();
    app.about = new About(this);
    app.about.render('main')
  }

  search() {
    this.empty();
    app.search = new Search($(document).find('.inputsearch').val());
    app.search.render();
  }

  login(){
    this.empty();
    app.login = new Login();
    app.login.render();
    app.logout = new Logout();
  }

  register(){
    this.empty();
    app.register = new Register();
    app.register.render();
  }

  userPage(){
    this.empty();
    app.user = new Userpage();
  }

  userPage2(){
    this.empty();
    app.user = new Userpage2();
  }
  admin(){
    this.empty();
    app.admin = new Admin();
    app.admin.render('main',1);
  }

  cart(){
    this.empty();
    app.cart = new Cart();
  }

  user(){
    this.empty();
    app.userPage = new Userpage(this);
    app.userPage.render('main', '1');
  }

  user2(){
    this.empty();
    app.userPage = new Userpage(this);
    app.userPage.render('main', '2');
  }

  empty() {
    $('.banner-row').empty();
    $('main').empty();
  }

}
