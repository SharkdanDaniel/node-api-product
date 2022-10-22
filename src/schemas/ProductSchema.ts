/**
 * A product type
 * @typedef {object} ProductModel
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {array<UserDTO>} users
 * @property {array<TagDTO>} tags
 */

/**
 * A product type
 * @typedef {object} ProductDTO
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 */

/**
 * A product type
 * @typedef {object} ProductList
 * @property {array<ProductDTO>} data - product items
 * @property {number} total - total in database
 */
