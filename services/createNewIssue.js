const Axios = require('axios');

// github access token, owner and repo name are needed

const postNewIssue = (title, body) => Axios.post(`https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.GITHUB_REPO}/issues`,
  {   title: title,
    body: body,
    labels: [
      "bug"
    ]
  },
  {
    headers: { Authorization: "bearer " + process.env.GITHUB_ACCESS_TOKEN }
});

module.exports = postNewIssue;