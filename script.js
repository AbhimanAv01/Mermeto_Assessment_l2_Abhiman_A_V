document.addEventListener('DOMContentLoaded', function () {
    fetch('Assets/data/data.json')    // Fetch data from the JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');// Handle fetch error
            }
            return response.json();

        })
        .then(data => {
             // Load main image and thumbnails with sources from JSON 
            document.getElementById('main-image').src = data.product.images[0].src;
            document.getElementById('thumbnails1').src = data.product.images[0].src;
            document.getElementById('thumbnails2').src = data.product.images[1].src;
            document.getElementById('thumbnails3').src = data.product.images[2].src;
            document.getElementById('thumbnails4').src = data.product.images[0].src;

            //Load product details using data from JSON
            document.getElementById('product-title').textContent = data.product.title;
            document.getElementById('description').textContent = data.product.description;
            document.getElementById('vendor').textContent = data.product.vendor;
            document.getElementById('original-price').textContent = data.product.compare_at_price;

            // Set background colors for color options from JSON
            document.getElementById('color1').style.backgroundColor = data.product.options[0].values[0].Yellow;
            document.getElementById('color2').style.backgroundColor = data.product.options[0].values[1].Green;
            document.getElementById('color3').style.backgroundColor = data.product.options[0].values[2].Blue;
            document.getElementById('color4').style.backgroundColor = data.product.options[0].values[3].Pink;

            // set size options with data from JSON
            document.getElementById('radio1').textContent = data.product.options[1].values[0];
            document.getElementById('radio2').textContent = data.product.options[1].values[1];
            document.getElementById('radio3').textContent = data.product.options[1].values[2];
            document.getElementById('radio4').textContent = data.product.options[1].values[3];
            document.getElementById('radio5').textContent = data.product.options[1].values[4];

            // Initialize quantity manipulation buttons
            const decrementButton = document.getElementById('decrement');
            const incrementButton = document.getElementById('increment');
            const quantityInput = document.getElementById('quantity-input');

            //quantity buttons
            let currentQuantity = parseInt(quantityInput.value);

            // Decrement button 
            decrementButton.addEventListener('click', function () {
                if (currentQuantity > 1) { // Prevent decrementing below 1
                    currentQuantity--;
                    quantityInput.value = currentQuantity;
                }
            });

            // Increment button 
            incrementButton.addEventListener('click', function () {
                currentQuantity++;
                quantityInput.value = currentQuantity;
            });

            // Calculate and display the discounted price(percentage)
            const A = data.product.compare_at_price.slice(1);
            const B = 35;
            const percentage = (B * A) / 100;
            const finalprice = (A - percentage)
            document.getElementById('current-price').innerHTML = "$" + finalprice;

        })
        .catch(error => {
            console.error('Error fetching data:', error);// Log any fetch errors
        });
});

// Function to change the main image source when a thumbnail is clicked
function changeImage(newSrc) {
    document.getElementById('main-image').src = newSrc;
}

// Get selected color variable
let selectedColor = '';
// Function to set selected color
function selectColor(color) {
    selectedColor = color;
}

// Add to cart button event listener
document.querySelector('.add-to-cart').addEventListener('click', function () {
    // Get selected size
    let selectedSize;
    const sizeInputs = document.getElementsByName('size');
    for (let i = 0; i < sizeInputs.length; i++) {
        if (sizeInputs[i].checked) {
            selectedSize = sizeInputs[i].value;
            break;
        }
    }

    // Get product title
    const productTitle = document.getElementById('product-title').textContent;
    // Display alert with selected product details
    document.getElementById('alert').textContent = `${productTitle} with Color ${selectedColor} and Size ${selectedSize} added to cart`;;
});



