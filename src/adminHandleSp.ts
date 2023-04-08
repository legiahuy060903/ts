import { status, getData, format, ICart, checkLogin } from '../dist/package.js';
declare const bootstrap: any;
import { createPopper } from '@popperjs/core';
const input = document.getElementById('file-input');
const checkedBoxes: NodeListOf<Element> = document.querySelectorAll('input[name=mausac]');
const sizeAll: NodeListOf<Element> = document.querySelectorAll('input[name=price]');
interface IColor {
    [color: string]: {
        isCheck: boolean;
    };
}
interface ISize {
    [size: string]: number;
}

interface IProduct {
    name: string;
    image: string[];
    brand: string;
    color: string[];
    price: ISize;
    quantity: number;
}

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
const createEleImg = (src: string[]): void => {
    let box = document.querySelector('.boxImg') as HTMLElement;
    let listAnh: string = src
        .map((item, index) => {
            return `<img src="${item}" class="anhReview" id="img-preview-${++index}"> `;
        })
        .join('');
    box.innerHTML = listAnh;
};
let kqColor: IColor[] = [];
function mau() {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        checkedBoxes.forEach((element, index) => {
            let tenmau = (element as HTMLInputElement).value;
            let mau: IColor = {
                [tenmau]: {
                    isCheck: false,
                },
            };
            kqColor.push(mau);
            element.addEventListener('change', (e: Event) => {
                if ((e.target as HTMLInputElement).checked == true) {
                    let name = (e.target as HTMLInputElement).value;
                    if (kqColor[index].hasOwnProperty(name)) {
                        kqColor[index][name].isCheck = !kqColor[index][name].isCheck;
                    }
                } else {
                    let name = (e.target as HTMLInputElement).value;
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
function checkNull(ele: string) {
    return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        let val = document.getElementById(`${ele}`) as HTMLInputElement;
        descriptor.value = function () {
            return val.value;
        };
    };
}

class themSp {
    arrImg: string[] = [];
    arrColor: IColor[] = [];
    arrSize: ISize = {};
    nameBrand: string = '';
    category: number;
    name: string = '';
    qty: number;

    @checkNull('name')
    handLeName() {
        return this.name;
    }
    handleBrand = () => {
        let brand = document.getElementById('brand') as HTMLSelectElement;
        let nameBrand: string = brand.options[brand.selectedIndex].text;
        let id: number = +brand.value;
        this.category = id;
        this.nameBrand = nameBrand;
        return this.nameBrand;
    };
    @mau()
    handleColor() {
        return this.arrColor;
    }

    handSize = () => {
        let ISize = {};
        const size40 = document.getElementById('40') as HTMLInputElement;
        const size41 = document.getElementById('41') as HTMLInputElement;
        const size42 = document.getElementById('42') as HTMLInputElement;
        const size43 = document.getElementById('43') as HTMLInputElement;
        const size44 = document.getElementById('44') as HTMLInputElement;
        const size45 = document.getElementById('45') as HTMLInputElement;
        if (size40.value != null || size41.value || size42.value || size43.value || size44.value || size45.value) {
            for (let i = 40; i < 46; i++) {
                const val = +(document.getElementById(`${i}`) as HTMLInputElement).value;
                if (val) {
                    this.arrSize = { ...this.arrSize, [`${i}`]: val };
                } else {
                    document.getElementById(`${i}`).setAttribute('placeholder', 'Vui lòng nhập giá');
                }
            }
            ISize = this.arrSize;
            return ISize;
        }
    };

    handleImg = () => {
        return new Promise<string[]>((resolve, _reject) => {
            input.addEventListener(
                'input',
                (e: Event) => {
                    if ((<HTMLInputElement>e.target).files.length) {
                        let listAnh: FileList = (<HTMLInputElement>e.target).files;
                        let kqAnh: string[] = [];
                        let loadedCount = 0;
                        for (let i = 0; i < listAnh.length; i++) {
                            const src = URL.createObjectURL((<HTMLInputElement>e.target).files[i]);
                            kqAnh.push(src);
                            createEleImg(kqAnh);
                            this.arrImg.push((<HTMLInputElement>e.target).files[i].name);

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
                },
                false
            );
        });
    };

    @checkNull('quantity')
    handleQty() {
        return this.qty;
    }
}
const getDataColor = (color) => {
    let data = color
        .filter((item) => {
            let key: string = Object.keys(item).join('');
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
    const btnSubmit = document.querySelector('.btnSubmit') as HTMLElement;
    btnSubmit.addEventListener('click', async (e) => {
        e.preventDefault()
        let name = product.handLeName();
        let brand = product.handleBrand();
        let arrColor = product.handleColor();
        let arrSize: ISize = product.handSize();
        let qty = product.handleQty();
        let color = getDataColor(arrColor);
        console.log(arrSize)
        let data: IProduct = {
            'name': name,
            'image': arrImg,
            'brand': brand,
            "color": color,
            "price": arrSize,
            "quantity": +qty,
        }
        await fetch("http://localhost:3333/product",
            {
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
                toast.show()
            })
            .catch(function (res) { console.log(res) })


    });

};
h();


