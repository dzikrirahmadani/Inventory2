$(document).ready(function(){

    // cek session login
    const session = sessionStorage.getItem('id');
    if( !session ){
        document.location.href = '../login.html';
    }

    // Event ketika tombol logout di klik
    const btn_out = document.querySelector('#btn-out');
    btn_out.addEventListener('click', () => {
        if( confirm('Apakah Yakin Ingin Keluar ?') ){
            logout();
        }
    })

    const logout = () => {

        sessionStorage.removeItem('id');
        sessionStorage.removeItem('I');

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
        document.location.href = 'kategori.html';
    }

    function prosesUbahData() {
        const id_kategori = getUrlVars('data');
        const nm_kategori = $('#kategori').val();

        const message = document.getElementById('notif');
        const pesan = document.querySelector('.pesan');
        const text = document.querySelector('.message');
        
        $.ajax({
            type : "POST",
            url : "../../php/kategori/UbahKategori.php",
            data : `id_kategori=${id_kategori}&nm_kategori=${nm_kategori}`,
            dataType : "JSON",
            success : function(response){
                if( response.status == '1' ){
                    message.style.transition = 'all 5s 5s ease-in-out';
                    message.style.opacity = '1';
                    message.style.display = 'flex';
                    pesan.style.top = '10%';
                    text.innerHTML = `<h1 class='capitalize'>${response.msg}</h1>`;
                    resetForm();
                    setTimeout(() => {
                        document.location.href = 'kategori.html';
                        message.style.display = 'none';
                        message.style.opacity = '0';
                        pesan.style.top = '-100rem';
                    }, 2000)
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