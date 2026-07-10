function validateOrder(req,res,next){
    const {symbol, price, qty, side, type} = req.body;
    if(!symbol || typeofsymbol !== 'string') {
        return res.status(400).json({ error: 'symbol is required'});

    }

    if(!price || price<=0 ){
        return res.status(400).json({ error: 'price must be positive'});
    }

    if(!['buy' , 'sell' ].includes(side)){
        return res.status(400).json({error: 'side must be buy or sell'});
    }

    next();

};