function start(){

    let rosso = '<img src="./images/rosso.jpg" width="100" height="100">';
    let giallo = '<img src="./images/giallo.jpg" width="100" height="100">';
    let verde = '<img src="./images/verde.jpg" width="100" height="100">';
    let nero = '<img src="./images/nero.jpg" width="100" height="100">';

    let random = Math.floor(Math.random() * 3);

    document.getElementById("contenuto1").innerHTML = nero;
    document.getElementById("contenuto2").innerHTML = nero;
    document.getElementById("contenuto3").innerHTML = nero;

    switch ( random )
    {
        case 0:
            document.getElementById("contenuto1").innerHTML = rosso;
            document.getElementById("contenuto4").innerHTML = "STOP!";
            break;
        case 1:
            document.getElementById("contenuto2").innerHTML = giallo;
            document.getElementById("contenuto4").innerHTML = "RALLENTA!";
            break;
        case 2:
            document.getElementById("contenuto3").innerHTML = verde;
            document.getElementById("contenuto4").innerHTML = "PASSA!";
            break;
    }

}