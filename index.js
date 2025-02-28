const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Ensure express-ejs-layouts is used
const { VideoGames, Genres } = require('./utils/data');
const { 
    getGameDetailsById, 
    getGamesByGenre, 
    getTopRatedGames, 
    selectRandomGameId, 
    getHiddenGems 
} = require('./utils/gameUtils');

// Set up the global VideoGames 
global.VideoGames = VideoGames;

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use Express Layouts
app.use(expressLayouts);
app.set('layout', 'layout'); // Default layout file

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home Route - Display Random 9 Games
app.get('/', (req, res) => {
    try {
        const games = VideoGames.sort(() => 0.5 - Math.random()).slice(0, 9);
        res.render('index', {games, pageTitle: "Game Explorer"}); // No need for `{ layout: 'layout' }` because it's default
    } catch (error) {
        console.error("Error loading home page:", error);
        res.status(500).render('error', {message: "Internal Server Error"});
    }
});

// Game Details Page
app.get('/game/:id', (req, res) => {
    try {
        const gameId = req.params.id;
        const game = getGameDetailsById(gameId);
        
        if (!game) {
            return res.status(404).render('error', {message: 'Game not found'});
        }

        const recommendations = getGamesByGenre(game.genre)
            .filter(g => g.id !== game.id)
            .slice(0, 3);
        
        res.render('game', {game, recommendations, pageTitle: game.title, pageCSS: "/game.css"});
    } catch (error) {
        console.error("Error fetching game details:", error);
        res.status(500).render('error', {message: "Internal Server Error"});
    }
});

// Top Rated Games Page
app.get('/top-rated', (req, res) => {
    try {
        const topGames = getTopRatedGames(15);
        res.render('topRated', {topGames, pageTitle: "Top Rated Games"});
    } catch (error) {
        console.error("Error fetching top-rated games:", error);
        res.status(500).render('error', {message: "Internal Server Error"});
    }
});

// Random Game Redirect
app.get('/random', (req, res) => {
    try {
        if (VideoGames.length === 0) {
            return res.status(404).render('error', {message: "No games available"});
        }
        const gameId = selectRandomGameId();
        res.redirect(`/game/${gameId}`);
    } catch (error) {
        console.error("Error selecting random game:", error);
        res.status(500).render('error', {message: "Internal Server Error"});
    }
});

// Upcoming Games Page
app.get('/upcoming', (req, res) => {
    try {
        // Filter games where released is false
        const upcomingGames = VideoGames.filter(game => !game.released).slice(0, 5);
        
        res.render('upcoming', {upcomingGames, pageTitle: "Upcoming Games"});
    } catch (error) {
        console.error("Error fetching upcoming games:", error);
        res.status(500).render('error', {message: "Internal Server Error"});
    }
});

// Hidden Gems Page
app.get('/hidden-gems', (req, res) => {
    try {
        const hiddenGems = getHiddenGems();
        
        console.log("Hidden Gems:", hiddenGems); // Debugging log

        res.render('hiddenGems', { hiddenGems, pageTitle: "Hidden Gems" });
    } catch (error) {
        console.error("Error fetching hidden gems:", error);
        res.status(500).render('error', { message: "Internal Server Error" });
    }
});

// 404 Page - Catch-all Route
app.use((req, res) => {
    res.status(404).render('error', {message: "Page Not Found"});
});

// Start Server
const port = 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
