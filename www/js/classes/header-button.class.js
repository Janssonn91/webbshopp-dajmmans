class HeaderButton extends REST {
  constructor() {
    super();
    this.templateNo = '';
  }
  async loginCheck(){
    
    let loggedInUser = await UserHandler.check();
    if(loggedInUser[0] == undefined){
      $('#headerButton').empty();
      this.render('#headerButton', ''); 
    }else if(loggedInUser[0].email !== 'admin@admin.se') {
      $('#headerButton').empty();
      this.render('#headerButton', 2);
    }else if (loggedInUser[0].email == 'admin@admin.se') {
      $('#headerButton').empty();
      this.render('#headerButton', 3);
    }
  }
}
