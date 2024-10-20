
function save() {
   
    let fullname =document.getElementById('fullname').value;
    let email =document.getElementById('email').value;
    let phone =document.getElementById('phone').value;
    let pass =document.getElementById('pass').value;
    let address =document.getElementById('address').value;
    let classElem = document.getElementById('class').value;
    let point = document.getElementById('point').value;
    let gender =''

    // kiểm tra form

    if(document.getElementById('male').checked){
        gender=document.getElementById('male').value;
    }else if(document.getElementById('female').checked){
        gender=document.getElementById('female').value;
    }
    if(fullname===''){
        fullname=''
       document.getElementById('fullname-error').innerHTML="vui lòng nhập họ và tên!"
    }else{
        document.getElementById('fullname-error').innerHTML=''
    }
    if(fullname && email && phone && gender){
      
        let students =localStorage.getItem('users') ?  JSON.parse(localStorage.getItem('users')) :[] 
        students.push({
            userId : Math.ceil(Math.random()*100000000),
            userName: fullname,
            emailAddress:email,
            phoneNumber:phone,
            password : pass,
            class:classElem,
            point : point,
            address:address,
            gender:gender
        });   

        localStorage.setItem('users',JSON.stringify(students))
        renderListStudent();
       
    }
}

function renderListStudent(students = null) {
    students = students || JSON.parse(localStorage.getItem('users')) || [];

    if (students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';

    let tableContent = `<tr>
    <td>#</td>
    <td>Họ và tên</td>
    <td>Email</td>
    <td>Điện thoại</td>
    <td>Password</td>
    <td>Lớp</td>
    <td>Điểm tb</td>
    <td>Quê quán</td>
    <td>Giới tính</td>
    <td>Hành động</td>
    </tr>`;

    students.forEach((student, index) => {
        let genderTable = student.gender === '2' ? 'Nữ' : 'Nam';
        index++;
        tableContent += ` <tr>
            <td>${student.userId}</td>
            <td>${student.userName}</td>
            <td>${student.emailAddress}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.password}</td>
            <td>${student.class}</td>
            <td>${student.point}</td>
            <td>${student.address}</td>
            <td>${genderTable}</td>
            <td>
                <a href='#' onclick='deleteStudent(${index - 1})'>Xóa</a> | <a href='#' onclick="update(${index-1})">Cập nhật</a>
            </td>
        </tr>`;
    });

    document.getElementById('list-students').innerHTML = tableContent;
}

function deleteStudent(id) {
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    students.splice(id,1)
    localStorage.setItem('users', JSON.stringify(students));
    renderListStudent();
  
}
// update
function update(id) {
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    let student = students[id]; // Sử dụng index để lấy sinh viên từ mảng

    if (student) {
        // Đặt giá trị vào input
        document.getElementById('fullname').value = student.userName;
        document.getElementById('email').value = student.emailAddress;
        document.getElementById('phone').value = student.phoneNumber;
        document.getElementById('address').value = student.address;
        // deleteStudent(id)
        document.getElementById('pass').value = student.password;
        if (student.gender === '1') {
            document.getElementById('male').checked = true;
        } else {
            document.getElementById('female').checked = true;
        }
    } else {
        alert('Student not found');
    }
}
// tim kiem 
function findByName(){
    let searchName = document.getElementById('search-name').value.trim();
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    
    console.log(localStorage.getItem('users'));
    // Lọc danh sách sinh viên dựa trên tên
    let filteredStudents = students.filter(student => 
        student.point.toLowerCase().includes(searchName)
    );

    // Hiển thị kết quả tìm kiếm
    renderListStudent(filteredStudents);
}
