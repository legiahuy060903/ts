(() => {
   let nav: string = `
    <nav class="navbar navbar-expand-lg custom_nav-container ">
               <a class="navbar-brand" href="./index.html"><img src="../public/images/HUYLG.png" width="70px" /></a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class=""> </span>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav">
                     <li class="nav-item ">
                        <a class="nav-link" href="./index.html">Home <span class="sr-only">(current)</span></a>
                     </li>
                     <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button"
                           aria-haspopup="true" aria-expanded="true"> <span class="nav-label">Pages <span
                                 class="caret"></span></a>
                        <ul class="dropdown-menu">
                           <li><a href="./detail.html">Detail</a></li>
                           <li><a href="./cart.html">Cart</a></li>
                        </ul>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="./product.html">Products</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="./blog_list.html">Blog</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="./contact.html">Contact</a>
                     </li>
                     <li class="nav-item ml-5">
                        <a class="nav-link" href="./cart.html">
                           <i class='fa fa-cart-plus ' aria-hidden="true"></i>
                        </a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="./login.html">
                           <i class='fa fa-user-circle'></i>
                        </a>
                     </li>
                  </ul>
               </div>
            </nav>
    `;
   document.getElementById('menu').innerHTML = nav;
})()