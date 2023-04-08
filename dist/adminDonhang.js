import { status, getData, format } from '../dist/package.js';
const getList = async () => {
    let data = await getData(`http://localhost:3333/orders`);
    let result = data.map(item => {
        return `<tr><td>GD-${item.id}-DE</td>
                <td>${item.idSp}</td>
                <td>${item.cus_name}</td>
                <td>${item.quantity}</td>
                <td>${format(item.total)}</td>
                <td>${status(item.status)}</td>
                <td class="d-flex justify-content-start align-items-center">
                    <i class='bx bx-edit h3 icon btn-edit'></i>
                    <i class='bx bx-trash-alt h4 icon ms-3 btn-delete'></i>
                </td></tr>`;
    });
    document.getElementById('loadBill').innerHTML = result.join('');
};
getList();
