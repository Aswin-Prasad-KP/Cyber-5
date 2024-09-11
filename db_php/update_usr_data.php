<?php
    require_once("./dbcon.php");
    $obj = new DBCon();
    if(isset($_POST["uid"]))
    {
        $uid = $_POST["uid"];
        $res = $obj->get_usr($uid);
        if($res)
        {
            if(isset($_POST["fname"]) && isset($_POST["lname"]) && isset($_POST["email"]) && isset($_POST["submit"]))
            {
                $fname = $_POST["fname"];
                $lname = $_POST["lname"];
                $email = $_POST["email"];
                $res = $obj->update_usr($uid,$fname,$lname,$email);
                if($res)
                {
                    $data = array("response"=>1, "return"=>'Success');
                    echo json_encode($data);
                }
                else
                {
                    $data = array("response"=>0, "return"=>'not Update');
                    echo json_encode($data);
                }
            }
            else
            {
                $data = array("response"=>0, "return"=>'values');
                echo json_encode($data);
            }
        }
        else
        {
            $data = array("response"=>0, "return"=>'regold');
			echo json_encode($data);
        }
    }
?>