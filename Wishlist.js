// Load wishlist from localStorage or empty array
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistContainer = document.getElementById("wishlist");

// Function to display all wishlist items
function renderWishlist() {
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty 😢</p>";
    return;
  }

  wishlist.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
    `;

    wishlistContainer.appendChild(card);
  });
}

// Function to add new item
function addToWishlist() {
  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const img = document.getElementById("img").value.trim();

  if (!name || !price || !img) {
    alert("Please fill all fields!");
    return;
  }

  const newItem = {
    id: Date.now(),
    name,
    price,
    img
  };

  wishlist.push(newItem);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";

  renderWishlist();
}

// Function to remove an item
function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  renderWishlist();
}

// Show wishlist on page load
renderWishlist();
