import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { Container } from "typedi";

export default {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    const productService = Container.get(ProductService);
    try {
      const productRow = await productService.create(req.body);
      return res.status(200).json(productRow);
    } catch (err) {
      next(err);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const productService = Container.get(ProductService);
    try {
      await productService.delete(id);
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    const productService = Container.get(ProductService);
    try {
      const productRow = await productService.update(req.body);
      return res.status(200).json(productRow);
    } catch (err) {
      next(err);
    }
  },

  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const productService = Container.get(ProductService);
    try {
      const productRow = await productService.findAll(id);
      return res.status(200).json(productRow);
    } catch (err) {
      next(err);
    }
  },

  decreaseProductsAmount: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { products } = req.body;
    const productService = Container.get(ProductService);
    try {
      await productService.decreaseProductsAmount(products);
      return res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
};
