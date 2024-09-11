<?php

class DBCon
{
	private $host;
	private $db;
	private $usr;
	private $pwd;
	private $con;
	
	function __construct()
	{	
		$this->host = "localhost:3306";
		$this->db = "redact";
		$this->usr = "root";
		$this->pwd = '';
		$this->con = mysqli_connect($this->host, $this->usr, $this->pwd, $this->db);
		if(mysqli_connect_errno())
		{
			echo "Connection Error";
		}
	}

    function sqlReady($input) {
        /*
            Takes -> Any string
            Returns -> Escapes the string
        */
        return mysqli_real_escape_string($this->con, $input);
    }

    function check_mail($email)
	{
        $email = $this->sqlReady($email);
		$qry = "SELECT uid FROM user WHERE email='$email'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

    function send_otp($email)
	{
        $email = $this->sqlReady($email);
		$qry = "SELECT id FROM verify WHERE email='$email'";
		$otp = random_int(100000, 999999);
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		$rand = md5(uniqid(rand(), true));
		if($numrows >= 1)
		{
            $qry = "DELETE FROM verify WHERE email='$email'";
			$res = mysqli_query($this->con, $qry) or die("Error in Query");
		}
        $qry = "INSERT INTO verify(email, otp, token) VALUES ('$email', '$otp', '$rand')";
        $res = mysqli_query($this->con, $qry) or die("Error in Query");
        mail("$email", "Registration OTP", "Your email is valid to register, here your OTP - $otp", "From: contact.redact@support.com");
		return true;
	}

    function check_otp($email)
	{
        $email = $this->sqlReady($email);
		$qry = "SELECT otp FROM verify WHERE email='$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return mysqli_fetch_array($res);
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function rm_otp($email)
	{
        $email = $this->sqlReady($email);
		$qry = "DELETE FROM verify WHERE email='$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
	}

	function add_user($fname, $lname, $email, $pass, $img)
	{
        $fname = $this->sqlReady($fname);
        $lname = $this->sqlReady($lname);
        $email = $this->sqlReady($email);
        $pass = $this->sqlReady($pass);
        $img = $this->sqlReady($img);
		$qry = "INSERT INTO user(fname, lname, email, pwd, img) VALUES ('$fname','$lname','$email','".password_hash($pass, PASSWORD_BCRYPT)."','$img')";
		$res = mysqli_query($this->con, $qry) or die("Unable to Insert User");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	
	function login($email)
	{
		$email = $this->sqlReady($email);
		$qry = "SELECT pwd FROM user WHERE email = '$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else
		{
			return false;
		}
	}

	function get_usr_data($email)
	{
		$email = $this->sqlReady($email);
		$qry = "SELECT uid, fname, email FROM user WHERE email='$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_log($id) {
		$qry = "SELECT * from file WHERE uid = $id ORDER BY fid DESC LIMIT 10";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_images($id) {
		$qry = "SELECT * from file WHERE uid = $id and type = 'image' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_pdf($id) {
		$qry = "SELECT * from file WHERE uid = $id and type = 'pdf' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_doc($id) {
		$qry = "SELECT * from file WHERE uid = $id and type = 'doc' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function addFile($file, $id, $type) {
		$file = $this->sqlReady($file);
		$id = $this->sqlReady($id);
		$type = $this->sqlReady($type);
		$qry = "INSERT INTO file (uid, location, `type`) VALUES ($id, '$file', '$type')";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_usr_info($id)
	{
		$id = $this->sqlReady($id);
		$qry = "SELECT uid, fname, lname, email, img FROM user WHERE uid='$id'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_usr($uid)
	{
		$qry = "SELECT fname from user where uid = $uid";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function update_usr($uid,$fname,$lname,$email)
	{
		$qry = "UPDATE user SET fname = '$fname', lname = '$lname', email = '$email' WHERE uid = $uid";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		return true;
	}


	function admin_login($email)
	{
		$qry = "SELECT pwd, name FROM admin WHERE email = '$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else
		{
			return false;
		}
	}

	function get_all_log() {
		$qry = "SELECT * from file NATURAL JOIN user ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_all_images() {
		$qry = "SELECT * from file NATURAL JOIN user WHERE type = 'image' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_all_pdf() {
		$qry = "SELECT * from file NATURAL JOIN user WHERE type = 'pdf' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_all_doc() {
		$qry = "SELECT * from file NATURAL JOIN user WHERE type = 'doc' ORDER BY fid DESC";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function usr_check($email)
	{
        $email = $this->sqlReady($email);
		$qry = "SELECT uid FROM user WHERE email = '$email'";
		$res = mysqli_query($this->con, $qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if ($numrows == 0)
		{
			return false;
		}
	}

	function stf_check($id)
	{
		$qry = "SELECT name FROM staffs WHERE id = '$id'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if ($numrows == 0)
		{
			$qry = "UPDATE stafflist SET status = 'Registered' WHERE id = '$id'";
			$res = mysqli_query($this->con,$qry) or die("Error in Query");
			return false;
		}
	}

	function valid_check($regno, $dob)
	{
		$qry = "SELECT name FROM studlist WHERE regno = '$regno' AND dob = '$dob'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if ($numrows == 0)
		{
			return false;
		}
	}

	function valid_check_stf($id)
	{
		$qry = "SELECT name FROM stafflist WHERE id = '$id'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if ($numrows == 0)
		{
			return false;
		}
	}

	function get_stu_list()
	{
		$qry = "SELECT * FROM studlist ORDER BY name";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows > 0)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_staff_list()
	{
		$qry = "SELECT * FROM stafflist ORDER BY name";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows > 0)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function add_stu_list($regno, $name, $dob)
	{
		$count = sizeof($regno);
		$qry = "INSERT INTO studlist(regno, name, dob) VALUES ";
		for($i = 0; $i < $count; $i++)
		{
			$qry .= "('".$regno[$i]."', '".$name[$i]."', '".$dob[$i]."')";
			if($i == ($count-1))
			{
				break;
			}
			$qry .= ", ";
		}
		$res = mysqli_query($this->con,$qry) or die("Unable to Insert List");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function add_stf_list($id, $name, $post, $dept)
	{
		$count = sizeof($id);
		$qry = "INSERT INTO stafflist(id, name, posting, dept) VALUES ";
		for($i = 0; $i < $count; $i++)
		{
			$qry .= "('$id[$i]', '$name[$i]', '$post[$i]', '$dept[$i]')";
			if($i == ($count-1))
			{
				break;
			}
			$qry .= ", ";
		}
		$res = mysqli_query($this->con,$qry) or die("Unable to Insert List");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_admin_det($user)
	{
		$qry = "SELECT id, name FROM administrators WHERE name='$user'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows > 0)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function token_insert($email, $token)
	{
		$qry = "UPDATE verify SET token='$token' WHERE email='$email'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		return true;
	}

	function token_chk($email, $token)
	{
		$qry = "SELECT token FROM verify WHERE email='$email'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			$row = mysqli_fetch_assoc($res);
			if($row["token"] == $token)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function update_pass_stu($email, $pass)
	{
		$qry = "UPDATE students SET pass='".password_hash($pass, PASSWORD_BCRYPT)."' WHERE email='$email'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function update_pass_stf($email, $pass)
	{
		$qry = "UPDATE staffs SET pass='".password_hash($pass, PASSWORD_BCRYPT)."' WHERE email='$email'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_stf_data($stfid)
	{
		$qry = "SELECT * FROM staffs WHERE id='$stfid'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_object($id)
	{
		$qry = "SELECT uid from `objects` where teacher_uid ='$id'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_stu($regno)
	{
		$qry = "SELECT name from studlist where regno ='$regno'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function update_stu($regold,$regnew,$name,$dob)
	{
		$qry = "UPDATE studlist SET regno = '$regnew', name = '$name', dob = '$dob' WHERE regno = '$regold'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		return true;
	}

	function get_stf($id)
	{
		$qry = "SELECT name from stafflist where id ='$id'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return true;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function update_stf($idold,$idnew,$name,$post,$dept)
	{
		$qry = "UPDATE stafflist SET id = '$idnew', name = '$name', posting = '$post', dept = '$dept' WHERE id = '$idold'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		return true;
	}

	function get_materials() {
		$qry = "SELECT * from materials";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function deleteMaterial($uid)
	{
		$qry = "DELETE FROM materials WHERE id = $uid";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_other_admins($user) {
		$qry = "SELECT id, name, email from administrators WHERE not id = '$user'";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function add_admin($id,$name,$email) {
		$qry = "INSERT INTO administrators (id, name, email) VALUES ('$id', '$name', '$email')";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function add_timeallocate($dept,$year,$section,$sem,$froms,$ends) {
		$num = count($froms);
		$qry = "INSERT INTO timeallocate (dept, section, semester, year, nperiod";
		for($i = 1;$i <= $num;$i++) {
			$qry .= ", period".$i;
		}
		$qry .= ") VALUES ('$dept',$section,$sem,'$year',$num";
		for($i = 1;$i <= $num;$i++) {
			$qry .= ",'".$froms[$i]."-".$ends[$i]."'";
		}
		$qry .= ")";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_timeallocate($dept,$year,$section,$sem) {
		$qry = "SELECT * FROM timeallocate WHERE dept = '$dept' AND section = $section AND semester = $sem AND year = $year ORDER BY id DESC";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function get_timeallocateT($table_id) {
		$qry = "SELECT * FROM timeallocate WHERE id = $table_id";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows == 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function create_timetable($table_id,$subcodes) {
		$num = count($subcodes["Monday"]);
		$qry = "INSERT INTO timetable (tid, day, period, code) VALUES ";
		foreach($subcodes as $day => $periods) {
			for($i = 1;$i <= $num;$i++) {
				$qry .= "($table_id, '$day', 'period".$i."', '".sqlReady($periods[$i])."')";
				if($day == "Friday" && $i == $num) {
					break;
				}
				$qry .= ", ";
			}
		}
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function get_timetable($table_id) {
		$qry = "SELECT * FROM timetable WHERE tid = $table_id";
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_num_rows($res);
		if($numrows >= 1)
		{
			return $res;
		}
		else if($numrows == 0)
		{
			return false;
		}
	}

	function update_timetable($subcodes,$table_id,$num) {
		$qry = 'UPDATE timetable SET code = CASE ';
		foreach($subcodes as $day => $period) {
			for($i = 1;$i <= $num;$i++)
			{
				$qry .= 'WHEN day = "'.$day.'" AND period = "period'.$i.'" THEN "'.sqlReady($period[$i]).'"';
			}
		}
		$qry .= ' END WHERE tid = '.$table_id;
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function delete_timeallocate($table_id) {
		$qry = 'DELETE FROM timeallocate WHERE id = '.$table_id;
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function delete_timetable($table_id) {
		$qry = 'DELETE FROM timetable WHERE tid = '.$table_id;
		$res = mysqli_query($this->con,$qry) or die("Error in Query");
		$numrows = mysqli_affected_rows($this->con);
		if($numrows >= 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

?>