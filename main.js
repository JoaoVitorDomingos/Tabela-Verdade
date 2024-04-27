let btn_criar = document.querySelector("#btn_criar")
btn_criar.addEventListener("click", main)

let varLogicaE = /([a-zA-Z])\s*\^\s*([a-za-zA-Z])/
let varLogicaOU = /([a-zA-Z])\s*[Vv]\s*([a-za-zA-Z])/
let varLogicaCondicional = /([a-zA-Z])\s*=>\s*([a-za-zA-Z])/
let varLogicaBicon = /([a-zA-Z])\s*<=>\s*([a-za-zA-Z])/
let varNegacao = /~[a-z]/
let parenteses = /\(.+?\)/
let colchetes = /\[.+?\]/
// ~p ^ q V r V (k <=> q)
// p ^ q V r

function main() {
    //let input_exp = document.querySelector("#input-exp").value
    let input_exp = "(p => q) <=> [(~p ^ q <=> p v q) => (~q => r <=> t)]"
    console.log(input_exp)

    //pegarProp(input_exp)

    pegarSentencas(input_exp)
}

function pegarProp(exp_logica) {
    // Pega as proprosições e filtra para não ter repetições.
    let proposicoes = exp_logica.match(/[a-z]/g)
    //console.log(proposicoes)

    let qtd_prop = []
    proposicoes.forEach(elemento => {
        if(qtd_prop.includes(elemento) == false) {
            qtd_prop.push(elemento)
            //console.log(`A proposição ${elemento} não está no array, então será adicionada.`)
        } else {
            //console.log(`A proposição ${elemento} já está no array, então, não será adicionada.`)
        }
    });

    console.log(qtd_prop)

    criarTabela(qtd_prop)
}

function criarTabela(array_prop) {
    let cabecalho_tab = document.querySelector("#linha-cabecalho-tab")
    cabecalho_tab.innerHTML = ""
    let corpo_tab = document.querySelector("#corpo-tab")
    corpo_tab.innerHTML = ""
    let qtd_linhas_tab = 1

    // Cria o Cabeçalho da Tabela
    for(i = 0; i < array_prop.length; i++) {
        let cel_cab = document.createElement("th")
        cel_cab.setAttribute("scope", "col")
        cel_cab.innerText = array_prop[i]
        //console.log(cel_cab)
        cabecalho_tab.appendChild(cel_cab)

        // Define a quantidade de linhas que terá o corpo da tabela
        qtd_linhas_tab *= 2
    }

    for(i = 0; i < qtd_linhas_tab; i++) {
        let linha_corpo = document.createElement("tr")
        //console.log(linha_corpo)

        for(c = 0; c < array_prop.length; c++) {
            let cel_linha = document.createElement("td")
            //console.log(cel_linha)
            linha_corpo.appendChild(cel_linha)
        }
        corpo_tab.appendChild(linha_corpo)
    }
    //console.log(corpo_tab)
}

function pegarSentencas(exp_logica) {
    // Checa se na expressão lógica tem NEGAÇÃO.
    // while(varNegacao.test(exp_logica)) {
    //     // Se tiver negação Irá pegar essa sentença.
    //     console.log("Na expressão lógica, HÁ NEGAÇÃO:")
    //     console.log(exp_logica.match(varNegacao))
    //     console.log("Renomeando a variável lógica:")
    //     exp_logica = exp_logica.replace(varNegacao, "N")
    //     console.log(exp_logica)  
    // }

    // Checa se na expressão lógica tem COLCHETES.
    while(colchetes.test(exp_logica)) {
         // Se tiver Colchetes, irá realizar as operações nele primeiro.
        console.log("Na expressão lógica, HÁ COLCHETES:")
        console.log(exp_logica.match(colchetes))
        console.log("Entrando nos Colchetes.")
        let entrarColchetes = exp_logica.match(colchetes)[0]
        console.log(entrarColchetes)

        // Checa se dentro dos colchetes tem PARÊNTESES.
        while(parenteses.test(entrarColchetes)) {
            // Se tiver, irá realizar as operações neles primeiro.
            console.log("Dentro dos colchetes, HÁ PARÊNTESES:")
            console.log(entrarColchetes.match(parenteses))
            console.log("Entrando nos Parênteses.")
            let entrarParenteses = entrarColchetes.match(parenteses)[0]
            console.log(entrarParenteses)

            // Checa se tem E(^) ou OU(V)

            console.log("Renomeando os PARÊNTESES:")
            entrarColchetes = entrarColchetes.replace(parenteses, "P")
            console.log(entrarColchetes)
        }

        console.log("Renomeando os COLCHETES:")
        exp_logica = exp_logica.replace(colchetes, "C")
        console.log(exp_logica)

    }

    


}

