<?php
    require_once("dbcon.php");
    $con = new DBCon();
    if(isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["hidden"]))
    {
        $email = $_POST["email"];
        $pass = $_POST["pass"];
        $check = false;
        
        if(isset($_POST["submit"]))
        {
            $res = $con->login($email);
            if($res !== false)
            {
                $res_pass = mysqli_fetch_array($res);
                if(password_verify($pass, $res_pass['pwd']))
                {
                    $exists = $con->get_usr_data($email);
                    if(!$exists)
                    {
                        $data = array("response"=>"error", "return"=>0);
                        echo json_encode($data);
                        exit();
                    }
                    else
                    {
                        $exists = mysqli_fetch_array($exists);
                        session_start();
                        $_SESSION['uid'] = $exists['uid'];
                        $_SESSION['name'] = $exists['fname'];
                        $_SESSION['email'] = $exists['email'];
                    }
                    $data = array("response"=>"pass", "password"=>1);
                    echo json_encode($data);
                }
                else
                {
                    $data = array("response"=>"fail", "password"=>0);
                    echo json_encode($data);
                }
            }
            else
            {
                $data = array("response"=>"NotFound", "password"=>-1);
                echo json_encode($data);
            }
        }
    }
?>