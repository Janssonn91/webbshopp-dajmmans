const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class User extends ModelAndRoutes {

  static get schema(){
    return {
      email: { type: String, index: { unique: true }},
      firstName: String,
      lastName: String,
      password: String,
      adress: String,
      postnr: Number,
      postOrt: String

    }
  }

}
