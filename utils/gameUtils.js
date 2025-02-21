const { VideoGames, Genres } = require("./data");

/**
 * Get `x` games by genre
 * @param {string} genre - The genre of the games
 * @param {number} x - The number of games to retrieve
 * @returns {*} - An array of games matching the genre
 */
function getGamesByGenre(genre, x) {
    const gamesByGenre = VideoGames.filter((game) => game.genre === genre);
    return gamesByGenre.slice(0, x);
}

/**
 * Get the `x` top-rated games, ordered by rating
 * @param {number} x - The number of top-rated games to retrieve
 * @returns {*} - An array of top-rated games
 */
function getTopRatedGames(x) {
    const topRatedGames = VideoGames.filter(game => game.averageRating !== null).sort((a,b) => b.averageRating - a.averageRating);
    return topRatedGames.slice(0, x);
}

/**
 * Get the details of a game by its ID
 * @param {number} id - The ID of the game
 * @returns {*} - The game object
 */
function getGameDetailsById(id) {
    // Implementation here
}

/**
 * Select a random game ID
 * @returns {*} - A random game ID
 */
function selectRandomGameId() {
    // Implementation here
}

/**
 * Get "Hidden Gems" - games that are highly rated but not widely reviewed
 * @returns {*} - An array of hidden gem games
 */
function getHiddenGems() {
    // Implementation here
}

// Export the functions to be used in other modules
module.exports = {
    getGamesByGenre,
    getTopRatedGames,
    getGameDetailsById,
    selectRandomGameId,
    getHiddenGems,
};
