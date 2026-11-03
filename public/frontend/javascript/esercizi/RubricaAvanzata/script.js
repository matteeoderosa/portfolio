let mostra = document.getElementById("mostraId");
let aggiungi = document.getElementById("aggiungiId");
let nome = document.getElementById("nomeId");
let cognome = document.getElementById("cognomeId");
let telefono = document.getElementById("telefonoId");
let tabella = document.getElementById("tabellaId");


let listaContatti = [];

class Contatto {
    constructor(nome, cognome, telefono) {
        this.name = nome;
        this.surname = cognome;
        this.phone = telefono;
    }
}

mostra.addEventListener("click", show);
aggiungi.addEventListener("click", add);

function show() {

    tabella.innerHTML = "";

    const table = document.createElement("table");
    const thName = document.createElement("th");
    const thSurname = document.createElement("th");
    const thPhone = document.createElement("th");
    const trH = document.createElement("tr");


    thName.textContent = "Nome";
    thSurname.textContent = "Cognome";
    thPhone.textContent = "Telefono";

    trH.append(thName, thSurname, thPhone);
    table.appendChild(trH);

    for (let e of listaContatti) {
        // tab += "<tr><td>" + e.name + "</td><td>" + e.surname + "</td><td>" + e.phone + "</td></tr>";
        // tab += `<tr><td>${e.name}</td><td>${e.surname}</td><td>${e.phone}</td></tr>`;

        let tdName = document.createElement("td");
        let tdSurname = document.createElement("td");
        let tdPhone = document.createElement("td");

        const tr = document.createElement("tr");


        tdName.textContent = e.name;
        tdSurname.textContent = e.surname;
        tdPhone.textContent = e.phone;

        tr.append(tdName, tdSurname, tdPhone);
        table.appendChild(tr);
    }

    tabella.appendChild(table);

}

function add() {
    let c = new Contatto(nome.value, cognome.value, telefono.value);

    // listaContatti[i++] = c; (e devi dichiarare i = 0)
    // listaContatti[ listaContatti.length ] = c;
    listaContatti.push(c);
    nome.value = "";
    cognome.value = "";
    telefono.value = "";
}