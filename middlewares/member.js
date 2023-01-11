const { fetchMembershipById } = require('../services/groupMembershipService');

module.exports.member = async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;

    try {
        const membership = await fetchMembershipById(userId, groupId);
        if (membership) return res.render('warning', { message: 'Already has membership' });
        next();
    } catch (error) {
        console.log(error);
        res.json({
            message: 'something wrong'
        })
    }
};

module.exports.membershipType = async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;

    try {
        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}