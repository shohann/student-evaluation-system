const { fetchMembershipById } = require('../services/groupMembershipService');

module.exports.creator = async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;

    try {
        const { creator } = await fetchMembershipById(userId, groupId);
        if (!creator) return res.render('warning', { message: 'Forbidden' });
        next();
    } catch (error) {
        console.log(error);
        res.json({
            message: 'something wrong'
        })
    }
};


