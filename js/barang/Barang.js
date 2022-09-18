$(document).ready(function(){
    ReadData();

    function ReadData(){
        $.ajax({
            type : "GET",
            url : "php/barang/DataBarang.php",
            dataType: "JSON",
            success : function(response){
                let barang = '';
                for( let i = 0; i < response.length; i++ ){
                    barang += showTable(response, i);
                }
                
                $('#targetData').append(barang);

                $('#btn-ubah').click(function(){
                    let id_brg = this.dataset.id;
                    document.location.href = `ubah-barang.html?data=${id_brg}`;
                })
            },

        })

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
                        <button class='btn-edit px-4 p-2 bg-green-600 text-white rounded-lg' data-id="${response[i].id_brg}" id="btn-ubah">Ubah</button>
                        <button class='btn-hapus px-4 p-2 bg-orange-600 text-white rounded-lg' id='${response[i].id_brg}'>Hapus</button>
                    </td>
                </tr>`;
    }
})