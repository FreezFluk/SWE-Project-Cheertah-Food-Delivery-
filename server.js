var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser').json();
var app = express();

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('cheetah')
  app.listen(8080, () => {
    console.log('listening on 8080')
  });
});

app.get('/stores', (req, res) => {
  db.collection('stores').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/accounts', (req, res) => {
  db.collection('accounts').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/orders', (req, res) => {
  db.collection('orders').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/edit_account', bodyParser, (req, res) => {
  var item = {
    username: req.body.username,
    password: req.body.password,
    auth: req.body.auth,
    usr: req.body.usr,
    email: req.body.email,
    telophone: req.body.telophone,
    img: req.body.img
  };
  var oldusername = req.body.oldusername;
  db.collection('accounts').updateOne({"username": oldusername}, {$set: item}, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/in_order', bodyParser, (req, res) => {
  db.collection('orders').insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/edit_account_fadmin', bodyParser, (req, res) => {
  var item = {
    username: req.body.username,
    password: req.body.password,
    auth: req.body.auth,
    usr: req.body.usr,
    email: req.body.email,
    telophone: req.body.telophone,
    img: req.body.img
  };
  var oldusername = req.body.oldusername;
  db.collection('accounts').updateOne({"username": oldusername}, {$set: item}, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/edit_store_fadmin', bodyParser, (req, res) => {
  var item = {
    name: req.body.name,
    open: req.body.open,
    close: req.body.close,
    type: req.body.type
  };
  var oldname = req.body.oldname;
  db.collection('stores').updateOne({"name": oldname}, {$set: item}, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/in_stores', bodyParser, (req, res) => {
  db.collection('stores').insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.delete('/delete_stores', bodyParser, (req, res) => {
  db.collection('stores').deleteOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/insert_stores_fadmin', bodyParser, (req, res) => {
  db.collection('stores').insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/insert_accounts_fadmin', bodyParser, (req, res) => {
  db.collection('accounts').insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/active_status_fdriver', bodyParser, (req, res) => {
  var item = {
    usr: req.body.usr,
    order: req.body.order,
    store: req.body.store,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place,
    phone: req.body.phone,
    price: req.body.price,
    reciever: req.body.reciever,
    status1: req.body.astatus1,
    status2: req.body.astatus2,
    status3: req.body.astatus3,
    status4: req.body.astatus4
  };
  var oldorder = req.body.oldorder;
  db.collection('orders').updateOne({"order": oldorder}, {$set: item}, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/servertime', function (req, res) {
  var long_date = new Date().getTime()
  res.send(long_date.toString());
});