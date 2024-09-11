const validemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });

const image = document.querySelector(".input-field.student .image");
const label = document.querySelector(".input-field.student .image-lbl");
image.addEventListener("change", () => {
  var file = image.files[0].name;
  label.setAttribute("style", "color: #4481eb;");
  label.innerHTML = file;
});

const eyes = document.querySelector(".input-field.student #eye");
const eye_slss = document.querySelector(".input-field.student #eye-slash");
const passs = document.querySelector(".input-field.student .pass");
const cpasss = document.querySelector(".input-field.student .cpass");
eyes.addEventListener("click", () => {
  passs.setAttribute("type", "text");
  cpasss.setAttribute("type", "text");
  eyes.classList.toggle("hide");
  eye_slss.classList.toggle("hide");
});
eye_slss.addEventListener("click", () => {
  passs.setAttribute("type", "password");
  cpasss.setAttribute("type", "password");
  eyes.classList.toggle("hide");
  eye_slss.classList.toggle("hide");
});

const vldt = document.querySelector("#myForm2 #email .butn");
const email = document.querySelector("#myForm2 #email .email");
const otp_div = document.getElementById("otp");
vldt.addEventListener("click", () => {
  var val = email.value;
  if (val.match(validemail)) {
    const ajax = new XMLHttpRequest();
    ajax.open('POST', 'db_php/mailrgstr.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("email="+email.value+"&register='yes'");
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText);
          console.log(data);
          if (data.response == 'Success') {
            vldt.classList.add("hide");
            email.setAttribute("style", "color: #4481eb;width: 100%");
            email.setAttribute("readonly", "yes");
            alert_show("Mail was Sent Enter OTP...");
            otp_div.classList.remove("hide");
          }
          else {
            alert_show("Mail was Already Registered..!");
          }
        }
    }
  }
  else {
    alert_show("Enter valid Email..!");
    email.setAttribute("setindex", "0");email.focus();
  }
});

const otp = document.querySelector("#otp .otp");
const cnfm = document.querySelector("#otp .butn");
const ntf = document.querySelector("#otp-ntf");
cnfm.addEventListener("click", () => {
  const ajax = new XMLHttpRequest();
  ajax.open('POST', 'db_php/mailrgstr.php', true);
  ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  ajax.send("email="+email.value+"&otp="+otp.value);
  ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      if (data.response == 'Success') {
        otp_div.classList.add("hide");
        email.setAttribute("style", "color: green;width: 100%");
        ntf.value = "Verified";
      }
      else {
        email.setAttribute("style", "color: red;width: 100%");
        otp.setAttribute("setindex", "0");otp.focus();
      }
    }
  }
});