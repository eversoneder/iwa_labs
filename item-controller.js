exports.helloWorld = function(req,res){
    res.json({message: "Hello World!",
    data: [
    req.params.foo,
    req.params.bar
    ]});
}
