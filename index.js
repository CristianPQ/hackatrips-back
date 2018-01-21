const restify = require('restify');
const {mongoose, User, Object}  = require('./models');

const server = restify.createServer({
  name: 'hackatrips-back',
  version: '1.0.0'
});

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.listen(process.env.PORT || 8000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Objects


server.get('/objects', (req, res, next) => {

  Object.find({
    'available': true,
  }, (err, objects) => {
    if (err) {
      console.log(err);
      return next(err);
    } else res.send(objects);

    return next();
  });

});

server.post('/objects', (req, res, next) => {
  let object = new Object(req.body);

  Object.create(object, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    } else res.send({message: 'Object created'})

    return next();
  });

});

server.get('/objects/:id', (req, res, next) => {
  let id = req.params.id;

  Object.findById(id)
    .populate('history.user_id')
    .exec((err, object) => {
    if(err) {
      console.log(err);
      return next(err);
    } else res.send(object);
    return next();
  });
});

// add history element
/*
  {
      user_id: "",
      username: "",
      image: "",
      story: ""
  }
 */
server.post('/objects/:id/history', (req, res, next) => {
  let history = req.body || {};
  history.user_id = history.user_id || '';
  history.username = history.username || 'noname';
  history.image = history.image || '';
  history.story = history.story || '';

  Object.findById(id, (err, object) => {
    if(err) {
      console.log(err);
      return next(err);
    } else {
      object.history.push(history);
      object.save((err, updatedObject) => {
        if(err) {
          console.log(err);
          return next(err);
        }
        res.send(updatedObject);
        return next();
      })
    }
  });
});

server.get('objects/:id/availability/:availability', (req, res, next) => {
  let availability = req.params.availability;

  Object.findById(req.params.id)
    .populate('history.user_id')
    .exec((err, object) => {
      if (err) {
        return next(err);
      }
      object.available = availability;
      object.save();
      return res.send({ message: 'ok' });
    });
});

// Users

server.post('/users', (req, res, next) => {
  let user = new User(req.body);

  User.create(user, (err) => {
    if (err) {
      console.log(err);
      return next(err);
    } else res.send({message: 'User created'})
    return next();
  });
});


server.get('/users/:id', (req, res, next) => {
  let id = req.params.id;

  User.findById(id)
    .populate('history.object_id')
    .exec((err, user) => {
    if(err) {
      console.log(err);
      return next(err);
    } else res.send(user);
    return next();
  });
});

server.get('users/:id/balance/:balance', (req, res, next) => {
  let balance = req.params.balance;

  User.findById(req.params.id)
    .populate('history.object_id')
    .exec((err, object) => {
      if (err) {
        return next(err);
      }
      object.balance = balance;
      object.save();
      return res.send({ message: 'ok' });
    });
});

// add history element
/*
  {
    object_id: "",
    message: ""
  }
 */

server.post('/users/:id/history', (req, res, next) => {
  let history = req.body;

  history.object_id = history.object_id || '';
  history.message = history.message || '';

  User.findById(id, (err, user) => {
    if(err) {
      console.log(err);
      return next(err);
    } else {
      user.history.push(history);
      user.save((err, updatedUser) => {
        if(err) {
          console.log(err);
          return next(err);
        }
        res.send(updatedUser);
        return next();
      })
    }
  });
});
