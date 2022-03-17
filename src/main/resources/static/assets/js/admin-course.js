let indexCourse = 0;


function getCourseInfo() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/admin/courses`,
        success: function (data) {
            let content = '<tr>\n' +
                '<th>ID</th>\n' +
                '<th>No.Course</th>\n' +
                '<th>Name</th>\n' +
                '<th>Fee</th>\n' +
                '<th>Time Base</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayCourseInfo(data[i]);
            }
            document.getElementById("courseList").innerHTML = content;
            document.getElementById("formCourse").hidden = true;
        }
    });
}

function displayCourseInfo(course) {
    return `<tr><td>${course.id}</td>
            <td>${course.codeCourse}</td>
            <td>${course.name}</td>
            <td>${course.totalFee}</td>
            <td>${course.timeBase}</td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${course.id})">Delete</button></td>
            <td><button class="btn btn-warning" onclick="editCourse(${course.id})">Edit</button></td></tr>`;
}

function displayFormCreateCourse() {
    document.getElementById("formCourse").reset()
    document.getElementById("formCourse").hidden = false;
    document.getElementById("formCourse-button").onclick = function () {
        addNewCourse();
    }
}

function addNewCourse() {
    let data = new FormData();
    let name = $('#nameCourse').val();
    let codeCourse = $('#codeCourse').val();
    let feeCourse = $('#feeCourse').val();
    let timeBase = $('#timeBase').val();

    let newCourse = {
        name: name,
        codeCourse: codeCourse,
        feeCourse: feeCourse,
        timeBase: timeBase
    };
    data.append("json", new Blob([JSON.stringify(newCourse)],{
        type: "application/json"
    })
    )
    $.ajax({
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        url: "http://localhost:8080/admin/courses",
        success: function () {
            getCourseInfo();
        }

    });
    event.preventDefault();
}


function displayManagerCourse() {
    document.getElementById("manager-course").hidden = false;
    document.getElementById("manager-student").hidden = true;
    document.getElementById("manager-teacher").hidden = true;
    document.getElementById("manager-officer").hidden = true;
    document.getElementById("manager-user").hidden = true;
    getCourseInfo();
}