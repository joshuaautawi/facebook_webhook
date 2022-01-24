const router = require("express").Router();
const {
  postWebhook,
  getWebhook,
} = require("../controllers/facebookController");

router.post("/webhook", postWebhook);
router.get("/webhook", getWebhook);

module.exports = router;
