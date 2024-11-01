let editingIndex = null; // Biến toàn cục để lưu vị trí sinh viên đang chỉnh sửa

// Hàm lưu thông tin sinh viên
function save() {
    let imageInput = document.getElementById('image');
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let pass = document.getElementById('pass').value;
    let address = document.getElementById('address').value;
    let classElem = document.getElementById('class').value;
    let point = document.getElementById('point').value;
    let gender = '';

    // Kiểm tra form
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }
    if (fullname === '') {
        document.getElementById('fullname-error').innerHTML = "Vui lòng nhập họ và tên!";
        return;
    } else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    // Chuyển ảnh thành base64 và xử lý lưu vào localStorage
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

        // Nếu đang ở chế độ cập nhật, giữ nguyên userId của sinh viên
        let userId = editingIndex !== null ? students[editingIndex].userId : Math.ceil(Math.random() * 100000000);

        let studentData = {
            userId: userId,
            image: base64Image, // Lưu ảnh dưới dạng base64
            userName: fullname,
            emailAddress: email,
            phoneNumber: phone,
            password: pass,
            class: classElem,
            point: point,
            address: address,
            gender: gender
        };

        // Nếu đang ở chế độ cập nhật, xóa sinh viên cũ và thêm bản mới
        if (editingIndex !== null) {
            students.splice(editingIndex, 1); // Xóa sinh viên cũ
            editingIndex = null; // Reset lại chế độ chỉnh sửa
        }

        // Thêm sinh viên mới hoặc sinh viên cập nhật vào danh sách
        students.push(studentData);
        localStorage.setItem('users', JSON.stringify(students));
        renderListStudent();
    };
    
    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert('Vui lòng chọn một ảnh');
    }
}

// Hàm hiển thị danh sách sinh viên
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
                <a href='#' onclick='editStudent(${index - 1})'>Cập nhật</a> | <a href='#' onclick='deleteStudent(${index - 1})'>Xóa</a>
            </td>
        </tr>`;
    });

    document.getElementById('list-students').innerHTML = tableContent;
}

// Hàm xóa sinh viên
function deleteStudent(id) {
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    students.splice(id, 1);
    localStorage.setItem('users', JSON.stringify(students));
    renderListStudent();
}

// Hàm chỉnh sửa sinh viên
function editStudent(id) {
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    let student = students[id];

    if (student) {
        document.getElementById('fullname').value = student.userName;
        document.getElementById('email').value = student.emailAddress;
        document.getElementById('phone').value = student.phoneNumber;
        document.getElementById('address').value = student.address;
        document.getElementById('class').value = student.class;
        document.getElementById('point').value = student.point;
        document.getElementById('pass').value = student.password;
        if (student.gender === '1') {
            document.getElementById('male').checked = true;
        } else {
            document.getElementById('female').checked = true;
        }

        editingIndex = id; // Đặt chế độ chỉnh sửa
    } else {
        alert('Student not found');
    }
}

// Hàm tìm kiếm theo tên
function findByName() {
    let searchName = document.getElementById('search-name').value.trim().toLowerCase();
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    let filteredStudents = students.filter(student => 
        student.userName.toLowerCase().includes(searchName)
    );

    renderListStudent(filteredStudents);
}
