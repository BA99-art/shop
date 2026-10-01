const products = [

    {
        id: 1,
        name: "VYRO Basic Tee",
        price: 49,
        img: "V"
    },

    {
        id: 2,
        name: "VYRO Oversized Tee",
        price: 59,
        img: "V"
    },

    {
        id: 3,
        name: "VYRO Hoodie",
        price: 99,
        img: "V"
    },

    {
        id: 4,
        name: "VYRO Cargo Pants",
        price: 89,
        img: "V"
    }

];


let cart = [];


/* SHOW PRODUCTS */

function renderProducts() {

    const grid = document.getElementById("productsGrid");

    grid.innerHTML = products.map(product => `

        <article class="product">

            <div class="product-img">
                ${product.img}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <div class="price">
                    ${product.price} TND
                </div>

                <button
                    class="add"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>

        </article>

    `).join("");

}


/* ADD PRODUCT */

function addToCart(id) {

    const product = products.find(
        product => product.id === id
    );

    cart.push(product);

    updateCart();

    toggleCart(true);

}


/* REMOVE PRODUCT */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


/* UPDATE CART */

function updateCart() {

    document.getElementById("cartCount").textContent =
        cart.length;


    const items =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        items.innerHTML =
            "<p style='color:#777'>Your cart is empty.</p>";

    }

    else {

        items.innerHTML = cart.map(
            (product, index) => `

            <div class="cart-item">

                <span>

                    ${product.name}

                    <br>

                    <small>
                        ${product.price} TND
                    </small>

                </span>

                <button
                    class="remove"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>

        `).join("");

    }


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );


    document.getElementById("cartTotal").textContent =
        total + " TND";

}


/* OPEN / CLOSE CART */

function toggleCart(force) {

    const panel =
        document.getElementById("cartPanel");

    const overlay =
        document.getElementById("overlay");


    const open =
        force === true ||
        !panel.classList.contains("open");


    panel.classList.toggle("open", open);

    overlay.classList.toggle("open", open);

}


/* WHATSAPP ORDER */

function orderWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const total = cart.reduce(
        (sum, product) => sum + product.price,
        0
    );


    const message =
        "Hello VYRO! I want to order:%0A" +

        cart.map(product =>
            "- " +
            product.name +
            " — " +
            product.price +
            " TND"
        ).join("%0A") +

        "%0A%0ATotal: " +

        total +

        " TND";


    /*
      IMPORTANT:
      Replace 21600000000
      with your WhatsApp number.
    */

    window.open(
        "https://wa.me/21600000000?text=" + message,
        "_blank"
    );

}


/* START */

renderProducts();

updateCart();