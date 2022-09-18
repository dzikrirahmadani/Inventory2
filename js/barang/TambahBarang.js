$(document).ready(function(){
    
    getKategori();
    getGenerateKdBrg();
    getSatuan();
    getMerk();

    $('#submit').click(function(){
        tambahData();
    })
    function tambahData(){

        const kd_barang = $('#kd_brg').val();
        const nama_barang = $('#nama').val();
        const merk = $('#merk').val();
        const satuan = $('#satuan').val();
        const stok = $('#stok').val();
        const kategori = $('#kategori').val();
        const spesifikasi = $('#spesifikasi').val();

        $.ajax({
            type : "POST",
            url : "php/barang/TambahDataBarang.php",
            data : `kd_brg=${kd_barang}&nama_barang=${nama_barang}&merk=${merk}&satuan=${satuan}&stok=${stok}&kategori=${kategori}&spesifikasi=${spesifikasi}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'barang.html';
                    }, 1000);
                }else{
                    alert(response.msg);
                    resetForm();
                }
            }
        })
    }

    function getGenerateKdBrg(){
        $.ajax({
            type : "GET",
            url : "php/barang/Get_kd_brg.php",
            dataType : "JSON",
            success : function(response){
                let kd_barang = response;
                $('#kd_brg').attr('value', `${kd_barang}`);
            }
        })
    }

    function getSatuan(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetSatuanData.php",
            dataType : "JSON",
            success : function(response){
                let satuan = '';
                for(let i = 0; i < response.length; i++){
                    satuan += getShowSatuan(response, i);
                }
                $('#satuan').append(satuan);
            }
        })

    }

    function getKategori(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetKategoriData.php",
            dataType : "JSON",
            success : function(response){
                let kategori = '';
                for(let i = 0; i < response.length; i++){
                    kategori += getShowKategori(response, i);
                }
                
                $('#kategori').append(kategori);
            }
        })
    }

    function getMerk(){
        $.ajax({
            type : "GET",
            url : "php/barang/GetMerk.php",
            dataType : "JSON",
            success : function(response){
                let merk = '';
                for(let i = 0; i < response.length; i++){
                    merk += getShowMerk(response, i);
                }
                $('#merk').append(merk);
            }
        })
    }

    function getShowMerk(response, i){
        return `<option value="${response[i].id_merk}">${response[i].nm_merk}</option>`
    }

    function getShowKategori(response, i){
        return `<option value="${response[i].id_kategori}">${response[i].nm_kategori}</option>`;
    }

    function getShowSatuan(response, i){
        return `<option value="${response[i].id_satuan}">${response[i].satuan}</option>`;
    }

    function resetForm(){
        const kd_barang = $('#kd_brg').val('');
        const nama_barang = $('#nama').val('');
        const merk = $('#merk').val('');
        const satuan = $('#satuan').val('');
        const kategori = $('#kategori').val('');
        const spesifikasi = $('#spesifikasi').val('');  
    }
})
