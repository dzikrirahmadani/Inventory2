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
    
    if( getUrlVars('data') == null ){
        document.location.href = 'pengajuan.html';
    }

    const getBarang = async (id=null) => {

        const url = "../../php/pengajuan/GetBarang.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Sever Bermasalah !');
            }
            return response.json();
        })
        .then(response => {

            for( let i = 0; i < response.length; i++ ){

                let barang = '';

                if( response[i].id_brg !== id ){
                    barang += `<option value="${response[i].id_brg}" >${response[i].nm_brg}</option>`;
                }else{
                    barang += `<option value="${response[i].id_brg}" selected >${response[i].nm_brg}</option>`;
                }
                $('#nm_brg').append(barang);

            }

        })

    }

    const getVendor = async (id=null) => {

        const url = "../../php/pengajuan/GetVendor.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if( !response.ok ){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {
            
            let vendor = '';

            for( let i = 0; i < response.length; i++ ){
                if( response[i].id_vendor != id ){
                    vendor += `<option value="${response[i].id_vendor}" >${response[i].nm_vendor}</option>`;
                }else{
                    vendor += `<option value="${response[i].id_vendor}" selected >${response[i].nm_vendor}</option>`;
                }
            }

            $('#vendor').append(vendor);

        })
    }

    const getSingleData = () => {

        const id_pengajuan = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "../../php/pengajuan/GetSingleData.php",
            data : `id_pengajuan=${id_pengajuan}`,
            dataType : "JSON",
            success : (response) => {

                $('#kd_pengajuan').val(response.kode);
                $('#nm_brg').val(response.nm_brg);
                $('#harga_brg').val(response.hrg_beli);
                $('#vendor').val(response.nm_vendor);
                $('#tgl_pengajuan').val(response.tanggal);
                $('#status').val(response.status);

                // dropdown
                getBarang(response.id_brg);
                getVendor(response.id_vendor);

            }
        })

    }

    const prosesUbahData = () => {

        const id_pengajuan = getUrlVars('data');
        const nama_barang = $('#nm_brg').val();
        const hrg_beli = $('#harga_brg').val();
        const vendor = $('#vendor').val();
        const tanggal = $('#tgl_pengajuan').val();
        const status = $('#status').val();

        $.ajax({
            type : "POST",
            url : "../../php/pengajuan/UbahPengajuan.php",
            data : `id_pengajuan=${id_pengajuan}&nm_brg=${nama_barang}&hrg_beli=${hrg_beli}&vendor=${vendor}&tanggal=${tanggal}&status=${status}`,
            dataType : "JSON",
            success : (response) => {
                if( response.status = '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'pengajuan.html';
                    }, 2000)
                }
            }
        })

    }

    const resetForm = () => {
        $('#kd_pengajuan').val('');
        $('#nm_brg').val('');
        $('#harga_brg').val('');
        $('#vendor').val('');
        $('#tgl_pengajuan').val('');
        $('#status').val('');
    }

    getSingleData();

    // event ketika tombol ubah di klik
    $('#submit').click(() => {
        prosesUbahData();
    })
})