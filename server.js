const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const option = {
  useNewUrlParser: true
};

const app = express();
app.use(cors());

const MONGO_URI =
  'mongodb://ianfiguer:JFigueroa@ds241977.mlab.com:41977/auth-graphql';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, option);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
