const Axios = require('axios');

const issueMessage = (req, textInput, key) => Axios.post('https://slack.com/api/chat.postMessage',
{
  channel: req.body.event.channel,
  blocks: [{
		type: "section",
		text: {
			type: "mrkdwn",
			text: textInput
		}
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
          text: {
              type: "plain_text",
              text: "Open an issue",
              "emoji": false
          }
      }
    ]
  }]
},{
  headers: {
    'Authorization': "Bearer " + key
  }
});

module.exports = issueMessage;