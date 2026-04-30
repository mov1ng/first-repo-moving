let isLogin = false;

function updateTime() {
    let now = new Date();
    document.getElementById("time").innerText = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

const deerIcon = document.getElementById('deerIcon');
deerIcon.addEventListener('click', () => {
    deerIcon.classList.add('clicked');
    setTimeout(() => deerIcon.classList.remove('clicked'), 400);
});

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mask = document.getElementById('mask');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mask.classList.toggle('active');
});
mask.addEventListener('click', () => {
    sidebar.classList.remove('active');
    mask.classList.remove('active');
});

function initMenuState() {
    const disableMenus = document.querySelectorAll('.sidebar a.disabled');
    const githubBtn = document.querySelector('.links a.disabled');
    const myAvatar = document.querySelector('.myAvatar');
    const guestAvatar = document.querySelector('.guestAvatar');
    const nickName = document.querySelector('.nickName');
    const descTxt = document.querySelector('.descTxt');

    if (isLogin) {
        disableMenus.forEach(i => i.classList.remove('disabled'));
        githubBtn.classList.remove('disabled');
        myAvatar.style.display = "block";
        guestAvatar.style.display = "none";
        nickName.innerText = "moving";
        descTxt.innerText = "白城师范学院 · 计算机科学与技术 23级";
    } else {
        disableMenus.forEach(i => i.classList.add('disabled'));
        githubBtn.classList.add('disabled');
        myAvatar.style.display = "none";
        guestAvatar.style.display = "block";
        nickName.innerText = "";
        descTxt.innerText = "";
    }
}

const loginMask = document.getElementById('loginMask');
const loginClose = document.getElementById('loginClose');
const loginTabList = document.querySelectorAll('.login-tab span');
const loginTab = document.getElementById('loginTab');
const regTab = document.getElementById('regTab');
const loginBtn = document.getElementById('loginBtn');

document.querySelector('.link-btn').addEventListener('click', function (e) {
    e.preventDefault();
    loginMask.classList.add('show');
});

loginClose.addEventListener('click', () => {
    loginMask.classList.remove('show');
});

loginMask.addEventListener('click', function (e) {
    if (e.target === loginMask) {
        loginMask.classList.remove('show');
    }
});

loginTabList.forEach(item => {
    item.addEventListener('click', function () {
        loginTabList.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        if (this.dataset.tab === 'login') {
            loginTab.classList.add('show');
            regTab.classList.remove('show');
        } else {
            loginTab.classList.remove('show');
            regTab.classList.add('show');
        }
    });
});

function initLoginState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        isLogin = true;
        document.querySelector('.link-btn').innerText = "已登录";
    } else {
        isLogin = false;
        document.querySelector('.link-btn').innerText = "注册 / 登录";
    }
    initMenuState();
}
initLoginState();

document.querySelector('#regTab .login-btn').addEventListener('click', function () {
    const inputs = document.querySelectorAll('#regTab input');
    const username = inputs[0].value.trim();
    const pwd = inputs[1].value;
    const pwd2 = inputs[2].value;

    if (!username || !pwd || !pwd2) return alert("请填写完整信息");
    if (pwd !== pwd2) return alert("两次密码不一致");
    if (pwd.length < 6) return alert("密码至少6位");

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) return alert("账号已存在");

    users.push({ username, pwd });
    localStorage.setItem('users', JSON.stringify(users));
    alert("注册成功！请登录");
    document.querySelector('.login-tab span[data-tab="login"]').click();
    inputs.forEach(i => i.value = '');
});

document.getElementById('loginBtn').addEventListener('click', function () {
    const inputs = document.querySelectorAll('#loginTab input');
    const username = inputs[0].value.trim();
    const pwd = inputs[1].value;

    if (!username || !pwd) return alert("请输入账号密码");

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.pwd === pwd);
    if (!user) return alert("账号或密码错误");

    localStorage.setItem('currentUser', JSON.stringify(user));
    isLogin = true;
    document.querySelector('.link-btn').innerText = "已登录";
    loginMask.classList.remove('show');
    initMenuState();
    inputs.forEach(i => i.value = '');
});

document.querySelector('.link-btn').addEventListener('click', function (e) {
    if (isLogin) {
        e.preventDefault();
        if (confirm("确定退出登录吗？")) {
            localStorage.removeItem('currentUser');
            isLogin = false;
            document.querySelector('.link-btn').innerText = "注册 / 登录";
            initMenuState();
        }
    }
});
