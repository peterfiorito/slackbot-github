# slackbot-github

A simple slackbot done in NODE.JS and Express that posts issues to github when prompted. I KNOW that the github app offers a similar functionality, but if you are:

- trying to learn how to set up a slack bot
- want more control over what your bot can or cannot do
- want to add specific features related to the github/slack interaction

This will probably be useful for you as a starting point.

Demo: https://www.youtube.com/watch?v=CYVQyyjI6KU

A lot of the set up is dependant on setting the right environment variables, so be sure to pay attention to these:
`REPO_OWNER`
`GITHUB_REPO`
`OAUTH_KEY`

And yes, this could be done with AWS lambda or IAM roles and temp keys, but I leave that to you and your implementation. Get creative!

This is free for you to clone, fork or use; Just let me know your thoughts after trying it out.