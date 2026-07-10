function logger(req,res,next) {//this func will log every request 
    console.log('${req.method} ${req.url}');
    next();//this will pass the control to the next handler func or middleware
}


function authenticate(req,res,next) {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({ error: 'no token provided'});
    //verfiying token 



    next();
}



app.use(logger); // that this applies to  all the routes
app.get('./orders',authenticate, (req,res) =>{//this will only run if authentication is done and control passed to next func 
    res.json({ orders: []});
});



//error handler 
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(err.statuscode || 500).json({ error: err.message || 'internal server error'});
});