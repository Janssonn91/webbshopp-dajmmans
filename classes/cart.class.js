const ModelAndRoutes = require('./model-and-routes.class');

module.exports = class Cart extends ModelAndRoutes {

  static get schema(){
    return {
      userId: String,
      items: [{}],
      category: String
    }
  }

}
