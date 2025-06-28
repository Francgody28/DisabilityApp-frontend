// import { useState } from 'react';

// export default function Services() {
//   const [showRegisterForm, setShowRegisterForm] = useState(false);
//   const [showTable, setShowTable] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [people, setPeople] = useState([]);
//   const [person, setPerson] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     age: '',
//     gender: '',
//     disabilityType: '',
//     customDisability: '',
//     contact: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPerson({ ...person, [name]: value });
//   };

//   const fetchPeople = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/register-disabled/');
//       if (response.ok) {
//         const data = await response.json();
//         setPeople(data);
//       } else {
//         console.error('Failed to fetch people');
//       }
//     } catch (error) {
//       console.error('Error fetching people:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalDisability =
//       person.disabilityType === 'Other' ? person.customDisability : person.disabilityType;

//     if (!finalDisability) {
//       alert('Please specify the disability type.');
//       return;
//     }

//     const payload = {
//       firstName: person.firstName,
//       middleName: person.middleName,
//       lastName: person.lastName,
//       age: person.age,
//       gender: person.gender,
//       disabilityType: finalDisability,
//       contact: person.contact,
//     };

//     const url = editingId
//       ? `http://localhost:8000/api/update-disabled/${editingId}/`
//       : 'http://localhost:8000/api/register-disabled/';
//     const method = editingId ? 'PUT' : 'POST';

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert(editingId ? 'Person updated successfully!' : 'Person registered successfully!');
//         setShowRegisterForm(false);
//         setEditingId(null);
//         setPerson({
//           firstName: '',
//           middleName: '',
//           lastName: '',
//           age: '',
//           gender: '',
//           disabilityType: '',
//           customDisability: '',
//           contact: '',
//         });
//         fetchPeople();
//       } else {
//         const errorText = await response.text();
//         console.error('Server response:', errorText);
//         alert('Failed to save person');
//       }
//     } catch (error) {
//       console.error('Error saving person:', error);
//     }
//   };

//   const handleShowTable = () => {
//     fetchPeople();
//     setShowTable(!showTable);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this person?')) {
//       try {
//         const response = await fetch(`http://localhost:8000/api/register-disabled/${id}/`, {
//           method: 'DELETE',
//         });
//         if (response.ok) {
//           setPeople(people.filter((p) => p.id !== id));
//           alert('Person deleted successfully!');
//         } else {
//           alert('Failed to delete person');
//         }
//       } catch (error) {
//         console.error('Error deleting person:', error);
//       }
//     }
//   };

//   const handleEdit = (p) => {
//     setEditingId(p.id);
//     setShowRegisterForm(true);
//     setPerson({
//       firstName: p.first_name,
//       middleName: p.middle_name,
//       lastName: p.last_name,
//       age: p.age,
//       gender: p.gender,
//       disabilityType: p.disability_type,
//       customDisability: '',
//       contact: p.contact,
//     });
//   };

//   return (
//     <section className="section">
//       <h2>Our Services</h2>

//       {!showRegisterForm && (
//         <>
//           <p>Please select a service:</p>
//           <button onClick={() => {
//             setShowRegisterForm(true);
//             setEditingId(null);
//             setPerson({
//               firstName: '',
//               middleName: '',
//               lastName: '',
//               age: '',
//               gender: '',
//               disabilityType: '',
//               customDisability: '',
//               contact: '',
//             });
//           }}>
//             Register Disabled Person
//           </button>
//           <button onClick={handleShowTable}>
//             {showTable ? 'Hide Disability Data' : 'Show Disability Data'}
//           </button>
//         </>
//       )}

//       {showRegisterForm && (
//         <form className="form" onSubmit={handleSubmit}>
//           <h3>{editingId ? 'Edit Disabled Person' : 'Register Disabled Person'}</h3>
//           <label>First Name:</label>
//           <input type="text" name="firstName" value={person.firstName} onChange={handleChange} required />
//           <label>Middle Name:</label>
//           <input type="text" name="middleName" value={person.middleName} onChange={handleChange} required />
//           <label>Last Name:</label>
//           <input type="text" name="lastName" value={person.lastName} onChange={handleChange} required />
//           <label>Age:</label>
//           <input type="number" name="age" value={person.age} onChange={handleChange} required />
//           <label>Gender:</label>
//           <select name="gender" value={person.gender} onChange={handleChange} required>
//             <option value="">Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           <label>Type of Disability:</label>
//           <select name="disabilityType" value={person.disabilityType} onChange={handleChange} required>
//             <option value="">Select</option>
//             <option value="Vision">Vision</option>
//             <option value="Hearing">Hearing</option>
//             <option value="Down Syndrome">Down Syndrome</option>
//             <option value="Body Disability">Body Disability</option>
//             <option value="Other">Other</option>
//           </select>
//           {person.disabilityType === 'Other' && (
//             <>
//               <label>Specify Disability:</label>
//               <input
//                 type="text"
//                 name="customDisability"
//                 value={person.customDisability}
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}
//           <label>Contact Info:</label>
//           <input type="text" name="contact" value={person.contact} onChange={handleChange} required />
//           <button type="submit">{editingId ? 'Update' : 'Submit'}</button>
//           <button type="button" onClick={() => {
//             setShowRegisterForm(false);
//             setEditingId(null);
//           }}>
//             Cancel
//           </button>
//         </form>
//       )}

//       {showTable && (
//         <div>
//           <h3>Registered Disabled Persons</h3>
//           <table border="1" cellPadding="8">
//             <thead>
//               <tr>
//                 <th>First</th>
//                 <th>Middle</th>
//                 <th>Last</th>
//                 <th>Age</th>
//                 <th>Gender</th>
//                 <th>Disability</th>
//                 <th>Contact</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {people.map((p) => (
//                 <tr key={p.id}>
//                   <td>{p.first_name}</td>
//                   <td>{p.middle_name}</td>
//                   <td>{p.last_name}</td>
//                   <td>{p.age}</td>
//                   <td>{p.gender}</td>
//                   <td>{p.disability_type}</td>
//                   <td>{p.contact}</td>
//                   <td>
//                     <button onClick={() => handleEdit(p)}>Edit</button>{' '}
//                     <button onClick={() => handleDelete(p.id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </section>
//   );
// }



import { useState } from 'react';

export default function Services() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showPeopleTable, setShowPeopleTable] = useState(false);
  const [showLocationTable, setShowLocationTable] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [editingLocationId, setEditingLocationId] = useState(null);

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

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState({
    full_name: '',
    country: '',
    city: '',
    street: '',
  });

  // Disabled Person handlers
  const handlePersonChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  // Location handlers
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  // Fetch people
  const fetchPeople = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/register-disabled/');
      if (res.ok) {
        const data = await res.json();
        setPeople(data);
      }
    } catch (e) {
      console.error('Fetch people error:', e);
    }
  };

  // Fetch locations
  const fetchLocations = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/location/');
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (e) {
      console.error('Fetch locations error:', e);
    }
  };

  // Submit disabled person form (add or edit)
  const handlePersonSubmit = async (e) => {
    e.preventDefault();
    const finalDisability =
      person.disabilityType === 'Other' ? person.customDisability : person.disabilityType;

    if (!finalDisability) {
      alert('Please specify the disability type.');
      return;
    }

    const payload = {
      firstName: person.firstName,
      middleName: person.middleName,
      lastName: person.lastName,
      age: person.age,
      gender: person.gender,
      disabilityType: finalDisability,
      contact: person.contact,
    };

    const url = editingPersonId
      ? `http://localhost:8000/api/update-disabled/${editingPersonId}/`
      : 'http://localhost:8000/api/register-disabled/';
    const method = editingPersonId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert(editingPersonId ? 'Person updated successfully!' : 'Person registered successfully!');
        setShowRegisterForm(false);
        setEditingPersonId(null);
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
        const errorText = await res.text();
        console.error('Server error:', errorText);
        alert('Failed to save person');
      }
    } catch (e) {
      console.error('Error saving person:', e);
    }
  };

  // Submit location form (add or edit)
  const handleLocationSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: location.full_name,
      country: location.country,
      city: location.city,
      street: location.street,
    };

    const url = editingLocationId
      ? `http://localhost:8000/api/location/${editingLocationId}/`
      : 'http://localhost:8000/api/location/';
    const method = editingLocationId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert(editingLocationId ? 'Location updated successfully!' : 'Location added successfully!');
        setShowLocationForm(false);
        setEditingLocationId(null);
        setLocation({ full_name: '', country: '', city: '', street: '' });
        fetchLocations();
      } else {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        alert('Failed to save location');
      }
    } catch (e) {
      console.error('Error saving location:', e);
    }
  };

  // Delete person
  const handlePersonDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this person?')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/register-disabled/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        setPeople(people.filter((p) => p.id !== id));
        alert('Person deleted successfully!');
      } else {
        alert('Failed to delete person');
      }
    } catch (e) {
      console.error('Error deleting person:', e);
    }
  };

  // Delete location
  const handleLocationDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this location?')) return;

    try {
      const res = await fetch(`http://localhost:8000/api/delete-location/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        setLocations(locations.filter((loc) => loc.id !== id));
        alert('Location deleted successfully!');
      } else {
        alert('Failed to delete location');
      }
    } catch (e) {
      console.error('Error deleting location:', e);
    }
  };

  // Edit person
  const handlePersonEdit = (p) => {
    setEditingPersonId(p.id);
    setShowRegisterForm(true);
    setPerson({
      firstName: p.first_name,
      middleName: p.middle_name,
      lastName: p.last_name,
      age: p.age,
      gender: p.gender,
      disabilityType: p.disability_type,
      customDisability: '',
      contact: p.contact,
    });
  };

  // Edit location
  const handleLocationEdit = (loc) => {
    setEditingLocationId(loc.id);
    setShowLocationForm(true);
    setLocation({
      full_name: loc.full_name,
      country: loc.country,
      city: loc.city,
      street: loc.street,
    });
  };

  // Toggle show/hide tables and forms
  const togglePeopleTable = () => {
    if (!showPeopleTable) fetchPeople();
    setShowPeopleTable(!showPeopleTable);
  };

  const toggleLocationTable = () => {
    if (!showLocationTable) fetchLocations();
    setShowLocationTable(!showLocationTable);
  };

  return (
    <section className="section">
      <h2>Our Services</h2>

      {/* Buttons to open forms or tables */}
      {!showRegisterForm && !showLocationForm && (
        <>
          <p>Please select a service:</p>
          <button
            onClick={() => {
              setShowRegisterForm(true);
              setEditingPersonId(null);
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
            }}
          >
            Register Disabled Person
          </button>{' '}
          <button onClick={togglePeopleTable}>
            {showPeopleTable ? 'Hide Disability Data' : 'Show Disability Data'}
          </button>{' '}
          <button
            onClick={() => {
              setShowLocationForm(true);
              setEditingLocationId(null);
              setLocation({ full_name: '', country: '', city: '', street: '' });
            }}
          >
            Add Location
          </button>{' '}
          <button onClick={toggleLocationTable}>
            {showLocationTable ? 'Hide Locations' : 'Show Locations'}
          </button>
        </>
      )}

      {/* Disabled Person Form */}
      {showRegisterForm && (
        <form className="form" onSubmit={handlePersonSubmit}>
          <h3>{editingPersonId ? 'Edit Disabled Person' : 'Register Disabled Person'}</h3>
          <label>First Name:</label>
          <input type="text" name="firstName" value={person.firstName} onChange={handlePersonChange} required />
          <label>Middle Name:</label>
          <input type="text" name="middleName" value={person.middleName} onChange={handlePersonChange} required />
          <label>Last Name:</label>
          <input type="text" name="lastName" value={person.lastName} onChange={handlePersonChange} required />
          <label>Age:</label>
          <input type="number" name="age" value={person.age} onChange={handlePersonChange} required />
          <label>Gender:</label>
          <select name="gender" value={person.gender} onChange={handlePersonChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <label>Type of Disability:</label>
          <select name="disabilityType" value={person.disabilityType} onChange={handlePersonChange} required>
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
                onChange={handlePersonChange}
                required
              />
            </>
          )}
          <label>Contact Info:</label>
          <input type="text" name="contact" value={person.contact} onChange={handlePersonChange} required />
          <button type="submit">{editingPersonId ? 'Update' : 'Submit'}</button>{' '}
          <button
            type="button"
            onClick={() => {
              setShowRegisterForm(false);
              setEditingPersonId(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Location Form */}
      {showLocationForm && (
        <form className="form" onSubmit={handleLocationSubmit}>
          <h3>{editingLocationId ? 'Edit Location' : 'Add Location'}</h3>
          <label>Full Name:</label>
          <input type="text" name="full_name" value={location.full_name} onChange={handleLocationChange} required />
          <label>Country:</label>
          <input type="text" name="country" value={location.country} onChange={handleLocationChange} required />
          <label>City:</label>
          <input type="text" name="city" value={location.city} onChange={handleLocationChange} required />
          <label>Street:</label>
          <input type="text" name="street" value={location.street} onChange={handleLocationChange} required />
          <button type="submit">{editingLocationId ? 'Update Location' : 'Add Location'}</button>{' '}
          <button
            type="button"
            onClick={() => {
              setShowLocationForm(false);
              setEditingLocationId(null);
            }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Disabled Persons Table */}
      {showPeopleTable && (
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
                    <button onClick={() => handlePersonEdit(p)}>Edit</button>{' '}
                    <button style={{ color: 'white', backgroundColor: 'red' }} onClick={() => handlePersonDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Locations Table */}
      {showLocationTable && (
        <div>
          <h3>Locations</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Country</th>
                <th>City</th>
                <th>Street</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td>{loc.full_name}</td>
                  <td>{loc.country}</td>
                  <td>{loc.city}</td>
                  <td>{loc.street}</td>
                  <td>
                    <button onClick={() => handleLocationEdit(loc)}>Edit</button>{' '}
                    <button
                      style={{ color: 'white', backgroundColor: 'red' }}
                      onClick={() => handleLocationDelete(loc.id)}
                    >
                      Delete
                    </button>
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
