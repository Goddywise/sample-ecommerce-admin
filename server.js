 const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const multer = require('multer');
// const upload = multer({dest:"assets/uploads/"})


const homeRoutes = require('./routes/homeRoutes');
const dbRoutes = require('./routes/dbRoutes');
const productRoutes = require("./routes/productRoutes");
const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use([express.static(__dirname),cors(),bodyParser.json(),
]);


app.use('/',homeRoutes);
app.use('/db',dbRoutes);
app.use("/products",productRoutes);
app.use('/login',loginRoutes);
app.use('/users',userRoutes);
app.all('*',(req,res)=>{
    res.status(404).send('page not found')
})

app.listen(process.env.PORT || 5050,()=>{
    console.log(`server running on port ${process.env.PORT || 5050}`)
})

