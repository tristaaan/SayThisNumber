//index.js

var app = require('./application/app');

app.listen(process.env.PORT ? process.env.PORT : 8000 , function() {
    console.log('Listening...');
});