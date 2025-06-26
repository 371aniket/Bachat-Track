import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import logo_kharcha_guru from '../../img/logo_kharcha_guru.png';
import BACKGROUND_LOGIN_SIGNUP from '../../img/BACKGROUND_LOGIN_SIGNUP.png';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Student');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!age || isNaN(age) || Number(age) <= 18) {
      setError('Age must be a number greater than 18.');
      return;
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('age', age);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }
    signup(formData).catch(err => {
      setError('Signup failed. Please try again.');
    });
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#FFF0F5',  // Example pink-purple mix
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      borderRadius: '10px',
      border: '1px solid #ced4da',
      fontSize: '16px',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'green',  // Example pink-purple mix
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '15px',
      transition: 'background-color 0.3s ease',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#343a40',
      fontSize: '24px',
    },
    link: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#007bff',
      textDecoration: 'none',
      fontSize: '14px',
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#6c757d',
      fontSize: '16px',
    },
    logo: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logoImg: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',  // Circular shape
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <img
          src={logo_kharcha_guru}
          alt=""
          style={styles.logoImg}
        />
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>New User</h2>
        <div style={{ marginBottom: '10px', textAlign: 'center' }}>
          <p style={styles.link}>
            Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          style={styles.input}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="Student">Student</option>
          <option value="Job">Job</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setProfilePhoto(e.target.files[0])}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Signup
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;













//   const validateInputs = () => {
//     if (username.length < 6) {
//       return 'Username must be at least 6 characters long.';
//     }
//     if (password.length < 6) {
//       return 'Password must be at least 6 characters long.';
//     }
//     return '';
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     signup(username, password).catch(err => {
//       setError('Signup failed. Please try again.');
//     });
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh',
//       width: '100vw',
//       overflow: 'hidden',
//       backgroundImage: `url(${BACKGROUND_LOGIN_SIGNUP})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//     },
//     form: {
//       backgroundColor: '#FFF0F5',
//       padding: '40px',
//       borderRadius: '20px',
//       boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
//       maxWidth: '400px',
//       width: '100%',
//     },
//     input: {
//       width: '100%',
//       padding: '12px',
//       margin: '12px 0',
//       borderRadius: '10px',
//       border: '1px solid #ced4da',
//       fontSize: '16px',
//       boxSizing: 'border-box',
//     },
//     button: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: 'green',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '10px',
//       fontSize: '16px',
//       cursor: 'pointer',
//       marginTop: '15px',
//       transition: 'background-color 0.3s ease',
//     },
//     heading: {
//       textAlign: 'center',
//       marginBottom: '30px',
//       color: '#343a40',
//       fontSize: '24px',
//     },
//     link: {
//       textAlign: 'center',
//       marginTop: '20px',
//       color: '#007bff',
//       textDecoration: 'none',
//       fontSize: '14px',
//     },
//     subtitle: {
//       textAlign: 'center',
//       marginBottom: '30px',
//       color: '#6c757d',
//       fontSize: '16px',
//     },
//     logo: {
//       textAlign: 'center',
//       marginBottom: '30px',
//     },
//     logoImg: {
//       width: '80px',
//       height: '80px',
//       borderRadius: '50%',
//     },
//     error: {
//       color: 'red',
//       textAlign: 'center',
//       marginBottom: '10px',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.logo}>
//         <img
//           src={logo_kharcha_guru}
//           alt="KharchaGuru Logo"
//           style={styles.logoImg}
//         />
//       </div>
//       <form style={styles.form} onSubmit={handleSubmit}>
//         <h2 style={styles.heading}>Signup</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         <button type="submit" style={styles.button}>
//           Signup
//         </button>
//         {error && <p style={styles.error}>{error}</p>}
//       </form>
//       <p style={styles.link}>
//       Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;

