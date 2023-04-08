import { Cat, format, ship } from '../dist/package.js';
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shipping = document.getElementById('Shipping');
let Total = document.getElementById('Total');
let cartName = document.getElementById('cartName');
const showPrice = () => {
    let tt = 0;
    let sp = '';
    cart.forEach(item => {
        console.log(item);
        sp += `
            <div class="h6 font-weight-medium fon">
            ${Cat(item.name)} (${item.quantity}) - Màu : ${item.color}
            </div>
        `;
        tt += item.quantity * item.price;
    });
    console.log(sp);
    cartName.innerHTML = sp;
    let [phi, price] = ship(tt);
    console.log(phi, price);
    shipping.innerHTML = phi;
    Total.innerHTML = format(price);
};
showPrice();
