$(document).ready(function(){

    $('#btn-login').click(() => {
        checkData();
    })

    const checkData = () => {

        const username = $('#username').val();
        const password = $('#password').val();
        const check = $('#check');

        $.ajax({
            type : "POST",
            url : "../../php/login/LoginCheck.php",
            data : `username=${username}&password=${password}&check=${check}`,
            dataType : "JSON",
            success : (response) => {
                if( response.status == 1 ){
                    document.location.href = 'dashbor.html';
                }else{
                    document.getElementById('message').innerHTML = `<i>${response.msg}</i>`;
                }
            }
        })

    }

})