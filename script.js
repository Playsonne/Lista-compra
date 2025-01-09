// script.js
const firebaseConfig = {
    apiKey: "tu-apiKey",
    authDomain: "tu-authDomain",
    databaseURL: "tu-databaseURL",
    projectId: "tu-projectId",
    storageBucket: "tu-storageBucket",
    messagingSenderId: "tu-messagingSenderId",
    appId: "tu-appId"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


// Recupera los productos de localStorage cuando la página se carga
window.onload = function() {
    loadList();
}

// Función para añadir un producto a la lista de productos por comprar
function addProduct() {
    const input = document.getElementById("product-input");
    const product = input.value.trim();

    if (product) {
        const listItem = document.createElement("li");
        listItem.textContent = product;
        listItem.onclick = function() {
            moveToBought(product, listItem);
        };

        // Añadir el producto a la lista por comprar y guardar en localStorage
        const toBuyList = document.getElementById("to-buy-list");
        toBuyList.appendChild(listItem);
        saveList();
        input.value = ''; // Limpiar el campo de entrada
    }
}

// Función para mover un producto a la lista de comprados
function moveToBought(product, listItem) {
    const boughtList = document.getElementById("bought-list");

    // Crear un nuevo item para la lista de comprados
    const boughtItem = document.createElement("li");
    boughtItem.textContent = product;
    boughtItem.onclick = function() {
        removeFromBought(boughtItem);
    };

    // Eliminar el producto de la lista de comprar
    listItem.remove();

    // Añadir el producto a la lista de comprados
    boughtList.appendChild(boughtItem);
    saveList();  // Guardar los cambios en localStorage
}

// Función para eliminar un producto de la lista de comprados
function removeFromBought(boughtItem) {
    boughtItem.remove();
    saveList();  // Guardar los cambios después de eliminar
}

// Función para guardar las listas en localStorage
function saveList() {
    const toBuyList = document.getElementById("to-buy-list");
    const boughtList = document.getElementById("bought-list");

    const toBuyItems = [];
    const boughtItems = [];

    // Recoger los productos por comprar
    for (let item of toBuyList.children) {
        toBuyItems.push(item.textContent);
    }

    // Recoger los productos comprados
    for (let item of boughtList.children) {
        boughtItems.push(item.textContent);
    }

    // Guardar las listas en localStorage
    localStorage.setItem("toBuyItems", JSON.stringify(toBuyItems));
    localStorage.setItem("boughtItems", JSON.stringify(boughtItems));
}

// Función para cargar las listas desde localStorage al iniciar
function loadList() {
    const toBuyList = document.getElementById("to-buy-list");
    const boughtList = document.getElementById("bought-list");

    // Recuperar los productos guardados
    const toBuyItems = JSON.parse(localStorage.getItem("toBuyItems")) || [];
    const boughtItems = JSON.parse(localStorage.getItem("boughtItems")) || [];

    // Añadir los productos por comprar a la lista
    toBuyItems.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = product;
        listItem.onclick = function() {
            moveToBought(product, listItem);
        };
        toBuyList.appendChild(listItem);
    });

    // Añadir los productos comprados a la lista
    boughtItems.forEach(product => {
        const boughtItem = document.createElement("li");
        boughtItem.textContent = product;
        boughtItem.onclick = function() {
            removeFromBought(boughtItem);
        };
        boughtList.appendChild(boughtItem);
    });
}
