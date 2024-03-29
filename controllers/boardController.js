const User = require('../models/User')
const Game = require('../models/Game')

exports.getAllUsers = async (req, res, next) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers)
    } catch (e) {
        res.status(500).send(e.message)
    }
}

exports.createUser = async (req,res,next) => {
    const { username, email, password, game } = req.body
    try {
        const newUser = await User.create({ username, email, password, game })
        res.json(newUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
}


exports.getAllGames = async (req, res, next) => {
    try {
       // const allGames = await Game.find().populate('user', '_id username');
        //res.json(allGames)
        res.json({pokemonname: "pikachu"})
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message)
    }
}

exports.createGame = async (req, res, next) => {
    const { user, myPokemonName, enemyPokemonName, winner } = req.body
    if (!user || !myPokemonName || !enemyPokemonName || !winner) return res.status(400).send('Unable to create the game')
    let newGame = new Game({ user, myPokemonName, enemyPokemonName, winner })
    try {
        await newGame.save()
        await User.findByIdAndUpdate(user, {$push: {game: newGame._id} })
    } catch (e) { console.log(e.message)}
    res.json(newGame)
}