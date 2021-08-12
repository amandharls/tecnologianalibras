var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];

const palavras = [
    {nome: 'big data'},
    {nome: 'bitcoin'},
    {nome: 'blockchain'},
    {nome: 'bug'},
    {nome: 'business intelligence'},
    {nome: 'ciberataque'},
    {nome: 'cibersegurança'},
    {nome: 'cookies'},
    {nome: 'drone'},
    {nome: 'emoji'},
    {nome: 'hashtag'},
    {nome: 'kanban'},
    {nome: 'kindle'},
    {nome: 'malware'},
    {nome: 'marketplace'},
    {nome: 'microcontrolador'},
    {nome: 'newsletter'},
    {nome: 'pixel'},
    {nome: 'podcast'},
    {nome: 'portal sophia'},
    {nome: 'print screen'},
    {nome: 'renderização'},
    {nome: 'sistema embarcado'},
    {nome: 'smart'},
    {nome: 'spam'},
    {nome: 'spotify'},
    {nome: 'streaming'},
    {nome: 'trend'},
]

const list = document.getElementById('list');

function setList(group) {
    clearList();

    for(palavra of group){    
        // const item = document.createElement('li');

        // item.classList.add('list-group-item');
        // console.log(document.createTextNode(palavra.nome));

        const text = document.createTextNode(palavra.nome);
        const link = document.createElement('a');
        
        link.innerHTML = `${palavra.nome}`;
        link.setAttribute('href', `${baseUrl}` + "palavras\\" + `${palavra.nome.charAt(0)}\\` +`${palavra.nome.replace(/ /g,"")}` + ".html");
        link.setAttribute('class', "dropdown-item");
        
        // link.setAttribute('title', `${palavra.nome}`);
        
        // link.appendChild(text);
        
        // item.appendChild(link);
        list.appendChild(link);
    }
    
    if (group.length == 0){
        setNoResults();
    }
}

function clearList() {
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
    
}

function setNoResults() {
    clearList();
    const link = document.createElement('a');
    // item.classList.add('list-group-item');
    link.innerHTML = "Sem resultados"+"<hr />"+"Ver todas as palavras";
    link.setAttribute('href', "listadepalavras.html");
    link.setAttribute('class', "dropdown-item");
    
    list.appendChild(link);
}

function getRelevancy(value, searchTerm) {
    console.log(value);
    console.log(value);
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;        
    } else {
        return 0;
    }
}

const searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        setList(palavras.filter((palavra) => {
            return palavra.nome.includes(value);
        }).sort((palavra1, palavra2) => {
            return getRelevancy(palavra2.nome, value) - getRelevancy(palavra1.nome, value);
        }));
    } else {
        clearList();
    }
});