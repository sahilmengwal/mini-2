// Check if the cartItems array is stored in localStorage, and retrieve it
var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to add an item to the cart
function addtocart(item) {
    var itemName = document.getElementById(item).querySelector(".cart-info p").innerText;
    var itemPrice = parseFloat(document.getElementById(item).querySelector(".cart-info small").innerText.replace('$', ''));
    var itemQuantity = parseInt(document.getElementById(item).querySelector("input").value);

    var itemSubtotal = itemPrice * itemQuantity;

    var cartItem = {
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
        subtotal: itemSubtotal
    };

    cartItems.push(cartItem);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartDisplay();

    alert(itemName + " added to cart!");
}

// Function to update the cart display
function updateCartDisplay() {
    var cartTable = document.querySelector('.cart-page table');
    var totalTable = document.querySelector('.total-price table');

    if (cartItems.length > 0) {
        cartTable.innerHTML = '';
        var tbody = document.createElement('tbody');

        cartItems.forEach(function (item) {
            var row = document.createElement('tr');
            row.innerHTML = '<td>' + item.name + '</td><td>' + item.quantity + '</td><td>$' + item.subtotal.toFixed(2) + '</td>';
            tbody.appendChild(row);
        });

        cartTable.appendChild(tbody);

        var subtotal = cartItems.reduce(function (total, item) {
            return total + item.subtotal;
        }, 0);

        var tax = 0.1 * subtotal; // Assuming 10% tax
        var total = subtotal + tax;

        totalTable.innerHTML = '<tr><td>Subtotal</td><td>$' + subtotal.toFixed(2) + '</td></tr>' +
                              '<tr><td>Tax</td><td>$' + tax.toFixed(2) + '</td></tr>' +
                              '<tr><td>Total</td><td>$' + total.toFixed(2) + '</td></tr>';
    } else {
        cartTable.innerHTML = '<tr><td colspan="3">Your cart is empty.</td></tr>';
        totalTable.innerHTML = ''; // Clear total values if cart is empty
    }
}

// Call the updateCartDisplay function to initially populate the cart on page load
updateCartDisplay();
