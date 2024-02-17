const employee = [
  {
    id: '1',
    name: 'Mario'
  },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// DONE
exports.deleteEmployee = async (req, res, next) => {
  const { data } = req.body;

  for (i = 0; i < employee.length; i++) {  //checking if id already exist
    if (data === employee[i].id) {
      employee.splice(i, 1);
      return res.status(203).json({ message: 'Deleted' });
    }
  }
};

// DONE
exports.createEmployee = async (req, res, next) => {
  const { name, id } = req.body;

  for (i = 0; i < employee.length; i++) {  //checking if id already exist
    if (id === employee[i].id) {
      return res.status(412).json({ message: 'ID found' });
    }
  }

  employee.push({ id, name })               //adding the employee
  console.log(`Name: ${name} ID: ${id}`);
  res.status(201).json({ message: 'Inserted' });
};
