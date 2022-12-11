const { Option } = require('../utils/dbInit')

module.exports.createOptions = async (options) => {
    return await Option.createMany({
        data: options
    });
};