function fibonacci(numero) 
{
    if( numero == 0)
    {
        answer = 0;
    }
    else if( numero == 1)
    {
        answer = 1;
    }
    else
    {
        answer = (fibonacci(numero-1)) + (fibonacci(numero-2));
    }

    return answer;
}

function calcolaFibonacci()
{
    let numero = Number(document.getElementById("numero").value);

    let answer = fibonacci(numero);

    document.getElementById("soluzione").innerHTML = answer;
}