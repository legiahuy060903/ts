import { getData, format, addtocart } from '../dist/package.js';
const url = window.location.search;
const id = url.substring(url.lastIndexOf("=") + 1) || 1;
const d = async () => {
    let data = await getData(`http://localhost:3333/product/${id}`);
    document.getElementById('nameProductDetail').innerText = data.name;
    document.getElementById('priceProductDetail').innerText = format(data.price[40]);
    previewDetailProduct(data.image);
    contentSize(data);
    contentColor(data);
    submitCart(data);
    const cartElement = document.getElementById("addtocart");
    const inputData = document.getElementById('dataCart');
    cartElement === null || cartElement === void 0 ? void 0 : cartElement.addEventListener('click', () => {
        let id = +(inputData.getAttribute('data-id'));
        let name = inputData.getAttribute('data-name');
        let img = inputData.getAttribute('data-img');
        let color = inputData.getAttribute('data-color');
        let price = +(inputData.getAttribute('data-price'));
        let qty = +(inputData.getAttribute('data-qty'));
        let size = +(inputData.getAttribute('data-size'));
        let arrCart = {
            id: 0, idSp: id, name, image: img, color, price, quantity: qty, size
        };
        addtocart(arrCart);
        window.location = '../views/cart.html';
    });
};
d();
const previewDetailProduct = (data) => {
    let img = data.map((item, b) => {
        if (b === 0) {
            return `<div class="carousel-item active slide-img">
                        <img class="w-100"  src="../public/images/${item}" alt="Image">
                    </div>`;
        }
        else {
            return `<div class="carousel-item slide-img">
                        <img class="w-100 "  src="../public/images/${item}" alt="Image">
                    </div>`;
        }
    });
    document.querySelector("#preview").innerHTML = img.join(" ");
};
const contentColor = (data) => {
    let color = data.color.map((val, index) => {
        return `<div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="color-${index + 1}" name="color" value="${val}">
                        <label class="custom-control-label" for="color-${index + 1}">${val}</label>
                    </div>`;
    });
    document.querySelector("#load_color").innerHTML = color.join('');
};
const contentSize = (data) => {
    let arrSize = Object.keys(data.price);
    let sizedata = arrSize.map((val, index) => {
        return ` <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="size-${index + 1}" name="size" value="${val}">
                        <label class="custom-control-label" for="size-${index + 1}">${val}</label>
                    </div> `;
    });
    document.querySelector("#load-size").innerHTML = sizedata.join("");
};
const btn = document.querySelector("#loadButtonCart");
const submitCart = async (data) => {
    const { id, name, image, price } = data;
    let qty = 1;
    let color = "Đen";
    let size = 40;
    const gia = document.querySelector("#priceProductDetail");
    const renderBtn = () => {
        let html = `<div class="input-group quantity mr-3" style="width: 130px;" >
                    <div class="input-group-btn">
                        <button class="btn cssColor btn-minus" id="handleQuantity">
                            <i class="fa fa-minus text-light"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control bg-light border-0 text-center" id="qty" value="${qty}">
                    <div class="input-group-btn">
                        <button class="btn cssColor btn-plus" id="handleQuantity">
                            <i class="fa fa-plus text-light"></i>
                        </button>
                    </div>
                </div>
            <button class="btn cssColor text-light" id="addtocart">
            <input type="hidden" id="dataCart" 
                data-id="${id}" data-name="${name}" data-img="${image[0]}" data-color="${color}"
                 data-price="${price[40]}" data-qty="${qty}" data-size="${size}" />
            <i class="fa fa-shopping-cart mr-1" ></i> Add To  Cart</button>`;
        btn.innerHTML = html;
        let newqty = document.getElementById('qty');
        const btnQty = document.querySelectorAll('#handleQuantity');
        btnQty.forEach(e => {
            e.addEventListener('click', (event) => {
                event.preventDefault();
                if (e.classList.contains('btn-minus')) {
                    if (qty > 0) {
                        newqty.setAttribute("value", `${--qty}`);
                        dataCart.setAttribute('data-qty', `${qty}`);
                    }
                    else {
                        newqty.setAttribute("value", `${0}`);
                        dataCart.setAttribute('data-qty', `${0}`);
                    }
                }
                else {
                    if (qty < 10) {
                        newqty.setAttribute("value", `${++qty}`);
                        dataCart.setAttribute('data-qty', `${qty}`);
                    }
                }
            });
        });
    };
    await renderBtn();
    const dataCart = document.getElementById('dataCart');
    const findSelected = (event) => {
        event.preventDefault();
        let selected = document.querySelector('input[name="size"]:checked').value;
        for (const [key, value] of Object.entries(data.price)) {
            if (key === selected) {
                gia.textContent = format(value);
                dataCart.setAttribute('data-price', `${value}`);
                dataCart.setAttribute('data-size', `${key}`);
            }
        }
    };
    let sizeList = document.getElementsByName("size");
    sizeList.forEach((e) => {
        e.addEventListener("change", findSelected);
    });
    let mau = document.getElementsByName("color");
    mau.forEach((e) => {
        e.addEventListener("click", function (event) {
            event.preventDefault();
            let newColor = document.querySelector('input[name="color"]:checked').value;
            color = newColor;
            dataCart.setAttribute('data-color', newColor);
        });
    });
};
