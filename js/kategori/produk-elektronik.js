$(document).ready(function(){

    function ReadData(){

        $.ajax({
            type : "POST",
            url : "../../php/kategori/GetData.php",
            data : "id_kategori=1",
            dataType : "JSON",
            success : function(response){
                let kategori_barang = '';
                for(let i = 0; i < response.length; i++){
                    kategori_barang += showTable(response, i);
                }
                document.getElementById('targetData').innerHTML = kategori_barang;

                // Event ketika Tombol ubah di klik
                const btn_ubah = document.querySelectorAll('#btn-ubah');
                btn_ubah.forEach(el => {
                    el.addEventListener('click', function() {
                        let id = this.dataset.id;
                        document.location.href = `../barang/ubah-barang.html?data=${id}`;
                    })
                })

                // Event ketika tombol delelte di klik 
                const btn_del = document.querySelectorAll('#btn-hapus');
                btn_del.forEach(el => {
                    el.addEventListener('click', () => {
                        if( confirm('Apakah Yakin Ingin Menghapus ?') ){
                            let id = el.dataset.id;
                            hapusData(id);
                        }
                    })
                })

            }

        })

    }

    function hapusData(id){
        let id_brg = id;
        $.ajax({    
            type : "POST",
            url : "../../php/barang/hapusData.php",
            data : `id_brg=${id_brg}`,
            dataType : "JSON",
            success : function(response) {
                if( response.status == '1' ){
                    alert(response.msg);
                    ReadData();
                }else{
                    alert(response.msg);
                    ReadData();
                }
            }
        })
    }

    function showTable(response, i){
        return `
            <tr>
                <td>${response[i].kd_brg}</td>
                <td>${response[i].nm_brg}</td>
                <td>${response[i].nm_kategori}</td>
                <td>${response[i].satuan}</td>
                <td>${response[i].stok}</td>
                <td>${response[i].nm_merk}</td>
                <td>${response[i].spesifikasi}</td>
                <td>
                    <button class='btn-edit px-4 p-2 bg-green-600 text-white rounded-lg' data-id="${response[i].id_brg}" id="btn-ubah">Ubah</button>
                    <button class='btn-hapus px-4 p-2 bg-orange-600 text-white rounded-lg' data-id="${response[i].id_brg}" id='btn-hapus'>Hapus</button>
                </td>
            </tr>`;
    }
    ReadData();
})