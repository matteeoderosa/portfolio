function fattoriale(numero) 
{
    if( numero  < 0)
    {
        return "numero negativo";
    }
    else if( numero == 0)
    {
        return 1;
    }
    else
    {
        return numero * fattoriale(numero-1);
    }
}

function calcolaFattoriale()
{
    let numero = Number(document.getElementById("numero").value);

    let answer = fattoriale(numero);

    document.getElementById("soluzione").innerHTML = answer;
}