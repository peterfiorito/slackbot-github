const pushText = require('./sendSimpleMessage');
const issueMessage = require('./sendActionMessage');



const conversationOpener = (req, key) => {
  if (req.body.event.text.includes('open')){
    return issueMessage(req, "Let's start with your issue. Be sure to have configured your"
       + "github repo credentials. Click when you are ready!", key);
  } else {
    return pushText(req.body.event.channel, "Look at meeee! want to open an issue ticket? just @me and say open!", key);
  }
};

module.exports = conversationOpener;