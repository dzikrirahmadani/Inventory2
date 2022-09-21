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
        document.location.href = 'ruangan.html';
    }

    const getSingleData = () => {

        const id_ruangan = getUrlVars('data');
        $.ajax({
            type : "POST",
            url : "../../php/ruangan/GetSingleData.php",
            data : `id_ruangan=${id_ruangan}`,
            dataType : "JSON",
            success : (response) => {
                
                // Tambah Kan response ke komponent html
                $('#kd_ruangan').val(response.kd_ruangan);
                $('#nm_ruangan').val(response.nm_ruangan);
                $('#spesifikasi').val(response.spesifikasi);

                // Event ketika tombol submit di klik
                document.getElementById('submit').addEventListener('click', () => {
                    prosesUbahData(response.id_ruangan);
                })
            } 
        })

    }

    const prosesUbahData = (id_ruangan) => {

        const kd_ruangan = $('#kd_ruangan').val();
        const nm_ruangan = $('#nm_ruangan').val();
        const spesifikasi = $('#spesifikasi').val();

        if( !kd_ruangan || !nm_ruangan || !spesifikasi ){
            alert('Yang anda masukan kosong !');
        }else{
            $.ajax({
                type : "POST",
                url : "../../php/ruangan/UbahData.php",
                data : `id_ruangan=${id_ruangan}&kd_ruangan=${kd_ruangan}&nm_ruangan=${nm_ruangan}&spesifikasi=${spesifikasi}`,
                dataType : "JSON",
                success : (response) => {
                    if( response.status == '1' ){
                        alert(response.msg);
                        resetForm();
                        setTimeout(() => {
                            document.location.href = 'ruangan.html';
                        }, 500);
                    }
                }
            })
        }

    }

    const resetForm = () => {
        $('#kd_ruangan').val('');
        $('#nm_ruangan').val('');
        $('#spesifikasi').val('');
    }

    getSingleData();
})