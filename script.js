const userName = document.querySelector("#username")
const pass = document.querySelector("#password")
const pass2 = document.querySelector("#password2")
const email = document.querySelector("#email")

const sendBtn = document.querySelector(".send")
const clearBtn = document.querySelector(".clear")

const popup = document.querySelector(".popup")
const closeBtn = document.querySelector(".close")

const showError = (input, msg) => {
    
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector(".error-text")

    formBox.classList.add("error")
    errorMsg.textContent = msg;

}

const clearError = input => {
    const formBox = input.parentElement;
    formBox.classList.remove("error")
}

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.innerText} Musi skladać sie z min. ${min} znaków`)
    }
}

const checkLabel = input => {
   input.forEach( el => {
       if(el.value === "") {
           showError(el, el.placeholder)
       } else {
           clearError(el)
       }
   })
}

const checkPassword = (pass, pass1) => {
    if(pass.value !== pass1.value) {
        showError(pass2, "Hasła do siebie nie pasują!")
    }
}

const checkEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)) {
        clearError(email)
    } else {
        showError(email, "email zawiera niedozwolone znaki!")
    }
}

const checkErrors = (input) => {
    const inputs = document.querySelectorAll(".form-box")
    const errors = 0

    inputs.forEach(el => {
        if(el.classList.contains("error")) {
            errors++
        }
    })

    if(errors === 0) {
        popup.classList.add("active")
    }
}

const closePopup = () => {
    popup.classList.remove("active")  
}

sendBtn.addEventListener("click", (e) => {

    checkLabel([userName, pass, pass2, email])
    checkLength(userName, 4)
    checkLength(pass, 8)
    checkPassword(pass, pass2)
    checkEmail(email)
    checkErrors()


})
clearBtn.addEventListener("click", () => {
    
    [userName, pass, pass2, email].forEach(el => {
        el.value = ""
        clearError(el)
    })
    });

closeBtn.addEventListener("click", closePopup)