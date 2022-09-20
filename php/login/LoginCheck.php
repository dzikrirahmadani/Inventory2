<?php
require_once './../config.php';

if( $_POST ){

    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $check = htmlspecialchars($_POST['check']);

    $query = "SELECT username, password FROM tbl_admin WHERE username = '$username' && password = '$password'";
    $sql = mysqli_query($conn, $query);

    if( $sql->num_rows > 0 ){
        $row = mysqli_fetch_assoc($sql);
        $result['status'] = '1';
        $result['msg'] = "Login Berhasil !";
        $result['enkripsi'] = hash('md5', $row);
    }else{
        $result['status'] = '0';
        $result['msg'] = "username / password salah !";
    }

    echo json_encode($result);
}