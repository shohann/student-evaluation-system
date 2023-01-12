module.exports.teacher = async (req, res, next) => {
    if (req.user.role !== 'TEACHER') return res.status(403).send('Forbidden');
    next();
}

