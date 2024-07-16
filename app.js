const express = require('express');
const app = express();
const cookieParser = require('cookieparser');
const path = require('path');
const db = require('./config/mongooseConnection');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const router = require('./routes/ownersRouter');

app.get('/', (req, res) => {
    res.render('index');
})

if(process.env.NODE_ENV === 'development'){    
    router.post('/create', (req, res) => {
        res.send('owner created');
    })
    }

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});