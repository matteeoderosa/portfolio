function startgame()
{

    let numeroMonete = Number(document.getElementById("numero").value);

    let daMostrare = "";

    for(let i = 0; i < numeroMonete; i++)
    {
        r = Math.floor(Math.random() * 6)

        switch(r)
        {
            case 0:
                daMostrare += '<img src="./images/5cent.png" width="100">';
                break;
            case 1:
                daMostrare += '<img src="./images/10cent.jpg" width="100">';
                break;
            case 2:
                daMostrare += '<img src="./images/20cent.jpg" width="100">';
                break;
            case 3:
                daMostrare += '<img src="./images/50cent.jpg" width="100">';
                break;
            case 4:
                daMostrare += '<img src="./images/1euro.jpg" width="100">';
                break;
            case 5:
                daMostrare += '<img src="./images/2euro.gif" width="100">';
                break;
        }
    }
    
    document.getElementById("contenuto").innerHTML = daMostrare;

}