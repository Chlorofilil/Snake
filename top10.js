// Loead from JSOn_LS
function get10Players(){
    const players = JSON.parse(localStorage.getItem(`Player`)) || [];
    
    const sortPlayers = players.sort((a, b) => b.playerScore - a.playerScore);
    
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
        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1; 
        const nameCell = document.createElement('td');
        nameCell.textContent = player.name; 
        const scoreCell = document.createElement('td');
        scoreCell.textContent = player.playerScore; 

        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);

        leaderboardBody.appendChild(row);
  });
}

createTable();