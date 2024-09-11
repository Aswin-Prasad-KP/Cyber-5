<!DOCTYPE html>
<html>

<head>
    <title>Admin Login Form</title>
    <link rel="stylesheet" type="text/css" href="http://localhost/Project/validation/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <!-- <link rel="stylesheet" href="http://localhost/Project/fontawesome/fontawesome-free-6.2.0-web/css/all.min.css"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- <link rel="icon" href="../images/logo.png"> -->
</head>

<body>

    <div id="alert" class="alert hide">
        <i class="fa-solid fa-exclamation-circle"></i>
        <div id="msg" class="msg">Warning: This is Warning Alert</div>
        <div class="close-btn" onclick="alert_hide()">
            <i class="fa-solid fa-times"></i>
        </div>
    </div>

    <img class="wave" src="http://localhost/Project/images/wave.png">
    <div class="container">
        <div class="img">
            <img src="http://localhost/Project/images/bg.svg">
        </div>
        <div class="login-content">
            <form onsubmit="return admin_login()" id="adForm">
                <img src="http://localhost/Project/images/avatar.svg">
                <h2 class="title">Welcome</h2>
                <div class="input-div one">
                    <div class="i">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="div" id="adid">
                        <h5>E-mail</h5>
                        <input type="email" pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" name="email" class="input" required>
                    </div>
                </div>
                <input type="hidden" name="hidden" value="adminlogin">
                <div class="input-div pass" id="pass">
                    <div class="i">
                        <i class="fas fa-lock"></i>
                    </div>
                    <div class="div">
                        <h5>Password</h5>
                        <input type="password" name="pass" class="input" required>
                    </div>
                </div>
                <input type="submit" class="btn" value="Login">
            </form>
        </div>
    </div>
    <script type="text/javascript" src="http://localhost/Project/validation/js/main.js"></script>
     <script src="../src/scripts/script5.js"></script>
</body>

</html>