let original = [];

function change(which){

    const imgList = ['Acqua', 'Arance', 'Biscotti'];

    const position = "./foto/";
    const img = document.images[which];

    if(!original[which])
    {
        original[which] = img.src;
        img.src = position + imgList[which] + "Selected.jpg";
    }
    else
    {
        img.src = original[which];
        original[which] = null;    
    }
}