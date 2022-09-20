// cek session login
const session = sessionStorage.getItem('id');
if( !session ){
    document.location.href = '../login.html';
}

$(document).ready(function(){

    const ReadData = async () => {

        const url = "../../php/vendor/GetData.php";
        await fetch(url,{
            method : "GET",
        })
        .then(response => {
            if( !response.ok ){
                alert('Ada Masalah Di Server !');
            }
            return response.json();
        })
        .then(response => {
            let vendor = '';
            for( let i = 0; i < response.length; i++){
                vendor += showTable(response, i);
            }
            
            document.getElementById('targetData').innerHTML = vendor;
    
            // Event ketika Tombol 
            const btn_ubah = document.querySelectorAll('#btn-ubah');
            btn_ubah.forEach(el => {
                el.addEventListener('click', function() {
                    const id_vendor = this.dataset.id;
                    document.location.href = `ubah-vendor.html?data=${id_vendor}`;
                })
            })

            // Event ketika tombol hapus di klik 
            const btn_del = document.querySelectorAll('#btn-hapus');
            btn_del.forEach(el => {
                el.addEventListener('click', function(){
                    if( confirm('Apakah yakin ingin menghapus ?') ){
                        const id_vendor = this.dataset.id;
                        DeleteData(id_vendor);
                    }
                })
            })
        })
    }

    const DeleteData = (id_vendor) => {
        $.ajax({
            type : "POST",
            url : "../../php/vendor/HapusData.php",
            data : `id_vendor=${id_vendor}`,
            dataType : "JSON",
            success : function(response) {
                if( response.status == '1' ){
                    alert(response.msg);
                    ReadData();
                }else{
                    alert(response.msg);
                }
            }
        })
    }

    const showTable = (response, i) => {
        return `
            <tr>
                <td>${response[i].id_vendor}</td>
                <td>${response[i].nm_vendor}</td>
                <td>${response[i].alamat}</td>
                <td>${response[i].no_telp}</td>
                <td class="flex">
                    <button class='btn-edit px-2 p-1 bg-green-600 text-white rounded-[3px]' data-id="${response[i].id_vendor}" id="btn-ubah">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>
                    <button class='ml-1 btn-hapus px-2 p-1 bg-orange-600 text-white rounded-[3px]' data-id="${response[i].id_vendor}" id='btn-hapus'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </td>
            </tr>`;
    }

    ReadData();
})