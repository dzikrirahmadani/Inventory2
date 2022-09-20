<?php
require_once './../config.php';

if( $_POST ){

    $id_satuan = htmlspecialchars($_POST['id_satuan']);

    $sql = mysqli_query($conn, "DELETE FROM tbl_satuan WHERE id_satuan = '$id_satuan'");

    if( $sql ){
        $result['status'] = '1';
        $result['msg'] = "Data Berhasil Dihapus !";
    }else{
        $result['status'] = '0';
        $result['msg'] = "Data Gagal Dihapus !";
    }

    echo json_encode($result);
}