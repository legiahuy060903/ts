import { getData } from '../dist/package.js';
const btnLogin = document.getElementById('BtnLogin');
const username = document.getElementById('username');
const password = document.getElementById('password');
const mes = document.getElementById('mes');
btnLogin.addEventListener('click', e => {
    e.preventDefault();
    validateInputs();
});
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};
const validateInputs = async () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if (usernameValue === '') {
        setError(username, '* Username is required');
    }
    else {
        setSuccess(username);
    }
    if (passwordValue === '') {
        setError(password, '* Password is required');
    }
    else if (passwordValue.length < 4) {
        setError(password, '* Password must be at least 4 character.');
    }
    else {
        setSuccess(password);
    }
    if (usernameValue !== '' && passwordValue !== '') {
        const listUser = await getData('http://localhost:3333/users');
        const user = listUser.find(item => {
            return item.username === username.value && item.pass === password.value;
        });
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user.username));
            mes.innerText = "Đăng nhập thành công";
            setTimeout(() => {
                mes.innerText = "";
                document.getElementById('formLogin').reset();
            }, 2000);
        }
        else {
            mes.innerText = "Không tìm thấy tài khoản trên";
            setTimeout(() => {
                mes.innerText = "";
                document.getElementById('formLogin').reset();
            }, 3000);
        }
    }
};
