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

    const prosesHapusData = (id_ruangan) => {

        $.ajax({
            type : "POST",
            url : "../../php/ruangan/HapusData.php",
            data : `id_ruangan=${id_ruangan}`,
            dataType : "JSON",
            success : (response) => {
                if( response.status == '1'){
                    alert(response.msg);
                    readData();
                }else{
                    alert(response.msg);
                }
            }
        })

    }

    const readData = async () => {
        
        const url = "../../php/ruangan/GetDataRuangan.php";
        await fetch(url, {method : "GET"})
        .then(response => {
            if (!response.ok){
                alert('Server Bermasalah !');
            }
            return response.json();
        })
        .then(response => {

            // Add ke halaman ruangan
            let ruangan = '';
            for( let i = 0; i < response.length; i++ ){
                ruangan += showTable(response, i);
            }
            document.getElementById('targetData').innerHTML = ruangan;

            // Event ketika tombol ubah di klik
            const btn_ubah = document.querySelectorAll('#btn-ubah');
            btn_ubah.forEach(el => {
                el.addEventListener('click', function(){
                    const id_ruangan = this.dataset.id;
                    document.location.href = `ubah-ruangan.html?data=${id_ruangan}`;
                })
            })

            // Event ketika tombol hapus di klik
            const btn_hapus = document.querySelectorAll('#btn-hapus');
            btn_hapus.forEach(el => {
                el.addEventListener('click', function(){
                    const id_ruangan = this.dataset.id;
                    if( confirm("Apakah Anda Yakin Ingin Menghapus Data ?") ){
                        prosesHapusData(id_ruangan);
                    }
                })
            })

        })

    }

    const showTable = (response, i) => {
        return `
            <tr>
                <td>${response[i].kd_ruangan}</td>
                <td>${response[i].nm_ruangan}</td>
                <td>${response[i].spesifikasi}</td>
                <td class="aksi">
                    <button class='btn-edit px-2 p-1 bg-green-600 text-white rounded-[3px]' data-id="${response[i].id_ruangan}" id="btn-ubah">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                    <button class='ml-1 btn-hapus px-2 p-1 bg-orange-600 text-white rounded-[3px]' data-id="${response[i].id_ruangan}" id='btn-hapus'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>`;
    }
    readData();

})