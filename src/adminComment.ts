import { status, getData, format } from '../dist/package.js';

const slit = (str) => {
    let result = str.substr(0, 22)
    return result
}


const getList = async () => {
    let data = await getData(`http://localhost:3333/binhluan`);
    let result: string[] = data.map(item => {
        return `<tr><td>CM-${item.id}-BL</td>
                <td>${item.idSp}</td>
                <td>${item.idUser}</td>
                <td>${slit(item.content)} ...</td>
                <td class="d-flex justify-content-start align-items-center">
                    <i class='bx bx-edit h3 icon btn-edit'></i>
                    <i class='bx bx-trash-alt h4 icon ms-3 btn-delete'></i>
                </td></tr>`;
    });
    document.getElementById('loadComment').innerHTML = result.join('');
};
getList()