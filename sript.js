// Créez un tableau pour stocker les articles du panier
const cart = [];

// Fonction pour mettre à jour le panier
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  let total = 0;

  // Effacez le contenu du panier
  cartItems.innerHTML = "";

  // Parcourez chaque article du panier
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.name} - Total: $${(item.price * item.quantity).toFixed(2)}
      <button class="remove-from-cart" data-name="${item.name}">Supprimer</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  // Mettez à jour le prix total
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const likeButtons = document.querySelectorAll(".like-button");

  // Ajoutez un gestionnaire d'événements pour les boutons "Ajouter au panier"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = button.parentNode;
      const name = product.querySelector("h2").textContent;
      const price = parseFloat(product.querySelector("p").textContent.split("$")[1]);

      // Vérifiez si l'article est déjà dans le panier
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        // Si l'article existe, augmentez la quantité
        existingItem.quantity++;
      } else {
        // Sinon, ajoutez-le au panier
        cart.push({ name, price, quantity: 1 });
      }

      // Mettez à jour le panier
      updateCart();
    });
  });

  // Ajoutez un gestionnaire d'événements pour les boutons "J'aime"
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      button.classList.toggle("liked");
    });
  });

  // Ajoutez un gestionnaire d'événements pour la suppression
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const itemName = event.target.getAttribute("data-name");
      const itemIndex = cart.findIndex((item) => item.name === itemName);
      if (itemIndex !== -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
          cart.splice(itemIndex, 1);
        }
        updateCart();
      }
    }
  });

  // Mettez à jour le panier initial
  updateCart();
});
