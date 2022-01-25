require("dotenv").config();
const { text } = require("body-parser");
const path = require("path");
const request = require("request");
const postWebhook = async (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        console.log("test");
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        console.log("reply");
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    return res.status(200).send("EVENT_RECEIVED");
  } else {
    return res.sendStatus(404);
  }
};

const getWebhook = async (req, res) => {
  let VERIFY_TOKEN = process.env.FACEBOOK_TOKEN;

  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
};

function handleMessage(sender_psid, received_message) {
  let response;

  console.log(`-------------`);
  console.log(received_message);
  console.log(`-------------`);
  console.log(received_message.reply_to);
  // Checks if the message contains text\
  const y = /yes|yeah|yup/gi;
  const n = /no|nah/gi;
  if (received_message.text && received_message.reply_to) {
  } else if (received_message.text && received_message.reply_to) {
  } else if (received_message.text) {
    console.log('kepanggil')
    response = {
      text: `Hi there, What is your name ?`,
    };
  }
  return callSendAPI(sender_psid, response);
}
// function firstTrait(nlp, name) {
//   return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
// }
// function firstEntity(nlp, name) {
//   return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
// }

// function handleMessage(sender_psid, message) {
//   console.log(`--------------------------`);
//   console.log(message);
//   console.log(`--------------------------`);
//   // check greeting is here and is confident
//   const greeting = firstTrait(message.nlp, "greetings");
//   const date = firstTrait(message.nlp, "wit$datetime:$datetime");
//   const greeting = firstTrait(message.nlp, "wit$greetings");
//   if (greeting && greeting.confidence > 0.8) {
//     callSendAPI(sender_psid, "Hi there !");
//   } else {
//     callSendAPI(sender_psid, "When is your birthday?");
//   }
// }
function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") {
    response = { text: "Oops, try sending another image." };
  }
  callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    // message: { text: response },
    message: response
  };

  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.FACEBOOK_TOKEN },
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

module.exports = { postWebhook, getWebhook };
