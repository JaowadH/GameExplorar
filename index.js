const express = require('express');
const path = require('path');
const { VideoGames, Genres } = require('./utils/data');
const { getGameDetailsById, getGamesByGenre, getTopRatedGames, selectRandomGameId, getHiddenGems } = require('./utils/gameUtils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (request, response) => {
    const games = VideoGames.sort(() => 0.5 - Math.random()).slice(0, 9);
    response.render('index', { games });
});

app.get('/game/:id', (request, response) => {
    const gameId = request.params.id;
    const game = getGameDetailsById(gameId);
    if (!game) return response.status(404).send('Game not found');
    const recommendations = getGamesByGenre(game.genre).filter(g => g.id !== game.id).slice(0, 3);
    response.render('game', { game, recommendations });
});

app.get('/top-rated', (request, response) => {
    const topGames = getTopRatedGames(15);
    response.render('topRated', { topGames });
});

app.get('/random', (request, response) => {
    const gameId = selectRandomGameId();
    response.redirect(`/game/${gameId}`);
});

app.get('/upcoming', (request, response) => {
    const upcomingGames = VideoGames.filter(game => game.year > new Date().getFullYear()).slice(0, 5);
    response.render('upcoming', { upcomingGames });
});

app.get('/hidden-gems', (request, response) => {
    const hiddenGems = getHiddenGems();
    response.render('hiddenGems', { hiddenGems });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
