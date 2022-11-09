const empData = () => {
  fetch("assets/data/employee.json")
    .then((response) => response.json())
    .then((data) => {
      const empDetails = data["employees"];
      localStorage.setItem("employData", JSON.stringify(empDetails));
    });
};

const skillData = () => {
  fetch("assets/data/skills.json")
    .then((response) => response.json())
    .then((data) => {
      const skillDetails = data["skills"];
      localStorage.setItem("skillData", JSON.stringify(skillDetails));
    });
};

// function to create employee listing table and load employee details to it
function createTable() {
  const employeeTable = document.querySelector("#empTable");
  const empDetails = JSON.parse(localStorage.getItem("employData"));
  empDetails.forEach((data) => {
    const arr = [];
    const row = document.createElement("tr");
    const skillField = document.createElement("td");
    const actionField = document.createElement("td");
    const viewIcon = document.createElement("i");
    const editIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");
    const iconDiv = document.createElement("div");
    viewIcon.setAttribute("class", "fa fa-eye view");
    viewIcon.setAttribute("id", `viewemp${data.id}`);
    editIcon.setAttribute("class", "fa fa-pencil-square-o edit");
    editIcon.setAttribute("id", `editemp${data.id}`);
    deleteIcon.setAttribute("class", "fa fa-trash-o delete");
    deleteIcon.setAttribute("id", `deletemp${data.id}`);
    iconDiv.setAttribute("class", "icons");
    row.innerHTML = `<td>${data.id}</td>
        <td>${data.firstName} ${data.lastName}</td> 
        <td>${data.designation}</td>
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
    employeeTable.appendChild(row);
  });
  employeeDetails(empDetails);
  deleteEmployee();
}

//function to create modal box to add employee details
function addModal() {
  const modalBox = document.querySelector(".modal-add");
  const modalDiv = modalBox.querySelector(".add-modal");
  modalBox.style.display = "block";
  modalDiv.style.display = "block";
}

//function to close add modal
function closeModal() {
  const modalBox = document.querySelector(".modal-add");
  const modalDiv = modalBox.querySelector(".add-modal");
  modalBox.style.display = "none";
  modalDiv.style.display = "none";
}

//function to display success message after adding an employee
function successMessage() {
  const addModalBox = document.querySelector(".add-modal");
  const modalBox = document.querySelector(".success-modal");
    addModalBox.style.display = "none";
    modalBox.style.display = "block";
}

function successOk(){
  const modalDiv = document.querySelector(".modal-add");
  const modalBox = document.querySelector(".success-modal");
  modalBox.style.display = "none";
  modalDiv.style.display = "none";
}

//function to display success message after updating employee details
function successMessageUpdation() {
  const updateModalBox = document.querySelector(".view-modal");
  const button = document.querySelector("#update-submit-button");
  const modalBox = document.querySelector(".success-modal-updation");
  button.addEventListener("click", () => {
    updateModalBox.style.display = "none";
    modalBox.style.display = "block";
  });
}
function successOkUpdate(){
  const modalBox = document.querySelector(".success-modal-updation");
  const modalDiv = document.querySelector(".modal-edit-view");
  modalBox.style.display = "none";
  modalDiv.style.display = "none";
}

//function to delete an employee
function deleteEmployee() {
  const icon = document.querySelectorAll(".delete");
  const deleteMsg = document.querySelector(".delete-updation");
  const modalDiv = document.querySelector(".modal-delete");
  icon.forEach((item) => {
    item.addEventListener("click", () => {
      deleteMsg.style.display = "block";
      modalDiv.style.display = "block";
    });
  });
}

//function to display cofirmation msg before deleting
function  noConfirm(){
  const modalDiv = document.querySelector(".modal-delete");
  const confirmationBox = document.querySelector(".delete-updation");
  confirmationBox.style.display = "none";
  modalDiv.style.display = "none";
}
function yesConfirm(){
  const confirmationBox = document.querySelector(".delete-updation");
  const successDeletion = document.querySelector(".success-modal-deletion");
  confirmationBox.style.display = "none";
  successDeletion.style.display = "block";
}
function successDelete(){
  const modalDiv = document.querySelector(".modal-delete");
  const successDeletion = document.querySelector(".success-modal-deletion");
  successDeletion.style.display = "none";
  modalDiv.style.display = "none";
}
//function to add eventlistener to view and edit buttons in table
function employeeDetails(empDetails) {
  const viewButton = document.querySelectorAll(".view");
  const btn = document.querySelectorAll(".edit");
  const isEdit = false;
  viewButton.forEach((icon) => {
    icon.addEventListener("click", () => {
      employManagementModal(empDetails, event.target.id, isEdit);
    });
  });
  btn.forEach((icon) => {
    icon.addEventListener("click", () => {
      const isEdit = true;
      employManagementModal(empDetails, event.target.id, isEdit);
    });
  });
}

//function  to generate app name
function header() {
  const parent = document.querySelector(".header-container");
  const appName = document.createElement("h1");
  appName.innerHTML = localStorage.getItem("appName");
  parent.appendChild(appName);
}

// function to display add and edit forms
function employManagementModal(empDetails, target, isEdit) {
  const modalHeading = document.querySelector("#modal-heading");
  const parent = document.getElementById("inputs-edit-view");
  const submitBtn = document.querySelector("#update-submit-button");
  const modalBox = document.querySelector(".view-modal");
  const modalDiv = document.querySelector(".modal-edit-view");
  const empId = target.slice(7);
  modalBox.style.display = "block";
  modalDiv.style.display = "block";
  empDetails.forEach((item) => {
    if (empId == item.id) {
      parent.querySelector("#fname").value = `${item.firstName}`;
      parent.querySelector("#lname").value = `${item.lastName}`;
      parent.querySelector("#des").value = `${item.designation}`;
      parent.querySelector("#doj").value = `${item.dateOfJoining}`;
      parent.querySelector("#dob").value = `${item.dateOfBirth}`;
      parent.querySelector("#addr").value = `${item.address}`;
      parent.querySelector("#mail").value = `${item.emailId}`;
      const skillArr = [];
      item.skills.forEach((empskill) => {
        skillArr.push(empskill.skill);
        parent.querySelector("#skills").value = skillArr;
      });
    }
  });
  parent.querySelector("#fname").readOnly = !isEdit;
  parent.querySelector("#lname").readOnly = !isEdit;
  parent.querySelector("#des").readOnly = !isEdit;
  parent.querySelector("#doj").readOnly = !isEdit;
  parent.querySelector("#dob").readOnly = !isEdit;
  parent.querySelector("#addr").readOnly = !isEdit;
  parent.querySelector("#mail").readOnly = !isEdit;
  parent.querySelector("#skills").readOnly = !isEdit;

  if (isEdit === true) {
    modalHeading.innerHTML = "Edit Employee Details";
    submitBtn.style.display = "block";
    parent.querySelector("#skills").style.display = "none";
    document.querySelector("#search-container").style.display = "flex";
  } else {
    modalHeading.innerHTML = "Employee Details";
    submitBtn.style.display = "none";
    parent.querySelector("#skills").style.display = "block";
    document.querySelector("#search-container").style.display = "none";
  }
  checkedBox(empDetails, empId);
}

//function to close edit and view modal
function closeEmployeeManageModal(){
  const modalBox = document.querySelector(".view-modal");
  const modalDiv = document.querySelector(".modal-edit-view");
  modalBox.style.display = "none";
  modalDiv.style.display = "none";  
}
// function to checkbox for skills
function selectSkill() {
  const skillData = JSON.parse(localStorage.getItem("skillData"));
  const parent = document.querySelector("#search-container");
  skillData.forEach((item) => {
    const input = document.createElement("input");
    const skillLabel = document.createElement("label");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `${item.skill}`);
    input.setAttribute("name", `${item.skill}`);
    skillLabel.setAttribute("for", `${item.skill}`);
    skillLabel.innerHTML = `${item.skill}`;
    parent.appendChild(skillLabel);
    parent.appendChild(input);
  });
}

// function to create checked skillbox
function checkedBox(empDetails, id) {
  const parent = document.querySelectorAll("#search-container input");
  const empskills = empDetails.find((emp) => emp.id == id);
  const empSkillArr = empskills.skills.map((skill) => skill.skill);
  parent.forEach((item) => {
    item.checked = false;
    if (empSkillArr.includes(item.name)) {
      item.checked = "true";
    }
  });
}

window.onload = () => {
  empData();
  skillData();
  createTable();
  successMessageUpdation();
  selectSkill();
  header();
  localStorage.setItem("appName", "Human Resource Management App");
};
