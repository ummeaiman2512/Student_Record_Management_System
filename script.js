
// Student Record Management System

// Store student records
let students = JSON.parse(localStorage.getItem("students")) || [];

let editingRoll = null;


// Save records in LocalStorage
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


// Add or Update Student
document.getElementById("studentForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const roll_no = Number(document.getElementById("roll_no").value);
    const name = document.getElementById("name").value.trim();
    const age = Number(document.getElementById("age").value);
    const branch = document.getElementById("branch").value.trim();
    const marks = Number(document.getElementById("marks").value);

    // Validate name
    if (!/^[a-zA-Z ]+$/.test(name)) {
        alert("Please enter a valid name using alphabets only.");
        return;
    }

    // Validate details
    if (!Number.isInteger(roll_no) || roll_no <= 0 ||
        !Number.isInteger(age) || age <= 0 ||
        !branch || !Number.isFinite(marks) ||
        marks < 0 || marks > 100) {
        alert("Please enter valid student details.");
        return;
    }

    // Check duplicate roll number
    const existingStudent = students.find(student =>
        student.roll_no === roll_no
    );

    if (editingRoll === null && existingStudent) {
        alert("Roll number already exists!");
        return;
    }

    if (editingRoll !== null && roll_no !== editingRoll && existingStudent) {
        alert("This roll number already belongs to another student!");
        return;
    }

    const student = {
        roll_no,
        name,
        age,
        branch,
        marks
    };

    if (editingRoll !== null) {

        const index = students.findIndex(student =>
            student.roll_no === editingRoll
        );

        if (index !== -1) {
            students[index] = student;
        }

        editingRoll = null;
        document.getElementById("submitBtn").textContent = "Add Student";

        alert("Student record updated successfully!");

    } else {

        students.push(student);
        alert("Student record added successfully!");

    }

    saveStudents();
    displayStudents();
    updateDashboard();

    this.reset();

});


// Display All Students
function displayStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    if (students.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6">No student records found.</td>
            </tr>
        `;
        return;
    }

    students.forEach(student => {

        const row = document.createElement("tr");

        const values = [
            student.roll_no,
            student.name,
            student.age,
            student.branch,
            student.marks.toFixed(2)
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editStudent(student.roll_no);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deleteStudent(student.roll_no);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        table.appendChild(row);

    });

}


// Search Student
function searchStudent() {

    const roll = Number(document.getElementById("searchRoll").value);

    const result = document.getElementById("searchResult");

    if (!Number.isInteger(roll) || roll <= 0) {
        result.textContent = "Please enter a valid roll number.";
        return;
    }

    const student = students.find(student =>
        student.roll_no === roll
    );

    if (student) {

        result.innerHTML = `
            <strong>Student Found!</strong><br>
            Roll Number: ${student.roll_no}<br>
            Name: ${escapeHTML(student.name)}<br>
            Age: ${student.age}<br>
            Branch: ${escapeHTML(student.branch)}<br>
            Marks: ${student.marks}
        `;

    } else {

        result.textContent = "Student record not found.";

    }

}


// Escape text before displaying search results
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


// Edit Student
function editStudent(roll) {

    const student = students.find(student =>
        student.roll_no === roll
    );

    if (!student) return;

    document.getElementById("roll_no").value = student.roll_no;
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("branch").value = student.branch;
    document.getElementById("marks").value = student.marks;

    editingRoll = student.roll_no;

    document.getElementById("submitBtn").textContent = "Update Student";

    document.getElementById("add-student").scrollIntoView({
        behavior: "smooth"
    });

}


// Delete Student
function deleteStudent(roll) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    students = students.filter(student =>
        student.roll_no !== roll
    );

    saveStudents();
    displayStudents();
    updateDashboard();

    alert("Student record deleted successfully!");

}


// Bubble Sort by Marks (Descending Order)
function sortStudents() {

    if (students.length === 0) {
        alert("No student records to sort.");
        return;
    }

    let n = students.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            if (students[j].marks < students[j + 1].marks) {

                let temp = students[j];

                students[j] = students[j + 1];

                students[j + 1] = temp;

            }

        }

    }

    saveStudents();
    displayStudents();

    alert("Students sorted according to marks!");

}


// Update Dashboard Statistics
function updateDashboard() {

    document.getElementById("totalStudents").textContent =
        students.length;

    if (students.length === 0) {

        document.getElementById("averageMarks").textContent = "0";
        document.getElementById("highestMarks").textContent = "0";

        return;

    }

    const total = students.reduce(
        (sum, student) => sum + student.marks, 0
    );

    const average = total / students.length;

    const highest = Math.max(
        ...students.map(student => student.marks)
    );

    document.getElementById("averageMarks").textContent =
        average.toFixed(2);

    document.getElementById("highestMarks").textContent =
        highest.toFixed(2);

}


// Load records when website opens
displayStudents();
updateDashboard();
