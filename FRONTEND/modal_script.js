const loginModal = document.getElementById('id01');
const signupModal = document.getElementById('id02');

window.addEventListener('click', (event) => {
    if (event.target.classList.contains("modal")) {
        event.target.classList.remove("show");
    }
});

function showModal() {
    loginModal.classList.add('show');
}

function hideModal() {
    loginModal.classList.remove('show');
    signupModal.classList.remove('show');
}

function modalChange() {
    if (loginModal.classList.contains('show')) {
        loginModal.classList.remove('show');
        signupModal.classList.add('show');
    } else if (signupModal.classList.contains('show')) {
        signupModal.classList.remove('show');
        loginModal.classList.add('show');
    }
}