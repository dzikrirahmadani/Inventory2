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
    
    function hapusData(){
        let id_brg = getUrlVars('data');
        $.ajax({    
            type : "POST",
            url : "../../php/barang/hapusData.php",
            data : `id_brg=${id_brg}`,
            dataType : "JSON",
            success : function(response) {
                if( response.status == '1' ){
                    alert(response.msg);
                    document.location.href = 'barang.html';
                }else{
                    alert(response.msg);
                    document.location.href = 'barang.html';
                }
            }
        })
    }
    
    hapusData();
})