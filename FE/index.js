function fetchEmployees() {
  return fetch('http://localhost:3000/api/v1/employee')  //The function modified so that it returns a promise to use .then
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// DONE
// add event listener to submit button
const employeeFormData = document.getElementById("employeeForm");
employeeFormData.addEventListener('submit', (event) => {  //Added the listner and removed the auto refresh of the page
  event.preventDefault();
  createEmployee();
});


// DONE
// add event listener to delete button
const Table = document.getElementById('dataTable');
var cells;
Table.addEventListener('click', (event) => {
  //event.preventDefault();
  if (!event.target.classList.contains('btn')) return;  //first I checked whether the clicked on is a button using the class list predefined fn contains
  
  const row = event.target.closest('tr');      //then I got the row of this click, returning first ances. in the DOM tree using css selector
  cells = row.getElementsByTagName('td');      //got its cells

  deleteEmployee();
});

// DONE
function createEmployee() {
  // get data from input field
  let Ename = document.getElementById("name").value;  //Got the name and ID of the input employee
  let Eid = document.getElementById("id").value;

  //send data to backend
  const Data = {
    name: Ename,
    id: Eid
  };

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify(Data),
  })
  .then(response => {
    if (response.status === 412)  //Used the number 412 as an indicator that i have found another employee in the database
      alert("ID already exists, Please enter another ID.."); 
    else if (response.status === 201) {  //201 --> added succesfully to the local database
      fetchEmployees()
      .then(() => {
        document.getElementById("name").value = ""; //clearing the boxes again
        document.getElementById("id").value = "";
        alert("Employee added successfully!");
      });
    }

    response.json().then((data) => { //testing
      console.log(data.message);
    });
  });
}

// DONE
function deleteEmployee() {
  // get id
  let empid = cells[0].textContent;

  // send id to BE
  fetch('http://localhost:3000/api/v1/employee/' + empid, {
    method: 'DELETE',
    headers: { "Content-Type": 'application/json' },
    body: JSON.stringify({data : empid}),
  })
  .then(response => {
    if(response.status === 203){
      fetchEmployees()
      .then(()=>{
        alert('Employee deleted successfully');
      })
    }

    response.json().then((data) => { //testing
      console.log(data.message);
    });
  });
}

fetchEmployees()