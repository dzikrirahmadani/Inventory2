// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

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
        document.location.href = 'satuan.html';
    }

    const singleData = () => {

        const id_satuan = getUrlVars('data');
        
        $.ajax({
            type : "POST",
            url : "../../php/satuan/GetSingleData.php",
            data : `id_satuan=${id_satuan}`,
            dataType : "JSON",
            success : function(response) {
                $('#satuan').val(response.satuan);

                // EVENT KETIKA TOMBOL SUBMIT DI KLIK
                $('#submit').click(function(){
                    prosesUbahData(response.id_satuan);
                })
            }
        })

    }

    const prosesUbahData = (id_satuan) => {

        const satuan = $('#satuan').val();

        $.ajax({
            type : "POST",
            url : "../../php/satuan/UbahData.php",
            data : `id_satuan=${id_satuan}&satuan=${satuan}`,
            dataType : "JSON",
            success : function(response){
                if( response.status = '1' ){
                    alert(response.msg);
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'satuan.html';
                    }, 500);
                }else{
                    alert(response.msg);
                }
            }
        })
    }

    const resetForm = () => {
        $('#satuan').val('');
    }

    singleData();
})