var db = require('../db/index.js');

module.exports = {
  products: {
    get: function(callback) {
      var query = `select * from products limit 5;`;
      db.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
          callback(null, results.rows);
        }
      })
    }
  },
  productInfo: {
    get: function(id, callback) {
      var query = `select products.id, products.name, products.slogan, products.description,
      products.category, products.default_price, features.feature, features.value
      from products, features
      where products.id = ${id} and features.product_id = ${id}`;
      db.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
          var data = {};
          data.id = results.rows[0].id;
          data.name = results.rows[0].name;
          data.slogan = results.rows[0].slogan;
          data.description = results.rows[0].description;
          data.category = results.rows[0].category;
          data.default_price = results.rows[0].default_price;

          var features = [];

          for (var i = 0; i < results.rows.length; i++) {
            features.push({"feature:": results.rows[i].feature, "value:":  results.rows[i].value})
          }

          data.features = features;

          callback(null, data);
        }
      })
    }
  },
  productStyles: {
    get: function(id, callback) {
      // var query = `select styles.product_id, styles.id, styles.name, styles.original_price,
      // styles.sale_price, styles.default_style,
      // photos.thumbnail_url, photos.url,
      // skus.id as skuid, skus.quantity, skus.size
      // from styles
      // left join photos
      // on styles.id = photos.style_id
      // left join skus
      // on styles.id = skus.style_id
      // where styles.product_id = ${id};`;

      // var query = `select styles.product_id, styles.id, styles.name, styles.original_price,
      // styles.sale_price, styles.default_style,
      // (select json_agg(photos_url)
      // from
      // (select photos.thumbnail_url, photos.url
      //   from photos
      //   where photos.style_id = styles.id) as photos_url) as photos
      // from styles;
      // `;

      // var query = `
      //   WITH
      //   photosCTE AS (
      //     SELECT
      //       photos.style_id,
      //       json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos
      //     FROM photos
      //     LEFT JOIN styles ON photos.style_id = styles.id
      //     GROUP BY photos.style_id
      //   )
      //   SELECT
      //     json_build_object(
      //       'product_id', styles.product_id,
      //       'results', json_agg(json_build_object(
      //         'style_id', styles.id,
      //         'name', styles.name,
      //         'original_price', styles.original_price,
      //         'sale_price', styles.sale_price,
      //         'default?', styles.default_style,
      //         'photos', (select photos from photosCTE where photosCTE.style_id = styles.id)
      //       ))
      //     ) AS product_styles
      //   FROM styles
      //   WHERE styles.id = ${id}
      //   GROUP BY styles.id;`;

      var query = `
      SELECT styles.id, styles.name, styles.original_price, styles.sale_price, styles.default_style AS "default?",
      (SELECT json_agg(photos_url)
      FROM (
        SELECT thumbnail_url, url
        FROM photos
        WHERE photos.style_id=styles.id
        ) AS photos_url
      ) AS photos,
      json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) AS skus
      FROM styles
      JOIN skus
      ON styles.id = skus.style_id and styles.product_id=${id}
      GROUP BY styles.id
      ;
      `


      db.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
          var data = {
            product_id: id,
            results: results.rows
          }

          callback(null, data);
        }
      })
    }
  },
  productsRelated: {
    get: function(id, callback) {
      var query = `select related.related_id
      from related
      where product_id = ${id}`;
      db.query(query, (err, results) => {
        if (err) {
          callback(err);
        } else {
          var data = [];

          for (var i = 0; i < results.rows.length; i++) {
            data.push(results.rows[i].related_id);
          };

          callback(null, data);
        }
      })
    }
  }
}