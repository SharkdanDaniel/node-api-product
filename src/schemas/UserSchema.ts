/**
 * A user type
 * @typedef {object} UserModel
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {array<ProductDTO>} products
 * @property {AvatarDTO} avatar
 */

/**
 * A user type
 * @typedef {object} UserDTO
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 */

/**
 * A user type
 * @typedef {object} UserCreate
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {string} password
 */

/**
 * A user type
 * @typedef {object} UserUpdate
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {string} password
 * @property {boolean} admin
 * @property {array<ProductDTO>} products
 * @property {AvatarDTO} avatar
 */

/**
 * A user type
 * @typedef {object} UserList
 * @property {array<UserDTO>} data - user items
 * @property {number} total - total in database
 */
