function calculateFutureDate(addDays) {
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + addDays);
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }

function UpdateCartDisplay() {
    const paymentPrice1Element = document.querySelector('.payment_price1');
    const paymentPrice2Element = document.querySelector('.payment_price2');
    const totalItemsElement = document.querySelector('.total-items');

    if (paymentPrice1Element && paymentPrice2Element && totalItemsElement) {
        paymentPrice1Element.innerHTML = Total_Price;
        paymentPrice2Element.innerHTML = Total_Price;
        totalItemsElement.innerHTML = Total_Items;
        localStorage.setItem('Cart_Quantity', Total_Items.toString());
    }
}

function getProductsArray() {
    return JSON.parse(localStorage.getItem('Products_Data')) || [];
}

let Date_Array = [];

function generateInnerHtmlCode() {
    let inner_HtmlCode = '';
    let delivery_Day = calculateFutureDate(7);
    Products_Data_Array.forEach((products, index) => {
        inner_HtmlCode += 
        `<div class="product-container">
            <div>
                <span class="delivery-date">Delivery date: <span class="delivery-day delivery-day-${index}" value="${delivery_Day}">${delivery_Day}</span></span>
            </div>
            <div>
                <img class="product-img" src="${products.image}">
            </div>
            <div class="inner-product-info-container">
                <p class="product-info">${products.info} ${products.size}</p>
                <p class="product-price-details">₹ <span class="product-cost">${products.price}</span></p>
                <span class="qty-label">Quantity: <span class="quantity-count-${index}" id="visible">${products.quantity}</span></span>
                <input class="Qty-input-box Qty-input-${index}" onkeydown="
                if (event.key === 'Enter'){
                    OnClickInput(${index});
                }" type="number"><button class="cart-qty-update-btn quantity-update-btn-${index}" id="hide"
                onclick="OnClickInput(${index})">Update</button>
                <span class="line" id="visible">|</span>
                <button class="product-update-btn product-update-btn-${index}" id="visible"
                onclick="cartProductQtyChange(${index})"
                >Update</button>
                <span class="line">|</span>
                <button class="product-delete-btn"
                onclick="DeleteProduct(${index})"
                >Delete</button>
            </div>
            <div class="delivery-options-div">
                <form class="delivery-option-form delivery-optionform-${index}">
                    <p class="choose-delivery-date">Choose a delivey option:</p>
                    <input type="radio" name="group1-${index}" id="radiobtn1" value="${calculateFutureDate(7)}" checked onclick="RadioClicked(7, ${index}); DeliveryChoice(0, ${index});">
                    <label for="radio1">
                        <span class="shipping-day">${calculateFutureDate(7)}</span><br>
                        <p class="shipping-type">Free - Shipping</p>
                    </label>
                
                    <input type="radio" name="group1-${index}" id="radiobtn2" value="${calculateFutureDate(5)}" onclick="RadioClicked(5, ${index}); DeliveryChoice(100, ${index});">
                    <label for="radio2">
                        <span class="shipping-day">${calculateFutureDate(5)}</span><br>
                        <p class="shipping-type">₹100 - Shipping</p>
                    </label>
                
                    <input type="radio" name="group1-${index}" id="radiobtn3" value="${calculateFutureDate(4)}" onclick="RadioClicked(4 ,${index}); DeliveryChoice(150, ${index});">
                    <label for="radio3">
                        <span class="shipping-day">${calculateFutureDate(4)}</span>
                        <p class="shipping-type">₹150 - Shipping</p>
                    </label>
                </form>
            </div>
            </div>
        </div>`
    });
    return inner_HtmlCode;
}
let Delivery_Date_Object = []
let Total_Price = 0;
let Total_Items = 0;
let Products_Data_Array = getProductsArray();
const productContainer = document.querySelector('.order-detail-container');
if (productContainer) {
    productContainer.innerHTML = generateInnerHtmlCode();
    };


UpdateCart();

function UpdateCart() {
    Total_Price = 0;
    Total_Items = 0;

    Products_Data_Array.forEach((products) => {
        Total_Price += products.value * products.quantity;
        Total_Items += products.quantity;
    });

    localStorage.setItem('Products_Data', JSON.stringify(Products_Data_Array));

    UpdateCartDisplay();
    CartItemsNull();
    DeliveryCharge();
}

function Update_Cart_to_Orders() {
    const Orders_Array = JSON.parse(localStorage.getItem('OrdersDataArray')) || [];
    const combinedArray = Orders_Array.concat(Products_Data_Array);

    let len = Products_Data_Array.length;
    Products_Data_Array.splice(0, len + 1);

    localStorage.setItem('OrdersDataArray', JSON.stringify(combinedArray));
    window.location.href = 'amazon-orders.html';
    UpdateCart();

    setTimeout(() => {
        location.reload();
    }, 1000);
}


function DeliveryCharge() {
    const deliveryChargeElement = document.querySelector('.delivery_charge');
    const paymentPrice2Element = document.querySelector('.payment_price2');
    const freeOrderEligibleTextElement = document.querySelector('.free-order-eligible-text');
    const eligibleOrderLogoElement = document.querySelector('.eligible-order-logo');

    if (deliveryChargeElement && paymentPrice2Element && freeOrderEligibleTextElement && eligibleOrderLogoElement) {
        if (Total_Price >= 499) {
            deliveryChargeElement.innerHTML = 0;
            paymentPrice2Element.innerHTML = Total_Price || 0;
            freeOrderEligibleTextElement.innerHTML = 'Your order is eligible for FREE Delivery.';
            eligibleOrderLogoElement.src = 'images/checkmark.png';
            freeOrderEligibleTextElement.classList.add('free-eligible-text');
        } else if (Total_Price > 0 && Total_Price < 499) {
            deliveryChargeElement.innerHTML = 40;
            paymentPrice2Element.innerHTML = (Total_Price || 0) + 40;
            freeOrderEligibleTextElement.innerHTML = `Add ₹${499 - (Total_Price || 0)}.00 of eligible items to your order to qualify for FREE Delivery`;
        } else {
            freeOrderEligibleTextElement.innerHTML = '';
            eligibleOrderLogoElement.src = '';
        }
}
}

function DeleteProduct(index) {
    Total_Price -= Products_Data_Array[index].value * Products_Data_Array[index].quantity;
    Products_Data_Array.splice(index, 1);
    UpdateCart();
    location.reload();
}


function RadioClicked(days, orderId) {
    const dateElement = document.querySelector(`.delivery-day-${orderId}`);
    dateElement.innerHTML = calculateFutureDate(days);
}

function UpdateProduct(index) {
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity !== null && !isNaN(newQuantity) && newQuantity > 0) {
        Products_Data_Array[index].quantity = parseInt(newQuantity, 10);
        UpdateCart();
    }
    }

function OnClickInput(index) {
    const input_Box = document.querySelector(`.Qty-input-${index}`);
    const button = document.querySelector(`.quantity-update-btn-${index}`);
    const Count = document.querySelector(`.quantity-count-${index}`);
    const Update_btn = document.querySelector(`.product-update-btn-${index}`);

    const input_box_Value = document.querySelector(`.Qty-input-${index}`);

    const Value_Element = parseInt(input_box_Value.value);

    if (Value_Element === 0) {
        DeleteProduct(index)
    } 
    if (Value_Element > 0 && Value_Element <= 100) {
    let New_Quantity = 0;
    New_Quantity = Value_Element;
    Products_Data_Array[index].quantity = New_Quantity;
    input_Box.classList.remove('product-visible');
    button.classList.remove('product-visible');
    Count.classList.remove('product-hidden');
    Update_btn.classList.remove('product-hidden');
    UpdateCart();
    location.reload();
    }
}

function cartProductQtyChange(index) {
    const input_Box = document.querySelector(`.Qty-input-${index}`);
    const button = document.querySelector(`.quantity-update-btn-${index}`);
    const Count = document.querySelector(`.quantity-count-${index}`);
    const Update_btn = document.querySelector(`.product-update-btn-${index}`);

    input_Box.classList.add('product-visible');
    button.classList.add('product-visible');
    Count.classList.add('product-hidden');
    Update_btn.classList.add('product-hidden');
}

let Cost_Array = [];
let Final_Price = 0;

function DeliveryChoice(cost, index) {
    const existingIndex = Cost_Array.findIndex((entry) => Object.keys(entry)[0] === `Cost_${index}`);

    if (existingIndex !== -1) {
        Cost_Array[existingIndex][`Cost_${index}`] = cost;
    } else {
        Cost_Array.push({ [`Cost_${index}`]: cost });
    }

    Final_Price = Cost_Array.reduce((sum, entry) => {
        const entryValue = parseFloat(entry[`Cost_${index}`]) || 0;
        return sum + entryValue;
    }, 0);
    CalculateArray()
}

function CalculateArray() {
    let Final_Products_Price = 0;
    for (let obj of Cost_Array) {
        for (let value of Object.values(obj)) {
            Final_Products_Price+=value;
        }
    }
    if (Total_Price >= 499){
        Final_Products_Price + 0;
    }else {
        Final_Products_Price + 40;
    }

    document.querySelector('.delivery_charge').innerHTML = Final_Products_Price;
    document.querySelector('.payment_price2').innerHTML = Total_Price + Final_Products_Price;
    localStorage.setItem('Total_Order_Price', JSON.stringify(document.querySelector('.payment_price2').innerHTML))
}

function CartItemsNull() {
    document.addEventListener('DOMContentLoaded', function () {
        const divElement = document.querySelector('.payment-details-div');
        const div = document.querySelector('.cart-empty-div');
        if (div) {
            if (Products_Data_Array.length === 0) {
                div.classList.add('cart-empty-div-visible');
                divElement.classList.add('payment-datails-empty');
                document.querySelector('.place-order-button').innerHTML = 'View Orders';
            }
        }
    });
}
