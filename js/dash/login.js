const session = sessionStorage.getItem('id');
if( session ){
    document.location.href = 'dash/dashbor.html';
}

$(document).ready(function(){

    $('#btn-login').click(() => {
        checkData();
    })

    // const getCookie = (cname) => {
    //     let name = cname + "=";
    //     let ca = document.cookie.split(';');
    //     for( let i = 0; i < ca.length; i++ ){
    //         let c = ca[i];
    //         while(c.charAt(0)== ''){
    //             c = c.substring(1);
    //         }

    //         if( c.indexOf(name) == 0 ){
    //             return c.substring(name.length, c.length);
    //         }
    //     }

    //     return "";
    // }

    // if( getCookie('id') ){
    //     document.location.href = 'dash/dashbor.html';
    // }

    const checkData = () => {

        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            type : "POST",
            url : "../php/login/LoginCheck.php",
            data : `username=${username}&password=${password}&check=${check}`,
            dataType : "JSON",
            success : (response) => {
                if( response.status == 1 ){
                    document.location.href = 'dash/dashbor.html';
                    sessionStorage.setItem("id", response.hash);
                    sessionStorage.setItem("I", response.id_admin);
                }else{
                    document.getElementById('message').innerHTML = `<i>${response.msg}</i>`;
                }
            }
        })

    }

})