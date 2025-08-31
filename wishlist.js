
document.addEventListener("DOMContentLoaded", () => {
    const wishlist = document.getElementById("wishlist-items");
    const emptyMsg = document.getElementById("empty-msg");

    // Function to check if wishlist is empty
    function checkEmpty() {
        if (wishlist.querySelectorAll(".wishlist-item").length === 0) {
            emptyMsg.style.display = "block";
        } else {
            emptyMsg.style.display = "none";
        }
    }

    // Handle remove from wishlist
    wishlist.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-wishlist")) {
            e.target.closest(".wishlist-item").remove();
            checkEmpty();
        }
    });

    // Handle move to cart
    wishlist.addEventListener("click", function (e) {
        if (e.target.classList.contains("move-to-cart")) {
            const item = e.target.closest(".wishlist-item");
            const product = {
                id: item.dataset.id,
                name: item.dataset.name,
                price: item.dataset.price,
                img: item.dataset.img
            };

            // Save product into localStorage (shared between wishlist.html & cart.html)
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Remove from wishlist after moving
            item.remove();
            checkEmpty();

            alert(product.name + " moved to cart.");
            // OPTIONAL: Redirect directly to cart page
            // window.location.href = "cart.html";
        }
    });

    checkEmpty();
});