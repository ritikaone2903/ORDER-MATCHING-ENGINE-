const express = require('express');//imported express in same name variable
const app = express();

app.use(express.json()); //to be able to parse the json req bodies 


//get route : http status chnage kiya aur  json me res returned 
app.get('./orders', (req,res) => {
    res.status(200).json({orders: []});
});



//post route 
app.post('./orders', (req,res) => {
    const {symbol, price, side, qty, type, timestamp} = req.body;
    //order logic 

    res.status(201).json({ message: 'order created'});
});



app.listen(3000, () => console.log('server running on port 3000'));
