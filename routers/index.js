const router = require("express").Router();
const {
  postWebhook,
  getWebhook,
} = require("../controllers/facebookController");

router.get("/", (req, res) => {
  return "Hello World !";
});
router.post("/webhook", postWebhook);
router.get("/webhook", getWebhook);

module.exports = router;
