const p = document.getElementById("paragraph");
p.addEventListener("click", cliccato);

function cliccato()
{
    p.classList.toggle("cliccato");
}

/* -------------------------------------------------------- */

const btn = document.getElementById("button");
btn.addEventListener("click", gestioneTabella);

const space = document.getElementById("space");

let contatore = 0;
let table = "";
let c = 1;

const regexNostra = /^[a-zA-Z][A-Za-z' ]*[a-zA-ZÀ-ÿ]$/;

const patterns = {
    nome: regexNostra,
    cognome: regexNostra,
    animale: regexNostra
};



function gestioneTabella()
{
    
    if(contatore == 0)
    {
        costruisciTabella();
    }

    inserisciRiga();
    
    contatore = 1;

}

function costruisciTabella()
{
    table = document.createElement("table");

    const trH = document.createElement("tr");

    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const th4 = document.createElement("th");

    th1.textContent = "id";
    th2.textContent = "nome";
    th3.textContent = "cognome";
    th4.textContent = "animale";

    trH.append(th1, th2, th3, th4);

    table.append(trH);

    space.append(table);

}

function inserisciRiga()
{

    const c1 = document.getElementById("campo1");
    const c2 = document.getElementById("campo2");
    const c3 = document.getElementById("campo3");

    campo1 = convalida(c1.value, patterns.nome);
    campo2 = convalida(c2.value, patterns.cognome);
    campo3 = convalida(c3.value, patterns.animale);
    
    const errors = document.getElementById("errori");

    if(!campo1 || !campo2 || !campo3)
    {
        errors.textContent = "dati inseriti non validi!";
    }
    else
    {

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        td1.textContent = c1.value;
        td2.textContent = c2.value;
        td3.textContent = c3.value;

        td4.textContent = c;

        tr.append(td4, td1, td2, td3);

        tr.id = "pippo" + String(c);

        table.append(tr);

        c1.value = "";
        c2.value = "";
        c3.value = "";

        errors.textContent = "";

        c++;

    }

}

function convalida(campo, pattern)
{
    return pattern.test(campo);
}

/* ----------------------------------------------------- */

const deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", eliminaRiga);

function eliminaRiga()
{
    const n = document.getElementById("numeroDaEliminare");
    const rigaDaEliminare = document.getElementById("pippo" + n.value);

    rigaDaEliminare.remove();
    n.value = "";
}