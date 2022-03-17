let indexTeacher = 0;


function getTeacher() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/teachers`,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '<tr>\n' +
                '<th>name</th>\n' +
                '<th>Gender</th>\n' +
                '<th>AppUser</th>\n' +
                '<th>img</th>\n' +
                '<th>classes</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayTeacher(data[i]);
            }
            document.getElementById("teacherList").innerHTML = content;
            document.getElementById("formTeacher").hidden = true;
        }
    });
}

function displayTeacher(teacher) {
    return `<tr>
            <td>${teacher.name}</td>
            <td>${teacher.gender}</td>
              <td>${teacher.appUser.fullName}</td>
            <td><img src="${teacher.image}" alt="loi"></td>
            <td>${teacher.classes.name}</td>
            
         
            <td><button class="btn btn-danger" onclick="deleteTeacher(${teacher.id})">Delete</button></td>
            <td><button class="btn btn-warning" onclick="editTeacher(${teacher.id})">Edit</button></td></tr>`;
}

function displayFormCreateTeacher() {
    document.getElementById("formTeacher").reset()
    document.getElementById("formTeacher").hidden = false;
    document.getElementById("formTeacher-button").onclick = function () {
        addNewTeacher();
    }
    getClasses();
    getAccountTeacher();
    getAppUser();
}

function getAccountTeacher() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/teachers`,
        //xử lý khi thành công
        success: function (data) {
            let content = '<select id="accountTeacher">\n'
            for (let i = 0; i < data.length; i++) {
                content += displayAccount(data[i]);
            }
            content += '</select>'
            document.getElementById('div-account').innerHTML = content;
        }
    });
}

function displayAccount(account) {
    return `<option id="${account.id}" value="${account.id}">${account.fullName}</option>`
}

function getClasses() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/etc`,
        //xử lý khi thành công
        success: function (data) {
            let content = '<select id="classesTeacher">\n'
            for (let i = 0; i < data.length; i++) {
                content += displayClasses(data[i]);
            }
            content += '</select>'
            document.getElementById('div-classes').innerHTML = content;
        }
    });
}

function getAppUser() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/users`,
        //xử lý khi thành công
        success: function (data) {
            let content = '<select id="appUser">\n'
            for (let i = 0; i < data.length; i++) {
                content += displayAppUser(data[i]);
            }
            content += '</select>'
            document.getElementById('').innerHTML = content;
        }
    });
}

function displayAppUser(appUser) {
    return `<option id="${appUser.id}" value="${appUser.id}">${appUser.name}</option>`;
}


function displayClasses(classes) {
    return `<option id="${classes.id}" value="${classes.id}">${classes.name}</option>`;
}

function addNewTeacher() {
    //lay du lieu

    let name = $('#nameTeacher').val();
    let gender = $('#genderTeacher').val();
    let appUser = $('#userTeacher')
    let classes = $('#classesTeacher').val();
    let newTeacher = {
        name: name,
        gender: gender,
        classes: {
            id: classes,
        },
        appUser: {
            id: appUser
        }

    };
    let data = new FormData();
    data.append("file", $('#imageTeacher')[0].files[0])
    data.append("json", new Blob([JSON.stringify(newTeacher)], {
        type: "application/json"
    }))
    // goi ajax
    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: "http://localhost:8080/admin/teachers",
        //xử lý khi thành công
        success: function () {
            getTeacher();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function deleteTeacher(id) {
    $.ajax({
        type: "DELETE",
        //tên API
        url: `http://localhost:8080/admin/teachers/${id}`,
        //xử lý khi thành công
        success: function () {
            getTeacher()
        }
    });
}

function editTeacher(id) {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/teachers/${id}`,
        //xử lý khi thành công
        success: function (data) {
            $('#nameTeacher').val(data.name);
            $('#genderTeacher').val(data.gender);
            $('#userTeacher').val(data.appUser);
            $('imageTeacher').val(data.img);
            $('#div-classes').val(data.classes);
            index = data.id;
            document.getElementById("formTeacher").hidden = false;
            document.getElementById("formTeacher-button").onclick = function () {
                editTeacher1(index);
            }
        }
    });
}

function editTeacher1(id) {
    //lay du lieu

    let name = $('#name').val();
    let gender = $('#gender').val();
    let user = $('#userTeacher').val();
let     classes = $('#div-classes').val();
    let newTeacher = {
        name: name,
        gender: gender,
        user: user,
    };
    let data = new FormData;
    data.append("file", $('#image')[0].files[0]);
    data.append("json", new Blob([JSON.stringify(newTeacher)], {
        type: "application/json"
    }))
    // goi ajax
    $.ajax({
        type: "PUT",
        data: data,
        processData: false,
        contentType: false,
        //tên API
        url: `http://localhost:8080/admin/teachers/${id}`,
        //xử lý khi thành công
        success: function () {
            getTeacher();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getTeachersByPage(page) {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/teachers/page?page=${page}`,
        //xử lý khi thành công
        success: function (data) {
            let array = data.content
            // hien thi danh sach o day
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Name</th>\n' +
                '<th>Gender</th>\n' +
                '<th>User</th>\n' +
                '<th>Classes</th>\n' +
                '<th>Picture</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < array.length; i++) {
                content += displayTeacher(array[i]);
            }
            document.getElementById("teacherList").innerHTML = content;
            document.getElementById("displayPageTeacher").innerHTML = displayPageTeacher(data)
            document.getElementById("formTeacher").hidden = true;
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    });
}

function displayPageTeacher(data) {
    return `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
}

function isPrevious(pageNumber) {
    getTeachersByPage(pageNumber - 1)
}

function isNext(pageNumber) {
    getTeachersByPage(pageNumber + 1)
}

function searchTeacher() {
    let searchTeacher = document.getElementById("searchTeacher").value;
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/admin/teachers/search?search=${searchTeacher()}`,
        //xử lý khi thành công
        success: function (data) {
            // hien thi danh sach o day
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Name</th>\n' +
                '<th>Gender</th>\n' +
                '<th>User</th>\n' +
                '<th>Classes</th>\n' +
                '<th>Picture</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayTeacher(data[i]);
            }
            document.getElementById('teacherList').innerHTML = content;
            document.getElementById("searchTeacher").reset()
        }
    });
    event.preventDefault();
}

function displayManagerTeacher() {
    document.getElementById("manager-teacher").hidden = false;
    // document.getElementById("manager-user").hidden = true;
    // document.getElementById("manager-student").hidden = true;
    getTeacher();
}



