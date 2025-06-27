// components/Services.jsx
import { useState } from 'react';

export default function Services() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    age: '',
    gender: '',
    disabilityType: '',
    customDisability: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/register-disabled/');
      if (response.ok) {
        const data = await response.json();
        setPeople(data);
      } else {
        console.error('Failed to fetch people');
      }
    } catch (error) {
      console.error('Error fetching people:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalDisability =
      person.disabilityType === 'Other' ? person.customDisability : person.disabilityType;

    if (!finalDisability) {
      alert('Please specify the disability type.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register-disabled/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...person, disabilityType: finalDisability }),
      });

      if (response.ok) {
        alert('Disabled person registered successfully!');
        setShowRegisterForm(false);
        setPerson({
          firstName: '',
          middleName: '',
          lastName: '',
          age: '',
          gender: '',
          disabilityType: '',
          customDisability: '',
          contact: '',
        });
        fetchPeople();
      } else {
        alert('Failed to register person');
      }
    } catch (error) {
      console.error('Error registering person:', error);
    }
  };

  const handleShowTable = () => {
    fetchPeople();
    setShowTable(!showTable);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        const response = await fetch(`http://localhost:8000/api/register-disabled/${id}/`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPeople(people.filter(p => p.id !== id)); // Remove from UI
          alert('Person deleted successfully!');
        } else {
          alert('Failed to delete person');
        }
      } catch (error) {
        console.error('Error deleting person:', error);
      }
    }
  };

  return (
    <section className="section">
      <h2>Our Services</h2>

      {!showRegisterForm && (
        <>
          <p>Please select a service:</p>
          <button onClick={() => setShowRegisterForm(true)}>Register Disabled Person</button>
          <button onClick={handleShowTable}>
            {showTable ? 'Hide Disability Data' : 'Show Disability Data'}
          </button>
        </>
      )}

      {showRegisterForm && (
        <form className="form" onSubmit={handleSubmit}>
          <h3>Register Disabled Person</h3>
          <label>First Name:</label>
          <input type="text" name="firstName" value={person.firstName} onChange={handleChange} required />
          <label>Middle Name:</label>
          <input type="text" name="middleName" value={person.middleName} onChange={handleChange} required />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={person.lastName} onChange={handleChange} required />
          <label>Age:</label>
          <input type="number" name="age" value={person.age} onChange={handleChange} required />
          <label>Gender:</label>
          <select name="gender" value={person.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label>Type of Disability:</label>
          <select name="disabilityType" value={person.disabilityType} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Vision">Vision</option>
            <option value="Hearing">Hearing</option>
            <option value="Down Syndrome">Down Syndrome</option>
            <option value="Body Disability">Body Disability</option>
            <option value="Other">Other</option>
          </select>
          {person.disabilityType === 'Other' && (
            <>
              <label>Specify Disability:</label>
              <input
                type="text"
                name="customDisability"
                value={person.customDisability}
                onChange={handleChange}
                required
              />
            </>
          )}
          <label>Contact Info:</label>
          <input type="text" name="contact" value={person.contact} onChange={handleChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowRegisterForm(false)}>Cancel</button>
        </form>
      )}

      {showTable && (
        <div>
          <h3>Registered Disabled Persons</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>First</th>
                <th>Middle</th>
                <th>Last</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Disability</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {people.map((p) => (
                <tr key={p.id}>
                  <td>{p.first_name}</td>
                  <td>{p.middle_name}</td>
                  <td>{p.last_name}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.disability_type}</td>
                  <td>{p.contact}</td>
                  <td>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
