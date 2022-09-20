$(document).ready(function(){

    function getUrlVars(param=null){
        if(param !== null){
            let vars = [], hash;
            let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
            for(let i = 0; i < hashes.length; i++){
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }  
            return vars[param];
        }else{
            return null;
        }
    }

    function getMerk(id=null){
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetMerk.php",
            dataType : "JSON",
            success : function(response){
                let merk = '';
                for(let i = 0; i < response.length; i++){
                    if(response[i].id_merk != id){
                        merk += `<option value="${response[i].id_merk}">${response[i].nm_merk}</option>`;
                    }else{
                        merk += `<option value="${response[i].id_merk}" selected>${response[i].nm_merk}</option>`;
                    }
                }
                $('#merk').append(merk);
            }
        })
    }

    function getKategori(id=null){
        console.log(id)
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetKategoriData.php",
            dataType : "JSON",
            success : function(response){
                let kategori = '';
                for(let i = 0; i < response.length; i++){
                    console.log(response[i].id_kategori);
                    if(response[i].id_kategori != id){
                        kategori += `<option value="${response[i].id_kategori}" >${response[i].nm_kategori}</option>`;
                    }else{
                        kategori += `<option value="${response[i].id_kategori}"  selected>${response[i].nm_kategori}</option>`;
                    }

                }
                
                $('#kategori').append(kategori);
            }
        })
    }

    function ubahData(){

        const id = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "../../php/barang/GetSingleData.php",
            data : `id=${id}`,
            dataType : "JSON",
            success : function(response){
               
                $('#kd_brg').val(response.kd_brg);
                $('#nama').val(response.nm_brg);
                $('#stok').val(response.stok);
                $('#spesifikasi').val(response.spesifikasi);

                getMerk(response.merk);
                getKategori(response.kategori);
                getSatuan(response.satuan);

                $('#submit').click(function(){
                    prosesUbahData(id); 
                })
            }
        })
    }

    function getSatuan( id=null ){
        $.ajax({
            type : "GET",
            url : "../../php/barang/GetSatuanData.php",
            dataType : "JSON",
            success : function(response){
                let satuan = '';
                for(let i = 0; i < response.length; i++){
                    if( response[i].id_satuan != id) {
                        satuan += `<option value="${response[i].id_satuan}">${response[i].satuan}</option>`;
                    }else{
                        satuan += `<option value="${response[i].id_satuan}" selected>${response[i].satuan}</option>`;
                    }
                }
                $('#satuan').append(satuan);
            }
        })

    }

    function prosesUbahData(id) {
        const kd_brg = $('#kd_brg').val();
        const nama_barang = $('#nama').val();
        const merk = $('#merk').val();
        const kategori = $('#kategori').val();
        const satuan = $('#satuan').val();
        const stok = $('#stok').val();
        const spesifikasi = $('#spesifikasi').val();

        if( !kd_brg || !nama_barang || !merk || !kategori || !satuan || !stok || !spesifikasi ){
            alert('Tolong Isi Semua field');
        }{
            $.ajax({
                type : "POST", 
                url : "../../php/barang/UbahData.php",
                data : `id_brg=${id}&kd_brg=${kd_brg}&nama_barang=${nama_barang}&merk=${merk}&satuan=${satuan}&stok=${stok}&kategori=${kategori}&spesifikasi=${spesifikasi}`,
                dataType : "JSON",
                success : function(response) {
                    if( response.status == '1' ){
                        alert(response.msg);
                        resetForm();
                        setTimeout(() => {
                            document.location.href = 'barang.html';
                        }, 1000);
                    }else{
                        alert(response.msg);
                    }
                } 
    
            })
        }
        
    }

    function resetForm(){
        $('#kd_brg').val('');
        $('#nama').val('');
        $('#merk').val('');
        $('#satuan').val('');
        $('#kategori').val('');
        $('#spesifikasi').val('');  
    }
    ubahData();
})