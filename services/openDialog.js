
const Axios = require('axios');

const openDialog = (req, key) => Axios.post('https://slack.com/api/dialog.open', {
    trigger_id: req.trigger_id,
    dialog: {
      callback_id: "open-issue",
      title: "Open a github issue",
      submit_label: "Open",
      notify_on_cancel: true,
      state: "Issue",
      elements: [
          {
              type: "text",
              label: "Title",
              name: "issue_title"
          },
          {
            type: "textarea",
            label: "Description",
            name: "issue_description"
          }
      ]
    }
  }, {
    headers: {
      'Authorization': "Bearer " + key
    }
  });

  module.exports = openDialog;