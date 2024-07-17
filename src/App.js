import './Style.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "./get_enquiry.php";

    axios.get(url)
      .then(response => {
        setEnquiries(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleSubmit = () => {
    if (name.length === 0 || mobile.length === 0 || email.length === 0) {
      alert("Please fill in all fields!");
    } else {
      const url = "./enquiry.php";

      let fData = new FormData();
      fData.append('name', name);
      fData.append('mobile', mobile);
      fData.append('email', email);

      axios.post(url, fData)
        .then(response => {
          alert("Enquiry submitted successfully!");
          // Clear form fields
          setName('');
          setMobile('');
          setEmail('');
          // Fetch updated data after submission
          fetchData();
        })
        .catch(error => {
          console.error('Error submitting enquiry:', error);
          alert("Error submitting enquiry. Please try again later.");
        });
    }
  }

  return (
    <>
      <div className='container'>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor='mobile'>Mobile</label>
        <input type='text' name='mobile' id='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='button' name='send' id='send' value="SEND" onClick={handleSubmit} />
      </div>
      <div className='container2'>
        <h2>Enquiries</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enquiry => (
              <tr key={enquiry.id}>
                <td>{enquiry.name}</td>
                <td>{enquiry.mobile}</td>
                <td>{enquiry.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
