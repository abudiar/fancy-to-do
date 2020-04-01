// const { User } = require('./helpers');
// requirejs(['helpers/user'], {

// })
$(document).ready(function (e) {
    // e.preventDefault();
    if (!localStorage.getItem('accessToken'))
        $('#UserPage').show();
    else {
        showListPage();

    }

    $('.switch-button-case.left').click(function () {
        switchLeft();
    })

    $('.switch-button-case.right').click(function () {
        switchRight();
    })

    $('.back').click(function () {
        showListPage();
    })

    $('.logout').click(function () {
        logout();
    })

    $('.form-login').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
        }
        // User.login(data);
        login(data);
    })

    $('.form-register').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            name: $('#registerName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val()
        }
        register(data);
    })

    $('.form-new-todo').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            title: $('#newTitle').val(),
            description: $('#newDescription').val(),
            due_date: formatDateToDB($('#newDate').val()),
            status: null,
        }
        if ($('#newDate').val() == '')
            delete data['due_date'];
        addTodo(data, () => {
            showListPage();
        });
    })

    $('.form-edit-todo').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = $(this).attr('class').split('SPLIT')[1];
        const classArr = $(this).attr('class').split(' ');
        console.log(classArr);
        for (let i in classArr) {
            if (classArr[i].includes('SPLIT'))
                delete classArr[i];
        }
        const classWithoutId = classArr.join(' ');
        console.log(classWithoutId);
        $(this).removeClass();
        $(this).addClass(classWithoutId);

        const data = {
            title: $('#editTitle').val(),
            description: $('#editDescription').val(),
            due_date: formatDateToDB($('#editDate').val())
        }
        if ($('#editDate').val() == '')
            delete data['due_date'];
        updateTodo(id, data, () => {
            showListPage();
        });
    })

    $('#AddTodo').click(function () {
        showNewPage();
    })


    // console.log($('.add-todo.title').height())
    // $('.add-todo.title').css({ 'width': $('.add-todo.title').height() + 'px' });
});


// Methods
function showEditPage(data) {
    hideAll();
    // console.log(data['title'])
    $('.form-edit-todo').addClass(`idSPLIT${data['id']}SPLIT`);
    $('#editTitle').val(`${data['title']}`);
    $('#editDescription').val(`${data['description'] ? data['description'] : ''}`);
    if (data['due_date'] == null) {
        $('#editDate').datepicker({
            format: 'dd/mm/yyyy',
        });
    }
    else {
        $('#editDate').datepicker({
            format: 'dd/mm/yyyy',
            date: new Date(data['due_date'])
        });
        $('#editDate').val(formatDateDisplay(data['due_date']));
    }
    $('#EditPage').show();
}

function showNewPage() {
    hideAll();
    $('#newTitle').val(null);
    $('#newDescription').val(null);
    $('#newDate').val(null);
    $('#newDate').datepicker({
        format: 'dd/mm/yyyy'
    });
    $('#NewPage').show();
}

function showListPage() {
    hideAll();
    $('#ListPage').show();
    $('#TitleUser').html(`Hey ${localStorage.getItem('name')}, `);
    getTodos((data) => {
        $('#SubUser').text(`You have ${data.length} things todo!`);
        $('.list-group.todo-list').html('');
        for (let i in data) {
            const newItem = `<li class="list-group-item">
                <table style="width:100%;color: white;">
                    <tr>
                        <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon" style="padding:20px 25px;">
                            <input type="checkbox" class="form-check-input btn-icon button status idSPLIT${data[i]['id']}SPLIT" style="margin:auto;position:relative;" ${data[i]['status']}>
                        </th>
                        <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon" style="padding:20px 25px;width:100%;text-align:center;">
                            <h5 class="todo-title ${data[i]['status'] == 'checked' ? 'greyed-out' : ''}"style="margin:0;">${data[i]['title']}</h5>
                            <p class="description transition ${data[i]['status'] == 'checked' ? 'checked' : ''}"" >${data[i]['description'] ? data[i]['description'] : ''}</p>
                        </th>
                        <th class="button check idSPLIT${data[i]['id']}SPLIT btn-icon ${data[i]['status'] == 'checked' ? 'greyed-out' : ''}" style="padding:20px 25px;">
                            ${data[i]['due_date'] ? formatDateDisplay(data[i]['due_date']) : ''}
                        </th>
                        <th style="padding:0;background:rgba(0, 0, 0, 0.15);">
                            <nav class="navbar trash transition">
                                <h5 style="margin:0;" class="fas fa-language button transition btn-icon idSPLIT${data[i]['id']}SPLIT"></h5>
                                <h5 style="margin:0;" class="fas fa-edit button transition btn-icon idSPLIT${data[i]['id']}SPLIT"></h5>
                                <h5 style="margin:0;" class="fa fa-trash button transition btn-icon idSPLIT${data[i]['id']}SPLIT" aria-hidden="true"></h5>
                            </nav>
                        </th>
                    </tr>
                </table>
            </li>`
            $('.list-group.todo-list').append(newItem);
        }
        $('.list-group-item').hover(function (e) {
            $('.trash').removeClass("selected");
            $('.description').removeClass("selected");
            $(this).find('.trash').addClass("selected");
            if ($(this).find('.description').text().length > 0) {
                $(this).find('.description').addClass("selected");
            }
        });
        $('.list-group-item').mouseleave(function (e) {
            $('.trash').removeClass("selected");
            $('.description').removeClass("selected");
        });
        $('.button').click(function (e) {
            e.stopPropagation();
            const id = $(this).attr('class').split('SPLIT')[1];
            if ($(this).attr('class').includes('fa-language'));
            else if ($(this).attr('class').includes('fa-edit')) {
                getSingleTodo(id, (data) => {
                    showEditPage(data);
                });
            }
            else if ($(this).attr('class').includes('fa-trash')) {
                deleteTodo(id, () => {
                    showListPage();
                });
            }
            else if ($(this).attr('class').includes('status')) {
                $(this).is(":checked") ?
                    updateTodo(id, { status: 'checked' }, function (e) {
                        showListPage();
                        console.log(this)
                        $(this).click();
                    }) :
                    updateTodo(id, { status: null }, function (e) {
                        showListPage();
                        $(this).click();
                    });
            }
            else if ($(this).attr('class').includes('check')) {
                console.log(id, $(this).parent().find('.status').is(":checked"))
                $(this).parent().find('.status').is(":checked") ?
                    updateTodo(id, { status: null }, function (e) {
                        showListPage();
                        console.log(this)
                        $(this).click();
                    }) :
                    updateTodo(id, { status: 'checked' }, function (e) {
                        showListPage();
                        $(this).click();
                    });
            }
        });
    })
}

function showUserPage() {
    hideAll();
    $('#UserPage').show();
}

function hideAll() {
    $('#ListPage').hide();
    $('#UserPage').hide();
    $('#NewPage').hide();
    $('#EditPage').hide();
}

function switchLeft() {
    $('.switch-button-case.left').addClass("active-case");
    $('.switch-button-case.right').removeClass("active-case");
    $('.switch-button-case.right').addClass("not-active");
    $('.switch-button-case.left').removeClass("not-active");
    $('.switch-button .active').css("left", "0%");
    $('.switch-button .active').css("backgroundPosition", "0%");
    $('.login').removeClass("hidden");
    $('.login').addClass("visible");
    $('.register').removeClass("visible");
    $('.register').addClass("hidden");
}

function switchRight() {
    $('.switch-button-case.right').addClass("active-case");
    $('.switch-button-case.left').removeClass("active-case");
    $('.switch-button-case.left').addClass("not-active");
    $('.switch-button-case.right').removeClass("not-active");
    $('.switch-button .active').css("left", "50%");
    $('.switch-button .active').css("backgroundPosition", "100%");
    $('.login').removeClass("visible");
    $('.login').addClass("hidden");
    $('.register').removeClass("hidden");
    $('.register').addClass("visible");
}

function formatNumber(numStr) {
    if (numStr < 10)
        return `0${numStr}`;
    return numStr;
}

function formatDateDisplay(dateStr) {
    const date = new Date(dateStr)
    return `${formatNumber(date.getDate())}/${Number(formatNumber(date.getMonth())) + 1}/${date.getFullYear()}`
}

function formatDateToDB(dateStr) {
    const dateArr = dateStr.split('/');
    console.log(`${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`)
    return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;
    const data = {
        token
    }
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/social/google',
        data
    })
        .done(function (response) {
            login(data);
        })
        .fail(function (response) {
            alert(response.responseText);
        })
}

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
            let { accessToken, name } = response
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('name', name)
            showListPage();
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
    showUserPage();
}



function getTodos(cb) {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:3000/todos',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function addTodo(data, cb) {
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/todos',
        headers: {
            accessToken: localStorage.getItem('accessToken')
        },
        data
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {

            checkJWT(response);
        })
}

function getSingleTodo(id, cb) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            console.log(response)
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function updateTodo(id, data, cb) {
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        },
        data
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function deleteTodo(id, cb) {
    $.ajax({
        method: 'DELETE',
        url: `http://localhost:3000/todos/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        }
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function translateTodo(id, data, cb) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/todos/translate/${id}`,
        headers: {
            accessToken: localStorage.getItem('accessToken')
        },
        data
    })
        .done(function (response) {
            cb(response);
        })
        .fail(function (response) {
            checkJWT(response);
        })
}

function checkJWT(response) {
    if (response.responseJSON.name == "JsonWebTokenError") {
        alert('Please login!');
        logout();
    }
    else
        alert(response.responseText);
}