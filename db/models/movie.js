const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Movie extends Sequelize.Model {}
    Movie.init({
        // Set custom primary key column (option; id = default)
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                notEmpty: {
                  msg: 'Please provide a value for "Title"' 
                },
            }
        },
        runtime: {            
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "runtime"',
                },
                min: {
                    args: 1,
                    msg: 'Runtime should be greater than 0'
                }
            }
        }, 
        releaseDate: {
            type: Sequelize.DATEONLY, // yyyy-mm-dd (w/out timestamp)
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "releaseDate"',
                },
                isAfter: {
                    args: '1895-12-27',
                    msg: 'releaseDate should be on or after "1895-12-27"'
                }
            }
        },
        isAvailableOnVHS: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, 
    // Model options object
    { 
        // timestamps: false,
        // freezeTableName: true,
        // modelName: 'movie',
        // tableName: 'my_movies_table',
        // paranoid: true, (enables "soft" deletes)
        sequelize        
    });

    return Movie;
};