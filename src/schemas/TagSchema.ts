/**
 * A tag type
 * @typedef {object} TagDTO
 * @property {string} id - tag id - uuid
 * @property {string} name
 * @property {ProductModel[]} products
 */

/**
 * A tag type
 * @typedef {object} TagCreateDTO
 * @property {string} name
 */

/**
 * A tag type
 * @typedef {object} TagUpdateDTO
 * @property {string} id - tag id - uuid
 * @property {string} name
 * @property {UserModel} user
 */

/**
 * A tag type
 * @typedef {object} TagListDTO
 * @property {array<TagModel>} data - tags items
 * @property {number} total - total in database
 */