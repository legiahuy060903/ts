import { status, getData, format, ICart, checkLogin } from '../dist/package.js';
const load = document.querySelector("#loadListCart") as HTMLElement;

const renderCart = async (): Promise<void> => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart) {
        let tt = 0;
        let data = cart?.map((item, index) => {
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

    const btnQty: NodeListOf<HTMLElement> = document.querySelectorAll('#handleQuantity');
    const totalItemCart: HTMLCollectionOf<Element> = document.getElementsByClassName('totalItemCart');
    btnQty.forEach(e => {
        e.addEventListener('click', (event): void => {
            event.preventDefault();
            let id = e.getAttribute('id-sp');
            let qty: number = parseInt((document.getElementById(`qty-${id}`) as HTMLInputElement).value);
            let idTotal = (document.getElementById(`total-${id}`)) as HTMLElement;
            let newqty = (document.getElementById(`qty-${id}`) as HTMLInputElement);
            let cartLocal = JSON.parse(localStorage.getItem("cart")) || [];
            const price = idTotal.getAttribute('price');
            if (e.classList.contains('btn-minus')) {
                if (qty > 0) {
                    newqty.setAttribute("value", `${--qty}`);

                    idTotal.innerText = (+(price) * (qty--)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                } else {
                    newqty.setAttribute("value", `${0}`);
                    idTotal.innerText = (+(price) * (0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            } else {
                if (qty < 10) {
                    newqty.setAttribute("value", `${++qty}`);
                    idTotal.innerText = (+(price) * (qty++)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                }
            }
            let newLocalCart: ICart[] = cartLocal.map(item => {
                if (+item.id === +id) {
                    item.quantity = newqty.value;
                }
                return item;
            })
            localStorage.setItem("cart", JSON.stringify(newLocalCart));
        })
    })

    let btnMode: NodeListOf<HTMLElement> = document.querySelectorAll('.btn-move');

    btnMode.forEach(e => {
        e.addEventListener('click', (event: Event): void => {
            event.preventDefault();
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let id: number = +e.getAttribute('id-cart');
            let listCart: ICart[] = cart.filter(item => {
                return item.id !== id;
            })
            localStorage.setItem("cart", JSON.stringify(listCart));
            renderCart()
        })
    });
};
renderCart();
const checkLoginPay = () => {
    const btnCheckout = document.getElementById('checkOut') as HTMLElement;
    btnCheckout.addEventListener('click', () => {
        console.log(checkLogin())
        if (!checkLogin()) {
            (window as Window).location = '../views/login.html';
        } else {
            (window as Window).location = '../views/checkout.html';
        }
    })
}
checkLoginPay();
