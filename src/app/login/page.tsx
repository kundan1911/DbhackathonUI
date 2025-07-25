'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
export default function Login() {
const router = useRouter();
const [username, setUsername] = useState('');
<Head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>


// const handleLogin = async () => {
// //You can add authentication logic here if needed
// const result = await post('/user/')
// router.push('/profile');
// };

const handleLogin = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
       const data = await response.json();
      localStorage.setItem('profileData', JSON.stringify(data));
      router.push('/profile');
    } else {
      alert('Login failed');
    }
  } catch (error) {
    alert('Network error');
  }
};

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      <div className="bg-card p-8 rounded-xl shadow-lg flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleLogin}
          className="bg-primary text-white rounded px-4 py-2 hover:bg-primary/80 transition"
        >
          Go to Profile
        </button>
      </div>
    </div>
  );
}