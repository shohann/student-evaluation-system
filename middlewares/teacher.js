module.exports.teacher = async (req, res, next) => {
    if (req.user.role !== 'STUDENT') return res.status(403).send('Forbidden');
    next();
}