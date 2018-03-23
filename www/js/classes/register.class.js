class Register extends REST {
  constructor() {
    super();
    this.clickEvent();
  }

  clickEvent(){
    let that = this;
    $(document).on('submit', '#registerForm', function(e) {
     e.preventDefault();
     that.registerUser();
   });
  }

  validateZipCode(zipcode){
    zipcode = (zipcode.replace(/ /g, '')) / 1;
    if (!isNaN(zipcode) && (zipcode+'').length === 5) {
      return true;
    } else {
      $('#regFail').html('Postnummer ifyllt fel').removeClass('d-none');
      $("html, body").animate({ scrollTop: 0 }, "slow");
      return false;
    }
  }

  async registerUser(){
    let email = $('#registerEmail').val();
    let password = $('#registerPassword').val();
    let firstName = $('#registerFirstName').val();
    let lastName = $('#registerLastName').val();
    let adress = $('#registerAdress').val();
    let postnr = $('#registerpostnr').val();
    let postOrt = $('#registerPostOrt').val();

    if (this.validateZipCode(postnr)){
      this.result = await UserHandler.register(email, password, firstName, lastName, adress, postnr, postOrt);
    }

     if(this.result.error){
       $('#regFail').html('Användarnamnet är upptaget, fyll i ett nytt!').removeClass('d-none');
       $("html, body").animate({ scrollTop: 0 }, "slow");
     }
     else{
       $('#regFail').addClass('d-none');
       $('#regSuccess').html('Registreringen lyckades! Du kan nu logga in och se "Mina sidor".').removeClass('d-none');
       $("html, body").animate({ scrollTop: 0 }, "slow");
     }
  }

}
