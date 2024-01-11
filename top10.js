// INPORT DATA FROM LS
function get10Players(){
    //IF FIELD EXISTI PARSE DATE
    const players = JSON.parse(localStorage.getItem(`Player`)) || [];
    
    //SORTING PLAYERSCORE OF PLAYER IF SCORE IS POSITIVE PLAYER GO "UP"
    const sortPlayers = players.sort((a, b) => b.playerScore - a.playerScore);
    
    //PICK ONLY FIRST 10 PLAYERS
    const topPlayers = sortPlayers.slice(0, 10);
    return topPlayers;
}

function createTable() {
    const leaderboardBody = document.getElementById('table-top10-body');
    const topPlayers = get10Players();
    leaderboardBody.innerHTML = '';

    // DW top10
    topPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        //CREATING A COLUMN WITH PLACEMENT OF PLAYER
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1; 
        //CREATING A COLUMN WITH NAME OF PLAYER
        const nameCell = document.createElement('td');
        nameCell.textContent = player.name; 
        //CREATING COLUMN WTH SCORE OF PLAYER
        const scoreCell = document.createElement('td');
        scoreCell.textContent = player.playerScore; 

        //CREATING A ROW
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        //PUTTING ROW TO THE TABLE
        leaderboardBody.appendChild(row);
  });
}

createTable();