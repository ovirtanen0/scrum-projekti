async function haku() {
    const database = await fetch('http://localhost:3000/api/players');
    const tieto = await database.json();
    for(let i = 0; i < tieto.length; i++) {
        document.getElementById(i + 1 + "u").innerHTML = tieto[i].username;
        document.getElementById(i + 1 +"l").innerHTML = tieto[i].level;
        document.getElementById(i + 1 + "k").innerHTML = tieto[i].kills;
        document.getElementById(i + 1 +"f").innerHTML = tieto[i].favorite_weapon;
    }
};

haku();

setInterval(haku, 5000);