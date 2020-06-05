function polulateUfs() {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    const ufSelect = document.querySelector("select[name=uf]")
    fetch(url).then(res => res.json()).then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })

}
function getCities(event) {

    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value
    stateInput.value = event.target.options[event.target.selectedIndex].text

    citySelect.innerHTM = `<option value="">Selecione a cidade</option>`
    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url).then(res => res.json()).then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        if (ufValue != '') {
            citySelect.disabled = false
        }
    })

}

polulateUfs()

document.querySelector("select[name=uf]").addEventListener("change", getCities)

const colectedItems = document.querySelector('input[name=items]')
let selectedItems = []
//Itens de coleta 
function hundleSelectedItem(event) {

    const itemeLi = event.target

    itemeLi.classList.toggle("selected")

    const itemId = event.target.dataset.id
    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    if (alreadySelected != -1) {
       const filteredItens = selectedItems.filter(item=> item != itemId)
       selectedItems = filteredItens
    }else{
        selectedItems.push(itemId)
    }
   colectedItems.value = selectedItems
    

}
const itemsToColect = document.querySelectorAll(".items-grid li")

for (const item of itemsToColect) {
    item.addEventListener("click", hundleSelectedItem)

}
 