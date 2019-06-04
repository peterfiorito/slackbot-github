const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Axios = require('axios')

const conversation = require('../services/conversationTree');
const openDialog = require('../services/openDialog');
const createGithubIssue = require('../services/createNewIssue');
const sendMessage = require('../services/sendSimpleMessage');

/* A better approach would be to run it as AWS instances and use
IAM roles and temp keys, but for now this will do */
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const oAuthKey = process.env.OAUTH_KEY;


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.post('/slackbot', (req,res) => {
  if(req.body.challenge){
    res.send(req.body.challenge);
  }
  if(req.body.event.type === 'app_mention'){
    conversation(req, oAuthKey).then(() => {
      res.sendStatus(200);
    }).catch((err) => { throw new Error(err) });
  }
});

// This will be needed if setting up oauth with slack. Add the returned token to the oAuth env variable.
app.post('/oauth', (req, res) => {
  if (!req.query.code) {
    res.status(500);
    res.send({"Error": "Looks like we're not getting code."});
    console.log("Looks like we're not getting code.");
  } else {
    Axios.get('https://slack.com/api/oauth.access', {
      params: {
        code: req.query.code,
        client_id: clientID,
        client_secret: clientSecret
      }
    }, (error, response, body) => {
      if (error) {
          console.log(error);
          throw new Error ('Error in OAuth ' + error);
      } else {
          res.json(body);
      }
    });
  }
});

app.post('/github_issue', function(req, res) {
  openDialog(req.body, oAuthKey).then(() => res.sendStatus(200));
});

app.post('/actions', function(req, res) {
  const formattedPayload = JSON.parse(req.body.payload);
  if(formattedPayload.type == "block_actions"){
    openDialog(formattedPayload, oAuthKey).then(() => res.sendStatus(200));
  }
  if(formattedPayload.type == "dialog_submission"){
    createGithubIssue(formattedPayload.submission.issue_title,
        formattedPayload.submission.issue_description,
        formattedPayload.submission.issue_assignee)
      .then((result) => {
        if(result.status == 201) {
          new Promise((resolve, reject) => resolve(res.status(200).send({})))
            .then(() => sendMessage(formattedPayload.channel.id, "Issue submitted! Thanks", oAuthKey)
              .then((results) => console.log(results))
              .catch((err) => { throw new Error("Something went wrong in post messaging ")}));
        } else {
          res.status(500).send({
            text: "Something went wrong in github. Try again please" 
          })
        }
      })
      .catch((err) => {
        throw new Error('Something went wrong ' + err);
      });
  }
});

app.listen(process.env.PORT || 4390);