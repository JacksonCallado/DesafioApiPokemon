const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080

require('./src/Routes/index')(app, fs);
 
app.use(cors());
app.use(express.json());
app.listen(port, function(){
   console.log(`Server running at http://localhost:${port}/`);
});