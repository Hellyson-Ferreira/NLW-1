function polulateUfs(){
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    const ufSelect = document.querySelector("select[name=uf]")
    fetch(url).then(res=> res.json() ).then(states =>{
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })

}
function getCitys(event){
    
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    
    const ufValue = event.target.value
    //stateInput.value = event.target.options[event.target.selectendIndex].text
    citySelect.innerHTM = `<option value="">Selecione a cidade</option>`

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url).then(res=> res.json() ).then(cities =>{
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }
        if(ufValue!=''){
            citySelect.disabled = false
        }
    })

}

polulateUfs()

document.querySelector("select[name=uf]").addEventListener("change",getCitys)

