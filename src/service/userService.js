
import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';// get the promise implementation, we will use bluebird


// create the connection, specify bluebird as Promise


// query database



const salt = bcrypt.genSaltSync(10);
const hashPassWord =  (userPassword)=>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) =>{
   let hashPass = hashPassWord(password);
   const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
        ' INSERT INTO users (email, password, username)VALUES (?, ?, ?)',[email ,hashPass,username],
      );
  } catch (error) {
    console.log(error)
  }
  
  

}

const getUserList = async ()=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
 
    try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM `users` '
          );
          return rows;
    } catch (error) {
        console.log("check err:", error);
    }
    

}

const delettUser = async (id)=> {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
      try {
        const [rows, fields] = await connection.execute(
            'DELETE FROM `users` WHERE id=?',[id]
          );
          return rows;
    } catch (error) {
        console.log("check err:", error);
    }



}
const getUserByid =  async (id)=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
      try {
        const [rows, fields] = await connection.execute(
            'SELECT * FROM `users` WHERE id=?',[id]
          );
          console.log(rows)
          return rows;
        
    } catch (error) {
        console.log("check err:", error);
    }
}
const updateUserInfor = async(email, username, id)=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird,
      });
      try {
        const [rows, fields] = await connection.execute(
            'update `users` set email=?, username=? where id=?',[email, username, id]
          );
          console.log(rows)
          return rows;
        
    } catch (error) {
        console.log("check err:", error);
    }
}

module.exports = {
    createNewUser,getUserList,delettUser,getUserByid,updateUserInfor
}