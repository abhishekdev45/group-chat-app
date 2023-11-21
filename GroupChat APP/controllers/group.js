// Assuming you have the necessary Sequelize models imported
const Group = require('../models/group');
const UserGroup = require('../models/usergroup');


const createGroup = async (req, res) => {
    try {
       
        const ownerId = req.user.id;


        const { groupName } = req.body;


        const group = await Group.create({
            name: groupName,
            ownerId: ownerId,
        });

        await UserGroup.create({
            userId: ownerId,
            groupId: group.id,
        });

        res.status(201).json({ group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Group Details
// const getGroupDetails = async (req, res) => {
//     try {
//         const groupId = req.params.groupId;

//         // Fetch the group details, including associated users
//         const group = await Group.findByPk(groupId, {
//             include: [
//                 {
//                     model: UserGroup,
//                     attributes: [], // Exclude unnecessary attributes
//                 },
//             ],
//         });

//         if (!group) {
//             return res.status(404).json({ error: 'Group not found' });
//         }

//         res.status(200).json({ group });
//     } catch (error) {
//         console.error('Error getting group details:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

const getUserGroups = async (req, res) => {
    try {

        const userId = req.user.id;

        const userGroups = await UserGroup.findAll({
            where: { UserId: userId },
            include: [
                {
                    model: Group,
                    attributes: ['id', 'name'], // Include only necessary attributes
                },
            ],
        });

        res.status(200).json({ userGroups });
    } catch (error) {
        console.error('Error getting user groups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createGroup,
    getUserGroups
};
