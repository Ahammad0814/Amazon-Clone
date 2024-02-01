//---Size Chart---
let popup1 = document.querySelector('.Chart-Popup1');
let popup2 = document.querySelector('.Chart-Popup2');
let popup3 = document.querySelector('.Chart-Popup3');
let popup4 = document.querySelector('.Chart-Popup4');

let sizechart_name1 = document.querySelector('.size-chart-product-name1');
let sizechart_name2 = document.querySelector('.size-chart-product-name2');
let sizechart_name3 = document.querySelector('.size-chart-product-name3');
let sizechart_name4 = document.querySelector('.size-chart-product-name4');

function OpenPopUp1(chart_title) {
  popup1.classList.add('Open-pop-up');
  sizechart_name1.innerHTML = chart_title;
}
function OpenPopUp2(chart_title) {
  popup2.classList.add('Open-pop-up');
  sizechart_name2.innerHTML = chart_title;
}
function OpenPopUp3(chart_title) {
  popup3.classList.add('Open-pop-up');
  sizechart_name3.innerHTML = chart_title;
}
function OpenPopUp4(chart_title) {
  popup4.classList.add('Open-pop-up');
  sizechart_name4.innerHTML = chart_title;
}
function ClosePopUp() {
  popup1.classList.remove('Open-pop-up');
  popup2.classList.remove('Open-pop-up');
  popup3.classList.remove('Open-pop-up');
  popup4.classList.remove('Open-pop-up');
}


//----Products Script----

function ProductChange(imageId, Source, ColorId, ColorName ,ColorId2='') {
    document.getElementById(imageId).src = Source;
    document.getElementById(ColorId).innerHTML = ColorName;
    if (ColorId2) {
      document.getElementById(ColorId2).innerHTML = ColorName;
    }
}

function ProductPriceChange(CostId, Cost, sizeId, value1, value2, CostValue) {
  let costElement = document.getElementById(CostId);
  if (costElement) {
      costElement.innerHTML = Cost;
      costElement.setAttribute('value', Cost)

      let sizeElement = document.getElementById(sizeId);

      if (sizeElement) {
          if (Cost === CostValue) {
              sizeElement.innerHTML = value1;
              sizeElement.value = value1;
          } else if (Cost != CostValue){
              sizeElement.innerHTML = value2;
              sizeElement.value = value2;
          }
      }
}}

function Product_Color_Change(ColorId, ColorName) {
  document.getElementById(ColorId).innerHTML = ColorName;
}





function Product4_Size_Price_Change(imageId, PriceId) {
    const size = document.getElementById('product4-size').value;
    document.getElementById('product4-size').setAttribute('value', size);

    const color = document.getElementById('product4-color-text').innerHTML;

    const image = document.getElementById(imageId);
    const price = document.getElementById(PriceId);

    if (color === 'Pearl Blue'){
        if (size === 'S' ) {
          image.src = 'images/product4-1-1.jpg';
          price.innerHTML = '1899';
        }else if (size === 'M') {
          image.src = 'images/product4-1-2.jpg';
          price.innerHTML = '2399';
        }else if (size === 'L') {
          image.src = 'images/product4-1-3.jpg';
          price.innerHTML = '2799';
        }else if (size === 'set-2') {
          image.src = 'images/product4-1-4.jpg';
          price.innerHTML = '3799';
        }else if (size === 'set-3') {
          image.src = 'images/product4-1-5.jpg';
          price.innerHTML = '5899';
        }
    }else if (color === 'Spearmint') {
        if (size === 'S' ) {
          image.src = 'images/product4-2-1.jpg';
          price.innerHTML = '1899';
        }else if (size === 'M') {
          image.src = 'images/product4-2-2.jpg';
          price.innerHTML = '2399';
        }else if (size === 'L') {
          image.src = 'images/product4-2-3.jpg';
          price.innerHTML = '2799';
        }else if (size === 'set-2') {
          image.src = 'images/product4-2-4.jpg';
          price.innerHTML = '3799';
        }else if (size === 'set-3') {
          image.src = 'images/product4-2-5.jpg';
          price.innerHTML = '5899';
        }
    }
}

function Product34_ChangeType1() {
  const Color = document.getElementById('product34-color-text').innerHTML;
  const sizeElement = document.getElementById('product34-size');

  document.getElementById('product34-cost').innerHTML = '999';
  document.getElementById('product34-cost').setAttribute('value', '999');
   sizeElement.innerHTML = 'Charger';
   sizeElement.setAttribute('value', '999');

  if (Color === 'White') {
      document.getElementById('product34-img').src = 'images-2/product34-1-1.jpg'
  }else if (Color === 'Black') {
    document.getElementById('product34-img').src = 'images-2/product34-2-1.jpg'
  }
}

function Product34_ChangeType2() {
  const Color = document.getElementById('product34-color-text').innerHTML;
  const sizeElement = document.getElementById('product34-size');

  document.getElementById('product34-cost').innerHTML = '1499';
  document.getElementById('product34-cost').setAttribute('value' ,'1499');
  sizeElement.innerHTML = 'Charger + Cable';
  sizeElement.setAttribute('value', '1499');

  if (Color === 'White') {
      document.getElementById('product34-img').src = 'images-2/product34-1-2.jpg'
  }else if (Color === 'Black') {
    document.getElementById('product34-img').src = 'images-2/product34-2-2.jpg'
  }
}

function Product34_ImageChange1() {
  const Price = document.getElementById('product34-cost').innerHTML;

  document.getElementById('product34-color-text').innerHTML = 'White'

  if (Price === '999') {
    document.getElementById('product34-img').src = 'images-2/product34-1-1.jpg';
  }else if (Price === '1499') {
    document.getElementById('product34-img').src = 'images-2/product34-1-2.jpg';
  }
}

function Product34_ImageChange2() {
  const Price = document.getElementById('product34-cost').innerHTML;

  document.getElementById('product34-color-text').innerHTML = 'Black'

  if (Price === '999') {
    document.getElementById('product34-img').src = 'images-2/product34-2-1.jpg';
  }else if (Price === '1499') {
    document.getElementById('product34-img').src = 'images-2/product34-2-2.jpg';
  }
}


//---Add to Cart---

function Storage() {
  const cartCountElement = document.querySelector('.cart-count');

  if (cartCountElement) {
    let Cart = parseInt(localStorage.getItem('Cart_Quantity')) || 0;
    cartCountElement.innerHTML = Cart.toString();
  }
}

Storage();

function Product_Add_to_Cart(Check_Img_source, Add_text, ValueId) {
  const image = document.getElementById(Check_Img_source);
  const txt = document.getElementById(Add_text);

  const Count = parseInt(document.querySelector('.cart-count').innerHTML);
  let Quantity;

  if (ValueId) {
    Quantity = parseInt(document.getElementById(ValueId).value);
  } else {
    Quantity = 1;
  }
  document.querySelector('.cart-count').innerHTML = Count + Quantity;


  image.src = 'images/checkmark.png';
  txt.innerHTML = 'Added';

  setTimeout(function() {
  image.src = '';
  txt.innerHTML = '';
  },2000);
}


let products_Array = [];

function Add_Product_Details_to_Cart(imageId, infoId, costId, product_color, product_size = null, product_quantity = null) {
    const img = document.getElementById(imageId);
    const image = img.getAttribute('src')
    const info = document.getElementById(infoId).innerHTML;
    const cost = document.getElementById(costId).innerHTML;
    const price = parseInt(document.getElementById(costId).getAttribute('value'));
    const color_element = document.getElementById(product_color).innerHTML;

    let quantity;
    let size_element;
    let size;
    let color;

    color = color_element;

    if (product_quantity) {
      qty_element = document.getElementById(product_quantity);
      quantity = parseInt(qty_element.value);
    }else if (!product_quantity) {
      quantity = 1;
    }

    if (product_size) {
      size_element = document.getElementById(product_size)
      size = `( ${color}, ${size_element.value})`;
    }else if (!product_size) {
      size = ( `${color}` );
    }
    let found = false;

    let storedProducts = JSON.parse(localStorage.getItem('Products_Data')) || [];

    for (const item of storedProducts) {
      if (item.image === image && item.value === price && item.size === size) {
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

  localStorage.setItem('Products_Data', JSON.stringify(storedProducts));
}


function searchProducts() {
  var searchInput = document.getElementById('searchInput').value.toLowerCase();
  var productDivs = document.querySelectorAll('.home-inner-grid-div');
  let Element1 = document.querySelectorAll('.no-search-result');
  let Element2 = document.querySelector('.Bottom-div');

  let Found = false;
  
  productDivs.forEach(function(productDiv) {
    var productTitle = productDiv.querySelector('.product-info-div p').innerText.toLowerCase();

    if (productTitle.includes(searchInput)) {
      productDiv.style.display = 'block';
      Found = true;
    } else {
      productDiv.style.display = 'none';
    }
  });

  if (!Found) {
    Element1.forEach(function(element) {
      element.classList.add('no-search-result-found');
    });
    Element2.classList.add('Bottom_Class');
  }
}