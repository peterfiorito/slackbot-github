const Axios = require('axios');

const pushText = (channel, textInput, key) => Axios.post('https://slack.com/api/chat.postMessage',
{
  channel: channel,
  text: textInput
},{
  headers: {
    'Authorization': "Bearer " + key
  }
});

module.exports = pushText;