const fetchEmployees = () => {
    fetch("assets/data/employee.json")
        .then((response) => response.json())
        .then((data) => {
            const empDetails = data["employees"];
            localStorage.setItem("employData", JSON.stringify(empDetails));
            createTable();
            window.location.reload();
        });
};

const fetchSkills = () => {
    fetch("assets/data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            const skillDetails = data["skills"];
            localStorage.setItem("skills", JSON.stringify(skillDetails));
        });
};

const fetchDesignation = () => {
    fetch("assets/data/designation.json")
        .then((response) => response.json())
        .then((data) => {
            const designationDetails = data["designation"];
            localStorage.setItem(
                "designationData",
                JSON.stringify(designationDetails)
            );
        });
};

const editInputs = document.getElementById("inputs-edit-view");
const editEmpId = editInputs.querySelector("#empid");
const editFirstNAme = editInputs.querySelector("#fname");
const editLastName = editInputs.querySelector("#lname");
const editDesignation = editInputs.querySelector("#des");
const editDateOfBirth = editInputs.querySelector("#dob");
const editAddress = editInputs.querySelector("#addr");
const editEmail = editInputs.querySelector("#mail");
const editSkills = editInputs.querySelector("#skills");

function createTable() {
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    empDetails.forEach((data) => {
        addEmployeeRow(data);
    });
}

function addModal() {
    const modalBox = document.querySelector(".modal-add");
    const modalDiv = modalBox.querySelector(".add-modal");
    modalBox.style.display = "block";
    modalDiv.style.display = "block";
}

function closeModal() {
    const modalBox = document.querySelector(".modal-add");
    const modalDiv = modalBox.querySelector(".add-modal");
    const addForm = document.querySelector("#add-form");
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
    addForm.reset();
}

function successConfirmation() {
    const modalDiv = document.querySelector(".modal-add");
    const modalBox = document.querySelector(".success-modal");
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
}

function deleteConfirmOnNoClick() {
    const modalDiv = document.querySelector(".modal-delete");
    const confirmationBox = document.querySelector(".delete-updation");
    confirmationBox.style.display = "none";
    modalDiv.style.display = "none";
}

function employeeDetails() {
    const viewButton = document.querySelectorAll(".view");
    const btn = document.querySelectorAll(".edit");
    const isEdit = false;
    viewButton.forEach((icon) => {
        icon.addEventListener("click", () => {
            employManagementModal(event.target.id, isEdit);
        });
    });
    btn.forEach((icon) => {
        icon.addEventListener("click", () => {
            const isEdit = true;
            employManagementModal(event.target.id, isEdit);
        });
    });
}

function getAppHeaderText() {
    const parent = document.querySelector(".header-container");
    const appName = document.createElement("h1");
    appName.innerHTML = localStorage.getItem("appName");
    parent.appendChild(appName);
}

function employManagementModal(target, isEdit) {
    const modalHeading = document.querySelector("#modal-heading");
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    const close = document.querySelector("#edit-cancel-button");
    const submitBtn = document.querySelector("#update-submit-button");
    const labelEdit = document.querySelectorAll(".required-label")
    const modalBox = document.querySelector(".view-modal");
    const modalDiv = document.querySelector(".modal-edit-view");
    const empId = target.slice(7);
    modalBox.style.display = "block";
    modalDiv.style.display = "block";
    empDetails.forEach((item) => {
        if (empId == item.id) {
            editEmpId.value = `${item.id}`;
            editFirstNAme.value = `${item.firstName}`;
            editLastName.value = `${item.lastName}`;
            editDesignation.value = `${item.designation}`;
            editDateOfBirth.value = `${item.dateOfBirth}`;
            editAddress.value = `${item.address}`;
            editEmail.value = `${item.emailId}`;
            const skillArr = [];
            item.skills.forEach((empskill) => {
                skillArr.push(empskill.skill);
                editSkills.value = skillArr;
            });
        }
    });
    editEmpId.readOnly = true;
    editFirstNAme.readOnly = !isEdit;
    editLastName.readOnly = !isEdit;
    editDesignation.readOnly = !isEdit;
    editDateOfBirth.readOnly = !isEdit;
    editAddress.readOnly = !isEdit;
    editEmail.readOnly = !isEdit;
    editSkills.readOnly = !isEdit;

    if (isEdit === true) {
        modalHeading.innerHTML = "Edit Employee Details";
        submitBtn.style.display = "block";
        close.style.display = "block";
        editSkills.style.display = "none";
        labelEdit.forEach(item =>{
          item.classList.add("required");
        })
        document.querySelector("#search-container").style.display = "flex";
    } else {
        modalHeading.innerHTML = "Employee Details";
        submitBtn.style.display = "none";
        close.style.display = "none";
        editSkills.style.display = "block";
        document.querySelector("#search-container").style.display = "none";
        labelEdit.forEach(item =>{
          item.classList.remove("required");
        })
    }
    populateSkillCheckbox(empId);
}

function closeEmployeeManageModal() {
    const modalBox = document.querySelector(".view-modal");
    const modalDiv = document.querySelector(".modal-edit-view");
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
}
//
function generateSkillSelectionUI() {
    const skills = JSON.parse(localStorage.getItem("skills"));
    const parent = document.querySelector("#search-container");
    skills.forEach((item) => {
        const skillDiv = document.createElement("div");
        skillDiv.setAttribute("class", "skill-div");
        const input = document.createElement("input");
        const skillLabel = document.createElement("label");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `${item.skill}`);
        input.setAttribute("name", `${item.skill}`);
        skillLabel.setAttribute("for", `${item.skill}`);
        skillLabel.innerHTML = `${item.skill}`;
        skillDiv.appendChild(input);
        skillDiv.appendChild(skillLabel);
        parent.appendChild(skillDiv);
    });
}

function generateSkillSelectionUIOnAdd() {
    const skills = JSON.parse(localStorage.getItem("skills"));
    const parent = document.querySelector("#search-container-add");
    skills.forEach((item) => {
        const skillDiv = document.createElement("div");
        skillDiv.setAttribute("class", "skill-div");
        const input = document.createElement("input");
        const skillLabel = document.createElement("label");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `${item.skill}`);
        input.setAttribute("name", `${item.skill}`);
        skillLabel.setAttribute("for", `${item.skill}`);
        skillLabel.innerHTML = `${item.skill}`;
        skillDiv.appendChild(input);
        skillDiv.appendChild(skillLabel);
        parent.appendChild(skillDiv);
    });
}

function addEmployee() {
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    const parent = document.querySelector("#inputs-add");
    const inputAdd = document.querySelectorAll("#search-container-add input");
    const addModal = document.querySelector(".add-modal");
    const addForm = document.querySelector("#add-form");
    const action = "add";
    const skills = JSON.parse(localStorage.getItem("skills"));
    const skillArr = [];
    const idArr = empDetails.map((emp) => emp.id);
    const nextId = idArr.length + 1;
    const firstName = parent.querySelector("#fname").value;
    const lastName = parent.querySelector("#lname").value;
    const email = parent.querySelector("#mail").value;
    const designation = parent.querySelector("#des").value;
    const value = validateEmployeeForm(firstName, lastName, email, designation);
    if (value) {
        inputAdd.forEach((tag) => {
            if (tag.checked) {
                const skillObj = skills.find((skill) => skill.skill === tag.name);

                skillArr.push({ skillId: skillObj.skillId, skill: skillObj.skill });
            }
        });
        const newEmployee = {
            id: nextId,
            firstName: parent.querySelector("#fname").value,
            lastName: parent.querySelector("#lname").value,
            designation: parent.querySelector("#des").value,
            dateOfBirth: parent.querySelector("#dob").value,
            address: parent.querySelector("#addr").value,
            emailId: parent.querySelector("#mail").value,
            skills: skillArr,
        };
        empDetails.push(newEmployee);
        localStorage.setItem("employData", JSON.stringify(empDetails));

        addModal.style.display = "none";
        showSuccessDialog(action);
        addForm.reset();
        addEmployeeRow(newEmployee);
    }
}

function addEmployeeRow(data) {
    const tableBody = document.querySelector("#table-body");
    const row = document.createElement("tr");
    row.setAttribute("id", `row${data.id}`);
    const skillField = document.createElement("td");
    const actionField = document.createElement("td");
    const viewIcon = document.createElement("i");
    const editIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");
    const iconDiv = document.createElement("div");
    skillField.setAttribute("id", "skill-field");
    actionField.setAttribute("id", "action-field");
    viewIcon.setAttribute("class", "fa fa-eye view");
    viewIcon.setAttribute("id", `viewemp${data.id}`);
    editIcon.setAttribute("class", "fa fa-pencil-square-o edit");
    editIcon.setAttribute("id", `editemp${data.id}`);
    deleteIcon.setAttribute("class", "fa fa-trash-o delete");
    deleteIcon.setAttribute("id", `deletemp${data.id}`);
    iconDiv.setAttribute("class", "icons");
    row.innerHTML = `<td id="table-employee-id">${data.id}</td>
        <td>${data.firstName} ${data.lastName}</td> 
        <td id="designation-col">${data.designation}</td>
        <td>${data.emailId}</td>`;
    const skillName = document.createElement("p");
    skillName.innerHTML = data.skills.map((skill) => skill.skill).join(", ");
    skillField.appendChild(skillName);
    row.appendChild(skillField);
    iconDiv.appendChild(viewIcon);
    iconDiv.appendChild(editIcon);
    iconDiv.appendChild(deleteIcon);
    actionField.appendChild(iconDiv);
    row.appendChild(actionField);
    tableBody.appendChild(row);
    employeeDetails();
    deleteIconOnClick();
    sortEmployeeByName();
    sortEmployeeById();
}

function addSubmission() {
    const addSubmitButton = document.querySelector("#add-submit-button");
    addSubmitButton.addEventListener("click", () => {
        addEmployee();
    });
}

function showSuccessDialog(action) {
    const parent = document.querySelector(".success-modal");
    const successHeading = parent.querySelector("#success-msg");
    const mainHeading = document.querySelector(".success-modal h3")
    const addModalDiv = document.querySelector(".modal-add");
    parent.style.display = "block";
    if (action == "add") {
        successHeading.innerHTML = "Employee added successfullly";
        mainHeading.innerHTML = "Success!"
    } else if (action == "delete") {
        successHeading.innerHTML = "Employee deleted successfullly.";
        mainHeading.innerHTML = "Deleted!"
    } else if (action == "edit") {
        successHeading.innerHTML = "Employee details modified successfully.";
        mainHeading.innerHTML = "Success!"
    }
    addModalDiv.style.display = "block";
}

function saveUpdatedDetails() {
    const empId = +editEmpId.value;
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    const inputAdd = document.querySelectorAll("#search-container input");
    const skills = JSON.parse(localStorage.getItem("skills"));
    const modalBox = document.querySelector(".view-modal");
    const modalDiv = document.querySelector(".modal-edit-view");
    const action = "edit";
    const skillArr = [];
    const firstName = editFirstNAme.value;
    const lastName = editLastName.value;
    const email = editEmail.value;
    const designation = editDesignation.value;
    const value = validateEmployeeForm(firstName, lastName, email, designation);

    if (value) {
        inputAdd.forEach((tag) => {
            if (tag.checked) {
                const skillObj = skills.find((skill) => skill.skill === tag.name);
                skillArr.push({ skillId: skillObj.skillId, skill: skillObj.skill });
            }
        });
        empDetails.forEach((item) => {
            if (empId === item.id) {
                item.firstName = editFirstNAme.value;
                item.lastName = editLastName.value;
                item.designation = editDesignation.value;
                item.dateOfBirth = editDateOfBirth.value;
                item.address = editAddress.value;
                item.emailId = editEmail.value;
                item.skills = skillArr;
            }
        });
        localStorage.setItem("employData", JSON.stringify(empDetails));
        modalBox.style.display = "none";
        modalDiv.style.display = "none";
        showSuccessDialog(action);
        replaceUpdatedEmployeeRow(empId, empDetails);
    }
}

function replaceUpdatedEmployeeRow(empId, empDetails) {
    const tableBody = document.querySelectorAll("#table-body tr");
    tableBody.forEach((item) => {
        if (item.id.slice(3) == empId) {
            const skillField = item.querySelector("#skill-field");
            const skillFieldContent = item.querySelector("#skill-field p");
            const actionField = item.querySelector("#action-field");
            const employee = empDetails.find((data) => data.id == empId);
            skillFieldContent.innerHTML = employee.skills
                .map((skill) => skill.skill)
                .join(",");
            item.innerHTML = `<td id="table-employee-id">${employee.id}</td>
        <td>${employee.firstName} ${employee.lastName}</td> 
        <td>${employee.designation}</td>
        <td>${employee.emailId}</td>`;
            item.appendChild(skillField);
            item.appendChild(actionField);
        }
    });
}

function populateSkillCheckbox(id) {
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    const parent = document.querySelectorAll("#search-container input");
    const empskills = empDetails.find((emp) => emp.id == id);
    const empSkillArr = empskills.skills.map((skill) => skill.skill);
    parent.forEach((item) => {
        item.checked = empSkillArr.includes(item.name);
    });
}

function deleteIconOnClick() {
    const icon = document.querySelectorAll(".delete");
    const deleteMsg = document.querySelector(".delete-updation");
    const modalDiv = document.querySelector(".modal-delete");
    icon.forEach((item) => {
        item.addEventListener("click", () => {
            deleteMsg.style.display = "block";
            modalDiv.style.display = "block";
            deleteEmployee(event.target.id);
        });
    });
}

function deleteEmployee(id) {
    const empId = id.slice(8);
    const empDetails = JSON.parse(localStorage.getItem("employData"));
    const deleteMsg = document.querySelector(".delete-updation");
    const modalDiv = document.querySelector(".modal-delete");
    const yesButton = document.querySelector(".yes-button");
    const action = "delete";
    yesButton.addEventListener("click", () => {
        empDetails.forEach((empData) => {
            if (empData.id == empId) {
                const itemIndex = empDetails.indexOf(empData);
                empDetails.splice(itemIndex, 1);
                localStorage.setItem("employData", JSON.stringify(empDetails));
                reloadTable();
            }
            deleteMsg.style.display = "none";
            modalDiv.style.display = "none";
            showSuccessDialog(action);
        });
    });
}

function validateEmployeeForm(firstName, lastName, email, designation) {
    const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
    const regExpName = /\d+$/g;
    if (firstName == "" || lastName == "" || email == "" || designation == "") {
        window.alert("Please fill all the required input fields.");
        return false;
    }
    if (regExpName.test(firstName) || firstName.startsWith(" ")) {
        window.alert("Please enter a valid first name.");
        return false;
    }
    if (regExpName.test(lastName) || lastName.startsWith(" ")) {
        window.alert("Please enter valid last name.");
        return false;
    }
    if (!regExpEmail.test(email)) {
        window.alert("Please enter a valid e-mail address.");
        return false;
    }
    return true;
}

function sortEmployeeById() {
    const sortId = document.getElementById("id-sort");
    sortId.addEventListener("click", () => {
        let empDetails = JSON.parse(localStorage.getItem("employData"));
        empDetails = empDetails.sort((e1, e2) => {
            return e1.id - e2.id;
        });
        localStorage.setItem("employData", JSON.stringify(empDetails));
        reloadTable();
    });
}

function sortEmployeeByName() {
    const sortName = document.getElementById("name-sort");
    sortName.addEventListener("click", () => {
        let empDetails = JSON.parse(localStorage.getItem("employData"));
        empDetails = empDetails.sort((e1, e2) => {
            return e1.firstName.localeCompare(e2.firstName);
        });
        localStorage.setItem("employData", JSON.stringify(empDetails));
        reloadTable();
    });
}

function generateSkillFilterUI() {
    const parent = document.querySelector("#filter-skill-search");
    const skills = JSON.parse(localStorage.getItem("skills"));
    skills.forEach((item) => {
        const input = document.createElement("input");
        const skillLabel = document.createElement("label");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", `${item.skill}`);
        input.setAttribute("name", `${item.skill}`);
        skillLabel.setAttribute("for", `${item.skill}`);
        skillLabel.innerHTML = `${item.skill}`;
        parent.appendChild(input);
        parent.appendChild(skillLabel);
    });
}

function generateSkillSelectionDropdown() {
    const designation = document.querySelector("#des-filter");
    designation.addEventListener("click", () => {
        const container = document.querySelector("#filter-skill-search");
        const applyButton = document.querySelector("#apply");

        if (container.style.display === "flex") {
            container.style.display = "none";
            applyButton.style.display = "none";
        } else {
            container.style.display = "flex";
            applyButton.style.display = "block";
        }
    });
}

function sortOnclick() {
    const sortDiv = document.querySelector(".sort-dropdown-options");
    const filterDiv = document.querySelector(".filter-dropdown-options");
    if (filterDiv.style.display === "block") {
        filterDiv.style.display = "none";
    }
    if (sortDiv.style.display === "block") {
        sortDiv.style.display = "none";
    } else {
        sortDiv.style.display = "block";
    }
}

function filterOnclick() {
    const sortDiv = document.querySelector(".sort-dropdown-options");
    const filterDiv = document.querySelector(".filter-dropdown-options");
    if (sortDiv.style.display === "block") {
        sortDiv.style.display = "none";
    }
    if (filterDiv.style.display === "block") {
        filterDiv.style.display = "none";
    } else {
        filterDiv.style.display = "block";
    }
}

function generateFilteredTable() {
    const applyButton = document.querySelector("#apply");
    const parent = document.querySelectorAll("#filter-skill-search input");
    applyButton.addEventListener("click", () => {
        let checkedSkillArr = [];
        parent.forEach((element) => {
            if (element.checked) {
                checkedSkillArr.push(element.name);
            }
        });
        if (checkedSkillArr) {
            const tableBody = document.querySelectorAll("#table-body tr");
            tableBody.forEach((item) => {
                let isThere = 0;
                const skillFieldContent = item.querySelector("#skill-field p");
                checkedSkillArr.forEach((item) => {
                    skillFieldContent.innerHTML
                        .toLowerCase()
                        .includes(item.toLowerCase()) && isThere++;
                });

                isThere == checkedSkillArr.length ?
                    (item.style.display = "") :
                    (item.style.display = "none");
            });
        } else {
            reloadTable();
        }
    });
}

function generateDesignationDropDown() {
    const designationData = JSON.parse(localStorage.getItem("designationData"));
    const parent = document.querySelector("#skill-filter");
    designationData.forEach((item) => {
        const options = document.createElement("option");
        options.setAttribute("id", `${item}`);
        options.innerHTML = item;
        options.setAttribute("value", `${item}`);
        parent.appendChild(options);
    });
}

function filterByDesignation() {
    const parent = document.querySelector("#skill-filter");
    parent.addEventListener("change", (e) => {
        let design = e.target.value;
        if (!(design === "none")) {
            const tableBody = document.querySelectorAll("#table-body tr");
            tableBody.forEach((item) => {
                let isThere = false;
                const designationColumn = item.querySelector("#designation-col");
                designationColumn.innerHTML == design && (isThere = true);
                isThere ? (item.style.display = "") : (item.style.display = "none");
            });
        } else {
            reloadTable();
        }
    });
}

function reloadTable() {
    let element = document.getElementById("table-body");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    createTable();
}


window.onload = () => {
    localStorage.getItem("employData") === null && fetchEmployees();
    fetchSkills();
    fetchDesignation();
    createTable();
    addSubmission();
    generateSkillFilterUI();
    filterByDesignation();
    generateSkillSelectionUI();
    generateSkillSelectionUIOnAdd();
    generateSkillSelectionDropdown();
    generateDesignationDropDown();
    generateFilteredTable();
    localStorage.setItem("appName", "Human Resource Management App");
    getAppHeaderText();
};