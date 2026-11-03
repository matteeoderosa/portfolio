function startNodi()
{
    const lista = document.getElementById("lista");     
    lista.textContent = "";

    nodi(document.documentElement, lista);
    
}

function nodi(element, lista)
{

    if(!element || element.id == "lista")
    {
        return;
    }

    if(element.nodeType == 1)
    {
        const li = document.createElement("li");
        
        li.textContent = element.nodeName;
        lista.appendChild(li);

        if(element.childNodes.length > 0)
        {
            const subLista = document.createElement("ul");
            li.appendChild(subLista);

            for(i of element.childNodes)
            {
                nodi(i, subLista);
            }                 
        }


    }

}