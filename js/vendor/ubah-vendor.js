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
        document.location.href = 'vendor.html';
    }

    function prosesUbahData() {

        const id_vendor = getUrlVars('data');
        const nm_vendor = $('#nm_vendor').val();
        const alamat = $('#alamat').val();
        const no_telp = $('#no_telp').val();
        
        $.ajax({
            type : "POST",
            url : "../../php/vendor/ProsesUbahData.php",
            data : `id_vendor=${id_vendor}&nm_vendor=${nm_vendor}&alamat=${alamat}&no_telp=${no_telp}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout( () => {
                        document.location.href = 'vendor.html';
                    }, 500);
                }else{
                    alert(response.msg);
                }
            }
        })

    }

    $('#btn-ubah').click(() => {
        prosesUbahData();
    })

    const ReadData = () => {
        
        const id_vendor = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "../../php/vendor/GetSingleData.php",
            data : `id_vendor=${id_vendor}`,
            dataType : "JSON",
            success : function(response) {
                $('#nm_vendor').val(response.nm_vendor);
                $('#alamat').val(response.alamat);
                $('#no_telp').val(response.no_telp);
            }
        })

    }

    const resetForm = () => {
        $('#nm_vendor').val('');
        $('#alamat').val('');
        $('#no_telp').val('');
    }
    ReadData();
}) 