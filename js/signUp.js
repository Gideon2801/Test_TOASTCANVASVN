let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
let btnsignUp = document.getElementById("btnsignUp")
let btnShowHide = document.getElementById("showHide")
let checkbox = document.getElementById("check")
let show = false

const checkInputIsEmpty = (email, password, checked) => {
    if (email == "" || password == "" || checked == false)
        return true
    else return false
}

btnShowHide.addEventListener("click", () => {
    show = !show
    if (show) inputPassword.type = 'text'
    else inputPassword.type = 'password'
})

inputEmail.addEventListener("focus", () => {
    let messSuggest = document.getElementById("suggest")
    if (inputEmail.value == "") {
        messSuggest.style.display = 'block'
        setTimeout(() => {
            messSuggest.style.display = 'none'
        }, 2000)
    }

})

inputEmail.addEventListener("change", () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = inputEmail.value
    let password = inputPassword.value
    let checked = checkbox.checked
    if (email == "") {
        document.querySelector('.messError').style.display = 'none'
        document.querySelector('.checkEmail').style.display = 'none'
    }
    if (emailPattern.test(email)) {
        document.querySelector('.messError').style.display = 'none'
        document.querySelector('.checkEmail').style.display = 'flex'
        if (!checkInputIsEmpty(email, password, checked)) btnsignUp.disabled = false
        else btnsignUp.disabled = true
    } else {
        document.querySelector('.messError').style.display = 'flex'
        document.querySelector('.checkEmail').style.display = 'none'
    }
})

inputPassword.addEventListener("change", () => {
    let email = inputEmail.value
    let password = inputPassword.value
    let checked = checkbox.checked
    const suggestPass = document.getElementById('suggestPass');

    const lengthCriteria = password.length >= 8;
    const lowercaseCriteria = /[a-z]/.test(password);
    const uppercaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

    let strength = 0;

    if (lengthCriteria) strength++;
    if (lowercaseCriteria) strength++;
    if (uppercaseCriteria) strength++;
    if (numberCriteria) strength++;
    if (specialCharCriteria) strength++;

    if (strength === 5) {
        suggestPass.innerHTML = `
        <svg width="12" height="8.571428571428571" viewBox="0 0 14 10">
        <path fill="#C8CF2D" fill-rule="evenodd"
            d="M5 10 0 5.192l1.4-1.346L5 7.308 12.6 0 14 1.346z"></path>
        </svg>
        Looks good!`;
        suggestPass.style.color = "rgb(118, 118, 118)";
        if (!checkInputIsEmpty(email, password, checked)) btnsignUp.disabled = false
        else btnsignUp.disabled = true
    } else {
        suggestPass.innerHTML = `<svg width="9" height="9" viewBox="0 0 12 12">
                                <path fill="#EE6723" fill-rule="evenodd"
                                    d="M6 3.898L2.317.215c-.282-.282-.759-.284-1.052.01l-1.04 1.04c-.298.298-.298.764-.01 1.052L3.898 6 .215 9.683c-.282.282-.284.759.01 1.052l1.04 1.04c.298.298.764.298 1.052.01L6 8.102l3.683 3.683c.282.282.759.284 1.052-.01l1.04-1.04c.298-.298.298-.764.01-1.052L8.102 6l3.683-3.683c.282-.282.284-.759-.01-1.052l-1.04-1.04c-.298-.298-.764-.298-1.052-.01L6 3.898z">
                                </path>
                            </svg>
                            Password too weak: This is a very common password`;
        suggestPass.style.color = "red";
    }
})

checkbox.addEventListener("change", ()=>{
    let email = inputEmail.value
    let password = inputPassword.value
    let checked = checkbox.checked
    if (!checkInputIsEmpty(email, password, checked)) btnsignUp.disabled = false
    else btnsignUp.disabled = true
})

btnsignUp.addEventListener("click", () => {
    let users = JSON.parse(localStorage.getItem("users")) || []
    let email = inputEmail.value
    let password = inputPassword.value

    let user = users.filter((user) => user.email == email)
    if (user.length > 0){
        document.querySelector('.checkEmail').style.display = 'none'
        let error = document.querySelector('.messError')
        let errorMess = document.querySelector('.messError p')
        errorMess.innerText = "Email address is already in use"
        error.style.display = 'flex'
    }
    else {
        users.push({email: email, password: password})
        localStorage.setItem("users", JSON.stringify(users))
        window.location.href = "../html/login.html"
    }
})