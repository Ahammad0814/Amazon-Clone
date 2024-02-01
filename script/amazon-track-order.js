function AddClasslist() {
    let progress_button = document.querySelector('.progress-button');
    if (progress_button) {
        progress_button.classList.add('progress-button-add');
    }
}
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(()=>{
    AddClasslist();
    }, 100)
});


let OrderTrackHtml = '';

let TrackOrdersArray = JSON.parse(localStorage.getItem('Track_Order_details'));

OrderTrackHtml +=
    `<div class="orders-track-div">
        <div class="cart-link">
            <a href="amazon-orders.html">View all Orders</a>
        </div>
        <div class="Arriving-date-div">
            <h2>Arriving on: ${calculateFutureDate(7)}</h2>
        </div>
        <div>
            <p class="product-name">${TrackOrdersArray.info} ${TrackOrdersArray.size}</p>
            <p>Quantity: <span class="product-qty">${TrackOrdersArray.quantity}</span></p>
            <img class="order-img" src="${TrackOrdersArray.image}">
        </div>
        <div class="delivery-track-text">
            <p id="text1">Preparing</p>
            <p id="text2">Shipped</p>
            <p id="text3">Delivered</p>
        </div>
        <div class="delivery-progress-div"><button class="progress-button"></button></div>
    </div>`

let TrackElement = document.querySelector('.orders-track-container');
if (TrackElement) {
    TrackElement.innerHTML = OrderTrackHtml || '';
}