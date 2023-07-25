import logger from "../../winston.config.js";
import mongoose from "mongoose";
import config from "../../config/config.js";
import Cart from "./cartMongoDao.js";
import Message from "./messageMongoDao.js";
import Product from "./productMongoDao.js";
import Ticket from "./ticketMongoDao.js";
import User from "./userMongoDao.js";


export default class MongoDao {
  constructor() {
    this.mongoose = mongoose
      .connect(config.mongo.url)
      .then((response) => logger.info("DB Connected"))
      .catch((err) => {
        logger.error("Cannot connect to DB");
        process.exit();
      });
    this.entity = {
        cart: new Cart(),
        message: new Message(),
        product: new Product(),
        ticket: new Ticket(),
        user: new User()
    }
  }
}