let btn_criar = document.querySelector("#btn_criar")
btn_criar.addEventListener("click", main)

let varLogicaE = /([a-zA-Z])\s*\^\s*([a-za-zA-Z])/
let varLogicaOU = /([a-zA-Z])\s*[Vv]\s*([a-za-zA-Z])/
let varLogicaCondicional = /([a-zA-Z])\s*=>\s*([a-za-zA-Z])/
let varLogicaBicon = /([a-zA-Z])\s*<=>\s*([a-za-zA-Z])/
let varNegacao = /~[a-z]/
let parenteses = /\(.+?\)/
let colchetes = /\[.+?\]/
let e_OU = /\^|[Vv]/
let con_bicon = /=>|<=>/
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
    // while(colchetes.test(exp_logica)) {
    //     Fun_Col(exp_logica)
    // } 
}

function Fun_Con_Bicon(sentencaConBi) {
    while(con_bicon.test(sentencaConBi)) {
        let varConOUbi = sentencaConBi.match(con_bicon)
        console.log(varConOUbi)

        // Checa se tem CONDICIONAL
        if(varConOUbi == "=>") {
            // Se tiver, fará o que tem que ser feito.
            console.log("Entrou no if da Condicional(=>)")
            console.log(sentencaConBi.match(varLogicaCondicional))

            console.log("Renomeando a Condicional:")
            sentencaConBi = sentencaConBi.replace(varLogicaCondicional, "Con")
            console.log(sentencaConBi)

        } else if(varConOUbi == "<=>") { // Checa se tem BICONDICIONAL
            // Se tiver, fará o que tem que ser feito
            console.log("Entrou no if da Bicondicional(<=>)")
            console.log(sentencaConBi.match(varLogicaBicon))

            console.log("Renomeando a Bicondicional:")
            sentencaConBi = sentencaConBi.replace(varLogicaBicon, "Bi")
            console.log(sentencaConBi)

        } else {
            console.log("ERROOOOO!!!!! ALGO NÃO ESTÁ CERTO NO E(^) OU(V)")
        }
    } 
}

function Fun_E_Ou(sentencaEOu) {
    let varLogica = sentencaEOu.match(e_OU)[0]
    console.log(varLogica)

    //Checa se a variável lógica é um E(^)
    if(varLogica == "^") {
        // Se for um E(^), fará o que tem que ser feio.
        console.log("Entou no if do E(^)")
        console.log(sentencaEOu.match(varLogicaE))

        console.log("Renomeando o E(^)")
        sentencaEOu = sentencaEOu.replace(varLogicaE, "E")
        console.log(sentencaEOu)


    } else if (varLogica == "V" || varLogica == "v") { // Checa se a variável lógica é um OU(V)
        // Se for um OU(V), fará o que tem que ser feio.
        console.log("Entrou no if do OU(V)")
        console.log(sentencaEOu.match(varLogicaOU))

        console.log("Renomeando o OU(V)")
        sentencaEOu = sentencaEOu.replace(varLogicaOU, "O")
        console.log(sentencaEOu)


    } else {
        console.log("ERROOOOO!!!!! ALGO NÃO ESTÁ CERTO NO E(^) OU(V)")
    }

    return sentencaEOu
}

function Fun_Paren(sentecaParen) {
    // Se tiver, irá realizar as operações neles primeiro.
    console.log("Dentro dos colchetes, HÁ PARÊNTESES:")
    console.log(sentecaParen.match(parenteses))
    console.log("Entrando nos Parênteses.")
    let entrarParenteses = sentecaParen.match(parenteses)[0]
    console.log(entrarParenteses)

    
    // Checa se tem E(^) ou OU(V), usando a função E_Ou.
    while(e_OU.test(entrarParenteses)) {
        var sentenca_conBi = Fun_E_Ou(entrarParenteses)
        console.log("Senteça depois da função E OU:")
        console.log(sentenca_conBi)
    }

    console.log("Sentença do E OU fora do loop, antes de entrar na função Condicional e Bi.")
    console.log(sentenca_conBi)
    //Checa se tem Condicional(=>) ou Bicondicional(<=>), usando a função Con_Bicon.
    while(con_bicon.test(sentencaConBi)) {
        Fun_Con_Bicon(sentenca_conBi)
    }

    console.log("Renomeando os PARÊNTESES:")
    sentecaParen = sentecaParen.replace(parenteses, "P")
    console.log(sentecaParen)
}

function Fun_Col(sentenca_col) {
    // Se tiver Colchetes, irá realizar as operações nele primeiro.
    console.log("Na expressão lógica, HÁ COLCHETES:")
    console.log(sentenca_col.match(colchetes))
    console.log("Entrando nos Colchetes.")
    let entrarColchetes = sentenca_col.match(colchetes)[0]
    console.log(entrarColchetes)

    // Checa se dentro dos colchetes tem PARÊNTESES.
    while(parenteses.test(entrarColchetes)) {
        Fun_Paren(entrarColchetes)
    }

    console.log("Renomeando os COLCHETES:")
    sentenca_col = sentenca_col.replace(colchetes, "C")
    console.log(sentenca_col)
}

