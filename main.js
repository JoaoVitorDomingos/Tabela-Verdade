class Proposicoes {
    constructor(pnome, psentenca, ptab_verdade) {
        this.nome = pnome
        this.sentenca = psentenca
        this.tab_verdade = ptab_verdade
    }
}

let array_prop = []

let array_nome_prop = []


let btn_criar = document.querySelector("#btn_criar")
btn_criar.addEventListener("click", main)

let varLogicaE = /([a-zA-Z][1-9]*)\s*\^\s*([a-zA-Z][1-9]*)/
let varLogicaOU = /([a-zA-Z][1-9]*)\s*[Vv]\s*([a-zA-Z][1-9]*)/
let varLogicaCondicional = /([a-zA-Z][1-9]*)\s*=>\s*([a-zA-Z][1-9]*)/
let varLogicaBicon = /([a-zA-Z][1-9]*)\s*<=>\s*([a-zA-Z][1-9]*)/
let varNegacao = /~([a-z])/
let parenteses = /\(.+?\)/
let colchetes = /\[.+?\]/
let e_OU = /\^|[Vv]/
let con_bicon = /=>|<=>/
// ~p ^ q V r V (k <=> q)
// p ^ q V r
// (p => q) <=> [(~p ^ q <=> p v q) => (~q => r <=> t)]
// [(p ^ q => r) <=> (p v q) V (p <=> r)] V [p <=> r ^ q => s] <=> (p V r) ^ ~p

function main() {
    //let input_exp = document.querySelector("#input-exp").value
    let input_exp = "~p"
    console.log(input_exp)


    let prop_simples = pegarProp(input_exp)
    TabVerPropSim(prop_simples)

    pegarSentencas(input_exp)
}

function pegarProp(exp_logica) {
    // Pega as proprosições e filtra para não ter repetições.
    let proposicoes = exp_logica.match(/[a-z]/g)
    console.log("Proposições Simples (Repetidas) presente na sentença:")
    console.log(proposicoes)

    let qtd_prop = []
    proposicoes.forEach(elemento => {
        if(elemento == "v") {
            console.log(`Isso: ${elemento}, não é uma proposição, mas sim uma variável logica(Ou).`)
        } else {
            if(qtd_prop.includes(elemento) == false) {
                qtd_prop.push(elemento)
                //console.log(`A proposição ${elemento} não está no array, então será adicionada.`)
            } else {
                //console.log(`A proposição ${elemento} já está no array, então, não será adicionada.`)
            }
        }
    });

    console.log("Proposições Simples (Filtradas) presente na sentença:")
    console.log(qtd_prop)

    //criarTabela(qtd_prop)

    return qtd_prop
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
    let exp_editada = RealizarNegacao(exp_logica)
    console.log(`Expressão editada, após negação: ${exp_editada}`)

    // Checa se tem colchetes
    exp_editada = RealizarColchetes(exp_editada)

    // Checa se tem parenteses 
    exp_editada = RealizarParenteses(exp_editada)

    // Checa se tem E ou Ou 
    exp_editada = RealizarE_Ou(exp_editada)

    // Checa se tem Condicional ou Bicondicional
    exp_editada = RealizarCon_Bicon(exp_editada)

    
}

function RealizarNegacao(exp_logica) {
    if(varNegacao.test(exp_logica)) {
        while(varNegacao.test(exp_logica)) {
            // Se tiver negação Irá pegar essa sentença.
            console.log("Na expressão lógica, HÁ NEGAÇÃO:")
            console.log(exp_logica.match(varNegacao))
            let sentenca = exp_logica.match(varNegacao)[1]
            //console.log(sentenca)

            //Criando a tabela verdade
            // let nova_tab = Comparador("~", sentenca)
            // console.log("Tabela Verdade Criada: " + nova_tab)

            console.log("Renomeando a variável lógica:")
            let simbolo = "~"
            let nome = DarNome(array_nome_prop, simbolo)
            exp_logica = exp_logica.replace(varNegacao, nome)
            console.log(exp_logica)
        }
    } else {
        console.log("Não há negação nesta preposição.")
    }
    

    return exp_logica
}

function RealizarE_Ou(exp_logica) {
    // Checa se tem E ou OU.
    while(e_OU.test(exp_logica)) {
        //Verifica qual é a variável lógica
        console.log(exp_logica.match(e_OU))
        let varLogica = exp_logica.match(e_OU)[0]
        console.log(`A variável lógica encontrada foi o ${varLogica}`)

        if(varLogica == "^") {
            // Se for E(^) 
            console.log("Variável lógica E(^)")
            console.log(exp_logica.match(varLogicaE))
            let sentenca = exp_logica.match(varLogicaE)[0]

            console.log("Renomeando a expressão: " + exp_logica.match(varLogicaE)[0])
            let nome = DarNome(array_nome_prop, varLogica)
            exp_logica = exp_logica.replace(varLogicaE, nome)
            console.log(exp_logica)

        } else if (varLogica == "V" || varLogica == "v") {
            // Se for Ou(v)
            console.log("Variável lógica OU(v)")
            console.log(exp_logica.match(varLogicaOU))
            let sentenca = exp_logica.match(varLogicaOU)[0]

            console.log("Renomeando a expressão: " + exp_logica.match(varLogicaOU)[0])
            let nome = DarNome(array_nome_prop, varLogica)
            exp_logica = exp_logica.replace(varLogicaOU, nome)
            console.log(exp_logica)


        } else {
            console.log("TEM ALGUM PROBLEMA NA FUNÇÃO RealizarE_OU!!!!")
        }
    }

    return exp_logica
} 

function RealizarCon_Bicon(exp_logica) {
    // Checa se tem Condicional ou Bicondicional
    while(con_bicon.test(exp_logica)) {
        //Verifica qual é a variável lógica
        console.log(exp_logica.match(con_bicon))
        let varLogica = exp_logica.match(con_bicon)[0]
        console.log(`A variável lógica encontrada foi a ${varLogica}`)

        if(varLogica == "=>") {
            // Se for CONDICIONAL (=>)
            console.log("Variável Lógica Condicional(=>)")
            console.log(exp_logica.match(varLogicaCondicional))
            let sentenca = exp_logica.match(varLogicaCondicional)[0]

            console.log("Renomeando a expressão: " + exp_logica.match(varLogicaCondicional)[0])
            let nome = DarNome(array_nome_prop, varLogica)
            exp_logica = exp_logica.replace(varLogicaCondicional, nome)
            console.log(exp_logica)

        } else if(varLogica == "<=>") {
            // Se for BICONDICIONAL (<=>)
            console.log("Variável Lógica Bicondicional(<=>)")
            console.log(exp_logica.match(varLogicaBicon))
            let sentenca = exp_logica.match(varLogicaBicon)[0]

            console.log("Renomeando a expressão: " + exp_logica.match(varLogicaBicon)[0])
            let nome = DarNome(array_nome_prop, varLogica)
            exp_logica = exp_logica.replace(varLogicaBicon, nome)
            console.log(exp_logica)

        } else {
            console.log("TEM ALGUM PROBLEMA NA FUNÇÃO RealizarCon_Bicon!!!!")
        }
    }

    return exp_logica
}

function RealizarParenteses(exp_logica) {
    // Checa se tem parenteses
    while(parenteses.test(exp_logica)) {
        console.log("Há parenteses na expressão:")
        let sentencaParen = exp_logica.match(parenteses)[0]
        let simbolo = "P"
        console.log(sentencaParen)

        // Checa se tem E ou Ou
        sentencaParen = RealizarE_Ou(sentencaParen)
        console.log("Expressão editada depois do E_Ou: " + sentencaParen)

        // Checa se tem Condicional e Bicondicional
        sentencaParen = RealizarCon_Bicon(sentencaParen)
        console.log("Expressão editada depois do E_Ou: " + sentencaParen)

        // Renomeia os parenteses
        console.log("Renomeando os parenteses:")
        let nome = DarNome(array_nome_prop, simbolo)
        exp_logica = exp_logica.replace(parenteses, nome)
        console.log(exp_logica)
        
    }

    return exp_logica
}

function RealizarColchetes(exp_logica) {
    // Checa se tem Colchetes
    while(colchetes.test(exp_logica)) {
        console.log("Há colchetes na expressão:")
        let sentencaCol = exp_logica.match(colchetes)[0]
        let simbolo = "Col"
        console.log(sentencaCol)

        // Checa se tem Parentêses
        sentencaCol = RealizarParenteses(sentencaCol)
        console.log("Expressão editada depois dos Parenteses: " + sentencaCol)

        // Checa se tem E ou Ou
        sentencaCol = RealizarE_Ou(sentencaCol)
        console.log("Expressão editada depois do E_Ou: " + sentencaCol)

        // Checa se tem Condicional e Bicondicional
        sentencaCol = RealizarCon_Bicon(sentencaCol)
        console.log("Expressão editada depois do Con_Bicon: " + sentencaCol)

        // Renomeia os Colchetes 
        console.log("Renomeando os colchetes:")
        let nome = DarNome(array_nome_prop, simbolo)
        exp_logica = exp_logica.replace(colchetes, nome)
        console.log(exp_logica)
    }

    return exp_logica
}

function DarNome(array_prop, simbolo) {
    let letra
    let num = 0
    let nome

    function DefinirLetra() {
        if(simbolo == "^") {
            letra = "E"
            console.log("Simbolo ^: " + letra)
        } else if(simbolo == "v" || simbolo == "V") {
            letra = "O"
            console.log("Simbolo v ou V: " + letra)
        } else if(simbolo == "=>") {
            letra = "C"
            console.log("Simbolo =>: " + letra)
        } else if(simbolo == "<=>") {
            letra = "B"
            console.log("Simbolo <=>: " + letra)
        } else if(simbolo == "P") {
            letra = "P"
            console.log("Parenteses: " + letra)
        } else if (simbolo == "Col") {
            letra = "A"
            console.log("Colchetes: " + letra)
        } else if (simbolo == "~") {
            letra = "N"
            console.log("Simbolo ~: " + letra)
        }
    }

    function CriarNome() {
        console.log("Entrou na função")

        DefinirLetra()

        nome = `${letra}${++num}`
        console.log(nome)

        temEsteNome = array_prop.includes(nome)
        console.log("Tem este nome? " + temEsteNome)
    }

    CriarNome()

    while(temEsteNome) {
        console.log("Entrou no Loop!")
        console.log("Existe este nome!")
        
        CriarNome()
    }

    console.log("Saiu do loop!")

    console.log(nome)
    if(!temEsteNome) {
        console.log("Não existe este nome!")
        array_prop.push(nome)
        console.log("Nome adicionado ao array!")
        console.log(array_prop)
    }
    
    return nome
}

function TabVerPropSim(array_prop_sim) {
    let expoente = array_prop_sim.length

    let total = Math.pow(2, expoente)

    console.log("Expoente: " + expoente)
    console.log(`Total: ${total}`)

    let ver_fal = total / 2

    array_prop_sim.forEach(prop => {
        console.log("Verdadeiro Falso: " + ver_fal)
        console.log(prop)

        let array = []
        let val_logico = true

        let i = 0
        while(array.length < total && i <= ver_fal) {
            if(i == ver_fal) {
                if(val_logico)
                    val_logico = false
                else
                    val_logico = true

                i = 0
            } else {
                array.push(val_logico)
                i++
            }
        }

        console.log(`${prop}: ${array}`)
        let prop_simples = new Proposicoes(prop, prop, array)
        array_prop.push(prop_simples)

        ver_fal = ver_fal / 2
        
    })

    console.log(array_prop)
}

function Comparador(var_logica, primeira_sen, segunda_sen) {
    // Faz a tabela verdade da negação.
    if(var_logica == "~") {
        console.log("Entrou na Negação!")
        console.log("Tabela verdade da proposição " + primeira_sen.sentenca + ":")
        console.log(primeira_sen.tab_verdade)

        console.log("Essa proposição será negada.")
        let nova_tab = []
        primeira_sen.tab_verdade.forEach(el => {
            if(el) 
                el = false
            else
                el = true
            nova_tab.push(el)
        })

        console.log(`Nova tabela da proposição ${primeira_sen.sentenca}(~${primeira_sen.sentenca}):`)
        console.log(nova_tab)
        return nova_tab

    } else if(var_logica == "^") { // Faz a tabela verdade do AND(E).
        console.log("Entrou no AND(E)!")
        console.log(`Tabela verdade da primeira proposição - ${primeira_sen.sentenca}:`)
        console.log(primeira_sen.tab_verdade)
        console.log(`Tabela verdade da segunda proposição - ${segunda_sen.sentenca}:`)
        console.log(segunda_sen.tab_verdade)

        let nova_tab = []
        for(i = 0; i < primeira_sen.tab_verdade.length && i < segunda_sen.tab_verdade.length; i++) {
            let val1 = primeira_sen.tab_verdade[i]
            let val2 = segunda_sen.tab_verdade[i]

            if(val1 && val2) {
                nova_tab.push(true)
            } else {
                nova_tab.push(false)
            }
        }

        console.log(`Nova tabela verdade da operação ${primeira_sen.sentenca} ^ ${segunda_sen.sentenca}:`)
        console.log(nova_tab)
        return nova_tab

    } else if(var_logica == "v" || var_logica == "V") { // Faz a tabela verdade do OR(OU)
        console.log("Entrou no OR(OU)!")
        console.log(`Tabela verdade da primeira proposição - ${primeira_sen.sentenca}:`)
        console.log(primeira_sen.tab_verdade)
        console.log(`Tabela verdade da segunda proposição - ${segunda_sen.sentenca}:`)
        console.log(segunda_sen.tab_verdade)

        let nova_tab = []
        for(i = 0; i < primeira_sen.tab_verdade.length && i < primeira_sen.tab_verdade.length; i++) {
            let val1 = primeira_sen.tab_verdade[i]
            let val2 = segunda_sen.tab_verdade[i]

            if(val1 || val2) 
                nova_tab.push(true)
            else
                nova_tab.push(false)
        }

        console.log(`Nova tabela verdade da operação ${primeira_sen.sentenca} V ${segunda_sen.sentenca}`)
        console.log(nova_tab)
        return nova_tab

    } else if(var_logica == "=>") { // Faz a tabela verdade da Condicional
        console.log("Entrou na Condicional")
        console.log(`Tabela verdade da primeira proposição - ${primeira_sen.sentenca}`)
        console.log(primeira_sen.tab_verdade)
        console.log(`Tabela verdade da segunda proposição - ${segunda_sen.sentenca}:`)
        console.log(segunda_sen.tab_verdade)

        let nova_tab = []
        for(i = 0; i < primeira_sen.tab_verdade.length && i < primeira_sen.tab_verdade.length; i++) {
            let val1 = primeira_sen.tab_verdade[i]
            let val2 = segunda_sen.tab_verdade[i]

            if(val1 && !val2)
                nova_tab.push(false)
            else 
                nova_tab.push(true)
        }

        console.log(`Nova tabela verdade da operação ${primeira_sen.sentenca} V ${segunda_sen.sentenca}`)
        console.log(nova_tab)
        return nova_tab

    } else if(var_logica == "<=>") {
        console.log("Entrou na Bicondicional")
        console.log(`Tabela verdade da primeira proposição - ${primeira_sen.sentenca}`)
        console.log(primeira_sen.tab_verdade)
        console.log(`Tabela verdade da segunda proposição - ${segunda_sen.sentenca}:`)
        console.log(segunda_sen.tab_verdade)

        let nova_tab = []
        for(i = 0; i < primeira_sen.tab_verdade.length && i < primeira_sen.tab_verdade.length; i++) {
            let val1 = primeira_sen.tab_verdade[i]
            let val2 = segunda_sen.tab_verdade[i]

            if(val1 == val2) 
                nova_tab.push(true)
            else 
                nova_tab.push(false)
        }

        console.log(`Nova tabela verdade da operação ${primeira_sen.sentenca} V ${segunda_sen.sentenca}`)
        console.log(nova_tab)
        return nova_tab

    }
}
