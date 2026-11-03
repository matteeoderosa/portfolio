function changeImage(n)
{
    const image = document.getElementById("image");

    const sinner = "../../../html/sinner.jpg";
    const ciccio = "../../../html/NavigazioneBase/images/fotociccio.jpeg";

    switch (n)
    {
        case 0:
            image.src = ciccio;
            image.width = "400";
            image.height = "300"; 
            break;
        case 1:
            image.src = sinner;
            image.width = "350";
            image.height = "200"; 
            break;
    }

}