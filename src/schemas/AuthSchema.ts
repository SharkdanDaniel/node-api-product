/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */ 

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwI
 *         profile:
 *            type: UserResponse
 */

/**
 * A login request
 * @typedef {object} LoginRequest
 * @property {string} email - email info - email
 * @property {string} password
 */

/**
 * A login response
 * @typedef {object} LoginResponse
 * @property {string} token
 * @property {UserDTO} profile
 */
