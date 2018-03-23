class Userpage extends REST {
  constructor() {
  	super();
  	this.activeOrders = [];
  	this.oldOrders = [];
    this.getUser();
		this.co = 0;

  }

  async getUser(){
    this.user = (await User.find())[0];
    return this.getOrders();
  }

  async getOrders() {
  	let orders = await Order.find({customerid: this.user._id});
  	this.renderOrders(orders);
  	}

	async renderOrders(orders){

    try {

			orders.forEach( (order) => {
				this.co++;
				let userpageItem = new UserpageItem(order, this.co);
				if(order.status == 'Skickad'){
  				this.oldOrders.push(userpageItem);
				} else {
  				this.activeOrders.push(userpageItem);
  			}
  		});
		} catch (e) {
  			console.error('Strul med rendering, försök igen!', (e));
  		}
      setTimeout(() => {
        $('main').empty();
        app.user.render('main', 1);
      }, 100);
	};

  }
