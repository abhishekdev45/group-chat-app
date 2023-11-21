const express = require("express");
const sequelize = require("./utils/database");
const cors = require("cors");

const userRoute = require("./routes/user");
const mainRoute = require("./routes/main");
const messageRoute = require('./routes/message');
const groupRoute = require('./routes/group');

const User = require("./models/user");
const Message = require("./models/message");
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use("/user",userRoute);
app.use("/message",messageRoute);
app.use("/group",groupRoute);
app.use("/", mainRoute);

User.hasMany(Message);
Message.belongsTo(User);

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

sequelize.sync().then((result)=>{
    
    app.listen(3000);
}).catch(e=>{
    console.log(e);
})