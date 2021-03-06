exports.handler = function(event, context, callback) {
  // execute some code finally
  const number = event.queryStringParameters.number;
  const body = event.queryStringParameters.body;

  // require("../../ENV");
  const twilio = require("twilio");
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);

    // //Send Text
    client.messages
      .create({
        body: "HELLO: " + body,
        to: process.env.MY_NUMBER, // Text this number
        from: "+17786554127" // From my number
      })
      .then(message => {
        // console.log(message.body)
        callback(null, {
          statusCode: 200,
          body: "number: " + number
        });
      })
      .catch(e => {
        callback(null, {
          statusCode: 200,
          body: e.message
        });
      });
  } catch (e) {
    callback(null, {
      statusCode: 200,
      body: e.message
    });
  }
};
