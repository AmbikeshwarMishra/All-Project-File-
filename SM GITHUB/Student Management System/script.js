
let students = JSON.parse(localStorage.getItem('studentData')) || [];
let isSortedAsc = false;


const form = document.getElementById('student-form');
const idInput = document.getElementById('student-id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const courseInput = document.getElementById('course');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const errorMsg = document.getElementById('form-errors');
const studentList = document.getElementById('student-list');
const studentCountSpan = document.getElementById('student-count');
const searchInput = document.getElementById('search-input');
const sortBtn = document.getElementById('sort-btn');


document.addEventListener('DOMContentLoaded', () => renderStudents(students));


form.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', handleSearch);
sortBtn.addEventListener('click', handleSort);


function handleFormSubmit(e) {
    e.preventDefault(); 

    const id = idInput.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const age = parseInt(ageInput.value.trim());
    const course = courseInput.value.trim();

    
    if (!validateForm(name, email, age, course)) return;

    
    if (id) {
        
        const index = students.findIndex(student => student.id === id);
        if (index !== -1) {
            students[index] = { id, name, email, age, course };
        }
    } else {
        
        const newStudent = { id: Date.now().toString(), name, email, age, course };
        students.push(newStudent);
    }

    
    saveToLocalStorage();
    renderStudents(students);
    resetForm();
}

function validateForm(name, email, age, course) {
    errorMsg.textContent = ""; 

    
    if (!name || !email || !age || !course) {
        errorMsg.textContent = "All fields are required.";
        return false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.textContent = "Please enter a valid email address.";
        return false;
    }

    
    if (isNaN(age) || age <= 0) {
        errorMsg.textContent = "Age must be a positive number.";
        return false;
    }

    return true; 
}

function renderStudents(dataToRender) {
    studentList.innerHTML = ''; 

    if (dataToRender.length === 0) {
        studentList.innerHTML = '<tr><td colspan="5" style="text-align: center;">No students found.</td></tr>';
    } else {
        dataToRender.forEach(student => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.age}</td>
                <td>${student.course}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
                </td>
            `;
            studentList.appendChild(tr);
        });
    }

    
    studentCountSpan.textContent = students.length;
}

function deleteStudent(id) {
    
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(student => student.id !== id);
        saveToLocalStorage();
        
        
        handleSearch(); 
    }
}

function editStudent(id) {
    const student = students.find(student => student.id === id);
    if (!student) return;

    
    idInput.value = student.id;
    nameInput.value = student.name;
    emailInput.value = student.email;
    ageInput.value = student.age;
    courseInput.value = student.course;

    
    submitBtn.textContent = "Update Student";
    cancelBtn.classList.remove('hidden');
    
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) || 
        student.course.toLowerCase().includes(searchTerm)
    );
    
    renderStudents(filteredStudents);
}

function handleSort() {
    isSortedAsc = !isSortedAsc;
    
    const sortedStudents = [...students].sort((a, b) => {
        if (isSortedAsc) {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    sortBtn.textContent = isSortedAsc ? "Sort Z-A" : "Sort A-Z";
    
    
    if (searchInput.value.trim() !== "") {
        handleSearch(); 
    } else {
        renderStudents(sortedStudents);
    }
}

function resetForm() {
    form.reset();
    idInput.value = "";
    errorMsg.textContent = "";
    submitBtn.textContent = "Add Student";
    cancelBtn.classList.add('hidden');
}

function saveToLocalStorage() {
    localStorage.setItem('studentData', JSON.stringify(students));
}