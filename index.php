<?php
    session_start();
    if(isset($_SESSION['uid']))
        header("Location: ../Re-Dact/dashboard/");
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="src/styles/style1.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <title>Sign-in</title>
</head>

<body>

  <div id="alert" class="alert hide">
    <i class="fa-solid fa-exclamation-circle"></i>
    <div id="msg" class="msg">Warning: This is Warning Alert</div>
    <div class="close-btn" onclick="alert_hide()">
      <i class="fa-solid fa-times"></i>
    </div>
  </div>

  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form class="sign-in-form" id="myForm" onsubmit="return check_login()">
          <h2 class="title">Sign In</h2>
          <div class="input-field" id="email">
            <i class="fas fa-envelope"></i>
            <input type="email" class="email" name="email" placeholder="Email" required />
          </div>
          <input type="hidden" name="hidden" value="loginusr" />
          <div class="input-field" id="pass">
            <i class="fas fa-lock"></i>
            <div id="eye">
              <i class="fas fa-eye"></i>
            </div>
            <div id="eye-slash" class="hide">
              <i class="fas fa-eye-slash"></i>
            </div>
            <input type="password" name="pass" class="pass" placeholder="Password" required />
          </div>
          <a href="validation/forgot.html">Forgot Password?</a>
          <input type="submit" value="Login" class="btn solid" />
        </form>
        <form class="sign-up-form" id="myForm2" onsubmit="return validate()">
          <h2 class="title">Sign Up</h2>
          <div class="input-field student">
              <i class="fas fa-user"></i>
              <input type="text" name="fname" placeholder="First Name" required />
          </div>
          <div class="input-field student">
              <i class="fas fa-user"></i>
              <input type="text" name="lname" placeholder="Last Name" required />
          </div>
          <div class="input-field student" id="email">
              <i class="fas fa-envelope"></i>
              <input type="email" id="inp" class="email" name="email" placeholder="Email" required />
              <input type="button" class="butn" value="Validate" />
          </div>
          <div class="input-field student hide" id="otp">
              <i class="fas fa-envelope"></i>
              <input type="number" class="otp" name="OTP" value="Not-verified" min="100000" max="999999"
                  placeholder="OTP" />
              <input type="button" class="butn" value="Confirm" />
          </div>
          <input type="hidden" id="otp-ntf" name="hidden" value="createstu" />
          <div class="input-field student" id="pass2">
              <i class="fas fa-lock"></i>
              <div id="eye">
                  <i class="fas fa-eye"></i>
              </div>
              <div id="eye-slash" class="hide">
                  <i class="fas fa-eye-slash"></i>
              </div>
              <input type="password" class="pass" name="pass" placeholder="Password" required />
          </div>
          <div class="input-field student" id="cpass">
              <i class="fas fa-lock"></i>
              <input type="password" class="cpass" name="cpass" placeholder="Confirm Password" required />
          </div>
          <div class="input-field student">
              <i class="fas fa-image"></i>
              <label class="image-lbl">Profile Picture</label>
              <input type="file" name="image" accept="image/jpeg, image/jpg, image/png" class="image" />
          </div>
          <input type="submit" value="Register" class="btn solid" />
        </form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>Sign Up ?</h3>
          <p>
            If you are not registered a then click the button to Sign up!
          </p>
          <button class="btn transparent" id="sign-up-btn">
            New Account!
          </button>
        </div>
        <img src="src/images/log.svg" class="image" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>Sign In ?</h3>
          <p>
            If you already Registered then click the button to Sign in!
          </p>
          <button class="btn transparent" id="sign-in-btn">
            Login!
          </button>
        </div>
        <img src="src/images/register.svg" class="image" />
      </div>
    </div>
  </div>

  <script src="src/scripts/script1.js"></script>
  <script src="src/scripts/script2.js"></script>
  <script src="src/scripts/script3.js"></script>
</body>

</html>