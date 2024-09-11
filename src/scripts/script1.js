const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const eye = document.querySelector(".input-field #eye");
const eye_sls = document.querySelector(".input-field #eye-slash");
const pass = document.querySelector(".input-field .pass");
eye.addEventListener("click", () => {
  pass.setAttribute("type", "text");
  eye.classList.toggle("hide");
  eye_sls.classList.toggle("hide");
});
eye_sls.addEventListener("click", () => {
  pass.setAttribute("type", "password");
  eye.classList.toggle("hide");
  eye_sls.classList.toggle("hide");
});

// const eye_stf = document.querySelector(".input-field.staff #eye");
// const eye_stf_sls = document.querySelector(".input-field.staff #eye-slash");
// const pass_stf = document.querySelector(".input-field.staff .pass");
// eye_stf.addEventListener("click", () => {
//   pass_stf.setAttribute("type", "text");
//   eye_stf.classList.toggle("hide");
//   eye_stf_sls.classList.toggle("hide");
// });
// eye_stf_sls.addEventListener("click", () => {
//   pass_stf.setAttribute("type", "password");
//   eye_stf.classList.toggle("hide");
//   eye_stf_sls.classList.toggle("hide");
// });