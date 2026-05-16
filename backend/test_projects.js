async function test() {
  try {
    console.log('--- Registering User ---');
    const signupRes = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'Password123'
      })
    });
    const signupData = await signupRes.json();
    const token = signupData.token;
    console.log('Token:', token);

    console.log('--- Creating Project ---');
    const projectRes = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({
        name: 'Test Project',
        description: 'Test Description'
      })
    });
    const projectData = await projectRes.json();
    console.log('Project Created:', projectData);

    console.log('--- Fetching Projects ---');
    const projectsRes = await fetch('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const projectsData = await projectsRes.json();
    console.log('Projects Count:', projectsData.length);
    console.log('Success!');
  } catch (err) {
    console.error('Test Failed:', err.message);
  }
}


test();
