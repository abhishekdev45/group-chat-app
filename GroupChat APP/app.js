const express = require("express");
const sequelize = require("./utils/database");
app.use(cors({
    origin:"http://127.0.0.1:5500"
}));

const userRoute = require("./routes/user");
const mainRoute = require("./routes/main")

const User = require("./models/user");


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",userRoute);
app.use("/", mainRoute);

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})
