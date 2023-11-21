const {Op} = require('sequelize');
const Message = require("../models/message");
const User = require("../models/user");

const postMessage = async (req, res) => {
    try {
        const { text } = req.body;

        // Assuming you have the user ID in the request or from authentication
        const userId = req.user.id; // Replace with your actual way of getting the user ID

        const message = await Message.create({
            text,
            UserId: userId,
        });

     

        res.status(201).json({ message  });
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMessages = async (req, res) => {
    try {
        
        const lastMessageId = req.query.lastMessageId ? parseInt(req.query.lastMessageId, 10) : 0;

       
        const newMessages = await Message.findAll({
            where: {
                id: { [Op.gt]: lastMessageId } 
            },
            include: [{
                model: User,
                attributes: ['name'],
            }],
        });

        
        res.status(200).json({ messages: newMessages });
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    postMessage,
    getMessages
};

