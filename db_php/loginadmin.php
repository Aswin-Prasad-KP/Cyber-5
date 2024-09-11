<?php
    require_once("dbcon.php");
    $obj = new DBCon();
    session_start();
    if(isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["hidden"]))
    {
        $email = $_POST["email"];
        $pass = $_POST["pass"];
        $check = false;
        
        if(isset($_POST["submit"]))
        {
            $res = $obj->admin_login($email);
            if($res !== false)
            {
                $res_pass = mysqli_fetch_array($res);
                if(password_verify($pass, $res_pass['pwd']))
                {
                    $_SESSION["admin_user"] = $res_pass["name"];
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