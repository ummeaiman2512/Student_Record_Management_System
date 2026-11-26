
# ==========================================
# STUDENT RECORD MANAGEMENT SYSTEM
# Using DSA Concepts in Python
# ==========================================

students = []


# Function to add a student
def add_student():

    try:
        roll_no = int(input("Enter roll number: "))
    except ValueError:
        print("Invalid roll number. Enter a number.")
        return

    # Check for duplicate roll number
    for student in students:
        if student["roll_no"] == roll_no:
            print("Roll number already exists.")
            print("Please enter a different roll number.")
            return

    # Get valid student name
    while True:
        name = input("Enter student name: ").strip()

        if name and name.replace(" ", "").isalpha():
            break
        else:
            print("Invalid name. Please enter alphabets only.")

    try:
        age = int(input("Enter age: "))

        if age <= 0:
            print("Age must be greater than zero.")
            return

        branch = input("Enter branch: ").strip()

        marks = float(input("Enter marks: "))

        if not 0 <= marks <= 100:
            print("Marks must be between 0 and 100.")
            return

    except ValueError:
        print("Invalid input. Please enter correct values.")
        return

    student = {
        "roll_no": roll_no,
        "name": name,
        "age": age,
        "branch": branch,
        "marks": marks
    }

    students.append(student)

    print("Student record added successfully.")


# Function to display all students
def display_students():

    if len(students) == 0:
        print("No student records found.")
        return

    print("\n========== STUDENT RECORDS ==========")

    for student in students:

        print("Roll No :", student["roll_no"])
        print("Name    :", student["name"])
        print("Age     :", student["age"])
        print("Branch  :", student["branch"])
        print("Marks   :", student["marks"])
        print("-------------------------------------")


# Function to search a student
def search_student():

    try:
        roll_no = int(input("Enter roll number to search: "))
    except ValueError:
        print("Invalid roll number.")
        return

    for student in students:

        if student["roll_no"] == roll_no:

            print("\nStudent found!")
            print("Roll No :", student["roll_no"])
            print("Name    :", student["name"])
            print("Age     :", student["age"])
            print("Branch  :", student["branch"])
            print("Marks   :", student["marks"])

            return

    print("Student record not found.")


# Function to update a student
def update_student():

    try:
        roll_no = int(input("Enter roll number to update: "))
    except ValueError:
        print("Invalid roll number.")
        return

    for student in students:

        if student["roll_no"] == roll_no:

            print("\nStudent found.")

            # Get valid new name
            while True:

                name = input("Enter new name: ").strip()

                if name and name.replace(" ", "").isalpha():
                    break
                else:
                    print("Invalid name. Please enter alphabets only.")

            try:
                age = int(input("Enter new age: "))

                if age <= 0:
                    print("Age must be greater than zero.")
                    return

                branch = input("Enter new branch: ").strip()

                marks = float(input("Enter new marks: "))

                if not 0 <= marks <= 100:
                    print("Marks must be between 0 and 100.")
                    return

            except ValueError:
                print("Invalid input.")
                return

            student["name"] = name
            student["age"] = age
            student["branch"] = branch
            student["marks"] = marks

            print("Student record updated successfully.")
            return

    print("Student record not found.")


# Function to delete a student
def delete_student():

    try:
        roll_no = int(input("Enter roll number to delete: "))
    except ValueError:
        print("Invalid roll number.")
        return

    for student in students:

        if student["roll_no"] == roll_no:

            students.remove(student)

            print("Student record deleted successfully.")
            return

    print("Student record not found.")


# Function to sort students according to marks
def sort_students():

    if len(students) == 0:
        print("No student records to sort.")
        return

    # Bubble Sort - Descending Order
    n = len(students)

    for i in range(n - 1):

        for j in range(n - i - 1):

            if students[j]["marks"] < students[j + 1]["marks"]:

                students[j], students[j + 1] = (
                    students[j + 1],
                    students[j]
                )

    print("Students sorted according to marks.")

    display_students()


# Main Program
while True:

    print("\n======================================")
    print("   STUDENT RECORD MANAGEMENT SYSTEM")
    print("======================================")

    print("1. Add Student")
    print("2. Display Students")
    print("3. Search Student")
    print("4. Update Student")
    print("5. Delete Student")
    print("6. Sort Students by Marks")
    print("7. Exit")

    try:
        choice = int(input("\nEnter your choice: "))

    except ValueError:
        print("Invalid choice. Please enter a number.")
        continue

    if choice == 1:
        add_student()

    elif choice == 2:
        display_students()

    elif choice == 3:
        search_student()

    elif choice == 4:
        update_student()

    elif choice == 5:
        delete_student()

    elif choice == 6:
        sort_students()

    elif choice == 7:
        print("Thank you for using Student Record Management System.")
        break

    else:
        print("Invalid choice. Please try again.")
