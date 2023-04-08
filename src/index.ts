
import { status, getData, format, ICart, addtocart } from '../dist/package.js';



const render = (data) => {
   const loadProduct = document.getElementById('loadProduct') as HTMLElement;
   let result: string[] = data.map(item => {
      return `<div class="col-sm-6 col-md-4 col-lg-4">
               <div class="box">
                  <div class="option_container">
                     <div class="options">
                        <a href="../views/detail.html?id=${item.id}" class="option1 ">
                           ${item.name}
                        </a>
                        <a class="option2 btn-addtocart" id="${item.id}">
                           Buy Now
                        </a>
                     </div>
                  </div>
                  <div class="img-box">
                     <img src="../public/images/${item.image[0]}" alt="">
                  </div>
                  <div class="">
                     <h5>
                        ${item.name}
                     </h5>
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
         const { id, name, image, price } = data;
         let [arrFirst] = Object?.entries(price);
         console.log(arrFirst)
         let [size, gia] = arrFirst;
         let arrCart: ICart = {
            id: 0, idSp: id, name, image: image[0], color: 'Trắng', price: gia, quantity: 1, size
         }
         addtocart(arrCart);
         (window as Window).location = '../views/cart.html';
      })
   })
}
const getListPageProDuct: () => Promise<void> = async () => {
   let data = await getData(`http://localhost:3333/product`);
   render(data);
   handleCart();
};
getListPageProDuct();