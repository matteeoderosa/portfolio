let mostra = document.getElementById("mostraId");
let aggiungi = document.getElementById("aggiungiId");
let nome = document.getElementById("nomeId");
let cognome = document.getElementById("cognomeId");
let telefono = document.getElementById("telefonoId");
let tabella = document.getElementById("tabellaId");


let listaContatti = [];

class Contatto{
    #nome;
    #cognome;
    #telefono;

    get nome(){
        return this.#nome;
    }
    get cognome(){
        return this.#cognome;
    }
    get telefono(){
        return this.#telefono;
    }

    set nome (nome)
    {
        if(nome.length >= 2)
        {
            this.#nome = nome;
        }
        else
        {
            throw new Error("Il nome deve contenere almeno 2 caratteri");
        }
    }

    constructor(nome, cognome, telefono){
        this.nome = nome;
        this.#cognome = cognome;
        this.#telefono = telefono;
    }

}

mostra.addEventListener("click", show);
aggiungi.addEventListener("click", add);

function show()
{
    let tab = "";
    tab += "<table>";
    tab += "<tr><th>Nome</th><th>Cognome</th><th>Telefono</th></tr>";
    tabella.innerHTML = tab;

    for (e of listaContatti){
        // tab += "<tr><td>" + e.nome + "</td><td>" + e.cognome + "</td><td>" + e.telefono + "</td></tr>";
        tab += `<tr><td>${e.nome}</td><td>${e.cognome}</td><td>${e.telefono}</td></tr>`;
    }

    tab += "</table>";
    tabella.innerHTML = tab;
}

function add()
{
    try{
        let c = new Contatto(nome.value , cognome.value , telefono.value);

        // listaContatti[i++] = c; (e devi dichiarare i = 0)
        // listaContatti[ listaContatti.length ] = c;
        listaContatti.push(c);
        nome.value = "";
        cognome.value = "";
        telefono.value = "";
    }
    catch (e){
        alert("nome troppo corto!");
    }
}