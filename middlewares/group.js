const { fetchGroupById } = require('../services/groupService');

module.exports.validGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await fetchGroupById(groupId);
        if (!group) res.status(400).json({
            msg: 'Invalid Group'
        });
        next();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};