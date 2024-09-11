function validate() {
    var myform = document.querySelector("#myForm2");
    const ntf = document.querySelector("#otp-ntf");
    if (ntf.value != "Verified") {
        alert_show("Verify Your email..!");
        return false;
    }
    const ajax = new XMLHttpRequest();
    const pass = document.querySelector("#pass2 .pass");
    const cpass = document.querySelector("#cpass .cpass");
	var formdata = new FormData(myform);
	formdata.append("submit", "yes");
    ajax.open('POST', 'db_php/createusr.php', true);
    ajax.send(formdata);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data.response == 1) {
                window.location.href = "signin";
            }
            else if (data.response == 0) {
                if (data.return == 'email') {
                    alert_show("Check/Verify Your email..!");
                    return false;
                }
				else if (data.return == 'password') {
                    alert_show("Password Not same");
                    pass.setAttribute("setindex", "0");pass.focus();
                    regno.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
					pass.setAttribute("style", "border: 1px solid red;");
					cpass.setAttribute("style", "border: 1px solid red;");
				}
            }
        }
    }
    return false;
}

function check_login() {
    var myform = document.querySelector("#myForm");
    const ajax = new XMLHttpRequest();
    const regno = document.getElementById("email");
    const pass = document.getElementById("pass");
	var formdata = new FormData(myform);
	formdata.append("submit", "yes");
    ajax.open('POST', 'db_php/loginusr.php', true);
    ajax.send(formdata);
    ajax.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (data.response == 'pass') {
                pass.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
                window.location.href = "dashboard/";
            }
            else if (data.response == 'fail') {
                pass.setAttribute("setindex", "0");pass.focus();
                regno.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
                pass.setAttribute("style", "border: 1px solid red;")
                alert_show("Password Incorrect...");
            }
            else if (data.response == "NotFound") {
                pass.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
                regno.setAttribute("setindex", "0");regno.focus();
                regno.setAttribute("style", "border: 1px solid red;");
                alert_show("Email. Not Registerd");
            }
        }
    }
    return false;
}

function admin_login() {
    var myform = document.querySelector("#adForm");
    const ajax = new XMLHttpRequest();
    const adid = document.getElementById("adid");
    const pass = document.querySelector("#adForm #pass");
	var formdata = new FormData(myform);
	formdata.append("submit", "yes");
    ajax.open('POST', '../db_php/loginadmin.php', true);
    ajax.send(formdata);
    ajax.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) { 
            var data = JSON.parse(this.responseText);
            if (data.response == 'pass') {
                pass.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
                window.location.href = "../admin";
            }
            else if (data.response == 'fail') {
                pass.setAttribute("setindex", "0");pass.focus();
                adid.setAttribute("style", "border: 1px solid rgba(255, 255, 255, 0.4); border-right: 1px solid rgba(255, 255, 255, 0.3); border-bottom: 1px solid rgba(255, 255, 255, 0.3);");
                pass.setAttribute("style", "border: 1px solid red;");
                alert_show("Password Incorrect...");
            }
            else if (data.response == "NotFound") {
                adid.setAttribute("setindex", "0");adid.focus();
                adid.setAttribute("style", "border: 1px solid red;");
                alert_show("Check Admin ID...");
            }
        }
    }
    return false;
}

function show_hide() {
    var ps = document.getElementById("pass");
    var open = document.getElementById("open");
    var close = document.getElementById("close");
    if (ps.type === "password") {
        ps.type = "text";
    }
    else {
        ps.type = "password";
    }
    open.classList.toggle("hide");
    close.classList.toggle("hide");
}

function show_hide_signup() {
    var ps = document.getElementById("pass");
    var cps = document.getElementById("cpass");
    var open = document.getElementById("open");
    var close = document.getElementById("close");
    if (ps.type === "password" && cps.type === "password") {
        ps.type = "text";
        cps.type = "text";
    }
    else {
        ps.type = "password";
        cps.type = "password";
    }
    open.classList.toggle("hide");
    close.classList.toggle("hide");   
}

function alert_hide() {
    var alert = document.getElementById("alert");
    alert.classList.remove("ashow");
    alert.classList.add("ahide");
}

function alert_show(msg) {
    var alert = document.getElementById("alert");
    var amsg = document.getElementById("msg");
    amsg.innerHTML = msg;
    alert.classList.remove("hide");
    alert.classList.remove("ahide");
    alert.classList.add("ashow");
    setTimeout(alert_hide, 3000);
}

var emails = "";

function frgt_ps_mail() {
    var email = document.getElementById("email");
    var sm_btn = document.querySelector("#email-stf .butn");
    var otp = document.getElementById("otp");
    var src = document.getElementById("src");
    if (email.value.match(validemails)) {
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '../db_php/forgotpass.php', true);
        ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        ajax.send("email=" + email.value + "&src=" + src.value + "&submit='yes'");
        ajax.onreadystatechange = function () { 
            if (this.readyState == 4 && this.status == 200) { 
                var data = JSON.parse(this.responseText);
                if (data.response == 'Fail') {
                    src.parentElement.setAttribute("style", "border: 1px solid red;");
                    src.focus();
                    alert_show("Select an Option..!");
                }
                else if (data.response == 'Success') {
                    emails = email.value;
                    src.parentElement.setAttribute("style", "outline: none;border: none;");
                    email.parentElement.setAttribute("style", "outline: none;border: none;");
                    src.parentElement.classList.add("hide");
                    sm_btn.classList.add("hide");
                    email.setAttribute("style", "color: #4481eb;width: 100%");
                    email.setAttribute("readonly", "yes");
                    otp.parentElement.classList.remove("hide");
                    alert_show("Mail Sent Successfully...");
                }
                else if (data.response == "Not Exist") {
                    src.parentElement.setAttribute("style", "outline: none;border: none;");
                    email.setAttribute("setindex", "0");email.focus();
                    email.parentElement.setAttribute("style", "border: 1px solid red;");
                    alert_show("Email ID. Not Registerd");
                }
            }
        }
    }
    else {
        alert_show("Enter valid Email..!");
        email.setAttribute("setindex", "0");email.focus();
    }
    return false;
}

const validemails = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function frgt_ps_cnfm() {
    var otp = document.getElementById("otp");
    var email = document.getElementById("email");
    var cn_btn = document.querySelector("#otp-stf .butn");
    const ajax = new XMLHttpRequest();
    ajax.open('POST', '../db_php/forgotpass.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("email=" + emails + "&otp=" + otp.value + "&submit='yes'");
    ajax.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) { 
            var data = JSON.parse(this.responseText);
            if (data.response == 'Success') {
                window.location.href = "chngpass.php?token="+data.token+"&email="+emails+"&chng=yes";
            }
            else {
                email.setAttribute("style", "color: red;width: 100%");
                otp.setAttribute("setindex", "0"); otp.focus();
                alert_show("OTP is Wrong..!");
            }
        }
    }
}

function chngps() {
    var pass = document.getElementById("pass");
    var cpass = document.getElementById("cpass");
    var myForm = document.getElementById("chng");
    if (pass.value == cpass.value) {
        pass.parentElement.setAttribute("style", "outline: none;border: none;");
        cpass.parentElement.setAttribute("style", "outline: none;border: none;");
        var formdata = new FormData(myForm);
        formdata.append("submit", "yes");
        const ajax = new XMLHttpRequest();
        ajax.open('POST', '../db_php/passchng.php', true);
        ajax.send(formdata);
        console.log(formdata);
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText);
                if (data.response == "Success")
                {
                    window.location.href = "../index.html";
                }
                else if (data.response == "Fail")
                {
                    alert_show("Something went wrong! try again Later..!");
                }
                else if (data.response == "intruder")
                {
                    alert_show("I caught You..!");
                    var body = document.getElementById("main");
                    body.innerHTML = "<h1 style='font-size: 300px;'>I caught You..!</h1>";
                    body.setAttribute("style", "background-color:red;");

                }
            }
        }
    }
    else {
        pass.parentElement.setAttribute("style", "border: 1px solid red;");
        cpass.parentElement.setAttribute("style", "border: 1px solid red;");
        pass.setAttribute("setindex", "0"); pass.focus();
        alert_show("Password Not Same..!");
    }
    return false;
}