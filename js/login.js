const elForm = document.querySelector(".login__form")
const elFormName = document.querySelector(".login__name")
const elFormPassword = document.querySelector(".login__password")

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const nameValue = elFormName.value.trim()
    const passwordValue = elFormPassword.value.trim()

    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            email: nameValue,
            password: passwordValue,
        }),
    }).then((res) => res.json()).then((data) => {
        if(data.token) {
            window.localStorage.setItem('token' , data.token);
            window.location.replace('home.html');
        }
    })
})