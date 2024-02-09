import React, { useState, useEffect } from 'react';

export default function SchoolMap() {
  const [schools, setSchools] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/schools?pagination[pageSize]=500')
      .then(response => response.json())
      .then(data => setSchools(data.data))
      .catch(error => console.log(error));
    fetch('http://localhost:1337/api/app-users?pagination[pageSize]=500&populate=*')
      .then(response => response.json())
      .then(data => setUsers(data.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <ul>
      {schools.map((school, i) => <li>{i} {school.attributes.Name}</li>)}
      <li>test</li>
      {users.map((user, i) => <li>{i} {user.attributes.Email} - {user.attributes.school.toString()}</li>)}
    </ul>
  );
}
