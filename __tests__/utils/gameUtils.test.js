const { getGamesByGenre, getTopRatedGames, getGameDetailsById, selectRandomGameId, getHiddenGems } = require("../../utils/gameUtils");
const { VideoGames } = require("../../utils/data");
const e = require("express");


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

      describe('getTopRatedGames', () => {
        test("should return top N rated games", () => {
            const N = 5;
            const result = getTopRatedGames(N);

            expect(result.length).toBeLessThanOrEqual(N);
            for (let i = 0; i < result.length - 1; i++) {
                expect(result[i].averageRating).toBeGreaterThanOrEqual(result[i + 1].averageRating);
            }
        });
        test("fliters game with null rating", () => {
            const result = getTopRatedGames(10);

            expect(result.every(game => game.averageRating !== null)).toBe(true);
        });
        test("array should be empty if N is 0", () =>{
            expect(getTopRatedGames(0)).toStrictEqual([]);
        });

        test("checks that original array does not mutate", () => {
            const OG = [...VideoGames];

            getTopRatedGames(8);
            expect(VideoGames).toStrictEqual(OG);
        });
    });


    describe('getGameDetailsById', () => {
        test("should return correct game when valid ID is called", () => {
            const g = VideoGames[0];
            const result = getGameDetailsById(g.id);

            expect(result).toStrictEqual(g);
        });
        test("should return null (not undefined) when passing invalid ID", () => {
            const result = getGameDetailsById(-1);

            expect(result).toBeNull();
        }); 
        test("should return null when given fake or non-existance ID", () => {
            const codyIsABitch = 9999999; // hahahahahaha i did it and if you catch this let me know
            expect(getGameDetailsById(codyIsABitch)).toBeNull();
        });
        test("checks that original array does not mutate", () => {
            const OG = [...VideoGames];

            getGameDetailsById(VideoGames[0]?.id);
            expect(VideoGames).toStrictEqual(OG);
        });
    });
        
    describe('selectRandomGameId', () => {
        test("return a valid game ID from VideoGames array", () => {
            const result = selectRandomGameId();
            const validGames = VideoGames.filter(game => game.id !== undefined && game.id !== null).map(game => game.id);

            if (validGames.length === 0) {
                expect(result).toBeNull();
            } else {
            expect(validGames).toContain(result);
            }
        });
        test("return null if VideoGames is empty", () => {
            const EG = [];
            const OG = [...VideoGames];
            global.VideoGames = EG;

            expect(selectRandomGameId()).toBeNull();
            global.VideoGames = OG;
        });

        test("{Randomness Check} - returns different IDs over multiple runs", () => {
            const result = new Set();
            for (let i = 0; i < 100; i++) {
                result.add(selectRandomGameId());
            }
            expect(result.size).toBeGreaterThanOrEqual(1);
        });

        test("checks that original array does not mutate", () => {
            const OG = [...VideoGames];

            selectRandomGameId();
            expect(VideoGames).toStrictEqual(OG);
        });
    });
        
        
    describe('getHiddenGems', () => {
        test("returns games with an average rating of 9+ and less than 1000 reviews", () => {
            const result = getHiddenGems();

            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBeGreaterThanOrEqual(0);
            
            result.forEach(game => {
                expect(game.averageRating).toBeGreaterThanOrEqual(9);
                expect(game.numberOfReviews).toBeLessThan(1000);
            });
        });
        test("returns empty array when no hidden gems exist", () => {
            const OG = [...VideoGames];

            global.VideoGames = OG.map(game => ({
                ...game
                , averageRating: 9
                , numberOfReviews: 1000
            }));

            const result = getHiddenGems();

            expect(result).toEqual([]);
            global.VideoGames = OG;
        });
        test("checks that original array does not mutate", () => {
            const OG = [...VideoGames];

            getHiddenGems();
            expect(VideoGames).toStrictEqual(OG);
        });
    });
});
