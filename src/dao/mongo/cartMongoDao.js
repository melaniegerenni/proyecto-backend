import cartModel from "../models/cart.model.js";
import logger from "../../winston.config.js";

export default class Cart {
  constructor() {
    this.model = cartModel;
  }

  getCarts = async () => {
    const carts = await this.model.find().lean().exec();
    return carts;
  };

  getCart = async (id) => {
    try {
      const cart = await this.model.findById(id).lean().exec();
      return cart;
    } catch (error) {
      logger.error(error);
    }
  };

  getCartById = async (id) => {
    try {
      const cart = await this.model
        .findById(id)
        .populate("products.product")
        .lean()
        .exec();
      return cart;
    } catch (error) {
      logger.error(error);
    }
  };

  addProduct = async (cid, pid) => {
    const newProduct = { product: pid, quantity: 1 };
    try {
      const cart = await this.model.findById(cid);
      const indexProduct = cart.products.findIndex(
        (item) => item.product == pid
      );
      if (indexProduct >= 0) {
        cart.products[indexProduct].quantity += 1;
      } else {
        cart.products.push(newProduct);
      }
      await cart.save();
      return cart;
    } catch (error) {
      logger.error(error);
    }
  };

  addCart = async (cart) => {
    try {
      const cartGenerated = new this.model(cart);
      await cartGenerated.save();
      return cartGenerated;
    } catch (error) {
      logger.error(error);
    }
  };

  deleteProduct = async (cid, pid) => {
    try {
      const cart = await this.getCart(cid);
      const prods = cart.products.filter(
        (item) => item.product.toString() != pid.toString()
      );
      const response = await this.updateCart(cid, prods);
      return response;
    } catch (error) {
      logger.error(error);
    }
  };

  updateCart = async (cid, products) => {
    try {
      const response = await this.model.findByIdAndUpdate(cid, {
        products: products,
      });
      return response;
    } catch (error) {
      logger.error(error);
    }
  };

  updateProduct = async (cid, pid, qty) => {
    try {
      const cart = await this.model.findById(cid).lean().exec();
      const products = cart.products;
      const indexProduct = products.findIndex((item) => item.product == pid);
      products[indexProduct].quantity = qty;
      const response = await this.updateCart(cid, products);
      return response;
    } catch (error) {
      logger.error(error);
    }
  };

  deleteManyProducts = async (cid, products) => {
    try {
      const cart = await this.getCart(cid);
      let prods = cart.products;
      products.forEach((pid) => {
        prods = prods.filter(
          (item) => item.product.toString() != pid.toString()
        );
      });
      const response = await this.updateCart(cid, prods);
      return response;
    } catch (error) {
      logger.error(error);
    }
  };

  deleteProducts = async (cid) => {
    try {
      const response = await this.updateCart(cid, []);
      return response;
    } catch (error) {
      logger.error(error);
    }
  };
}
