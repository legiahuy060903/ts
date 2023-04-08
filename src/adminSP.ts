
import { status, getData, format } from '../dist/package.js';

const load = document.getElementById('loadProduct') as HTMLElement;

const getList = async (): Promise<void> => {
    let data = await getData(`http://localhost:3333/product`);
    let result: string[] = data.map(item => {
        return `<tr><td>${item.id}</td>
                <td>${item.name}</td>
                <td><img src="../public/images/${item.image[0]}" class="anhsp" ></td>
                <td>${item.quantity}</td>
                <td>${item.brand}</td>
                <td>${item.price[40]}</td>
                <td class="d-flex justify-content-start align-items-center">
                    <i class='bx bx-edit h3 icon btn-edit' id-Sp="${item.id}"></i>
                    <i class='bx bx-trash-alt h4 icon ms-3 btn-delete' id-Sp="${item.id}"></i>
                </td></tr>`;
    });
    load.innerHTML = result.join('');
};
getList();