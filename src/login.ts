import { IUser, getData, format, ICart } from '../dist/package.js';


const btnLogin = document.getElementById('BtnLogin') as HTMLElement;
const username = document.getElementById('username') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const mes = document.getElementById('mes') as HTMLElement;

btnLogin.addEventListener('click', e => {
    e.preventDefault();
    validateInputs();
});
const setError = (element: HTMLElement, message: string) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error') as HTMLElement;

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}
const setSuccess = (element: HTMLElement) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error') as HTMLElement;
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const validateInputs: () => Promise<void> = async () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if (usernameValue === '') {
        setError(username, '* Username is required');
    } else {
        setSuccess(username);
    }

    if (passwordValue === '') {
        setError(password, '* Password is required');
    } else if (passwordValue.length < 4) {
        setError(password, '* Password must be at least 4 character.');
    } else {
        setSuccess(password);
    }

    if (usernameValue !== '' && passwordValue !== '') {
        const listUser = await getData('http://localhost:3333/users');
        const user = listUser.find(item => {
            return item.username === username.value && item.pass === password.value;
        })
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user.username));
            mes.innerText = "Đăng nhập thành công";


            setTimeout(() => {
                mes.innerText = "";
                (document.getElementById('formLogin') as HTMLFormElement).reset();
            }, 2000);

        } else {
            mes.innerText = "Không tìm thấy tài khoản trên";
            setTimeout(() => {
                mes.innerText = "";
                (document.getElementById('formLogin') as HTMLFormElement).reset();
            }, 3000);
        }
    }

};
