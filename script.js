let plateau = document.getElementById("plateau");
let resetButton = document.getElementById("reset-button");
let card;
let flippedCards = [];
let numberCaught = 0;
let timerValue = 0;
let movesCount = 0;
let isTimerRunning = false;
let intervalId;
let pairsFound = 0;
let timerInterval;

let bgCards = [
  "images/charmander.svg",
  "images/charmander.svg",
  "images/squirtle.svg",
  "images/squirtle.svg",
  "images/pikachu.svg",
  "images/pikachu.svg",
  "images/snorlax.svg",
  "images/snorlax.svg",
  "images/eevee.svg",
  "images/eevee.svg",
  "images/meowth.svg",
  "images/meowth.svg",
];

let CreateCard = () => {
  for (let i = 0; i < bgCards.length; i++) {
    // Crée une nouvelle carte
    let card = document.createElement("div");
    card.setAttribute("class", "card");

    // Crée le dos de la carte avec l'image Pokeball
    let figureBack = document.createElement("figure");
    figureBack.setAttribute("class", "back");
    let imgBack = document.createElement("img");
    imgBack.src = "./images/pokeball2.svg";
    imgBack.alt = "Pokeball";
    figureBack.appendChild(imgBack);
    card.appendChild(figureBack);

    // Crée la face de la carte avec l'image du Pokémon
    let figureFront = document.createElement("figure");
    figureFront.setAttribute("class", "front");
    let imgFront = document.createElement("img");
    imgFront.src = bgCards[i];
    imgFront.alt = "Pokemon";
    figureFront.appendChild(imgFront);
    card.appendChild(figureFront);

    // Ajoute la carte au plateau de jeu
    plateau.appendChild(card);

    // Ajoute un écouteur d'événement au clic sur le dos de la carte
    figureBack.addEventListener("click", function () {
      // Vérifie si la carte n'est pas déjà retournée et si le nombre de cartes retournées est inférieur à 2
      if (!card.classList.contains("flipped") && flippedCards.length < 2) {
      card.classList.add("flipped");
      // Ajoute la classe "flipped" à la carte pour la retourner visuellement
      flippedCards.push(card);
      // Ajoute la carte à la liste des cartes retournées

      figureBack.style.display = "none";
      figureFront.style.display = "block";
      // Cache le dos de la carte et affiche la face de la carte

      let caughtCountElement = document.getElementsByClassName("caught-count")[0];
      numberCaught++;
      caughtCountElement.textContent = "Nombres de Coups : " + numberCaught;
      // Incrémente le nombre de coups et met à jour l'affichage du nombre de coups

      if (flippedCards.length === 2) {
      setTimeout(checkMatch, 2000);
      // Vérifie s'il y a 2 cartes retournées et appelle la fonction checkMatch pour vérifier si elles correspondent 
        }
      }
    });
  }
};

let shuffleCards = (array) => {
  // Parcourt le tableau d'éléments en commençant par la dernière position
  for (let i = array.length - 1; i > 0; i--) {
    // Génère un index aléatoire entre 0 et l'index actuel
    const j = Math.floor(Math.random() * (i + 1));
    // Échange les éléments aux positions i et j dans le tableau
    [array[i], array[j]] = [array[j], array[i]];
  }
};

let checkMatch = () => {
  let card1 = flippedCards[0]; // Récupère la première carte retournée
  let card2 = flippedCards[1]; // Récupère la deuxième carte retournée

  let img1 = card1.querySelector(".front img"); // Sélectionne l'élément <img> de la face avant de la première carte
  let img2 = card2.querySelector(".front img"); // Sélectionne l'élément <img> de la face avant de la deuxième carte

  if (img1.src === img2.src) { // Vérifie si les images des deux cartes sont identiques
    pairsFound++; // Incrémente le nombre de paires trouvées

    if (pairsFound === bgCards.length / 2) { // Vérifie si toutes les paires ont été trouvées
      stopTimer(); // Arrête le chronomètre
      setTimeout(() => {
        // Affiche une fenêtre modale avec un message de réussite
        Swal.fire({
          title: "Bravo",
          text: `Tu as réussi à finir la partie en ${numberCaught} coups et en ${timerValue} secondes.`,
          imageUrl: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHVremF4Nzc5cnczMzI5bzhxYzU5aGVjaHY2ejhhMDAzaG8xZjM1YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13G7hmmFr9yuxG/giphy.gif",
          imageWidth: 600,
          imageHeight: 400,
          imageAlt: "Custom image",
        });

        displayStats(); // Affiche les statistiques de la partie
      }, 500);
    }
  } else { // Les images des deux cartes ne sont pas identiques
    setTimeout(() => {
      card1.classList.remove("flipped"); // Retire la classe "flipped" de la première carte
      card2.classList.remove("flipped"); // Retire la classe "flipped" de la deuxième carte

      let figureBack1 = card1.getElementsByClassName("back")[0]; // Sélectionne l'élément avec la classe "back" de la première carte
      let figureFront1 = card1.getElementsByClassName("front")[0]; // Sélectionne l'élément avec la classe "front" de la première carte
      let figureBack2 = card2.getElementsByClassName("back")[0]; // Sélectionne l'élément avec la classe "back" de la deuxième carte
      let figureFront2 = card2.getElementsByClassName("front")[0]; // Sélectionne l'élément avec la classe "front" de la deuxième carte

      figureBack1.style.display = "block"; // Affiche la face arrière de la première carte
      figureFront1.style.display = "none"; // Masque la face avant de la première carte
      figureBack2.style.display = "block"; // Affiche la face arrière de la deuxième carte
      figureFront2.style.display = "none"; // Masque la face avant de la deuxième carte
    });
  }

  movesCount++; // Incrémente le nombre de coups effectués
  flippedCards = []; // Réinitialise la liste des cartes retournées
};

let resetGame = () => {
  flippedCards = []; // Réinitialise la liste des cartes retournées
  numberCaught = 0; // Réinitialise le nombre de coups

  let caughtCountElement = document.getElementsByClassName("caught-count")[0]; // Sélectionne l'élément avec la classe "caught-count"
  caughtCountElement.textContent = "Nombres de Coups : " + numberCaught; // Met à jour le texte affichant le nombre de coups

  let timerElement = document.getElementsByClassName("timer")[0]; // Sélectionne l'élément avec la classe "timer"
  timerElement.textContent = "0 secondes."; // Réinitialise le texte affichant le temps

  let cardElements = document.querySelectorAll(".card"); // Sélectionne tous les éléments avec la classe "card"
  cardElements.forEach(function (card) {
    card.classList.remove("flipped"); // Retire la classe "flipped" de chaque carte
    card.classList.remove("caught"); // Retire la classe "caught" de chaque carte
    let figureBack = card.getElementsByClassName("back")[0]; // Sélectionne l'élément avec la classe "back" de chaque carte
    let figureFront = card.getElementsByClassName("front")[0]; // Sélectionne l'élément avec la classe "front" de chaque carte
    figureBack.style.display = "block"; // Affiche la face arrière de chaque carte
    figureFront.style.display = "none"; // Masque la face avant de chaque carte
  });

  stopTimer(); // Arrête le chronomètre
  shuffleCards(bgCards); // Mélange les cartes
  startTimer(); // Démarre le chronomètre
};

resetButton.addEventListener("click", resetGame); // Ajoute un écouteur d'événement sur le bouton de réinitialisation

let startTimer = () => {
  if (!isTimerRunning) { // Vérifie si le chronomètre n'est pas déjà en cours d'exécution
    timerValue = 0; // Réinitialise la valeur du chronomètre
    let timerElement = document.getElementsByClassName("timer")[0]; // Sélectionne l'élément avec la classe "timer"
    timerElement.textContent = timerValue + " secondes."; // Met à jour le texte affichant la valeur du chronomètre

    clearInterval(intervalId); // Efface l'intervalle de temps précédent pour éviter les duplications

    intervalId = setInterval(() => {
      timerValue++; // Incrémente la valeur du chronomètre
      timerElement.textContent = timerValue + " secondes."; // Met à jour le texte affichant la valeur du chronomètre
    }, 1000); // Exécute la fonction de mise à jour toutes les 1 seconde

    isTimerRunning = true; // Définit que le chronomètre est en cours d'exécution
  }
};

let stopTimer = () => {
  clearInterval(intervalId); // Efface l'intervalle de temps en utilisant l'identifiant stocké dans la variable intervalId
  isTimerRunning = false; // Définit le drapeau indiquant que le chronomètre n'est pas en cours d'exécution
};

let displayStats = () => {
  let timerElement = document.getElementsByClassName("timer")[0];
  timerElement.textContent = "Temps : " + timerValue + " secondes.";
  // Met à jour le contenu  de l'élément avec le temps écoulé
};

let namePlayer = () => {
  let playerNameInput = document.getElementById("name");
  let playerNameDisplay = document.getElementById("playerName");
  let playerName = playerNameInput.value;
  // Récupère l'élément de saisie du nom du joueur et son affichage

  if (playerName.trim() !== "") {
    // Vérifie si le nom du joueur est non vide (après suppression des espaces)

    playerNameInput.style.display = "none";
    // Masque l'élément de saisie du nom du joueur

    playerNameDisplay.textContent = playerName;
    // Met à jour le contenu textuel de l'élément d'affichage avec le nom du joueur
  }
}

let saveUserData = () => {
  let playerNameInput = document.getElementById("name");
  let playerName = playerNameInput.value.trim();
  // Récupère l'élément de saisie du nom du joueur et le nom du joueur en supprimant les espaces inutiles

  if (playerName !== "") {
    // Vérifie si le nom du joueur n'est pas vide

    let playerData = {
      name: playerName,
      nbCoup: numberCaught,
      time: timerValue
    };
    // Crée un objet contenant les données du joueur : nom, nombre de coups et temps

    let players = localStorage.getItem("players");
    let playersData = players ? JSON.parse(players) : [];
    // Récupère les données des joueurs depuis le stockage local (s'il y en a) et les convertit en tableau

    playersData.push(playerData);
    // Ajoute les données du joueur actuel au tableau des données des joueurs

    localStorage.setItem("players", JSON.stringify(playersData));
    // Enregistre les données des joueurs mises à jour dans le stockage local
  }
};

let displayLeaderboard = () => {
  let playersData = localStorage.getItem("players");
  // Récupère les données des joueurs depuis le stockage local

  if (playersData) {
    // Vérifie si des données de joueurs sont présentes dans le stockage local

    let players = JSON.parse(playersData);
    // Convertit les données JSON en tableau d'objets JavaScript
    players.sort((a, b) => {
      if (a.time !== b.time) {
        return a.time - b.time;
      } else {
        return a.nbCoup - b.nbCoup;
      }
    });
    // Trie les joueurs en fonction du temps (si les temps sont différents) ou du nombre de coups (si les temps sont égaux)

    let leaderboardTable = document.createElement("table");
    leaderboardTable.classList.add("table");
    // Crée un élément de tableau HTML et ajoute la classe "table"

    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    // Crée les éléments thead et tbody pour le tableau

    let headerRow = document.createElement("tr");
    let rankHeader = document.createElement("th");
    rankHeader.textContent = "Classement";
    let nameHeader = document.createElement("th");
    nameHeader.textContent = "Nom Joueur";
    let timeHeader = document.createElement("th");
    timeHeader.textContent = "Temps";
    let caughtHeader = document.createElement("th");
    caughtHeader.textContent = "Coups";
    // Crée les en-têtes de colonne pour le tableau

    headerRow.appendChild(rankHeader);
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(timeHeader);
    headerRow.appendChild(caughtHeader);
    tableHead.appendChild(headerRow);
    // Ajoute les en-têtes de colonne à la ligne d'en-tête et ajoute la ligne d'en-tête au thead

    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      let playerRow = document.createElement("tr");
      let rankCell = document.createElement("td");
      rankCell.textContent = i + 1;
      let nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      let timeCell = document.createElement("td");
      timeCell.textContent = player.time;
      let caughtCell = document.createElement("td");
      caughtCell.textContent = player.nbCoup;
      // Crée les cellules de données pour chaque joueur

      playerRow.appendChild(rankCell);
      playerRow.appendChild(nameCell);
      playerRow.appendChild(timeCell);
      playerRow.appendChild(caughtCell);
      // Ajoute les cellules de données à la ligne du joueur

      tableBody.appendChild(playerRow);
      // Ajoute la ligne du joueur au tbody
    }

    leaderboardTable.appendChild(tableHead);
    leaderboardTable.appendChild(tableBody);
    // Ajoute le thead et le tbody au tableau

    let leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "";
    leaderboardElement.appendChild(leaderboardTable);
    // Supprime le contenu précédent de l'élément "leaderboard" et ajoute le tableau de classement
  }
};

let refreshButton = document.getElementById("refresh-button");
// Récupère l'élément du bouton de rafraîchissement

refreshButton.addEventListener("click", () => {
  saveUserData();
  // Appelle la fonction pour enregistrer les données utilisateur

  location.reload();
  // Recharge la page pour réinitialiser le jeu
});



shuffleCards(bgCards);
CreateCard();
displayLeaderboard();
