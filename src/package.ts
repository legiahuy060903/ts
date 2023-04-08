const status = (ss): string => {
    let text: string = '';
    if (ss == 0) {
        text = "Đơn hàng mới";
    } else if (ss == 1) {
        text = "Đơn hàng đang giao";
    } else {
        text = "Hoàn tất đơn hàng";
    }
    return text
}
const format = (price) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
const getData = async (url) => {
    return (await fetch(url)).json();
}
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
interface IUser {
    username: string,
    pass: string,
}
const addtocart = (arrCart: ICart) => {
    let cartLocal: ICart[] = JSON.parse(localStorage.getItem("cart")) || [];
    arrCart.id = (+cartLocal.length + 1);
    if (cartLocal.length === 0) {
        cartLocal.push(arrCart);
    }
    else {
        let item = cartLocal.find((item) => {
            return item.idSp === arrCart.idSp && item.color === arrCart.color && item.size === arrCart.size
        });
        if (item) {
            item.quantity++;
        } else {
            cartLocal.push(arrCart);
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartLocal));
};
const checkLogin = () => {
    let user: string = sessionStorage.getItem("user");
    if (user) {
        return true;
    } else {
        return false
    }
}
const ship = (gia: number): (string | number)[] => {
    let mes: string = '';
    let price: number = gia
    if (gia > 10000000) {
        mes = 'Free'
    } else if (gia < 10000000) {
        mes = '1%';
        price = gia * 0.01 + gia
    }
    return [mes, price]
}
const Cat = (text: string): string => {
    let firstSpaceIndex = text.indexOf(" ");
    return text.slice(0, firstSpaceIndex);
}

export { status, getData, addtocart, format, ICart, IUser, checkLogin, ship, Cat }