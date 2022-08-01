const express = require("express");
const router = express.Router();

const ProductService = require("../services/ProductService");
const ProductServiceInstance = new ProductService();

module.exports = (app) => {
  app.use("/api/products", router);

  router.get("/", async (req, res, next) => {
    try {
      const queryParams = req.query;

      const response = await ProductServiceInstance.list(queryParams);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
  router.get("/slug/:slug", async (req, res) => {
    const slug = req.params.slug;
    const product = await ProductServiceInstance.getBySlug(slug);
    if (product) {
      res.send(product);
    } else {
      res.status(400).send({ message: "Product Not Found" });
    }
  });

  router.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.get(productId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  app.get("/api/products/slug/:slug", (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  });
};
