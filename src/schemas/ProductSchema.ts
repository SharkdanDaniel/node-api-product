/**
 * A product type
 * @typedef {object} ProductModel
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */

/**
 * A product type
 * @typedef {object} ProductDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {array<UserModel>} users
 * @property {array<TagModel>} tags
 */

/**
 * A product type
 * @typedef {object} ProductCreateDTO
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */

/**
 * A product type
 * @typedef {object} ProductUpdateDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {array<UserModel>} users
 * @property {array<TagModel>} tags
 */

/**
 * A product type
 * @typedef {object} ProductListDTO
 * @property {array<ProductModel>} data - product items
 * @property {number} total - total in database
 */