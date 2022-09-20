$(document).ready(function(){

    const readData = async () => {
        const url = "../../php/pengajuan/GetData.php";
        await fetch(url, {method:"GET"})
        .then(response => {
            if( !response.ok ){
                alert('Sever bermasalah !');
            }
            return response.json()
        })
        .then(response => console.log(response))
    }

    readData();
})