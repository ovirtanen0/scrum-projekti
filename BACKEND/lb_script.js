async function haku() {
    const [databaseLB, databaseMR] = await Promise.all([
        fetch('http://localhost:3000/api/lb'),
        fetch('http://localhost:3000/api/mr')
    ]);

    const [tietoLB, tietoMR] = await Promise.all([
        databaseLB.json(),
        databaseMR.json()
    ]);

    console.log(tietoLB);
    console.log(tietoMR);

    const maara = tietoMR[0]["COUNT(*)"];

    const table = document.getElementById('tables');

    for (let i = 0; i < maara; i++) {
        const rivi = table.insertRow();

        rivi.insertCell().textContent = "#" + (i + 1);
        rivi.insertCell().textContent = tietoLB[i].username;
        rivi.insertCell().textContent = tietoLB[i].level;
        rivi.insertCell().textContent = tietoLB[i].kills;
        rivi.insertCell().textContent = tietoLB[i].favorite_weapon;
    }
}

haku();

setInterval(5000, haku);