import { format, checkLogin } from '../dist/package.js';
const load = document.querySelector("#loadListCart");
const renderCart = async () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart) {
        let tt = 0;
        let data = cart === null || cart === void 0 ? void 0 : cart.map((item, index) => {
            tt += item.price * item.quantity;
            return `<tr>
                    <td class="ps-2 text-left align-middle">
                    <img src="../public/images/${item.image}" style="width: 50px;">
                    ${item.name} (${item.color}) </td>
                    <td class="align-middle"  > ${format(item.price)}</td>
                    <td class="align-middle">
                        <div class="input-group quantity mx-auto" style="width: 100px;">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-minus" id-sp="${item.id}" id="handleQuantity">
                                    <i class="fa fa-minus" ></i>
                                </button>
                            </div>
                            <input type="text"
                                class="form-control form-control-sm  border-0 text-center" id="qty-${item.id}"
                                value="${item.quantity}">
                            <div class="input-group-btn">
                                <button class="btn btn-sm btn-primary btn-plus" id-sp="${item.id}" id="handleQuantity">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle totalItemCart" id="total-${item.id}" price="${item.price}">${format(item.price * item.quantity)} </td>
                    <td class="align-middle"><button class="btn btn-sm btn-danger btn-move"  id-cart="${item.id}"><i class="fa fa-times"></i></button></td>
                </tr>
        `;
        });
        load.innerHTML = data.join("");
    }
    const btnQty = document.querySelectorAll('#handleQuantity');
    const totalItemCart = document.getElementsByClassName('totalItemCart');
    btnQty.forEach(e => {
        e.addEventListener('click', (event) => {
            event.preventDefault();
            let id = e.getAttribute('id-sp');
            let qty = parseInt(document.getElementById(`qty-${id}`).value);
            let idTotal = (document.getElementById(`total-${id}`));
            let newqty = document.getElementById(`qty-${id}`);
            let cartLocal = JSON.parse(localStorage.getItem("cart")) || [];
            const price = idTotal.getAttribute('price');
            if (e.classList.contains('btn-minus')) {
                if (qty > 0) {
                    newqty.setAttribute("value", `${--qty}`);
                    idTotal.innerText = (+(price) * (qty--)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
                else {
                    newqty.setAttribute("value", `${0}`);
                    idTotal.innerText = (+(price) * (0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            }
            else {
                if (qty < 10) {
                    newqty.setAttribute("value", `${++qty}`);
                    idTotal.innerText = (+(price) * (qty++)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            }
            let newLocalCart = cartLocal.map(item => {
                if (+item.id === +id) {
                    item.quantity = newqty.value;
                }
                return item;
            });
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        });
    });
    let btnMode = document.querySelectorAll('.btn-move');
    btnMode.forEach(e => {
        e.addEventListener('click', (event) => {
            event.preventDefault();
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let id = +e.getAttribute('id-cart');
            let listCart = cart.filter(item => {
                return item.id !== id;
            });
            localStorage.setItem("cart", JSON.stringify(listCart));
            renderCart();
        });
    });
};
renderCart();
const checkLoginPay = () => {
    const btnCheckout = document.getElementById('checkOut');
    btnCheckout.addEventListener('click', () => {
        console.log(checkLogin());
        if (!checkLogin()) {
            window.location = '../views/login.html';
        }
        else {
            window.location = '../views/checkout.html';
        }
    });
};
checkLoginPay();
