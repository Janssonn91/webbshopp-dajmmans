class Logout extends REST {
  constructor() {
    super();
    let that = this;

    // logged out
    $(document).on('click', '#logoutBtn', function(e) {
     e.preventDefault();
     that.logoutUser();
   });
  }

  async logoutUser(){
    let result = await UserHandler.logout(User);
    $('#logoutSuccess').removeClass('d-none');
    app.header.button.loginCheck();
  }


}
