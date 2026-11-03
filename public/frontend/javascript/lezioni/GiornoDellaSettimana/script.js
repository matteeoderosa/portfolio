function inizio()
{

    let  answer = "";
    let giorni = ['domenica', 'lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato'];
    let numeroInserito = Number(document.getElementById("numero").value);


    if(numeroInserito != 0)
    {
        let numeroGiorno = numeroInserito%7;
        answer = giorni[numeroGiorno];
    }
    else
    {
        answer = "inserire un valore!";
    }

    document.getElementById("soluzione").innerHTML = answer;

}