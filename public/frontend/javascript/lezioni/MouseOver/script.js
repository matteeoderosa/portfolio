function changeText(n){
    const p = document.getElementById("paragraph");

    const a = "mouse sopra il box";
    const b = "testo default del paragrafo";

    switch (n){
        case 0:
            p.innerHTML = a;
            break;
        case 1:
            p.innerHTML = b;
            break;
    }

}