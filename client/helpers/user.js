function register(data) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data
    })
        .done(function (response) {
            login(data);
        })
        .fail(function (response) {
            alert(response.responseText);
        })
}

function login(data) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
        data
    })
        .done(function (response) {
            let { accessToken } = response
            localStorage.setItem('accessToken', accessToken)
            $('#UserPage').hide();
        })
        .fail(function (response) {
            alert(response.responseText);
        })
}

function logout() {
    localStorage.removeItem('accessToken');
    $('#loginEmail').val('');
    $('#loginPassword').val('');
    $('#registerName').val('');
    $('#registerEmail').val('');
    $('#registerPassword').val('');
    $('#UserPage').show();
}