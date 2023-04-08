
import { status, getData, format, addtocart } from '../dist/package.js';

const url = window.location.search;
const id = url.substring(url.lastIndexOf("=") + 1) || 1;

interface ICart {
    id: number,
    idSp: number,
    name: string,
    image: string,
    color: string,
    price: number,
    quantity: number,
    size: number
}
const d = async () => {
    let data = await getData(`http://localhost:3333/product/${id}`);

    document.getElementById('nameProductDetail').innerText = data.name
    document.getElementById('priceProductDetail').innerText = format(data.price[40])
    previewDetailProduct(data.image);
    contentSize(data);
    contentColor(data);
    submitCart(data);

    const cartElement = document.getElementById("addtocart") as HTMLElement;
    const inputData = document.getElementById('dataCart') as HTMLInputElement;
    cartElement?.addEventListener('click', () => {
        let id: number = +(inputData.getAttribute('data-id'));
        let name: string = inputData.getAttribute('data-name');
        let img: string = inputData.getAttribute('data-img');
        let color: string = inputData.getAttribute('data-color');
        let price = +(inputData.getAttribute('data-price'));
        let qty: number = +(inputData.getAttribute('data-qty'));
        let size: number = +(inputData.getAttribute('data-size'));
        let arrCart: ICart = {
            id: 0, idSp: id, name, image: img, color, price, quantity: qty, size
        }
        addtocart(arrCart);
        (window as Window).location = '../views/cart.html';
    })
};
d();
const previewDetailProduct = (data) => {
    let img = data.map((item, b) => {
        if (b === 0) {
            return `<div class="carousel-item active slide-img">
                        <img class="w-100"  src="../public/images/${item}" alt="Image">
                    </div>`;
        } else {
            return `<div class="carousel-item slide-img">
                        <img class="w-100 "  src="../public/images/${item}" alt="Image">
                    </div>`;
        }
    });
    document.querySelector("#preview").innerHTML = img.join(" ");
};
const contentColor = (data) => {
    let color: string[] = data.color.map((val, index) => {
        return `<div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="color-${index + 1
            }" name="color" value="${val}">
                        <label class="custom-control-label" for="color-${index + 1
            }">${val}</label>
                    </div>`;
    });
    document.querySelector("#load_color").innerHTML = color.join('');
};
const contentSize = (data) => {
    let arrSize: string[] = Object.keys(data.price)
    let sizedata: string[] = arrSize.map((val, index) => {
        return ` <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" class="custom-control-input" id="size-${index + 1
            }" name="size" value="${val}">
                        <label class="custom-control-label" for="size-${index + 1
            }">${val}</label>
                    </div> `;
    });
    document.querySelector("#load-size").innerHTML = sizedata.join("");
};



const btn = document.querySelector("#loadButtonCart") as HTMLElement;

const submitCart = async (data) => {
    const { id, name, image, price } = data;
    let qty: number = 1;
    let color: string = "Đen";
    let size = 40;
    const gia = document.querySelector("#priceProductDetail");

    const renderBtn = () => {
        let html: string = `<div class="input-group quantity mr-3" style="width: 130px;" >
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
        let newqty = (document.getElementById('qty') as HTMLInputElement);
        const btnQty: NodeListOf<HTMLElement> = document.querySelectorAll('#handleQuantity');
        btnQty.forEach(e => {
            e.addEventListener('click', (event): void => {
                event.preventDefault();
                if (e.classList.contains('btn-minus')) {
                    if (qty > 0) {
                        newqty.setAttribute("value", `${--qty}`);
                        dataCart.setAttribute('data-qty', `${qty}`);
                    } else {
                        newqty.setAttribute("value", `${0}`);
                        dataCart.setAttribute('data-qty', `${0}`);
                    }
                } else {
                    if (qty < 10) {
                        newqty.setAttribute("value", `${++qty}`);
                        dataCart.setAttribute('data-qty', `${qty}`);
                    }
                }
            })
        })
    };
    await renderBtn();
    const dataCart = document.getElementById('dataCart') as HTMLElement;
    const findSelected = (event): void => {
        event.preventDefault()
        let selected = (document.querySelector('input[name="size"]:checked') as HTMLInputElement).value;
        for (const [key, value] of Object.entries(data.price)) {
            if (key === selected) {
                gia.textContent = format(value);
                dataCart.setAttribute('data-price', `${value}`);
                dataCart.setAttribute('data-size', `${key}`);
            }
        }
    };
    let sizeList: NodeListOf<HTMLElement> = document.getElementsByName("size");
    sizeList.forEach((e) => {
        e.addEventListener("change", findSelected);
    });

    let mau: NodeListOf<HTMLElement> = document.getElementsByName("color");
    mau.forEach((e) => {
        e.addEventListener("click", function (event) {
            event.preventDefault()
            // let newColor = (this as HTMLInputElement).value;
            let newColor: string = (document.querySelector('input[name="color"]:checked') as HTMLInputElement).value;
            color = newColor;
            dataCart.setAttribute('data-color', newColor);
        });
    });
}


