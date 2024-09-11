<?php
  session_start();
  $isIndex = 0;
  if(!(array_key_exists('admin_user',$_SESSION) && isset($_SESSION['admin_user']))) {
    session_destroy();
    if(!$isIndex) header('Location: ./');
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ReDactify - Admin</title>
    <!-- <link rel="shortcut icon" href="../images/logo.png" type="image/x-icon"> -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css" integrity="sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg==" crossorigin="anonymous" referrerpolicy="no-referrer" /> -->
    <link rel="stylesheet" href="../src/styles/style2.css">
    <!-- <link rel="" href="Poppins/Poppins-Light.ttf"> -->
     <style>
        :root {
            --blue: #32be8f;
        }
        #btn2 {
            padding: 10px;
            background-color: var(--blue);
            border: 2px solid var(--blue);
        }
     </style>
</head>

<body onload="getLog()">
    <!-- ALERT -->
    <div id="alert" class="alert close">
        <i class="fa-solid fa-exclamation-circle"></i>
        <div id="msg" class="msg">Warning: This is Warning Alert</div>
        <div class="close-btn" onclick="alert_hide()">
            <i class="fa-solid fa-times"></i>
        </div>
    </div>
    <!-- ALERT -->


    <!-- SIDEBAR -->
    <section id="sidebar">
        <a href="#" class="brand">
            <i class="fa-solid fa-user-cog"></i>
            <span class="text" id="usr-txt">Hello, <?php echo $_SESSION['admin_user']; ?>!</span>
        </a>
        <ul class="side-menu top">
            <li class="active">
                <a onclick="getLog()">
                    <i class="fa-solid fa-dashboard"></i>
                    <span class="text">Dashboard</span>
                </a>
            </li>
            <li>
                <a onclick="getImgC()">
                    <i class="fa-solid fa-image"></i>
                    <span class="text">Image</span>
                </a>
            </li>
            <!-- <li>
                <a onclick="getVdoC()">
                    <i class="fa-solid fa-video"></i>
                    <span class="text">Video</span>
                </a>
            </li> -->
            <li>
                <a onclick="getPDFC()">
                    <i class="fa-solid fa-file-pdf"></i>
                    <span class="text">PDF</span>
                </a>
            </li>
            <li>
                <a onclick="getDocC()">
                    <i class="fa-solid fa-file"></i>
                    <span class="text">Document</span>
                </a>
            </li>
        </ul>
        <ul class="side-menu bottom">
            <!-- <li>
                <a class="settings" onclick="get_settings()">
                    <i class="fa-solid fa-cog"></i>
                    <span class="text">Settings</span>
                </a>
            </li> -->
            <li>
                <a href="../db_php/logout.php" class="logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="text">Logout</span>
                </a>
            </li>
        </ul>
    </section>
    <!-- SIDEBAR -->

    <!-- CONTENT -->
    <section id="content">
        <!-- NAVBAR -->
        <nav>
            <div class="nav-btn">
                <i class='fa-solid fa-bars'></i>
                <p class="nav-link">Categories</p>
            </div>
            <div class="refresh" id="refresh" onclick="getLog()">
                <i class='fa-solid fa-refresh'></i>
            </div> 
            <input type="checkbox" id="switch-mode" hidden>
            <label for="switch-mode" class="switch-mode"></label>
            <a class="profile">
                <img src="../public/images/defimg.png">
            </a>
        </nav>
        <!-- NAVBAR -->

        <!-- MAIN -->
        <main>
            <div class="head-title">
                <div class="left">
                    <h1>Dashboard</h1>
                    <ul class="breadcrumb">
                        <li>
                            <a href="#">ReDactify</a>
                        </li>
                        <li><i class='fa-solid fa-chevron-right'></i></li>
                        <li>
                            <a id="info" class="active" href="#">Dashboard</a>
                        </li>
                    </ul>
                </div>
                <!-- <a class="btn-download" id="btn" onclick="add()">
                    <i class='fa-solid fa-file-circle-plus'></i>
                    <span class="text" id="action">Redact</span>
                </a> -->
                <!-- <button class="btn btn-primary upload-assign-alert" data-toggle="modal" data-target=".bs-example-modal-lg" id="UploadAss">Upload</button> -->
            </div>

            <div class="table-data" id="add-stu">
            </div>

            <div class="table-data" id="stu-data">
            </div>

        </main>
        <!-- MAIN -->
    </section>
    <!-- CONTENT -->

    <!-- <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="addClass" aria-hidden="true">
        <div class="modal-dialog modal-lg"> 
            <div class="modal-content" id="mc">
            <h2 class="text-center"> Upload Assignment </h2><br> <span class="info-class"></span>
            <hr>
                <form id="add_class_form" method="POST" onsubmit="return pdefault()">
                <select class="form-control type" name="type">
                    <option class="none" value="none">-- Select Type --</option>
                    <option class="file" value="file">File</option>
                    <option class="content" value="content">Content (Eg :- Content of Assisnment)</option>
                </select>
                <input id="fileinp" class="form-control" name="file" type="file">
                <input id="filename" class="form-control" name="name" placeholder="File Name , Eg : ASSIGNMENT-1">
                <textarea id="contentinp" class="form-control" name="content" placeholder="Enter Content here...."></textarea>
                <button class="btn btn-primary" id="uploadAssign">Upload File</button>
                <button class="btn" id="cancel">Cancel</button>
                </form>
            </div>
        </div>
    </div> -->

    <script src="../src/scripts/script5.js"></script>
</body>

</html>