$(document).ready(function(){
    ReadData();

    function ReadData(){

        $.ajax({
            type : "GET",
            url : "php/Data.php",
            dataType: "JSON",
            success : function(response){
                let barang = '';
                for( let i = 0; i < response.length; i++ ){
                    barang += showTable(response, i);
                }
                
                $('#targetData').append(barang);
            }
        })

    }

    function CreateData(){

    }

    function showTable(response, i){
        return `<tr>
                    <td>${i+1}</td>
                    <td>${response[i].kd_brg}</td>
                    <td>${response[i].nm_brg}</td>
                    <td>${response[i].nm_kategori}</td>
                    <td>${response[i].satuan}</td>
                    <td>${response[i].stok}</td>
                    <td>${response[i].nm_merk}</td>
                    <td>${response[i].spesifikasi}</td>
                    <td>
                        <button class='btn-edit' id='${response[i].id_brg}'>Ubah</button>
                        <button class='btn-hapus' id='${response[i].id_brg}'>Hapus</button>
                    </td>
                </tr>`;
    }

})