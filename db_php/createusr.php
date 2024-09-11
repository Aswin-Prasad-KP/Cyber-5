<?php
	require_once("dbcon.php");
	$obj = new DBCon();
	if(isset($_POST["hidden"]))
	{
		session_start();
		if(isset($_SESSION["verify"]))
		{
			if(isset($_POST["fname"]) && isset($_POST["email"]) && isset($_POST["pass"]) && isset($_POST["cpass"]))
			{
				$fname = $_POST["fname"];
				$lname = $_POST["lname"];
				$email = $_POST["email"];
				$pass = $_POST["pass"];
				$cpass = $_POST["cpass"];
				$imgname = $_FILES["image"]["name"];
				$img = "";
				$target_file = "";
				$tmp = "";
				$check = false;
				if($imgname != "")
				{
					$tmp = explode(".",$imgname);
					if(end($tmp) == "jpeg" || end($tmp) == "jpg" || end($tmp) == "png")
					{
						$img = md5($email).".".end($tmp);
						$check = getimagesize($_FILES["image"]["tmp_name"]);
					}
					else
					{
						$img = "defimg.png";
						$check = true;
					}
				}
				else
				{
					$img = "defimg.png";
					$check = true;
				}
				$target_file = "../public/images/".$img;

				if(isset($_POST["submit"]))
				{
					$usrCheck = false;
					$usrCheck = $obj->usr_check($email);
				
					if($usrCheck !== true)
					{
						if($pass == $cpass)
						{
							$addUser = true;
							$addUser = $obj->add_user($fname, $lname, $email, $pass, $img);
							if(($check !== false) && $addUser)
							{
								if($img != "defimg.png")
								{
									move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
								}
								session_destroy();
								$data = array("response"=>1, "return"=>'success');
								echo json_encode($data);
							}
						}
						else
						{
							$data = array("response"=>0, "return"=>'password');
							echo json_encode($data); 
						}
					}
					else {
						$data = array("response"=>0, "return"=>'email');
						echo json_encode($data);
					}
				}
			}
		}
		else 
		{
			$data = array("response"=>0, "return"=>'email');
			echo json_encode($data);
			exit();
		}
	}
?>