<?php
require_once './../config.php';

if( $_POST ){

    $id_admin = htmlspecialchars($_POST['id_admin']);
    $kode = htmlspecialchars($_POST['kode']);
    $tanggal = htmlspecialchars($_POST['tgl_pengajuan']);
    $id_vendor = htmlspecialchars($_POST['vendor']);
    $status = htmlspecialchars($_POST['status']);
    
    $query = "INSERT INTO tbl_pengajuan VALUES('', '$id_admin', '$kode', '$tanggal', '$id_vendor', '$status')";
    $sql = mysqli_query($conn, $query);

    if( $sql ){
        $result['status'] = '1';
        $result['msg'] = "Data Berhasil Ditambahkan !";
    }else{
        $result['status'] = '0';
        $result['msg'] = "Data Gagal Ditambahkan !";
        $result['error'] = mysqli_error($conn);
    }

    echo json_encode($result);
}