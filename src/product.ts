import { status, getData, format, addtocart, ICart, checkLogin } from '../dist/package.js';


const loadProduct = document.getElementById('loadProduct');


const getListPageProDuct: () => Promise<void> = async () => {
    let data = await getData(`http://localhost:3333/product`);
    renderProduct(data);
    handleCart();

};
getListPageProDuct();

const renderProduct = (data: any[]): void => {
    let result: string[] = data.map(item => {
        return `<div class="col-sm-6 col-md-4 col-lg-3">
                    <div class="box">
                        <div class="option_container">
                            <div class="options">
                                <a href="../views/detail.html?id=${item.id}" class="option1">
                                    ${item.name}
                                </a>
                                <a href="" class="option2 btn-addtocart" id="${item.id}">
                                    Buy Now
                                </a>
                            </div>
                        </div>
                        <div class="img-box">
                            <img src="../public/images/${item.image[0]}" alt="">
                        </div>
                        <div class="">
                            <p>
                                ${item.name}
                            </p>
                            <p><i class="fa fa-star" style="color: khaki;"></i>
                            <i class="fa fa-star" style="color: khaki;"></i>
                            <i class="fa fa-star" style="color: khaki;"></i>
                            <i class="fa fa-star" style="color: khaki;"></i>
                            <i class="fa fa-star" style="color: khaki;"></i></p>

                            <h6>
                                ${format(item.price[40])}
                            </h6>
                        </div>
                    </div>
                </div>`;
    });
    loadProduct.innerHTML = result.join('');
}
const handleCart = () => {
    let btnCart: NodeListOf<Element> = document.querySelectorAll('.btn-addtocart');
    btnCart.forEach(e => {
        e.addEventListener('click', async (event) => {
            event.preventDefault();
            let getID = e.getAttribute('id');
            let data = await getData(`http://localhost:3333/product/${getID}`);
            console.log(data)
            const { id, name, image, price } = data;
            let [arrFirst] = Object.entries(price);
            let [size, gia] = arrFirst;
            let arrCart: ICart = {
                id: 0, idSp: id, name, image: image[0], color: 'Trắng', price: gia, quantity: 1, size
            }
            addtocart(arrCart);
            (window as Window).location = '../views/cart.html';
        })
    })
}
