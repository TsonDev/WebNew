
function find(){
        
    let searchName = document.getElementById('search').value.toLowerCase();
    if(searchName === ""){
        return;
    }
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    
    console.log(localStorage.getItem('users'));
    // Lọc danh sách sinh viên dựa trên tên
    let filteredStudents = students.filter(student => 
        student.userId.toString().toLowerCase().includes(searchName)
    );

    // Hiển thị kết quả tìm kiếm
    renderListStudent(filteredStudents);
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
        <td>Image</td>
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
        tableContent += `<tr>
            <td>${student.userId}</td>
            <td><img src="${student.image}" alt="student image" width="50" height="50"/></td>
            <td>${student.userName}</td>
            <td>${student.emailAddress}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.password}</td>
            <td>${student.class}</td>
            <td>${student.point}</td>
            <td>${student.address}</td>
            <td>${genderTable}</td>
            <td>
                <a href='#' onclick='deleteStudent(${index - 1})'>Xóa</a> | <a href='#' onclick="update(${index - 1})">Cập nhật</a>
            </td>
        </tr>`;
    });

    document.getElementById('list-students').innerHTML = tableContent;
}
// hiện thị ảnh khi đăng nhập
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const hthiElement = document.getElementById('hthi');

    if (currentUser && currentUser.image) {
        hthiElement.innerHTML = `<img src="${currentUser.image}" alt="User Image" style="width: 100px; height: auto;">`;
    } else {
        hthiElement.textContent = 'Chưa đăng nhập';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const signinLink = document.querySelector('a[href="./SignIn.html"]');
    const signupLink = document.querySelector('a[href="./SignUp.html"]');

    if (currentUser) {
        // Đổi "Đăng nhập" thành "Đăng xuất"
        signinLink.textContent = 'Đăng xuất';
        signinLink.href = '#';
        signinLink.addEventListener('click', function () {
            // Xóa thông tin người dùng khỏi localStorage và làm mới trang
            localStorage.removeItem('currentUser');
            location.reload();
        });

        // Ẩn "Đăng kí"
        signupLink.style.display = 'none';
    }
});
