const { fetchGroupById } = require('../services/groupService');

module.exports.validGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await fetchGroupById(groupId);
        console.log(group);
        next();
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};