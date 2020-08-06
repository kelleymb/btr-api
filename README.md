## Born To Read API

This is the backend for Born To Read. A live version of this app can be found at: https://btr-client.kelleymb.vercel.app/

The front end client can be found at: https://github.com/kelleymb/btr-client

## Introduction to BTR

BTR was created to change the way readers both post and read reviews. 

Our unique rating system promotes users to share more than just another biased review and be as objective as possible.  

BTR is a spoiler free zone, where all book connoisseurs can come together to share and browse through an insightful collection of reviews.

## Application Demo

![](/images/BTR-Home.png)
![](/images/BTR-SignIn.png)
![](/images/BTR-SignUp.png)
![](/images/BTR-Reviews.png)
![](/images/BTR-AddReview.png)
![](/images/BTR-AddReviewQualities.png)

## Technology

### Back End
- Node and Express
  - Passport/Passport-local Authentication
  - Bcrypt
  - RESTful API
  
### Database
- Postgres
- Knex.js, SQL Query Builder
- Postgrator CLI

### Testing
- Mocha
- Chai
- Supertest

### Production
- Deployed via Heroku

## Set up
* Postgres and Node are the major dependencies for this repo.

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of "btr-api",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Create the dev and test databases `createdb -U postgres -d born-to-read` and `createdb -U postgres -d born-to-read-test`

Run migrations for dev database `npm run migrate`

Run migrations for test database `npm run migrate:test`

Run migrations for production `npm run migrate:production`

Run predeploy `npm run predeploy`

Run deploy `npm run deploy`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
