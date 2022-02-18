const express = require('express');
const path = require('path');
const routes = require('./routes/route');
const notFoundError = require('./errors/404Error');

const port = process.env.PORT || 8000;

const app = express();


//middleware
app.use(express.static('./public'));
app.use(express.json());



//routes
app.use('/', routes);
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/axios/dist')));
app.use(notFoundError);


const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}


start()