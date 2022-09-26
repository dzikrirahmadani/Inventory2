<?php
require_once './../config.php';

$query = "SELECT * FROM tbl_barang ORDER BY id_brg ASC";
$sql = mysqli_query($conn, $query);