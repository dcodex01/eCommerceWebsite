document.addEventListener("DOMContentLoaded", () => {
            const cartContainer = document.getElementById("cart-items");
            const cartTotalEl = document.getElementById("cart-total");
            const emptyMsg = document.getElementById("empty-msg");
            const cartSummary = document.getElementById("cart-summary");

            // Load cart from localStorage
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Render cart items
            function renderCart() {
                cartContainer.innerHTML = "";
                let total = 0;

                if (cart.length === 0) {
                    emptyMsg.style.display = "block";
                    cartSummary.style.display = "none";
                    return;
                }

                emptyMsg.style.display = "none";
                cartSummary.style.display = "block";

                cart.forEach((item, index) => {
                    const itemTotal = item.price * (item.qty || 1);
                    total += itemTotal;

                    const div = document.createElement("div");
                    div.className = "d-flex align-items-center border-bottom py-3 cart-item";
                    div.innerHTML = `
            <img src="${item.img}" class="rounded me-3" width="100" alt="${item.name}">
            <div class="flex-grow-1">
              <h5>${item.name}</h5>
              <p class="text-success fw-bold">₹<span class="item-total">${itemTotal}</span></p>
              <div class="d-flex align-items-center">
                <label class="me-2">Qty:</label>
                <select class="form-select w-auto quantity">
                  <option value="1" ${item.qty == 1 ? "selected" : ""}>1</option>
                  <option value="2" ${item.qty == 2 ? "selected" : ""}>2</option>
                  <option value="3" ${item.qty == 3 ? "selected" : ""}>3</option>
                  <option value="4" ${item.qty == 4 ? "selected" : ""}>4</option>
                </select>
              </div>
              <button class="btn btn-danger btn-sm mt-2 remove-btn">Remove</button>
            </div>
          `;

                    // Attach events
                    div.querySelector(".quantity").addEventListener("change", (e) => {
                        cart[index].qty = +e.target.value;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        renderCart();
                    });

                    div.querySelector(".remove-btn").addEventListener("click", () => {
                        cart.splice(index, 1);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        renderCart();
                    });

                    cartContainer.appendChild(div);
                });

                cartTotalEl.textContent = total;
            }

            renderCart();

            // Payment Options
            const cardFields = `
        <input type="text" class="form-control mb-2" placeholder="Card Number">
        <input type="text" class="form-control mb-2" placeholder="Expiry Date (MM/YY)">
        <input type="text" class="form-control mb-2" placeholder="CVV">
      `;
            const upiFields = `<input type="text" class="form-control mb-2" placeholder="Enter UPI ID">`;
            const codFields = `<p class="text-muted">Pay with cash upon delivery.</p>`;

            document.querySelectorAll('input[name="paymentMethod"]').forEach(option => {
                option.addEventListener("change", () => {
                    let paymentDetails = document.getElementById("paymentDetails");
                    if (document.getElementById("card").checked) paymentDetails.innerHTML = cardFields;
                    if (document.getElementById("upi").checked) paymentDetails.innerHTML = upiFields;
                    if (document.getElementById("cod").checked) paymentDetails.innerHTML = codFields;
                });
            });

            // Pay button
            document.getElementById("payBtn").addEventListener("click", () => {
                if (cart.length === 0) {
                    alert("Your cart is empty ❌");
                    return;
                }
                alert("Payment Successful ✅");
                cart = [];
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
                let modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
                modal.hide();
            });
        });