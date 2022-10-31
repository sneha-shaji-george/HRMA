function updateEmployeeModal() {
  const icon = document.querySelectorAll(".edit");
  const modalBox = document.querySelector(".modal-one");
  const modalDiv = modalBox.querySelector(".update-modal");
  const close = modalBox.querySelector(".close");
  icon.forEach((item) => {
    item.addEventListener("click", () => {
      modalBox.style.display = "block";
      modalDiv.style.display = "block";
    });
  });
  close.addEventListener("click", () => {
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
  });
}

function addModal() {
  const icon = document.querySelector(".add-button");
  const modalBox = document.querySelector(".modal-two");
  const modalDiv = modalBox.querySelector(".add-modal");
  const close = modalDiv.querySelector(".close");
  icon.addEventListener("click", () => {
    modalBox.style.display = "block";
    modalDiv.style.display = "block";
  });
  close.addEventListener("click", () => {
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
  });
}


function successMessage() {
  const addModalBox = document.querySelector(".add-modal");
  const button = document.querySelector(".add-submit-button");
  const modalDiv = document.querySelector(".modal-two");
  const modalBox = document.querySelector(".success-modal");
  const successOk = document.querySelector(".add-success-button");
  button.addEventListener("click", () => {
    addModalBox.style.display = "none";
    modalBox.style.display = "block";
  });
  successOk.addEventListener("click", () => {
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
  });
}


function successMessageUpdation() {
  const updateModalBox = document.querySelector(".update-modal");
  const button = document.querySelector(".update-submit-button");
  const modalBox = document.querySelector(".success-modal-updation");
  const modalDiv = document.querySelector(".modal-one");
  const successOk = document.querySelector(".update-success-button");
  button.addEventListener("click", () => {
    updateModalBox.style.display = "none";
    modalBox.style.display = "block";
  });
  successOk.addEventListener("click", () => {
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
  });
}


function deleteEmployee() {
  const icon = document.querySelectorAll(".delete");
  const deleteMsg = document.querySelector(".delete-updation");
  const modalDiv = document.querySelector(".modal-four");
  icon.forEach((item) => {
    item.addEventListener("click", () => {
      deleteMsg.style.display = "block";
      modalDiv.style.display = "block";
    });
  });
}


function deleteConfirmation() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  const confirmationBox = document.querySelector(".delete-updation");
  const modalDiv = document.querySelector(".modal-four");
  const successDeletion = document.querySelector(".success-modal-deletion");
  const successOk = document.querySelector(".delete-success-button");
  noButton.addEventListener("click", () => {
    confirmationBox.style.display = "none";
    modalDiv.style.display = "none";
  });
  yesButton.addEventListener("click", () => {
    confirmationBox.style.display = "none";
    successDeletion.style.display = "block";
  });
  successOk.addEventListener("click", () => {
    successDeletion.style.display = "none";
    modalDiv.style.display = "none";
  });
}


function viewEmployeeDetails() {
  const viewButton = document.querySelector(".view");
  const modalBox = document.querySelector(".view-modal");
  const modalDiv = document.querySelector(".modal-three");
  const close = modalDiv.querySelector(".close");
  viewButton.addEventListener("click", () => {
    modalBox.style.display = "block";
    modalDiv.style.display = "block";
  });
  close.addEventListener("click", () => {
    modalBox.style.display = "none";
    modalDiv.style.display = "none";
  });
}

function header(){
    const parent = document.querySelector(".header-container");
    const appName = document.createElement("h1");
    appName.innerHTML = localStorage.getItem("appName");
    parent.appendChild(appName);
}


window.onload = () => {
  updateEmployeeModal();
  addModal();
  successMessage();
  successMessageUpdation();
  deleteEmployee();
  deleteConfirmation();
  viewEmployeeDetails();
  header();
  localStorage.setItem("appName", "Human Resource Management App");
};
