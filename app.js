const express = require('express');
const mongoose = require('mongoose');
const userService = require('./services/user.service');
const postService = require('./services/post.service');

import bodyParser from 'body-parser';
import server from './apolloServer';

const connectionString = 'mongodb://demoUser:demoPassword@127.0.0.1:27017/demo';
mongoose.connect(connectionString);
const db = mongoose.connection;
const app = express();
const port = 3220;
db.on('error', (error) => console.log(error));

app.get('/user', async (req, res) => {
    const data = await userService.findAllAsync();
    res.json(data);
});

app.get('/user/create?/:userName', async (req, res) => {
    const data = await userService.createAsync(req.params.userName);
    res.json(data);
});

app.get('/user?/:id', async (req, res) => {
    const data = await userService.findOne(req.params.id);
    res.json(data);
});
app.get('/user?/:id/post/create/:title', async (req, res) => {
    const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const data = await postService.createAsync(req.params.title, dummyText, req.params.id);
    res.json(data);
});

server.applyMiddleware({app});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))