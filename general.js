function movingBoi() {
    document.getElementById("menu_signdown").style.display = "none";
    document.getElementById("menu_signup").style.display = "inline-block";
    var elem = document.getElementById("menu");
    var pos = 0;
    var id = setInterval(frame, 1);

    function frame() {

        if (pos == 240) {
            clearInterval(id);
        } else {
            pos += 2;
            elem.style.top = pos + 'px';
        }
    }
}

function movingOutBoi() {
    document.getElementById("menu_signup").style.display = "none";
    document.getElementById("menu_signdown").style.display = "inline-block";
    var elem = document.getElementById("menu");
    var pos = 240;
    var id = setInterval(frame, 1);

    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos -= 2;
            elem.style.top = pos + 'px';
        }
    }
}

let bah = new Audio("mp3/musictomyears.mp3");

const baH = () => {
    bah.currentTime = 0;
    bah.play();
}

function currentDate() {
    let dateObj1 = new Date();
    let month = dateObj1.getMonth() + 1;
    let day = dateObj1.getDate();
    let year = dateObj1.getFullYear();
    document.getElementById('date1').innerHTML = day + '/' + month + '/' + year;
}
setInterval(currentDate, 500);

function clock() {
    let dateObj2 = new Date();
    let minutes = dateObj2.getMinutes();
    let hours = dateObj2.getHours();
    let seconds = dateObj2.getSeconds();
    if (minutes < 10) {
        document.getElementById('date2').innerHTML = hours + ':0' + minutes;
    } else {
        document.getElementById('date2').innerHTML = hours + ':' + minutes;
    }
    if (seconds < 10) {
        document.getElementById('date2').innerHTML += ':0' + seconds;
    } else {
        document.getElementById('date2').innerHTML += ':' + seconds;
    }
}
setInterval(clock, 500);

function verifyId() {
    let derp = sessionStorage.getItem('gender')
    if (derp === '') {
        document.getElementById("identification").style.display = "none";
        console.log(1);
    } else {
       identification();
        console.log(2);
    }
}

function identification() {
    document.getElementById("userdisplaygeneral").innerHTML = "<span style='color : " + sessionStorage.getItem('gender') + "'>" + sessionStorage.getItem('nome') + "</span>";
    document.getElementById("avatargeneral").innerHTML = "<img src='Roles/" + sessionStorage.getItem('role') + ".png' />";
    document.getElementById("rankerinogeneral").innerHTML = "<img src='images/" + sessionStorage.getItem('rank') + ".png' />";
    document.getElementById("identification").style.display = "inline";

}
