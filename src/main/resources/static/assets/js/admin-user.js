let indexUser = 0;


function getUser() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/users`,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '<tr>\n' +
                '<th>Full name</th>\n' +
                '<th>Birth</th>\n' +
                '<th>Email</th>\n' +
                '<th>Username</th>\n' +
                '<th>Password</th>\n' +
                '<th>RePassword</th>\n' +
                '<th>Phone Number</th>\n' +
                '<th>Address</th>\n' +
                '<th>Identify</th>\n' +
                '<th>Role</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayUser(data[i]);
            }
            document.getElementById("userList").innerHTML = content;
            document.getElementById("formUser").hidden = true;
        }
    });
}

function displayUser(user) {
    return `<tr><td>${user.fullName}</td>
            <td>${user.birth}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.rePassword}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.address}</td>
            <td>${user.identify}</td>
            <td>${user.role.name}</td>
            <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
            <td><button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button></td></tr>`;
}

function displayFormCreateUser() {
    document.getElementById("formUser").reset()
    document.getElementById("formUser").hidden = false;
    document.getElementById("form-button-user").onclick = function () {
        addNewUser();
    }
    getRole();

}
function getRole() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/roles`,
        //xử lý khi thành công
        success: function (data) {
            let content = '<select id="role">\n'
            for (let i = 0; i < data.length; i++) {
                content += displayRole(data[i]);
            }
            content += '</select>'
            document.getElementById('div-role').innerHTML = content;
        }
    });
}

function displayRole(role) {
    return `<option id="${role.id}" value="${role.id}">${role.name}</option>`;
}

function addNewUser() {
    //lay du lieu
    let data = new FormData();
    let fullName = $('#userFullName').val();
    let email = $('#userEmail').val();
    let username = $('#accountName').val();
    let rePassword = $('#rePassword').val();
    let address = $('#address').val();
    let phoneNumber = $('#phoneNumber').val();
    let password = $('#password').val();
    let identify = $('#identify').val();
    let role = $('#role').val();
    let birth = $('#birth').val();
    let newUser = {
        fullName: fullName,
        email: email,
        username: username,
        password: password,
        rePassword: rePassword,
        phoneNumber: phoneNumber,
        birth: birth,
        address: address,
        identify: identify,
        role: {
            id: role,
        },
    };
    data.append("json", new Blob([JSON.stringify(newUser)],{
        type: "application/json"
    }))
    // goi ajax
    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: "http://localhost:8080/admin/users",
        //xử lý khi thành công
        success: function () {
            getUser();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

// chua lam


function editUser(id) {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/users/${id}`,
        //xử lý khi thành công
        success: function (data) {
            $('#userFullName').val(data.fullName);
            $('#userEmail').val(data.email);
            $('#accountName').val(data.username);
            $('#password').val(data.password);
            $('#rePassword').val(data.rePassword);
            $('#phoneNumber').val(data.phoneNumber);
            $('#birth').val(data.birth);
            $('#address').val(data.address);
            $('#identify').val(data.identify);
            indexUser = data.id;
            document.getElementById("formUser").hidden = false;
            document.getElementById("form-button-user").onclick = function () {
                editUser1(indexUser);
            }
        }
    });
    getRole();
}

function editUser1(id) {
    let fullName = $('#userFullName').val();
    let email = $('#userEmail').val();
    let username = $('#accountName').val();
    let rePassword = $('#rePassword').val();
    let address = $('#address').val();
    let phoneNumber = $('#phoneNumber').val();
    let password = $('#password').val();
    let identify = $('#identify').val();
    let role = $('#role').val();
    let birth = $('#birth').val();
    let newUser = {
        fullName: fullName,
        email: email,
        username: username,
        password: password,
        rePassword: rePassword,
        phoneNumber: phoneNumber,
        birth: birth,
        address: address,
        identify: identify,
        role: {
            id: role,
        },
    };
    let data = new FormData;
    data.append("json", new Blob([JSON.stringify(newUser)],{
        type: "application/json"
    }))
    // goi ajax
    $.ajax({
        type: "PUT",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: `http://localhost:8080/admin/users/${id}`,
        //xử lý khi thành công
        success: function () {
            getUser();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}

function displayUserHeard(){
    return`<tr> 
        <th>Name</th>
        <th>email</th>
        <th>username</th>
        <th> password</th>
        <th>rePassword;</th>
        <th>phoneNumber</th>
        <th>birth</th>
        <th>address</th>
        <th>Identify</th>
        <th>role</th>
        <th colspan="2">Action</th>
        </tr>`;
}

function getUserByPage(page) {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/users/page?page=${page}`,
        //xử lý khi thành công
        success: function (data) {
            // let array = data.content
            // // hien thi danh sach o day
            // let content = '<tr>\n' +
            //     '<th>Name</th>\n' +
            //     '<th>email</th>\n' +
            //     '<th>username</th>\n' +
            //     '<th> password</th>\n' +
            //     '<th>rePassword;</th>\n' +
            //     '<th>phoneNumber</th>\n' +
            //     '<th>birth</th>\n' +
            //     '<th>address</th>\n' +
            //     '<th>Identify</th>\n' +
            //     '<th>role</th>\n' +
            //     '<th colspan="2">Action</th>\n' +
            //     '</tr>';
            let array = data.content
            let content = displayUserHeard()
            for (let i = 0; i < array.length; i++) {
                content += displayUser(array[i]);
            }
            document.getElementById("userList").innerHTML = content;
            document.getElementById("displayPageUser").innerHTML = displayPageUser(data)
            document.getElementById("formUser").hidden = true;
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    });
}

function displayPageUser(data){
    return `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
}

function isPrevious(pageNumber) {
    getUserByPage(pageNumber-1)
}

function isNext(pageNumber) {
    getUserByPage(pageNumber+1)
}

function searchUser() {
    let searchUser = document.getElementById("searchUser").value;
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/users/search?search=${searchUser}`,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>birth</th>\n' +
                '<th>email</th>\n' +
                '<th>username</th>\n' +
                '<th> password</th>\n' +
                '<th>rePassword</th>\n' +
                '<th>phoneNumber</th>\n' +
                '<th>address</th>\n' +
                '<th>Identify</th>\n' +
                '<th>role</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayUser(data[i]);
            }
            document.getElementById('userList').innerHTML = content;
            // document.getElementById("searchFormUser").reset()
        }
    });
    event.preventDefault();
}


function deleteUser(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/admin/users/${id}`,
        //xử lý khi thành công
        success: function () {
            getUser()
        }
    });
}


function displayManagerUser(){
    // document.getElementById("manager-teacher").hidden=true;
    document.getElementById("manager-user").hidden=false;
    document.getElementById("manager-student").hidden=true;
    getUser();
}



