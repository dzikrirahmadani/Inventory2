$(document).ready(function(){

    // cek session login
    const session = sessionStorage.getItem('id');
    if( !session ){
        document.location.href = '../login.html';
    }

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
        document.location.href = 'merk.html';
    }

    const singleData = () => {

        const id_merk = getUrlVars('data');
        
        $.ajax({
            type : "POST",
            url : "../../php/merk/GetSingleData.php",
            data : `id_merk=${id_merk}`,
            dataType : "JSON",
            success : function(response) {
                $('#merk').val(response.nm_merk);

                // EVENT KETIKA TOMBOL SUBMIT DI KLIK
                $('#submit').click(function(){
                    prosesUbahData(response.id_merk);
                })
            }
        })

    }

    const prosesUbahData = (id_merk) => {

        const merk = $('#merk').val();

        $.ajax({
            type : "POST",
            url : "../../php/merk/UbahData.php",
            data : `id_merk=${id_merk}&merk=${merk}`,
            dataType : "JSON",
            success : function(response){
                if( response.status = '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'merk.html';
                    }, 500);
                }else{
                    alert(response.msg);
                }
            }
        })
    }

    const resetForm = () => {
        $('#merk').val('');
    }

    singleData();
})