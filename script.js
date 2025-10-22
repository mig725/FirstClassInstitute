// ---------------- LOGIN / REGISTER LOCAL ----------------
let users = [];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;
    if (users.find(u => u.username === username)) {
      alert("User already exists!");
      return;
    }
    users.push({ username, password });
    alert("Registered successfully!");
    registerForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password!");
    }
  });
}

// ---------------- DASHBOARD DATA ARRAYS ----------------
let students = [];
let branches = [];
let teachers = [];
let courses = [];
let events = [];
let records = [];
let graduations = [];

// ---------------- RENDER TABLE ----------------
function renderTable(data) {
  const container = document.getElementById("dataContainer");
  container.innerHTML = "";
  if (data.length === 0) {
    container.innerHTML = "<p>No data available</p>";
    return;
  }

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headers = Object.keys(data[0]);

  const headerRow = document.createElement("tr");
  headers.forEach(h => {
    const th = document.createElement("th");
    th.textContent = h.toUpperCase();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  data.forEach(item => {
    const row = document.createElement("tr");
    headers.forEach(h => {
      const td = document.createElement("td");
      td.textContent = item[h];
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.appendChild(table);
}

// ---------------- FORMS ----------------
function sectionTemplate(title, fields, dataArray) {
  const container = document.getElementById("contentBox");
  container.innerHTML = `<h2>${title}</h2>`;
  fields.forEach(f => {
    container.innerHTML += `<input type="text" id="${f.id}" placeholder="${f.placeholder}">`;
  });
  container.innerHTML += `
    <button id="addBtn">Add ${title}</button>
    <button id="viewBtn">View ${title}</button>
    <div id="dataContainer"></div>
  `;

  document.getElementById("addBtn").addEventListener("click", () => {
    const item = {};
    for (const f of fields) {
      const val = document.getElementById(f.id).value;
      if (!val) return alert("Fill all fields");
      item[f.id] = val;
    }
    dataArray.push(item);
    alert(`${title} added!`);
    fields.forEach(f => (document.getElementById(f.id).value = ""));
  });

  document.getElementById("viewBtn").addEventListener("click", () => renderTable(dataArray));
}

// ---------------- SIDEBAR EVENTS ----------------
if (document.getElementById("menuStudents"))
  document.getElementById("menuStudents").addEventListener("click", () =>
    sectionTemplate("Students", [
      { id: "name", placeholder: "Name" },
      { id: "code", placeholder: "Student Code" }
    ], students)
  );

if (document.getElementById("menuBranches"))
  document.getElementById("menuBranches").addEventListener("click", () =>
    sectionTemplate("Branches", [
      { id: "name", placeholder: "Branch Name" },
      { id: "location", placeholder: "Location" }
    ], branches)
  );

if (document.getElementById("menuTeachers"))
  document.getElementById("menuTeachers").addEventListener("click", () =>
    sectionTemplate("Teachers", [
      { id: "name", placeholder: "Teacher Name" },
      { id: "subject", placeholder: "Subject" }
    ], teachers)
  );

if (document.getElementById("menuCourses"))
  document.getElementById("menuCourses").addEventListener("click", () =>
    sectionTemplate("Courses", [
      { id: "courseName", placeholder: "Course Name" },
      { id: "level", placeholder: "Level" }
    ], courses)
  );

if (document.getElementById("menuEvents"))
  document.getElementById("menuEvents").addEventListener("click", () =>
    sectionTemplate("Events", [
      { id: "eventName", placeholder: "Event Name" },
      { id: "date", placeholder: "Date" }
    ], events)
  );

if (document.getElementById("menuRecords"))
  document.getElementById("menuRecords").addEventListener("click", () =>
    sectionTemplate("Records", [
      { id: "student", placeholder: "Student" },
      { id: "score", placeholder: "Score" }
    ], records)
  );

if (document.getElementById("menuGraduations"))
  document.getElementById("menuGraduations").addEventListener("click", () =>
    sectionTemplate("Graduations", [
      { id: "studentName", placeholder: "Student Name" },
      { id: "year", placeholder: "Graduation Year" }
    ], graduations)
  );
