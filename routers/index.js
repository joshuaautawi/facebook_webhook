const router = require("express").Router();
const {
  postWebhook,
  getWebhook,
} = require("../controllers/facebookController");
const { homePage } = require("../controllers/homePageController");

router.get("/", homePage);

router.post("/webhook", postWebhook);
router.get("/webhook", getWebhook);

module.exports = router;
