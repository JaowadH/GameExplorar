const { getGamesByGenre, getTopRatedGames, getGameDetailsById, selectRandomGameId, getHiddenGems } = require("../../utils/gameUtils");
const { VideoGames } = require("../../utils/data");


describe('Game Utility Functions', () => {
    describe('getGamesByGenre', () => {
        test("returns the correct number of games for a given genre", () => {
            const genre = "RPG";
            const n = 3;
            const result = getGamesByGenre(genre, n);

            expect(result.length).toBeLessThanOrEqual(n);
            expect(result.every(game => game.genre === genre)).toBe(true);
        });
        test("returns empty array if no games match genre", () => {
            const genre = "Nonexistent Genre";
            const result = getGamesByGenre(genre, 10);

            expect(result.length).toBe(0);
            expect(result).toStrictEqual([]);
        });
        test("checks case where query is larger then available data", () => {
            const genre = "Action";
            const n = 999999;
            const result = getGamesByGenre(genre, n);

            expect(result.length).toBeLessThanOrEqual(VideoGames.filter(game => game.genre === genre).length);
            expect(result.every(game => game.genre === genre)).toBe(true);
        });
        test("checks that original array does not mutate", () => {
            const genre = "Horror";
            const OG = [...VideoGames];

            getGamesByGenre(genre, 8);
            expect(VideoGames).toStrictEqual(OG);
        });
    });

   /*  describe('getTopRatedGames', () => {
        // Test cases go here
    });

    describe('getGameDetailsById', () => {
        // Test cases go here
    });

    describe('selectRandomGameId', () => {
        // Test cases go here
    });

    describe('getHiddenGems', () => {
        // Test cases go here
    }); */
});
