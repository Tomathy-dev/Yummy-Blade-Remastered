function passiveGold() {
    let goldSecond = Number(document.getElementById('goldSecond').value);
    let goldMinute = Number(document.getElementById('goldMinute').value);
    let goldTime = Math.floor(((goldMinute * 60) + goldSecond) - 75)
    if (goldTime < 1) {
        let totalGold = 500;
        document.getElementById('goldAnswer').innerHTML = "You would have " + totalGold + " <span class='lo'>Gold</span>.";
    } else {
        let totalGold = Math.floor(goldTime * 2.04 + 500);
        document.getElementById('goldAnswer').innerHTML = "You would have " + totalGold + " <span class='lo'>Gold</span>.";
    };
}
//spawn time 1:15
//starting gold 500
//20.4g per 10 sec = 2.04g per 1 sec
/* este calculator nao tem em conta item de suport (por enquanto) nem torres destruidas. ao fim de 20 minutos deve dar 2795 de gold. */