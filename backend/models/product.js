const db = require("../db");

module.exports = class ProductModel {
  async find(options = {}) {
    try {
      const statement = `SELECT *
                         FROM products`;
      const values = [];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw err;
    }
  }
  async findBySlug(slug) {
    try {
      const statement = `SELECT * FROM products WHERE slug = $1; `;
      const values = [slug];
      const result = await db.query(statement, values);
      if (result.rows?.length) {
        return result.rows;
      }

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findOne(id) {
    try {
      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`;
      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw err;
    }
  }
};
