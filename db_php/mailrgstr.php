<?php
    require_once("dbcon.php");
    $con = new DBCon();

    if(isset($_POST["email"]) && isset($_POST["register"]))
    {
        $email = $_POST["email"];
        if(isset($_POST["register"]))
        {
            $avail = $con->check_mail($email);
            if($avail === false)
            {
                $res = $con->send_otp($email);
                if($res)
                {
                    $data = array("response"=>"Success", "email"=>1);
                    echo json_encode($data);
                }
            }
            else
            {
                $data = array("response"=>"Already Exist", "email"=>-1);
                echo json_encode($data);
            }
        }
        exit();
    }
    
    if(isset($_POST["email"]) && isset($_POST["otp"]))
    {
        $email = $_POST["email"];
        $otp = $_POST["otp"];
        $valid = $con->check_otp($email);
        if($valid !== false)
        {
            if($otp == $valid['otp'])
            {
                session_start();
                $_SESSION["verify"] = "Verified";
                $con->rm_otp($email);
                $data = array("response"=>"Success", "otp"=>1);
                echo json_encode($data);
            }
            else
            {
                $data = array("response"=>"Fail", "otp"=>0);
                echo json_encode($data);
            }
        }
        else
        {
            $data = array("response"=>"Not Exist", "otp"=>-1);
            echo json_encode($data);
        }
        exit();
    }
?>