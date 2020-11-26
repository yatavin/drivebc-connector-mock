import express from "express";
import {Models, connectDB} from './src/db.js'
import Routes from "./src/routes/index.js";
import {swaggerDocument, swaggerUi} from './openapi/index.js'



const app = express();
const config = {
    name: 'events-api',
    port: 3836,
    host: '0.0.0.0',
};

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/ping', (req, res) => {
    res.status(200).json("pong");
});

Routes.forEach((route) => {
    app.use(route.path, route.route);
});

connectDB().then( async () => {
    app.listen(config.port, config.host, (e)=> {
        if(e) {
            throw new Error(e);
        }

        console.log(`${config.name} is running on port ${config.port}`);
    });
    // const event = new Models.Event();

    // await event.save(function (err, doc) {
    //     if (err) console.log(err.errors);
    //     console.log('nooooooooooo', doc);
    // });
})