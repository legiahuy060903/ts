const status = (ss) => {
    let text = '';
    if (ss == 0) {
        text = "Đơn hàng mới";
    }
    else if (ss == 1) {
        text = "Đơn hàng đang giao";
    }
    else {
        text = "Hoàn tất đơn hàng";
    }
    return text;
};
const format = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
const getData = async (url) => {
    return (await fetch(url)).json();
};
const addtocart = (arrCart) => {
    let cartLocal = JSON.parse(localStorage.getItem("cart")) || [];
    arrCart.id = (+cartLocal.length + 1);
    if (cartLocal.length === 0) {
        cartLocal.push(arrCart);
    }
    else {
        let item = cartLocal.find((item) => {
            return item.idSp === arrCart.idSp && item.color === arrCart.color && item.size === arrCart.size;
        });
        if (item) {
            item.quantity++;
        }
        else {
            cartLocal.push(arrCart);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartLocal));
};
const checkLogin = () => {
    let user = sessionStorage.getItem("user");
    if (user) {
        return true;
    }
    else {
        return false;
    }
};
const ship = (gia) => {
    let mes = '';
    let price = gia;
    if (gia > 10000000) {
        mes = 'Free';
    }
    else if (gia < 10000000) {
        mes = '1%';
        price = gia * 0.01 + gia;
    }
    return [mes, price];
};
const Cat = (text) => {
    let firstSpaceIndex = text.indexOf(" ");
    return text.slice(0, firstSpaceIndex);
};
export { status, getData, addtocart, format, checkLogin, ship, Cat };
