/**
 * A user type
 * @typedef {object} UserModel
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 */

/**
 * A user type
 * @typedef {object} UserDTO
 * @property {string} id - user id - uuid
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {AvatarDTO} avatar
 * @property {ProductModel[]} products
 */

/**
 * A user type
 * @typedef {object} UserCreateDTO
 * @property {string} name
 * @property {string} email - user email - email
 * @property {boolean} admin
 * @property {string} password
 */

/**
 * A user type
 * @typedef {object} UserUpdateDTO
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
 * @typedef {object} UserListDTO
 * @property {array<UserModel>} data - user items
 * @property {number} total - total in database
 */