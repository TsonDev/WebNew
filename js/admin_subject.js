let editingIndex = null; // Biến toàn cục để lưu vị trí subject đang chỉnh sửa
// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get('id');

if (studentId) {
    // Lấy danh sách sinh viên từ localStorage
    let students = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    // Tìm sinh viên theo ID
    let student = students.find(s => s.userId == studentId);

    if (student) {
        let tableContent = `<tr>
        <td>#</td>
        <td>Image</td>
        <td>Họ và tên</td>
        <td>Ngày sinh</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Password</td>
        <td>Lớp</td>
        <td>Điểm tb</td>
        <td>Quê quán</td>
        <td>Giới tính</td>
        <td>Hành động</td>
    </tr>`;
    tableContent += `<tr>
            <td> ${student.userId}</td>
            <td><img src="${student.image}" alt="Ảnh sinh viên" width="100" height="100"/></td>    
            <td> ${student.userName}</td>
            <td> ${student.userBirth}</td>
            <td>${student.emailAddress}</td>
            <td> ${student.phoneNumber}</td>
            <td> ${student.password}</td>
            <td> ${student.class}</td>
            <td><a href ='#'onclick = 'classPoint()'>Chi tiết</a></td>
            <td> ${student.address}</td>
            <td>${student.gender === '2' ? 'Nữ' : 'Nam'}</td>
            
        </tr>`;
        // Hiển thị thông tin chi tiết sinh viên
        document.getElementById('student-detail').innerHTML = tableContent;
    } else {
        // Thông báo nếu không tìm thấy sinh viên
        document.getElementById('student-detail').innerHTML = '<p>Không tìm thấy sinh viên.</p>';
    }
} else {
    document.getElementById('student-detail').innerHTML = '<p>Không có ID sinh viên được cung cấp.</p>';
}
function save() {
    let subjectName = document.getElementById('subject').value;
    let subjectSoTc = document.getElementById('soTc').value;
    let money = document.getElementById('money').value;
    let teacher = document.getElementById('teacher').value;
    let dateStart = document.getElementById('subject_start').value;
    let dateEnd = document.getElementById('subject_end').value;

    // Kiểm tra và lấy ID sinh viên từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = urlParams.get('id');
    if (!studentId) {
        alert("Không tìm thấy ID sinh viên.");
        return;
    }

    // Lấy danh sách môn học của sinh viên hiện tại từ localStorage
    let key = `subjects:${studentId}`; // Khóa riêng cho từng sinh viên
    let subjects = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    // Tạo ID cho môn học mới hoặc cập nhật ID
    let subjectId = editingIndex !== null ? subjects[editingIndex].subjectId : Math.ceil(Math.random() * 100000000);

    // Tạo đối tượng dữ liệu môn học
    let subjectData = {
        subjectId: subjectId,
        subjectName: subjectName,
        subjectSoTc: subjectSoTc,
        money: money,
        teacherName: teacher,
        dateStart: dateStart,
        dateEnd: dateEnd
    };

    // Nếu đang ở chế độ cập nhật, thay thế môn học cũ
    if (editingIndex !== null) {
        subjects[editingIndex] = subjectData; // Thay thế bản ghi cũ
        editingIndex = null; // Reset lại chế độ chỉnh sửa
    } else {
        // Thêm môn học mới vào danh sách
        subjects.push(subjectData);
    }

    // Lưu danh sách môn học của sinh viên vào localStorage
    localStorage.setItem(key, JSON.stringify(subjects));

    // Hiển thị danh sách môn học
    renderListSubject(subjects);
    alert("Lưu thành công!");
}

// Hàm hiển thị danh sách sinh viên
function renderListSubject(subjects = null) {
    subjects = subjects || JSON.parse(localStorage.getItem('subjects')) || [];

    if (subjects.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';

    let tableContentSubject = `<tr>
        <td>#</td>
        <td>Tên môn</td>
        <td>Số tc</td>
        <td>giá</td>
        <td>giảng viên</td>
        <td>ngày bắt</td>
        <td>ngày kết thúc</td>
        <td>Điểm</td>
        <td>Hành động</td>
    </tr>`;

    subjects.forEach((subject, index) => {
        index++;
        tableContentSubject += `<tr>
            <td>${subject.subjectId}</td>
            <td>${subject.subjectName}</td>
            <td>${subject.subjectSoTc}</td>
            <td>${subject.money}</td>
            <td>${subject.teacherName}</td>
            <td>${subject.dateStart}</td>
            <td>${subject.dateEnd}</td>
            <td><a href ='#'onclick = 'classPoint()'>Chi tiết</a></td>
            <td>
                <a href='#' onclick='editStudent(${index - 1})'>Cập nhật</a> | <a href='#' onclick='deleteStudent(${index - 1})'>Xóa</a>
            </td>
        </tr>`;
    });
    
    document.getElementById('list-students').innerHTML = tableContentSubject;
}

