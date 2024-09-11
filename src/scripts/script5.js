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

const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
const allSideMenubt = document.querySelectorAll('#sidebar .side-menu.bottom li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
		var table_data = document.getElementById("stu-data");
		table_data.innerHTML = "";
		var add_stu = document.getElementById("add-stu");
		add_stu.innerHTML = "";
		// const info = document.getElementById('info');r
		// info.text = li.querySelector('.text').textContent;
	})
});

allSideMenubt.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		var table_data = document.getElementById("stu-data");
		table_data.innerHTML = "";
		var add_stu = document.getElementById("add-stu");
		add_stu.innerHTML = "";
	})
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .fa-solid.fa-bars');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})

if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
}

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

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
                window.location.href = "./admin.php";
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

function getLog() {
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "getLog()");
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/log.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function getImgC() {
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "getImgC()");
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/image.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function getVdoC() {
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "getVdoC()");
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/video.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function getPDFC() {
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "getPDF()");
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/pdf.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}
function getDocC() {
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "getDocC()");
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/doc.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}