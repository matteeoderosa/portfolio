const lista = document.getElementById("lista");
const somma = document.getElementById("somma");
const input = document.getElementById("numero");

const aggiungi = document.getElementById("aggiungi");
const svuota = document.getElementById("svuota");

let totale = 0;
aggiornaSomma();

aggiungi.addEventListener("click", add);
svuota.addEventListener("click", empty);

function add(){

    const n = Number(input.value);

    const li = document.createElement("li");
    li.textContent = n;

    li.addEventListener("click", function() {

        totale -= n;
        li.remove();
        aggiornaSomma();

    });

    lista.appendChild(li);

    totale += n;
    aggiornaSomma();

    input.value = "";

}

function empty(){

    while (lista.firstChild)
    {
        lista.firstChild.remove();
    }

    totale = 0;
    aggiornaSomma();

}

function aggiornaSomma(){

    somma.textContent = "Somma : " + totale;

}