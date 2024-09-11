<?php
    session_start();
    require_once("dbcon.php");
    $con = new DBCon();
    if(isset($_POST["setting"]))
    {
        $res = $con->get_usr_info($_SESSION['uid']);
        echo '
            <div class="order">
                <div class="head">
                    <h3>Settings</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th colspan="2">Profile Picture</th>
                            <th>E-mail</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
        ';
        if($res !== false)
        {
            while($row = mysqli_fetch_assoc($res))
            {
                echo '
                        <tr>
                            <td><input type="text" class="fname" value='.$row['fname'].' readonly></td>
                            <td><input type="text" class="lname" value='.$row['lname'].' readonly></td>
                            <td><image src="../public/images/'.$row['img'].'"/></td>
                            <td><input type="file" accept=".jpg,.jpeg,.png"/></td>
                            <td><input type="text" class="email" value='.$row['email'].' readonly></td>
                            <td><input type="button" class="btn-edit" value="Edit" onclick="edit(\''.$row['uid'].'\')" /></td>
                        </tr>
                ';
            }
        }
        else
        {
            echo '
                        <tr>
                            <td colspan="6"><h3 align="center">No Logs Found!</h3</td>
                        </tr>
            ';
        }
        echo '
                    </tbody>
                </table>
            </div>
        ';
    }
?>