const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    // Enter your own database information here based on what you created
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'Bryan',
        password : 'panzer',
        database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

const database = {
    users: [
        {
            id: '123',
            name:   'John',
            email:  'john@gmail.com',
            password:   'cookies',
            entries:    0,
            joined: new Date()
        },
        {
            id: '124',
            name:   'Sally',
            email:  'sally@gmail.com',
            password:   'bananas',
            entries:    0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send(database.users);
//    res.send(database.users);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/


app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    }
    else {
        res.status(400).json('error loggin in');
    }
  // db.select('email', 'hash').from('login')
  //   .where('email', '=', req.body.email)
  //   .then(data => {
  //     const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
  //     if (isValid) {
  //       return db.select('*').from('users')
  //         .where('email', '=', req.body.email)
  //         .then(user => {
  //           res.json(user[0])
  //         })
  //         .catch(err => res.status(400).json('unable to get user'))
  //     } else {
  //       res.status(400).json('wrong credentials')
  //     }
  //   })
  //   .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => res.status(400).json(err))
})
    // bcrypt.hash("bacon", null, null, function(err, hash) {
    //     console.log(hash);
    // })
    // database.users.push({
    //     id: '125',
    //     name:   name,
    //     email:  email,
    //     password:   password,
    //     entries:    0,
    //     joined: new Date()
    // })
    //res.json(database.users[database.users.length-1]);
    // const { email, name, password } = req.body;
    // const hash = bcrypt.hashSync(password);
    // db.transaction(trx => {
    //     trx.insert({
    //         hash: hash,
    //         email: email
    //     })
    //     .into('login')
    //     .returning('email')
    //     .then(loginEmail => {
    //         return trx('users')
    //         .returning('*')
    //         .insert({
    //             email: loginEmail[0],
    //             name: name,
    //             joined: new Date()
    //         })
    //         .then(user => {
    //             res.json(user[0]);
    //         })
    //     })
    //     .then(trx.commit)
    //     .catch(trx.rollback)
    // })
    // .catch(err => res.status(400).json('unable to register'))
//})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    // let found = false;
    // database.users.forEach(user => {
    //     if (user.id === id) {
    //         found = true;
    //         return res.json(user);
    //     }
    // })
    // if (!found) {
    //     res.status(400).json('no such user');
    // }

    db.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('no such user'+id);
    }
    // db('users').where('id', '=', id)
    // .increment('entries', 1)
    // .returning('entries')
    // .then(entries => {
    //     res.json(entries[0]);
    // })
    // .catch(err => res.status(400).json('unable to get entries'))
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// })
// // Load hash from your password DB
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// })

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
})
