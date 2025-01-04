const handleHelloWorld = (req, res) =>{
    return res.render("home.ejs")                                                                                             
}

const userHandle = (req, res) =>{
    return res.render("user.ejs")                                                                                             
}  
module.exports = {
    handleHelloWorld,
    userHandle
}