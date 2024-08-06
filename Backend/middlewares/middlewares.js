const express = require("express")
const passport = require("passport")

ensureAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.status(400).send("Not Authenticated")
    }
}

module.exports = [ensureAuthenticated]