let contatore = 11;

document.addEventListener("DOMContentLoaded", function(){
    nomeInterv = setInterval( eseguiConteggio, 1000);
})

function eseguiConteggio(){
    const c = document.getElementById("contatoreId");
    contatore--;
    c.innerHTML = contatore;
    if (contatore <= 0){
        clearInterval(nomeInterv);
    }
}