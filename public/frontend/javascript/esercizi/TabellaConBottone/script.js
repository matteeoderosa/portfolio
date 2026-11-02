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

    th1.textContent = "elimina";
    th2.textContent = "nome";
    th3.textContent = "cognome";
    th4.textContent = "animale";

    trH.append(th1, th2, th3, th4);

    table.append(trH);

    space.append(table);

}

let numErrori = 0;

function inserisciRiga()
{

    const c1 = document.getElementById("campo1");
    const c2 = document.getElementById("campo2");
    const c3 = document.getElementById("campo3");

    const campo1 = convalida(c1.value, patterns.nome);
    const campo2 = convalida(c2.value, patterns.cognome);
    const campo3 = convalida(c3.value, patterns.animale);
    
    const errors = document.getElementById("errori");

    if(!campo1 || !campo2 || !campo3)
    {

        if(numErrori >= 5 && numErrori < 6)
        {
            errors.textContent = "sei duro eh... sbagliare 5 volte non era così semplice";
        }
        else if(numErrori >= 6 && numErrori < 8)
        {
            errors.textContent = "davvero stai ancora sbagliando?";
        }
        else if(numErrori >= 8 && numErrori < 10)
        {
            errors.textContent = "smettila per favore!";
        }
        else if(numErrori >= 10 && numErrori < 12)
        {
            errors.textContent = "vabbè ci rinuncio...";
        }
        else if(numErrori >= 12 && numErrori < 40)
        {
            errors.textContent = "ok giuro non ci sono altri messaggi....";
        }
        else if(numErrori >= 40)
        {
            errors.textContent = "sei arrivato fino a qui, per te un cuoricino -> <3";
        }
        else if(numErrori > 0)
        {
            errors.textContent = "devi inserire solo lettere, per un minimo di due caratteri!";
        }
        else
        {
            errors.textContent = "dati inseriti non validi!";
        }
        numErrori++;
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

        const newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "riga "+ String(c);
        newButton.id = "pluto" + String(c);

        td4.append(newButton);

        tr.append(td4, td1, td2, td3);

        tr.id = "pippo" + String(c);

        table.append(tr);

        c1.value = "";
        c2.value = "";
        c3.value = "";

        errors.textContent = "";

        let numRiga = c;
        newButton.addEventListener("click", function(){ eliminaRiga( numRiga )});

        c++;

    }

}


function convalida(campo, pattern)
{
    return pattern.test(campo);
}

/* ----------------------------------------------------- */

function eliminaRiga(n)
{
    const rigaDaEliminare = document.getElementById("pippo" + String(n));

    rigaDaEliminare.remove();
}