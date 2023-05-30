// Isto é literalmente a cena mais complexa que eu ja fiz em JS, podes crer que vou comentar tudo ( ˘ ³˘)♥ (não é porque me vou esquecer de tudo o que aprendi amanhâ nem nada. BAKA~~~~)

let songs = [
/*1.*/
    ['Legends Never Die (ft Against The Current)(Worlds 2017)', 'images/LND.jpg'],
/*2.*/
    ['Imagine Dragons - Warriors  (Worlds 2014)', 'images/W.jpg'],
/*3.*/
    ['Worlds Collide (ft. Nicki Taylor)(Worlds 2015)', 'images/WC.jpg'],
/*4.*/
    ['Zedd - Ignite  (Worlds 2016)', 'images/I.jpg'],
/*5.*/
    ['Amumu - The Curse Of The Sad Mummy', 'images/CSM.jpg'],
/*6.*/
    ['Varus - As We Fall', 'images/AWF.jpg'],
/*7.*/
    ['Warsongs - PROJECT Yi (Vicetone Remix)', 'images/WPY.jpg'],
/*8.*/
    ['Warsongs - Piercing Light (Mako Remix)', 'images/WPL.jpg']
] // O file path das músicas, menos o 'mp3/' e o '.mp3' correspondentes ao folder em que estão inseridas e ao tipo de ficheiro respetivamente, para que o título da música fique agradável.

// Aqui estão as variáveis globais que o music player vai usar.
let songSlider = document.getElementById('songSlider');
let currentTime = document.getElementById('currentTime');
let duration = document.getElementById('duration');
let volumeSlider = document.getElementById('volumeSlider');
let song = new Audio(); // Isto faz um objeto, é melhor aprenderes objects antes de analisares isto.
let currentSong = 0;
// Aqui estão as variáveis globais que o music player vai usar.

function loadSong() {
    let songTitle = document.getElementById('songTitle');
    let nextSongTitle = document.getElementById('nextSongTitle');
    let currentLogo = document.getElementById('songLogo');

    song.src = "mp3/" + songs[currentSong][0] + ".mp3";
    songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong][0];
    if (currentSong === songs.length - 1) {
        nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[0][0];
    } else {
        nextSongTitle.innerHTML = "<b>Next Song: </b>" + songs[currentSong + 1 % songs.length][0];
    };
    currentLogo.innerHTML = "<img src='" + songs[currentSong][1] + "' />";
    song.volume = volumeSlider.value;
    song.play();
    setTimeout(showDuration, 1000);
}
/* Isto é a função principal, é aquela que dá load das músicas.
1 - Cria 3 variáveis. Como só esta função as usa, não precisam de ser globalizadas.
2 - Vai buscar o file path das músicas ao array 'songs', e adiciona "mp3/" e ".mp3" porque omiti essas partes (para o título ficar mais apresentável).
3 - Faz com que o título tenha o número da música (o index do elemento do array 'songs' +1), um ponto (para efeito visual) e a string correspondente a música atual.
4 - O mesmo que o 2, mas sem o número. E é o título da música que vem a seguir. Para esclarecer o que é pus um pequeno texto antes da string.
5 - Faz com que o volume do player seja aquele determinado pelo slider de volume, mesmo depois de mudar de música.
6 - Começa a música.
7 - Demora 1 segundo a mostrar a duração, e como o slider esta dependente da duração, e currentTime esta dependente do slider, basicamente faz com que tudo tenha 1 segundo para carregar.
ps- textContent muda o texto do id, mas nao consegue escrever em html como o innerHTML faz. Pus os dois para potencialmente mais pontos.
*/

function convertTime(secs) {
    let min = Math.floor(secs / 60);
    let sec = secs % 60;
    if (min < 10) {
        min = "0" + min;
    } else {
        min = min;
    };
    if (sec < 10) {
        sec = "0" + sec;
    } else {
        sec = sec;
    };
    return (min + ":" + sec);
} // Converte o tempo de segundos para minutos e segundos, e caso os minutos ou segundos tenham menos de 2 dígitos, da display de um '0' antes. Caso tenham 2 dígitos, dá display desses dígitos. Tambem aprendi que usar o simbolo ? para fazer coisas destas numa so linha e bastante bom, mas como nao sei se estas habituado fiz um if else normal.

function updateSongSlider() {
    let c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if (song.ended) {
        next();
    }
} // Arredonda o valor do currentTime da música atual, faz com que o valor do slider seja esse valor, e que dê display do currentTime depois de ser convertido para minutos e segundos pela funçao convertTime(secs). Analisa também se a musica acabou. Se sim, corre a função next() para passar para a música seguinte.

setInterval(updateSongSlider, 1000); // Dá update do slider a cada segundo (1000 milissegundos).

function showDuration() {
    let e = Math.floor(song.duration);
    songSlider.setAttribute("max", e);
    duration.textContent = convertTime(e);
} // Arredonda a duração da música, e faz com que esse valor seja o 'max' do slider da música. Depois dá display desse valor, depois de ser convertido tal e qual como o currentTime.

function playOrPauseSong(img) {
    if (song.paused) {
        song.play();
        img.src = "images/pause.png";
    } else {
        song.pause();
        img.src = "images/play.png";
    }
} // Caso a música esteja parada, vai continuar a música e pôr a imagem do 'pause', se estiver a dar vai pausar a música e por o botão de 'play'.

function next() {
    currentSong++;
    if (currentSong == songs.length) {
        currentSong = 0;
    } else {
        currentSong = currentSong;
    };
    loadSong();
} // Corre quando a música acaba ou quando se clica no botão. Incrementa o currentSong e, caso o número do currentSong seja igual ao número de elementos do array 'songs', ou seja, caso esteja numa música que tecnicamente não existe, o currentSong passa a ser 0, que e o 1º elemento do array 'songs'.

function previous() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    } else {
        currentSong = currentSong;
    };
    loadSong();
} // Corre apenas quando se clica no botão. Decrementa o currentSong e, caso seja menor que 0 (o que o torna 'undefined'), o currentSong passa a ser o número de elementos do array 'songs' menos um, para que começe a última música do array 'songs'.

function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
} // Seeking é um evento HTML de audio/vídeo. Basicamente isto faz com que, quando se clica no slider da música, o currentTime passe a ser o novo valor do slider da música. Depois dá display do currentTime, como a funçao updateSongSlider() faz.

function adjustVolume() {
    song.volume = volumeSlider.value;
} // Faz com que o volume, que tem value entre 0 e 1 [0,1]. O valor default é 0.5 .

window.onload = loadSong; // Isto faz com que a música começe quando a página dá load.


let perguntas = [
    ["When was 'League of Legends' officially Released?", "2009", "2010", "2006", "2008", "2009"],
    ["What does 'AP' stand for?", "Adaptive Perseverance", "Alternative Power", "Ability Power", "Adaptive Play", "Ability Power"],
    ["At which minute do 'Elder Dragons' start to spawn?", "30 minutes", "20 minutes", "40 minutes", "35 minutes", "35 minutes"],
    [" What stats does picking the Sorcery Rune path give?", "25 AP or 15 Bonus AD<br> (Adaptive)", "18 AP or 10.8 Bonus AD (Adaptive)", "18% Attack Speed", "20 AP or 12.8 Bonus AD (Adaptive)", "25 AP or 15 Bonus AD<br> (Adaptive)"],
    ["What is the cooldown and range of the Summoner Spell 'Flash'?", "290 s, 450 Units", "300 s, 450 Units", "450 s, 290 Units", "300 s, 400 Units", "300 s, 450 Units"],
    ["How many Champions does 'League of Legends' currently have?", "137", "138", "139", "140", "139"],
    ["What type of Champions specialize in assisting their teammates?", "Mages", "Supports", "Assassins", "Marksmen", "Supports"],
    ["What type of Champion benefits the most from the Item 'Duskblade of Draktharr'?", "Mages", "Supports", "Assassins", "Marksmen", "Assassins"],
    ["How much gold does a Warding Totem(Trinket) cost?", "1 Gold", "50 Gold", "25 Gold", "0 Gold", "0 Gold"],
    ["What path does the 'Cut Down' Rune belong to?", "Precision", "Resolve", "Domination", "Sorcery", "Precision"],
    ["What is the Level Cap of your Account?", "30", "100", "500", "Infinity (and beyond)", "Infinity (and beyond)"],
    ["How many 'Turrets' are there at the beggining of every Summoner's Rift match?", "11", "18", "22", "6", "22"],
    ["What's the name of the Buff granted by slaying 'Baron Nashor'?", "Nashor's Regards", "Hand of Baron", "Nashor's Spite", "Baron's Cloak", "Hand of Baron"],
    ["What type of currency can be bought with 'Real Money'?", "Riot Points", "Influence Points", "Orange Essence", "Blue Essence", "Riot Points"],
    ["How many types of 'Minions' are there?", "3", "2", "5", "4", "4"],
    ["<span style='color:red'>Hard</span> - What Champion isn't from 'Shurima'?", "Rammus", "Skarner", "Talyah", "Cassiopeia", "Cassiopeia"],
]
let numeroPergunta = 0;
let points = 0;
const validarResposta = (resposta, nome) => {

    let respostaCerta = perguntas[numeroPergunta][5];
    if (respostaCerta === resposta) {
        document.getElementById(nome).style.backgroundColor = "rgba(0, 226, 0, 0.28)";
        points++;
        points;
    } else {
        document.getElementById(nome).style.backgroundColor = "rgba(255, 0, 0, 0.28)";
    }
    if (numeroPergunta > perguntas.length - 2) {
        document.getElementById("setquiz").style.display = "none";
        document.getElementById("endquiz").style.display = "inline-block";
        document.getElementById("result").innerHTML = points + "/16";
        if (points >= 12) {
            document.getElementById("right").style.display = "inline-block";
        } else {
            document.getElementById("wrong").style.display = "inline-block";
        }
    } else {
        numeroPergunta++;
        setTimeout(function () {
            desenhaPergunta();
            document.getElementById(nome).style.backgroundColor = "rgba(0,0,0,0)";
        }, 1000);
    }
}

function desenhaPergunta() {
    document.getElementById('pergunta').innerHTML = "<h3>" + perguntas[numeroPergunta][0] + "</h3>";
    document.getElementById('opcao1').innerHTML = perguntas[numeroPergunta][1];
    document.getElementById('opcao2').innerHTML = perguntas[numeroPergunta][2];
    document.getElementById('opcao3').innerHTML = perguntas[numeroPergunta][3];
    document.getElementById('opcao4').innerHTML = perguntas[numeroPergunta][4];
}

desenhaPergunta();

function movingLogin() {
    document.getElementById("arrowl").style.display = "none";
    document.getElementById("arrowr").style.display = "inline-block";
    var elem = document.getElementById("everything");
    var pos = -(215);
    var id = setInterval(frame, 1);

    function frame() {

        if (pos === 87) {
            clearInterval(id);
        } else {
            pos += 2;
            elem.style.right = pos + 'px';
        }
    }
}

function movingOutLogin() {
    var elem = document.getElementById("everything");
    var pos = 87;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos === -215) {
            clearInterval(id);
            document.getElementById("arrowr").style.display = "none";
            document.getElementById("arrowl").style.display = "inline-block";
        } else {
            pos -= 2;
            elem.style.right = pos + 'px';
        }
    }
}

function checkPassword() {
    let passe = "JesushadaGA";
    let nomeUser = document.getElementById('username').value;
    let passUser = document.getElementById('password').value;
    let passeEscondida = passe;
    if (nomeUser === '') {
        alert('Please choose your Username.')
    } else {
        if (passUser === passeEscondida) {
            document.getElementById('setquiz').style.display = "none";
            document.getElementById('endquiz').style.display = "none";
            document.getElementById('explanation').style.display = "none";
            document.getElementById('triggeringquestions').style.display = "block";
            sessionStorage.setItem('nome', nomeUser);
        } else {
            document.getElementById('password').value = "";
            alert('Wrong Password! You now face the punishment of a pop-up ಠ_ಠ ');
        }
    }
}

let trigger = [
    ['Male', 'Female', 'Other', 'Apache Helicopter'],
    ['Assassin', 'Mage', 'Tank', 'Support', 'Fighter', 'Marksman'],
    ['Unranked ', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Challenger']
];

for (let r = 0; r < trigger[0].length; r++) {
    document.getElementById("atrigger1").innerHTML += "<td id='td0trigger" + r + "' onclick='gender" + r + "()'>" + trigger[0][r] + "</td>";
};

for (let f = 0; f < trigger[1].length; f++) {
    document.getElementById("atrigger2").innerHTML += "<td id='td1trigger" + f + "' onclick='role" + f + "()'>" + "<img style='width : 8vw' src ='roles/role" + f + ".png' /><br />" + trigger[1][f] + "</td>";
};

for (let v = 0; v < trigger[2].length; v++) {
    document.getElementById("atrigger3").innerHTML += "<td id='td2trigger" + v + "' onclick='rank" + v + "()'>" + "<img style='width : 5.5vw' src ='images/rank" + v + ".png' /><br />" + trigger[2][v] + "</td>";
};

let totalGender = 0;
let totalRole = 0;
let totalRank = 0;
let gender = "";

function gender0() {
    document.getElementById('td0trigger1').style.display = "none";
    document.getElementById('td0trigger2').style.display = "none";
    document.getElementById('td0trigger3').style.display = "none";
    gender = "blue";
    totalGender++;
    verificaNmr();
}

function gender1() {
    document.getElementById('td0trigger0').style.display = "none";
    document.getElementById('td0trigger2').style.display = "none";
    document.getElementById('td0trigger3').style.display = "none";
    gender = "pink";
    totalGender++;
    verificaNmr();
}

function gender2() {
    document.getElementById('td0trigger0').style.display = "none";
    document.getElementById('td0trigger1').style.display = "none";
    document.getElementById('td0trigger3').style.display = "none";
    gender = "white";
    totalGender++;
    verificaNmr();
}

function gender3() {
    document.getElementById('td0trigger0').style.display = "none";
    document.getElementById('td0trigger1').style.display = "none";
    document.getElementById('td0trigger2').style.display = "none";
    gender = "forestgreen";
    totalGender++;
    verificaNmr();
}

let role = "";

function role0() {
    document.getElementById('td1trigger1').style.display = "none";
    document.getElementById('td1trigger2').style.display = "none";
    document.getElementById('td1trigger3').style.display = "none";
    document.getElementById('td1trigger4').style.display = "none";
    document.getElementById('td1trigger5').style.display = "none";
    role = "role0";
    totalRole++;
    verificaNmr();
}

function role1() {
    document.getElementById('td1trigger0').style.display = "none";
    document.getElementById('td1trigger2').style.display = "none";
    document.getElementById('td1trigger3').style.display = "none";
    document.getElementById('td1trigger4').style.display = "none";
    document.getElementById('td1trigger5').style.display = "none";
    role = "role1";
    totalRole++;
    verificaNmr();
}

function role2() {
    document.getElementById('td1trigger0').style.display = "none";
    document.getElementById('td1trigger1').style.display = "none";
    document.getElementById('td1trigger3').style.display = "none";
    document.getElementById('td1trigger4').style.display = "none";
    document.getElementById('td1trigger5').style.display = "none";
    role = "role2";
    totalRole++;
    verificaNmr();
}

function role3() {
    document.getElementById('td1trigger0').style.display = "none";
    document.getElementById('td1trigger1').style.display = "none";
    document.getElementById('td1trigger2').style.display = "none";
    document.getElementById('td1trigger4').style.display = "none";
    document.getElementById('td1trigger5').style.display = "none";
    role = "role3";
    totalRole++;
    verificaNmr();
}

function role4() {
    document.getElementById('td1trigger0').style.display = "none";
    document.getElementById('td1trigger1').style.display = "none";
    document.getElementById('td1trigger2').style.display = "none";
    document.getElementById('td1trigger3').style.display = "none";
    document.getElementById('td1trigger5').style.display = "none";
    role = "role4";
    totalRole++;
    verificaNmr();

}

function role5() {
    document.getElementById('td1trigger0').style.display = "none";
    document.getElementById('td1trigger1').style.display = "none";
    document.getElementById('td1trigger2').style.display = "none";
    document.getElementById('td1trigger3').style.display = "none";
    document.getElementById('td1trigger4').style.display = "none";
    role = "role5";
    totalRole++;
    verificaNmr();
}
let rank = "";

function rank0() {
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank0";
    totalRank++;
    verificaNmr();
}

function rank1() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank1";
    totalRank++;
    verificaNmr();
}


function rank2() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank2";
    totalRank++;
    verificaNmr();
}


function rank3() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank3";
    totalRank++;
    verificaNmr();
}


function rank4() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank4";
    totalRank++;
    verificaNmr();
}


function rank5() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank5";
    totalRank++;
    verificaNmr();
}


function rank6() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger7').style.display = "none";
    rank = "rank6";
    totalRank++;
    verificaNmr();
}


function rank7() {
    document.getElementById('td2trigger0').style.display = "none";
    document.getElementById('td2trigger1').style.display = "none";
    document.getElementById('td2trigger2').style.display = "none";
    document.getElementById('td2trigger3').style.display = "none";
    document.getElementById('td2trigger4').style.display = "none";
    document.getElementById('td2trigger5').style.display = "none";
    document.getElementById('td2trigger6').style.display = "none";
    rank = "rank7";
    totalRank++;
    verificaNmr();
}

function verificaNmr() {
    if (totalGender >= 1 && totalRole >= 1 && totalRank >= 1) {
        document.getElementById("account").style.display = "inline";
        document.getElementById("avatar").innerHTML = "<img style='width : 12vw;' src='Roles/" + role + ".png' />";
        document.getElementById("rankerino").innerHTML = "<img style='width : 7vw;' src='images/" + rank + ".png' />";
        sessionStorage.setItem('gender', gender);
        sessionStorage.setItem('role', role);
        sessionStorage.setItem('rank', rank);
    }
    document.getElementById("userdisplay").innerHTML = "<span style='color : " + gender + "'>" + sessionStorage.getItem('nome') + "</span>";
}
