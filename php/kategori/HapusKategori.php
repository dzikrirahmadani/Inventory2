<?php
require_once './../config.php';

if( $_POST ){

    $id_kategori = htmlspecialchars($_POST['id_kategori']);

    $query = "DELETE FROM tbl_kategori WHERE id_kategori = '$id_kategori'";
    $sql = mysqli_query($conn, $query);

    if( $sql ){
        $result['status'] = '1';
        $result['msg'] = "Data Berhasil Dihapus !";
    }else{
        $result['status'] = '0';
        $result['msg'] = mysqli_error($conn);
    }

    echo json_encode($result);
}
