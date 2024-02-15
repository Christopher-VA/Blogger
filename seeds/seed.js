const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const commentSeeds = require('./commentSeeds.json');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeeds, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postSeeds, {
        individualHooks: true,
        returning: true,
    });

    await Comment.bulkCreate(commentSeeds, {
        individualHooks: true,
        returning: true,
    });
}

seedAll();