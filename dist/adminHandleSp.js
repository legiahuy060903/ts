var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getData } from '../dist/package.js';
const input = document.getElementById('file-input');
const checkedBoxes = document.querySelectorAll('input[name=mausac]');
const sizeAll = document.querySelectorAll('input[name=price]');
const renderBrand = async () => {
    const data = await getData(`http://localhost:3333/category`);
    let kq = data
        .map((item) => {
        return `
            <option value="${item.id}">${item.name}</option>
        `;
    })
        .join('');
    document.getElementById('brand').insertAdjacentHTML('beforeend', kq);
};
renderBrand();
const createEleImg = (src) => {
    let box = document.querySelector('.boxImg');
    let listAnh = src
        .map((item, index) => {
        return `<img src="${item}" class="anhReview" id="img-preview-${++index}"> `;
    })
        .join('');
    box.innerHTML = listAnh;
};
let kqColor = [];
function mau() {
    return function (_target, _propertyKey, descriptor) {
        checkedBoxes.forEach((element, index) => {
            let tenmau = element.value;
            let mau = {
                [tenmau]: {
                    isCheck: false,
                },
            };
            kqColor.push(mau);
            element.addEventListener('change', (e) => {
                if (e.target.checked == true) {
                    let name = e.target.value;
                    if (kqColor[index].hasOwnProperty(name)) {
                        kqColor[index][name].isCheck = !kqColor[index][name].isCheck;
                    }
                }
                else {
                    let name = e.target.value;
                    if (kqColor[index].hasOwnProperty(name)) {
                        kqColor[index][name].isCheck = !kqColor[index][name].isCheck;
                    }
                }
            });
            descriptor.value = function () {
                return kqColor;
            };
        });
    };
}
function checkNull(ele) {
    return function (target, _propertyKey, descriptor) {
        let val = document.getElementById(`${ele}`);
        descriptor.value = function () {
            return val.value;
        };
    };
}
class themSp {
    constructor() {
        this.arrImg = [];
        this.arrColor = [];
        this.arrSize = {};
        this.nameBrand = '';
        this.name = '';
        this.handleBrand = () => {
            let brand = document.getElementById('brand');
            let nameBrand = brand.options[brand.selectedIndex].text;
            let id = +brand.value;
            this.category = id;
            this.nameBrand = nameBrand;
            return this.nameBrand;
        };
        this.handSize = () => {
            let ISize = {};
            const size40 = document.getElementById('40');
            const size41 = document.getElementById('41');
            const size42 = document.getElementById('42');
            const size43 = document.getElementById('43');
            const size44 = document.getElementById('44');
            const size45 = document.getElementById('45');
            if (size40.value != null || size41.value || size42.value || size43.value || size44.value || size45.value) {
                for (let i = 40; i < 46; i++) {
                    const val = +document.getElementById(`${i}`).value;
                    if (val) {
                        this.arrSize = Object.assign(Object.assign({}, this.arrSize), { [`${i}`]: val });
                    }
                    else {
                        document.getElementById(`${i}`).setAttribute('placeholder', 'Vui lòng nhập giá');
                    }
                }
                ISize = this.arrSize;
                return ISize;
            }
        };
        this.handleImg = () => {
            return new Promise((resolve, _reject) => {
                input.addEventListener('input', (e) => {
                    if (e.target.files.length) {
                        let listAnh = e.target.files;
                        let kqAnh = [];
                        let loadedCount = 0;
                        for (let i = 0; i < listAnh.length; i++) {
                            const src = URL.createObjectURL(e.target.files[i]);
                            kqAnh.push(src);
                            createEleImg(kqAnh);
                            this.arrImg.push(e.target.files[i].name);
                            const img = new Image();
                            img.onload = () => {
                                loadedCount++;
                                if (loadedCount === listAnh.length) {
                                    resolve(this.arrImg);
                                }
                            };
                            img.src = src;
                        }
                    }
                }, false);
            });
        };
    }
    handLeName() {
        return this.name;
    }
    handleColor() {
        return this.arrColor;
    }
    handleQty() {
        return this.qty;
    }
}
__decorate([
    checkNull('name')
], themSp.prototype, "handLeName", null);
__decorate([
    mau()
], themSp.prototype, "handleColor", null);
__decorate([
    checkNull('quantity')
], themSp.prototype, "handleQty", null);
const getDataColor = (color) => {
    let data = color
        .filter((item) => {
        let key = Object.keys(item).join('');
        return item[key].isCheck == true;
    })
        .map((item) => {
        return Object.keys(item).join('');
    });
    return data;
};
const h = async () => {
    let product = new themSp();
    let arrImg = await product.handleImg().then(data => data);
    const btnSubmit = document.querySelector('.btnSubmit');
    btnSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        let name = product.handLeName();
        let brand = product.handleBrand();
        let arrColor = product.handleColor();
        let arrSize = product.handSize();
        let qty = product.handleQty();
        let color = getDataColor(arrColor);
        console.log(arrSize);
        let data = {
            'name': name,
            'image': arrImg,
            'brand': brand,
            "color": color,
            "price": arrSize,
            "quantity": +qty,
        };
        await fetch("http://localhost:3333/product", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        })
            .then((res) => {
            let liveToast = document.querySelector("#liveToast");
            const toast = new bootstrap.Toast(liveToast, {
                delay: 5000,
                autohide: true
            });
            toast.show();
        })
            .catch(function (res) { console.log(res); });
    });
};
h();
