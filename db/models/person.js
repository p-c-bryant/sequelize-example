const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Person extends Sequelize.Model {}
    Person.init({
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "firstName"',
                },
                notEmpty: {
                  msg: 'Please provide a value for "firstName"' 
                },
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "lastName"',
                },
                notEmpty: {
                  msg: 'Please provide a value for "lastName"' 
                },
            }
        }
    }, 
    // Model options object
    { 
        // timestamps: false,
        // freezeTableName: true,
        // modelName: 'movie',
        // tableName: 'my_movies_table',
        sequelize        
    });

    return Person;
};