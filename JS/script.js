// Seleciona os elementos do HTML
const add = document.querySelector("#add")
const clear = document.querySelector("#clear")
const input = document.querySelector('#send-item')
const list = document.querySelector('#list')

// Carrega os itens salvos ao abrir a página
window.addEventListener("load", () => {
    const savedList = JSON.parse(localStorage.getItem("shoppingList")) || []
    savedList.forEach(item => {
        criarItem(item.text, item.checked)
    })
})

// Função para criar o item na lista
function criarItem(texto, marcado) {
    const li = document.createElement("li")
    li.textContent = texto

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = marcado

    // Se tiver marcado, já risca
    if (marcado) {
        li.classList.add("riscado")
    }

    // Evento para riscar ou desriscar ao clicar
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            li.classList.add("riscado")
        } else {
            li.classList.remove("riscado")
        }
        saveList()
    })

    li.appendChild(checkbox)
    list.appendChild(li)
}

// Adiciona novo item
add.addEventListener("click", (e) => {
    e.preventDefault()

    const itemText = input.value.trim()

    if (itemText !== "") {
        criarItem(itemText, false)
        input.value = ""
        saveList()
    }
})

// Limpa a lista
clear.addEventListener("click", (e) => {
    e.preventDefault()
    list.innerHTML = ""
    localStorage.removeItem("shoppingList")
})

// Salva a lista no localStorage
function saveList() {
    const items = []
    list.querySelectorAll("li").forEach(li => {
        const text = li.firstChild.textContent.trim()
        const checked = li.querySelector("input[type='checkbox']").checked
        items.push({ text, checked })
    })
    localStorage.setItem("shoppingList", JSON.stringify(items))
}
