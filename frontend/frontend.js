// frontend.js
async function registerUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
  
      const data = await response.json();
      console.log('User registered successfully:', data);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  }
  