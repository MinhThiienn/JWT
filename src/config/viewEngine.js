import express from "express"

const configViewEngine = (app) =>{
        app.use(express.static('./src/public'));
        app.set("view engine","ejs"); // Định nghĩa view engine - Sử dụng công nghệ gì
        app.set("views", "./src/views"); // Nơi lưu trữ
}

export default configViewEngine;