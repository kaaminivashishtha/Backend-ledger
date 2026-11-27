const express= require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller");

const router  = express.Router();

/**
 * - POST /api/accounts
 * - create a new account
 * - protected routes
 */
router.post("/" , authMiddleware.authMiddleware , accountController.createAccountController);


/**
 * - GET /api/accounts/
 * Get all accounts of the logged-in user
 * Protected Route
 */

router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * -Get /api/accounts/balance/:accountId
 * get balanvce
 */

router.get("/balance/:accountId" ,authMiddleware.authMiddleware,accountController.getAccountBalanceController )

module.exports = router;