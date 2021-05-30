const express = require("express");
const router = express.Router();

const {
    isSignedIn,
    isAuthenticated,
    isAdmin
} = require("../controllers/auth");

const {
    getUserByID,
    pushOrderInPurchaseList
} = require("../controllers/user");

const {
    updateStock
} = require("../controllers/product");

const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require("../controllers/order");

//params
router.param("userId", getUserByID)
router.param("orderId", getOrderById);

//Actual routes
//create
router.post("/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder,
)

//read Routes
router.get("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

// Status of order
router.get("/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);

router.put("/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

module.exports = router;