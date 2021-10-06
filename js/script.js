"use strict";

let collapsible = document.getElementsByClassName("collapseLabel");
const phone = document.getElementById("phone");
const email = document.getElementById("email");

let formButton = document.getElementById("buttonSubmit");

//цикл меняющий стили выпадающих q&a на сайте
//меняют положение треугольника, меняют стили скнопки на которую нажимают
for (let i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function () {
    // this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "flex") {
      this.classList.remove("changeLabelColor");
      this.childNodes[3].classList.remove("rotation");
      content.style.display = "none";
    } else {
      content.style.display = "flex";
      this.classList.add("changeLabelColor");
      this.childNodes[3].classList.add("rotation");
    }
  });
}

function addClassError(elements) {
  elements.classList.add("errorClass");
}

function removeClassError(elements) {
  elements.classList.remove("errorClass");
}

function addClassErrorLabel(errLabel) {
  errLabel.classList.add("errorLabelClass");
}

function removeClassErrorLabel(errLabel) {
  errLabel.classList.remove("errorLabelClass");
}

function emailValidate(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value);
}

//^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$
function phoneValidate(phone) {
  return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(
    phone.value
  );
}
//ставит по дефолту всем класс ошибки, проверяет на правильность заполнения формы

//если форма заполнена правильно убирает класс ошибки, если где-то заполнено неправильно, то оставит класс ошибки на том элементе, где ошибка

//возвращает passes, он должен быть равен 2 при правильном заполнении полей, если меньше 2, то ошибка

function validateInput(form) {
  let formReq = document.querySelectorAll(".requiredElem");

  let errorLabel = document.querySelectorAll(".errorLabel");

  errorLabel.forEach((errLabel) => {
    addClassErrorLabel(errLabel);
  });

  formReq.forEach((element) => {
    addClassError(element);
  });

  let emailLabel = errorLabel[0];
  let phoneLabel = errorLabel[1];
  let email = formReq[0];
  let phone = formReq[1];
  let passes = 0;

  for (let id = 0; id < formReq.length; id++) {
    const element = formReq[id];

    if (element.id === "email" && element.value !== "") {
      if (emailValidate(element)) {
        removeClassError(element);
        removeClassErrorLabel(errorLabel[id]);
        passes++;

        if (phoneValidate(phone)) {
          removeClassError(phone);
          removeClassErrorLabel(phoneLabel);
        } else if (phone.value === "" || phone.value === "+7") {
          removeClassError(phone);
          removeClassErrorLabel(phoneLabel);
          passes++;
        }
      }
    } else if (element.id === "phone" && element.value !== "") {
      if (phoneValidate(element)) {
        removeClassError(element);
        removeClassErrorLabel(errorLabel[id]);
        passes++;
        if (emailValidate(email)) {
          removeClassErrorLabel(emailLabel);
          removeClassError(email);
        } else if (email.value === "") {
          removeClassError(email);
          removeClassErrorLabel(emailLabel);
          passes++;
        }
      }
    }
  }

  return passes;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("inputForm");
  form.addEventListener("submit", sendForm);

  async function sendForm(e) {
    e.preventDefault();

    let formData = new FormData(form);

    let passes = validateInput(form);
    const message = "Спасибо. Скоро свяжемся!";
    const myPhoneNumber = "79156368594";

    if (passes === 2) {
      console.log("passed");

      //отправляет сообщение на мой номер через сервис https://sms.ru
      if (phone.value) {
        let response = await fetch(
          `https://sms.ru/sms/send?api_id=C3F84B4E-27B2-9D14-1C9F-778CACE3E964&to=${myPhoneNumber}&msg=${message}&json=1`
        );
        if (response.ok) {
          let result = await response.json();
          console.log(result.message);
          form.reset();
        } else console.log("dont work");
      }
    }
  }
});
