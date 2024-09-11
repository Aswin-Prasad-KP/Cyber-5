function alert_hide() {
    var alert = document.getElementById("alert");
    alert.classList.remove("ashow");
    alert.classList.add("ahide");
}

function alert_show(msg) {
    var alert = document.getElementById("alert");
    var amsg = document.getElementById("msg");
    amsg.innerHTML = msg;
    alert.classList.remove("close");
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
		const info = document.getElementById('info');
		info.text = li.querySelector('.text').textContent;
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

function setDef(btnTxt, btnF, refF, file) {
	var fileBtn = document.getElementById("btn");
	fileBtn.style = "visibility: visible";
	fileBtn.setAttribute("onclick", btnF);
	var addBtnTxt = document.getElementById("action");
	addBtnTxt.innerHTML = btnTxt;
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", refF);
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/'+file+'.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function getLog() {
	setDef("Redact", "add()", "getLog()", "log");
	var fileBtn = document.getElementById("btn");
	fileBtn.style = "visibility: hidden";
}

function getImgC() {
	setDef("Redact Image", "addImage()", "getImgC()", "image");
}

function getVdoC() {
	setDef("Redact Video", "addVideo()", "getVdoC()", "video");
}

function getPDFC() {
	setDef("Redact PDF", "addPDF()", "getPDFC()", "pdf");
}
function getDocC() {
	setDef("Redact Document", "addDoc()", "getDocC()", "doc");
}

function add()
{
	alert("Unautherized Access..!");
}

function addImage() {
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/image.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("add='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function addPDF() {
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/pdf.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("add='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function addDoc() {
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'helper/doc.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("add='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

// function upload(type) {
// 	let fileInp = document.getElementById("inputGroupFile01");
// 	const ajax = new XMLHttpRequest();
//     ajax.open('POST', '../db_php/upload.php', true);
//     // ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
// 	let frm = new FormData();
// 	frm.append("upload", type);
// 	frm.append("file", fileInp.files[0]);
// 	// console.log(frm);
//     ajax.send(frm);
//     ajax.onreadystatechange = function () { 
// 		if (this.readyState == 4 && this.status == 200) {
// 			res = JSON.parse(this.responseText);
// 			if(res.error == "none") {
// 				alert_show("File Uploaded..!");
				
// 			}
// 		}
//     }
// }

function upload(type) {
    let fileInp = document.getElementById("inputGroupFile01");
    const ajax = new XMLHttpRequest();
    ajax.open('POST', 'http://localhost:5000/redact', true); // Call the Flask API
    let frm = new FormData();
    frm.append("image", fileInp.files[0]);
    frm.append("entities", "name, dob, aadhar number"); // Example entities

    ajax.send(frm);
    ajax.onreadystatechange = function () { 
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(this.responseText);
            if (res.message === "Redaction complete") {
                let redactedFile = res.redacted_image;

                // Send the redacted file name to PHP to store in the DB
                const phpAjax = new XMLHttpRequest();
                phpAjax.open('POST', '../db_php/upload.php', true);
                let phpForm = new FormData();
                phpForm.append("upload", type);
                phpForm.append("redacted_image", redactedFile); // Pass the redacted file name to PHP
                
                phpAjax.send(phpForm);
                phpAjax.onreadystatechange = function () { 
                    if (this.readyState == 4 && this.status == 200) {
                        let phpRes = JSON.parse(this.responseText);
                        if (phpRes.error == "none") {
                            alert_show("File Name Stored in DB");
							var refresh = document.getElementById("refresh").click();
                        }
                    }
                }
            }
        }
    }
}

function get_settings()
{
	var place = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "get_settings()");
    ajax.open('POST', '../db_php/settings.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("setting='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function edit(uid) {
	var fname = $('td .fname');
	var lname = $('td .lname');
	var email = $('td .email');
	var btn = $('td .btn-edit');
	fname = fname[0];
	lname = lname[0];
	email = email[0];
	btn = btn[0].parentElement;
	fname.removeAttribute("readonly");
	lname.removeAttribute("readonly");
	email.removeAttribute("readonly");
	btn.innerHTML = '<input type="button" class="btn-cancel" value="Cancel" onclick="stopedit(\''+uid+'\')" /><input type="button" class="btn-save" value="Save" onclick="update(\''+uid+'\')" />';
}

function stopedit(uid) {
	var fname = $('td .fname');
	var lname = $('td .lname');
	var email = $('td .email');
	var btn = $('td .btn-cancel');
	fname = fname[0];
	lname = lname[0];
	email = email[0];
	btn = btn[0].parentElement;
	fname.setAttribute("readonly","true");
	lname.setAttribute("readonly","true");
	email.setAttribute("readonly", "true");
	btn.innerHTML = '<input type="button" class="btn-edit" value="Edit" onclick="edit(\''+uid+'\')"/>';
}

function update(uid) {
	var fname = $('td .fname');
	var lname = $('td .lname');
	var email = $('td .email');
	var btn = $('td .btn-cancel');
	fname = fname[0].value;
	lname = lname[0].value;
	email = email[0].value;
	btn = btn[0].parentElement;
	if (fname != "" && lname != "" && email != "") {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', '../db_php/update_usr_data.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("uid=" + uid + "&fname=" + fname + "&lname=" + lname + "&email=" + email + "&submit='yes'");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				if (data.return == 'Success') {
					btn.innerHTML = '<span class="btn-save">Saved</span>';
					setTimeout(get_settings(),3000);
				}
				else if (data.return == '0') {
					window.location.href = "../validation/admin.html";
				}
			}
		}
	}
	else {
		alert_show("Value Cannot be Empty..!");
	}
}


function get_stu_data() {
	var table_data = document.getElementById("stu-data");
	var addBtn = document.getElementById("btn");
	addBtn.setAttribute("onclick", "add_stu()");
	var addBtnTxt = document.getElementById("action");
	addBtnTxt.innerHTML = "Add Students";
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "get_stu_data()");
    const ajax = new XMLHttpRequest();
    ajax.open('POST', 'stud_data.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("request='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function get_staff_data() {
	var table_data = document.getElementById("stu-data");
	var addBtn = document.getElementById("btn");
	addBtn.setAttribute("onclick", "add_stf()");
	var addBtnTxt = document.getElementById("action");
	addBtnTxt.innerHTML = "Add Staffs";
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "get_staff_data()");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'staff_data.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("request='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

// const searchButton = document.querySelector('#content nav form .form-input button');
// const searchButtonIcon = document.querySelector('#content nav form .form-input button .fa-solid');
// const searchForm = document.querySelector('#content nav form');

// searchButton.addEventListener('click', function (e) {
// 	if(window.innerWidth < 576) {
// 		e.preventDefault();
// 		searchForm.classList.toggle('show');
// 		if(searchForm.classList.contains('show')) {
// 			searchButtonIcon.classList.replace('fa-search', 'fa-x');
// 		} else {
// 			searchButtonIcon.classList.replace('fa-x', 'fa-search');
// 		}
// 	}
// })

//  else if(window.innerWidth > 576) {
// 		searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 	    searchForm.classList.remove('show');
// }


// window.addEventListener('resize', function () {
// 	if(this.innerWidth > 576) {
// 		searchButtonIcon.classList.replace('bx-x', 'bx-search');
// 		searchForm.classList.remove('show');
// 	}
// })

const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

function add_stu()
{
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'stud_data.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("add='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function add_stf()
{
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'staff_data.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("add='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function getInputsStu()
{
	var place = document.getElementById("add-stu");
	var iter = document.getElementById("iter");
	if (iter.value > 0) {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', 'stud_data.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("iter="+iter.value);
		ajax.onreadystatechange = function () { 
			if (this.readyState == 4 && this.status == 200) {
				place.innerHTML = this.responseText;
			}
		}
	}
	else {
		alert_show("Please enter a positive value..!");
	}
}

function getInputsStf()
{
	var place = document.getElementById("add-stu");
	var iter = document.getElementById("iter");
	if (iter.value > 0) {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', 'staff_data.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("iter="+iter.value);
		ajax.onreadystatechange = function () { 
			if (this.readyState == 4 && this.status == 200) {
				place.innerHTML = this.responseText;
			}
		}
	}
	else {
		alert_show("Please enter a positive value..!");
	}
}

function insert_studs()
{
	var myform = document.querySelector("#myForm");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("submit", "yes");
    ajax.open('POST', 'stud_data.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.return == 'success') {
				alert_show("Successfully Inserted...");
				get_stu_data();
            }
			else if (data.return == 'fail') {
                alert_show("Something Wrong! Try Again Later...");
            }
		}
	}
	return false;
}

function insert_staffs()
{
	var myform = document.querySelector("#myForm");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("submit", "yes");
    ajax.open('POST', 'staff_data.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.return == 'success') {
				alert_show("Successfully Inserted...");
            }
			else if (data.return == 'fail') {
                alert_show("Something Wrong! Try Again Later...");
            }
		}
	}
	return false;
}

function get_attendance()
{
	var place = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'student.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("nothing='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function get_classes()
{
	var place = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'teacher.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("nothing='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function editStu(regno) {
	var reg = $('#' + regno + ' td .regno');
	var name = $('#' + regno + ' td .name');
	var dob = $('#' + regno + ' td .dob');
	var btn = $('#' + regno + ' td .btn-edit');
	reg = reg[0];
	name = name[0];
	dob = dob[0];
	btn = btn[0].parentElement;
	reg.removeAttribute("readonly");
	name.removeAttribute("readonly");
	dob.removeAttribute("readonly");
	btn.innerHTML = '<input type="button" class="btn-cancel" value="Cancel" onclick="stopeditStu(\''+regno+'\')" /><input type="button" class="btn-save" value="Save" onclick="updateStu(\''+regno+'\')" />';
}

function stopeditStu(regno) {
	var reg = $('#' + regno + ' td .regno');
	var name = $('#' + regno + ' td .name');
	var dob = $('#' + regno + ' td .dob');
	var btn = $('#' + regno + ' td .btn-cancel');
	reg = reg[0];
	name = name[0];
	dob = dob[0];
	btn = btn[0].parentElement;
	reg.setAttribute("readonly","true");
	name.setAttribute("readonly","true");
	dob.setAttribute("readonly", "true");
	btn.innerHTML = '<input type="button" class="btn-edit" value="Edit" onclick="editStu(\''+regno+'\')"/>';
}

function updateStu(regno) {
	var reg = $('#' + regno + ' td .regno');
	var name = $('#' + regno + ' td .name');
	var dob = $('#' + regno + ' td .dob');
	var btn = $('#' + regno + ' td .btn-cancel');
	reg = reg[0].value;
	name = name[0].value;
	dob = dob[0].value;
	btn = btn[0].parentElement;
	if (reg != "" && name != "" && dob != "") {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', 'update_stu_data.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("regnew=" + reg + "&name=" + name + "&dob=" + dob + "&regold=" + regno + "&submit='yes'");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				if (data.return == 'Success') {
					btn.innerHTML = '<span class="btn-save">Saved</span>';
					setTimeout(get_stu_data(),3000);
				}
				else if (data.return == '0') {
					window.location.href = "../validation/admin.html";
				}
			}
		}
	}
	else {
		alert_show("Value Cannot be Empty..!");
	}
}

function editStf(sid) {
	var id = $('#' + sid + ' td .id');
	var name = $('#' + sid + ' td .name');
	var post = $('#' + sid + ' td .posting');
	var dept = $('#' + sid + ' td .dept');
	var btn = $('#' + sid + ' td .btn-edit');
	id = id[0];
	name = name[0];
	post = post[0];
	dept = dept[0];
	btn = btn[0].parentElement;
	id.removeAttribute("readonly");
	name.removeAttribute("readonly");
	post.removeAttribute("readonly");
	dept.removeAttribute("readonly");
	btn.innerHTML = '<input type="button" class="btn-cancel" value="Cancel" onclick="stopeditStf(\''+sid+'\')" /><input type="button" class="btn-save" value="Save" onclick="updateStf(\''+sid+'\')" />';
}

function stopeditStf(sid) {
	var id = $('#' + sid + ' td .id');
	var name = $('#' + sid + ' td .name');
	var post = $('#' + sid + ' td .posting');
	var dept = $('#' + sid + ' td .dept');
	var btn = $('#' + sid + ' td .btn-cancel');
	id = id[0];
	name = name[0];
	post = post[0];
	dept = dept[0];
	btn = btn[0].parentElement;
	id.setAttribute("readonly","true");
	name.setAttribute("readonly","true");
	post.setAttribute("readonly", "true");
	dept.setAttribute("readonly", "true");
	btn.innerHTML = '<input type="button" class="btn-edit" value="Edit" onclick="editStf(\''+sid+'\')"/>';
}

function updateStf(sid) {
	var id = $('#' + sid + ' td .id');
	var name = $('#' + sid + ' td .name');
	var post = $('#' + sid + ' td .posting');
	var dept = $('#' + sid + ' td .dept');
	var btn = $('#' + sid + ' td .btn-cancel');
	id = id[0].value;
	name = name[0].value;
	post = post[0].value;
	dept = dept[0].value;
	btn = btn[0].parentElement;
	if (id != "" && name != "" && post != "" && dept != "") {
		const ajax = new XMLHttpRequest();
		ajax.open('POST', 'update_stf_data.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("idnew=" + id + "&name=" + name + "&post=" + post + "&dept=" + dept + "&idold=" + sid + "&submit='yes'");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				if (data.return == 'Success') {
					btn.innerHTML = '<span class="btn-save">Saved</span>';
					setTimeout(get_staff_data(),3000);
				}
				else if (data.return == '0') {
					alert_show("something went wrong, please try again later");
				}
			}
		}
	}
	else {
		alert_show("Value Cannot be Empty..!");
	}
}

function get_materials() {
	var table_data = document.getElementById("stu-data");
	const ajax = new XMLHttpRequest();
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "get_materials()");
    ajax.open('POST', 'materials.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("retrieve='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function deleteMat(uid) {
	if (uid != "") {
		var file = document.querySelector("#i" + uid + " td #file").innerHTML;
		if (confirm("Do yo want to delete "+file+ "?")) {
			const ajax = new XMLHttpRequest();
			ajax.open('POST', 'materials.php', true);
			ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			ajax.send("uid=" + uid + "&file=" + file + "&delete='yes'&submit='yes'");
			ajax.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					var data = JSON.parse(this.responseText);
					if (data.return == 'success') {
						alert_show(file + " is Deleted..!");
						setTimeout(get_materials(), 3000);
					}
					else if (data.return == 'fail') {
						alert_show("something went wrong, please try again later");
					}
					else if (data.return == 'NotFound') {
						alert_show("File Not Found");
						setTimeout(get_materials(), 3000);
					}
				}
			}
		}
	}
	else {
		alert_show("Inappropiate deletion..!");
	}
}

function get_admin_inp() {
	var place = document.getElementById("add-stu");
	const ajax = new XMLHttpRequest();
    ajax.open('POST', 'settings.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("getinp='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
    }
}

function add_admin()
{
	var handle = document.getElementById("add-stu");
	var myform = document.querySelector("#myForm");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("add", "yes");
    ajax.open('POST', 'settings.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.return == 'success') {
				alert_show("Successfully Added...");
				handle.innerHTML = "";
				get_settings();
            }
			else if (data.return == 'fail') {
                alert_show("Something Wrong! Try Again Later...");
            }
		}
	}
	return false;
}

function get_tt_form() {
	var table_data = document.getElementById("stu-data");
	var refresh = document.getElementById("refresh");
	refresh.setAttribute("onclick", "get_tt_form()");
    const ajax = new XMLHttpRequest();
    ajax.open('POST', 'timetable.php', true);
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.send("request='yes'");
    ajax.onreadystatechange = function () { 
		if (this.readyState == 4 && this.status == 200) {
			table_data.innerHTML = this.responseText;
		}
    }
}

function generate_form() {
	var fields = $('#form input,#form select');
	var num = $('#form #num').val();
	var dept = $('#form #department').val();
	var year = $('#form #year').val();
	var section = $('#form #section').val();
	var semester = $('#form #semester').val();
	form = document.getElementById("tplc");
	var valid = false;
	for(i = 0;i < fields.length;i++) {
		if (jQuery(fields[i]).val() != "")
		{
			valid = true;
		}
		else
		{
			valid = false;
			break;
		}
	}
	if(valid)
	{
		if ((num > 0) && (num < 11))
		{
			const ajax = new XMLHttpRequest();
			ajax.open('POST', 'timetable.php', true);
			ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
			ajax.send("num=" + num + "&dept=" + dept + "&year=" + year + "&section=" + section + "&sem=" + semester + "&check='yes'");
			ajax.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					form.innerHTML = this.responseText;
				}
			}
		}
		else
			alert_show("Input must be (1-10)..!");
	}
	else
		alert_show("Please fill all Fields..!");
	return false;
}

function getInputsTT()
{
	var myform = document.getElementById("ttform");
	place = document.getElementById("tplc");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("iter", "yes");
	ajax.open('POST', 'timetable.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			place.innerHTML = this.responseText;
		}
	}
	return false;
}

function createTT()
{
	var myform = document.getElementById("creatett");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("create", "yes");
	ajax.open('POST', 'timetable.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.return == "success") {
				alert_show("SuccessFully Created...");
				get_tt_form();

			}
			else if (data.return == "fail") {
				alert_show("Not Created..!");
			}
				
		}
	}
	return false;
}

function ttEditReq(table_id)
{
	var btn = $('#editTT td .btn-edit');
	btn = btn[0].parentElement;
	var fields = $('#tt tbody tr td input');
	for(i = 0;i < fields.length;i++) {
		var field = jQuery(fields[i]);
		field[0].removeAttribute("readonly")
	}
	btn.innerHTML = '<input type="button" class="btn-cancel" value="Cancel" onclick="stopEditTT('+table_id+')" /><input type="Submit" class="btn-save" value="Save" />';
}

function stopEditTT(table_id) {
	var btn = $('#editTT td .btn-cancel');
	btn = btn[0].parentElement;
	var fields = $('#tt tbody tr td input');
	for(i = 0;i < fields.length;i++) {
		var field = jQuery(fields[i]);
		field[0].setAttribute("readonly","true")
	}
	btn.innerHTML = '<input type="button" class="btn-edit" value="Edit" onclick="ttEditReq('+table_id+')" /><input type="button" class="btn-delete" value="Delete" onclick="deleteTT('+table_id+')" />';
}

function editTT(table_id)
{
	var myform = document.getElementById("ttform");
    const ajax = new XMLHttpRequest();
	var formdata = new FormData(myform);
	formdata.append("tid", table_id);
	formdata.append("edit", "yes");
	ajax.open('POST', 'timetable.php', true);
	ajax.send(formdata);
    ajax.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			if (data.return == "success") {
				alert_show("SuccessFully Updated...");
				get_tt_form();

			}
			else if (data.return == "fail") {
				alert_show("No Changes..!");
			}
				
		}
	}
	return false;
}

function deleteTT(table_id)
{
	text = document.getElementById('t' + table_id).innerHTML;
	if (confirm("Do yo want to delete "+text+ "?"))
	{
		const ajax = new XMLHttpRequest();
		ajax.open('POST', 'timetable.php', true);
		ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		ajax.send("tid="+table_id+"&delete=yes");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				console.log(this.responseText);
				var data = JSON.parse(this.responseText);
				if (data.return == "success") {
					alert_show("SuccessFully Deleted...");
					get_tt_form();

				}
				else if (data.return == "fail") {
					alert_show("Not Deleted..!");
				}
				
			}
		}
	}
}