let Orders_Data_Array = JSON.parse(localStorage.getItem('OrdersDataArray')) || [];

let ordersHtmlCode = '';
for (let i = Orders_Data_Array.length - 1; i >= 0; i--) {
    const order = Orders_Data_Array[i];
ordersHtmlCode += `
        <div class="orders-details-div">
            <div class="orders-info">
                <p>Order Placed:<br><span class="Order-placed-day">${calculateFutureDate(0)}</span></p>
                <p>Total:<br>₹ <span class="order-total-cost">${order.value}</span></p>
            </div>
            <div class="orders-info">
                <p>Order Id<br><span class="order-no">#406-</span><span class="order-id">${order.value *2}-${order.value *3}</span></p>
            </div>
        </div>
        <div class="placed-orders-div">
            <img class="ordered-product-img" src="${order.image}">
            <div class="product-details-div">
                <p class="product-name">${order.info} ${order.size}</p>
                <p class="arriving-text">Arriving on: <span>${calculateFutureDate(7)}</span></p>
                <p class="quantity-text">Quantity: <span>${order.quantity}</span></p>
                <div class="Add_cart_orders_div">
                    <button class="buy-again-button" onclick="OrderedItemToCart(${i})"
                    ><img src="images/buy-again.png">Buy Again</button>
                    <img class="appear1_${i}" src=""><span class="Add_cart_orders_text appear2_${i}"></span>
                </div>
            </div>
            <div class="Track-div">
                <button onclick="ItemtoTrack(${i})">Track Package</button>
            </div>
        </div>`
        ;};

let ordersContainer = document.querySelector('.orders-container');
if (ordersContainer){
    ordersContainer.innerHTML = ordersHtmlCode;
}

function ItemtoTrack(index) {
    localStorage.setItem('Track_Order_details', JSON.stringify(Orders_Data_Array[index]));
    window.location.href = "amazon-track-order.html";
}

function RandomNumber() {
    const randomNumbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 9) + 1); 
    return randomNumbers;
}

function emptyOrdersPage(){
    window.location.href = "index.html"
}

function EmptyPage() {
    let pageElement = document.querySelector('.empty-orders-page');
    if (Orders_Data_Array.length === 0) {
        pageElement.classList.add('empty-orders-page-visible');
    }
}

EmptyPage();

function OrderedItemToCart(index) {
    let storedProducts = JSON.parse(localStorage.getItem('Products_Data')) || [];

    image = Orders_Data_Array[index].image;
    info = Orders_Data_Array[index].info;
    cost = Orders_Data_Array[index].price;
    quantity = Orders_Data_Array[index].quantity;
    price = Orders_Data_Array[index].value;
    size = Orders_Data_Array[index].size;

    let found = false;

    for (const item of storedProducts) {
        if (item.image === image) {
          item.quantity += quantity
          found = true;
          break;
        }
      }
      if (!found) {
      storedProducts.push({
          image: image,
          info: info,
          price: cost,
          quantity: quantity,
          value: price,
          size: size
      })}
      UpdateCartDisplay();
      UpdateCart();

    document.querySelector(`.appear1_${index}`).src= 'images/checkmark.png';
    document.querySelector(`.appear2_${index}`).innerHTML= 'Added';
    
    setTimeout(function() {
        document.querySelector(`.appear1_${index}`).src= '';
        document.querySelector(`.appear2_${index}`).innerHTML= '';
    },1500);

    let valueElement = parseInt(document.querySelector('.cart-count').innerHTML)
    let FinalValue = valueElement + parseInt(Orders_Data_Array[index].quantity);

    document.querySelector('.cart-count').innerHTML = FinalValue;  

    localStorage.setItem('Products_Data', JSON.stringify(storedProducts));
}
