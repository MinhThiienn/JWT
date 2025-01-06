import mysql from 'mysql2';

const connection = mysql.createConnection(
{
    host: "localhost",
    user : "root",
    database: "jwt"
}
);

const handleHelloWorld = (req, res) =>{
    return res.render("home.ejs")                                                                                             
}

const userHandle = (req, res) =>{
    return res.render("user.ejs");                                                                                         
}  

const handleCreateNewUser =  (req, res) =>
{
    let emailName = req.body.emailName;
    let passwordN = req.body.passwordN;
    let userName = req.body.userName;

   
    connection.query(
        ' INSERT INTO users (email, password, username)VALUES (?, ?, ?)',[emailName ,passwordN,userName],
        function(err ,results ){
            
           
        }
    );
    return res.send("Submit");
}
module.exports = {
    handleHelloWorld,
    userHandle,
    handleCreateNewUser
}