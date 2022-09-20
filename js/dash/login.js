$(document).ready(function(){

    $('#btn-login').click(() => {
        checkData();
    })

    const checkData = () => {

        const username = $('#username').val();
        const password = $('#password').val();

        $.ajax({
            type : "POST",
            url : "../../php/login/LoginCheck.php",
            data : `username=${username}&password=${password}&check=${check}`,
            dataType : "JSON",
            success : (response) => {

                console.log(response);

                if( response.status == 1 ){
                    document.location.href = 'dashbor.html';
                    document.cookie = "id="
                }else{
                    document.getElementById('message').innerHTML = `<i>${response.msg}</i>`;
                }
            }
        })

    }

})