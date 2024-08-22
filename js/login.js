let inputEmail = document.getElementById("email")
let inputPassword = document.getElementById("password")
let btnLogin = document.getElementById("btnLogin")
let btnShowHide = document.getElementById("showHide")
let show = false

const checkInputIsEmpty = (email, password) =>{
    if (email == "" || password == "")
        return true
    else return false
}

btnShowHide.addEventListener("click", ()=>{
    show = !show
    if (show) inputPassword.type = 'text'
    else inputPassword.type = 'password'
})

inputEmail.addEventListener("change", ()=>{
    let email = inputEmail.value
    let password = inputPassword.value
    if (!checkInputIsEmpty(email, password)) btnLogin.disabled = false 
    else btnLogin.disabled = true 
})

inputPassword.addEventListener("change", ()=>{
    let email = inputEmail.value
    let password = inputPassword.value
    if (!checkInputIsEmpty(email, password)) btnLogin.disabled = false 
    else btnLogin.disabled = true 
})

btnLogin.addEventListener("click", ()=>{
    let users = JSON.parse(localStorage.getItem("users")) || []
    let email = inputEmail.value
    let password = inputPassword.value

    let user = users.filter((user)=> user.email == email && user.password == password)
    if (user.length > 0) 
        window.location.href = "../html/home.html"
    else document.querySelector(".error").style.display = 'block'
})