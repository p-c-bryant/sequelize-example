const db = require ('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize; // allows for use of operators (i.e. Op.gte)

// async IIFE
(async () => {
    // Sync all tables
    await db.sequelize.sync({force: true});

    try {
        const movie = await Movie.create({
            title: 'Toy Story',
            runtime: 81,
            releaseDate: '2000-06-18',
            isAvailableOnVHS: true
        });
        console.log(movie.toJSON());

        const movie2 = await Movie.create({
            title: 'Toy Story 2',
            runtime: 95,
            releaseDate: '2005-06-18',
            isAvailableOnVHS: true
        });
        console.log(movie2.toJSON());

        const person = await Person.create({
            firstName: 'Tom',
            lastName: 'Hanks'
        });
        console.log(person.toJSON());

        const movie3 = await Movie.build({
            title: 'Toy Story 3',
            runtime: 103,
            releaseDate: '2010-06-18',
            isAvailableOnVHS: false
        });
        await movie3.save(); // save the record
        console.log(movie3.toJSON());

        // find by id ex (i.e. Primary Key)
        const movieById = await Movie.findByPk(1);
        console.log(movieById.toJSON());

        // find specific element ex
        const movieByRuntime = await Movie.findOne({where: {runtime:115}});
        console.log(movieByRuntime.toJSON());

        // find all ex
        const allMovies = await Movie.findAll();
        console.log(allMovies.map(movie => movie.toJSON()));

        // filter ex (SELECT * FROM people WHERE lastName = 'Hanks')
        const people = await Person.findAll({
            where: {
                lastName: 'Hanks'
            }
        });
        console.log(people.map(person => person.toJSON()));

        // return only id and title in dataset
        const moviesIdTitle = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                isAvailableOnVHS: true
            }
        });
        console.log(moviesIdTitle.map(movie => movie.toJSON()));

        // Operator usage ex
        const moviesOperator = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                releaseDate: {
                    [Op.gte]: '2004-01-01'
                    //[Op.gt]: ...
                    //[Op.endsWith]: ...
                    //[Op.between]: ...
                }
            }
        });
        console.log(moviesOperator.map(movie => movie.toJSON()));

        // Specify order of returned results
        const moviesOrder = await Movie.findAll({
            attributes: ['id', 'title'],
            where: {
                title: {
                [Op.endsWith]: 'story'
                },        
            },
            order: [['id', 'DESC']] // IDs in descending order
            // order: [['releaseDate', 'ASC']]
            // order: ["createdAt", "DESC"]]
        });
        console.log( moviesOrder.map(movie => movie.toJSON()) );

        // update a record with save()
        const toyStory3 = await Movie.findByPk(3);
        toyStory3.isAvailableOnVHS = true; // updated value
        await toyStory3.save();
        console.log( toyStory3.get({ plain: true }) );

        //update a record with update()
        const toyStory3 = await Movie.findByPk(3);
        await toyStory3.update({
            isAvailableOnVHS: true
        });
        console.log( toyStory3.get({ plain: true }) );

        //define which attributes to save when updating
        const toyStory3 = await Movie.findByPk(3);
        await toyStory3.update({
            title: 'Trinket Tale 3', // new title
            isAvailableOnVHS: true,
        }, {fields: ['title', 'isAvailableOnVHS'] });  //defines attribute to save
        console.log( toyStory3.get({ plain: true }) );

        // delete a record
        const toyStory = await Movie.findByPk(1); // find a record
        await toyStory.destroy(); // delete it
    
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
}) ();