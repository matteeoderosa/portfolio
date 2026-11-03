function inizio() {

    giorno = Number(document.getElementById("giorno").value);
    mese = Number(document.getElementById("mese").value);
    

    mesi = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]; 
    /* giorni da gennaio a novembre (dicembre non c'è mai bisogno di sommarlo) */


    let answer = giorno;

    for(let i = 0; i < (mese-1); i++)
    {
        answer += mesi[i];
    }

    if((giorno < 1 || giorno > 31) || ( mese == 2 && giorno > 29 ))
    {
        answer = "inserire un giorno valido!";
    }
    else if(mese < 1 || mese > 12)
    {
        answer = "inserire un mese valido!";
    }

    document.getElementById("soluzione").innerHTML = answer;

}