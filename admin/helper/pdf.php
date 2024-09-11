<?php
    session_start();
    include("../../db_php/dbcon.php");
    $con = new DBCon();
    if(isset($_POST["retrieve"]))
    {
        $res = $con->get_all_pdf();
        echo '
            <div class="order">
                <div class="head">
                    <h3>PDFs</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>FID</th>
                            <th>Name</th>
                            <th>File</th>
                        </tr>
                    </thead>
                    <tbody>
        ';
        if($res !== false)
        {
            while($row = mysqli_fetch_assoc($res))
            {
                // $link = '../Materials/'.$row[''];
                echo '
                    <tr>
                        <td>'.$row['fid'].'</td>
                        <td>'.$row['fname'].'</td>
                        <td>'.$row['location'].'</td>
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

    if(isset($_POST['add']))
    {
        echo '
            <div class="order">
                <div class="head">
                    <h3>Upload PDF</h3>
                </div>
                <div class="input-group mb-3">
                    <input type="file" accept=".pdf" class="form-control" id="inputGroupFile01">
                    <a class="btn-download" id="btn" onclick="upload(`pdf`)">
                        <i class="fa-solid fa-file-circle-plus"></i>
                        <span class="text" id="action">Redact</span>
                    </a>
                    </div>
            </div>
        ';
    }
?>