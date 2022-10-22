module.exports = {
 userRegisterValidation : (req,res, next) =>{
    if(req.body.name == null || req.body.name == undefined || req.body.name == ""){
        return res.status(400).send({message : "User's name is invalid"});
    }
    else if(req.body.email == null || req.body.email == undefined || req.body.email == ""){
        return res.status(400).send({message : "User's email is invalid"});
    }else if(req.body.password == null || req.body.password == undefined || req.body.password == "" || req.body.password.length <5 ){
        return res.status(400).send({message : "User's password is invalid"});
    }else
    next();
},
 loginValidation : (req,res, next) =>{
     if(req.body.email == null || req.body.email == undefined || req.body.email == ""){
        return res.status(400).send({message : "User's email is invalid"});
    }else if(req.body.password == null || req.body.password == undefined || req.body.password == "" || req.body.password.length <5 ){
        return res.status(400).send({message : "User's password is invalid"});
    }else
    next();
}
}