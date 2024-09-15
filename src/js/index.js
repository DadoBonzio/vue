const app = Vue.createApp({
    data() {
        return {
            selectedGame: '',
            games: []
        }
    },
    async mounted() {
        await this.fetchGames();
    },
    methods: {
        async fetchGames() {
            let data = await fetch('http://localhost:3000/games', {
                method: 'GET'
            });
            data = await data.json();
            if (data && typeof data.length !=='undefined') {
                this.games = data;
            }
        },
        selectGame(gameName) {
            this.selectedGame = gameName;
            this.generateLeaderBoard(gameName);
        },
        generateLeaderBoard(gameName) {
            console.log(this.games);
            console.log(this.games.filter(g => g.name === gameName));
            var game = this.games.filter(g => g.name === gameName)[0];
            if (!game) {
                return [];
            }
            return this.games.filter(g => g.name === gameName)[0].p.sort((a, b) => b.score - a.score);
        }
    }
})
app.mount('#app')