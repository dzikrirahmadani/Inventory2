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
        const id_kategori = getUrlVars('data');
        const nm_kategori = $('#kategori').val();
        
        $.ajax({
            type : "POST",
            url : "../../php/kategori/UbahKategori.php",
            data : `id_kategori=${id_kategori}&nm_kategori=${nm_kategori}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'kategori.html';
                    }, 500)
                }else{
                    alert(response.msg);
                }
            }
        })

    }

    $('#submit').click(() => {
        prosesUbahData();
    })

    const ReadData = () => {
        
        const id_kategori = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "../../php/kategori/GetSingleData.php",
            data : `id_kategori=${id_kategori}`,
            dataType : "JSON",
            success : function(response) {
                $('#kategori').val(response.nm_kategori);
            }
        })

    }

    const resetForm = () => {
        $('#kategori').val('');
    }
    ReadData();
})