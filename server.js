const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//const middleware = require('./middleware/index');
const homeRoutes = require('./routes/homeRoutes');
const dbRoutes = require('./routes/dbRoutes');
const app = express();

app.use([express.static(__dirname),cors(),bodyParser.json()]);
//app.use('*',middleware);

app.use('/',homeRoutes);
app.use('/db',dbRoutes);
app.all('*',(req,res)=>{
    res.status(404).send('page not found')
})


app.listen(process.env.PORT || 5050,()=>{
    console.log(`server running on port ${process.env.PORT || 5050}`)
})

