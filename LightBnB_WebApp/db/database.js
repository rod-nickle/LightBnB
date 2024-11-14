const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE email = $1;
  `;

  const queryParms = [email];

  return pool
  .query(queryString, queryParms)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    return err.message;
  });

};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `
  SELECT id, name, email, password
  FROM users
  WHERE id = $1;
  `;

  const queryParms = [id];

  return pool
  .query(queryString, queryParms)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    return err.message;
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `
  INSERT INTO users
  (name, email, password)
  VALUES 
  ($1, $2, $3)
  RETURNING *;
  `;

  const queryParms = [user.name, user.email, user.password];

  return pool
  .query(queryString, queryParms)
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    return err.message;
  });

};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `
  SELECT 
    r.id, r.start_date, r.end_date,
    p.title, p.thumbnail_photo_url, p.number_of_bedrooms, p.number_of_bathrooms, p.parking_spaces, p.cost_per_night, 
    avg(pr.rating) as average_rating
  FROM reservations r
  JOIN properties p
  ON p.id = r.property_id
  JOIN property_reviews pr
  ON pr.property_id = p.id
  WHERE r.guest_id = $1
  GROUP BY 
    r.id, r.start_date, r.end_date,
    p.title, p.thumbnail_photo_url, p.number_of_bedrooms, p.number_of_bathrooms, p.parking_spaces, p.cost_per_night
  ORDER BY r.start_date
  LIMIT $2;
  `;

  const queryParms = [guest_id, limit];

  return pool
  .query(queryString, queryParms)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err.message;
  });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParms = [];

  let queryString = `
  SELECT p.*, avg(pr.rating) as average_rating
  FROM properties p
  LEFT JOIN property_reviews pr
  ON pr.property_id = p.id
  WHERE 1=1
  `;

  if (options.city) {
    queryParms.push(`%${options.city.toLowerCase()}%`);
    queryString += `AND lower(p.city) LIKE $${queryParms.length} `;
  }

  if (options.owner_id) {
    queryParms.push(options.owner_id);
    queryString += `AND p.owner_id = $${queryParms.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParms.push(Number(options.minimum_price_per_night));
    queryString += `AND p.cost_per_night/100 >= $${queryParms.length} `;
  }

  if (options.maximum_price_per_night) {
    queryParms.push(Number(options.maximum_price_per_night));
    queryString += `AND p.cost_per_night/100 <= $${queryParms.length} `;
  }

  queryString += `
  GROUP BY p.id`;
  
  if (options.minimum_rating) {
    queryParms.push(Number(options.minimum_rating));
    queryString += `
    HAVING avg(pr.rating) >= $${queryParms.length} `;
  }
  
  queryParms.push(limit);
  queryString += `
  ORDER BY p.cost_per_night
  LIMIT $${queryParms.length};
   `;

  return pool
    .query(queryString, queryParms)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err.message;
    });

};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `
  INSERT INTO properties (
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  street,
  city,
  province,
  post_code,
  country,
  parking_spaces,
  number_of_bathrooms,
  number_of_bedrooms
  )
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;

  const queryParms = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night * 100,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  return pool
  .query(queryString, queryParms)
  .then((result) => {
    console.log(result.rows);
  })
  .catch((err) => {
    console.log(err.message);
  });

};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
