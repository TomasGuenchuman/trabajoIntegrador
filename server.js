const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

app.listen(port, () => console.log(`Listening on port ${port}`)); 
app.use(express.json())
app.use('/', indexRouter);
app.use('/api', apiRouter);
