<?php
    // session_start();
    // require_once("dbcon.php");
    // $con = new DBCon();
    // $uid = $_SESSION['uid'];
    // $type = $_POST['upload'];
    // $fln = $_FILES["file"]["name"];
    // $fl = "";
    // $target_file = "";
    // $tmp = "";
    // $check = false;
    // if($fln != "")
    // {
    //     $tmp = explode(".",$fln);
    //     $fl = $uid."".md5($tmp[0]).".".end($tmp);
    //     $check = true;
    //     if($check)
    //     {
    //         $target_file = "../Flask/uploads/".$fl;
    //         if(move_uploaded_file($_FILES["file"]["tmp_name"], $target_file))
    //         {
    //             // $uid = $_SESSION["uid"];
    //             $res = $con->addFile($fl,$uid,$type);
    //             if($res)
    //             {
    //                 $data = array("error"=>"none", "file"=>$fl);
    //                 echo json_encode($data);
    //                 exit();
    //             }
    //             else
    //             {
    //                 $data = array("error"=>"exists", "return"=>'DBUpload');
    //                 echo json_encode($data);
    //                 exit();
    //             }
    //         }
    //         else
    //         {
    //             $data = array("error"=>"exists", "return"=>'fileUpload');
    //             echo json_encode($data);
    //             exit();
    //         }
    //     }
    //     else
    //     {
    //         $data = array("error"=>"exists", "return"=>'fname notfound');
    //         echo json_encode($data);
    //     }
    // }
    // else
    // {
    //     $data = array("error"=>"exists", "return"=>'fname empty');
    //     echo json_encode($data);
    // }
?>

<?php
    session_start();
    require_once("dbcon.php");
    $con = new DBCon();
    $uid = $_SESSION['uid'];  // User ID from session
    $type = $_POST['upload']; // File type from request
    $fln = $_POST['redacted_image']; // Get redacted image file name from Flask response

    if($fln != "")
    {
        // Insert the file name into the database
        $res = $con->addFile($fln, $uid, $type); // Save file name and user info in the database
        if($res)
        {
            $data = array("error" => "none", "file" => $fln);
            echo json_encode($data); // Return success response
            exit();
        }
        else
        {
            $data = array("error" => "exists", "return" => 'DBUpload');
            echo json_encode($data);
            exit();
        }
    }
    else
    {
        $data = array("error" => "exists", "return" => 'fname empty');
        echo json_encode($data);
    }
?>
