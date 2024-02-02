document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('chercherButton').addEventListener('click', chercher);

    document.getElementById('textToSearch').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêcher le refresh quand la touche "entrée" est appuyée à la place du bouton
            chercher();
        }
    });
});

function chercher() {
    var texteSaisi = document.getElementById("textToSearch").value.toLowerCase();

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var wordlist = xhr.responseText.split('\n');
            afficherResultats(wordlist, texteSaisi);
        }
    };
    xhr.open('GET', 'wordlist.txt', true);
    xhr.send();
}

function afficherResultats(wordlist, texteSaisi) {
    var resultatsDiv = document.getElementById("resultats");
    resultatsDiv.innerHTML = "<h2>Résultats :</h2>";

    var motsFiltres = wordlist.filter(function (mot) {
        return mot.toLowerCase().includes(texteSaisi);
    });

    motsFiltres = motsFiltres.slice(0, Math.min(motsFiltres.length, 15)); // Prendre 15 mots aléatoires dans la wordlist

    motsFiltres = randomArray(motsFiltres);

    motsFiltres.forEach(function (mot) {
        resultatsDiv.innerHTML += "<p>" + mot + "</p>";
    });
}

function randomArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}