'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRecruiter } from '../../services/auth/recruiter/register';
import { loginRecruiter } from '../../services/auth/recruiter/login';

export default function RecruiterPage() {
	const router = useRouter();
	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [message, setMessage] = useState('');

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage('');
		try {
				if (isRegister) {
					await registerRecruiter(email, password, firstName, lastName);
					// after register, go to recruiter-scoped post page
					router.push('/recruiter/post');
				} else {
					const res = await loginRecruiter(email, password);
					if (res && res.access_token) {
						// after login, go to recruiter-scoped post page
						router.push('/recruiter/post');
					} else {
						setMessage('Login succeeded but no token returned');
					}
				}
		} catch (err: any) {
			setMessage(err?.message || String(err));
		}
	};

	return (
		<div style={{ maxWidth: 420, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
			<h2>{isRegister ? 'Recruiter Register' : 'Recruiter Login'}</h2>
			<form onSubmit={submit}>
				<div style={{ marginBottom: 8 }}>
					<label>Email</label>
					<input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
				</div>

				<div style={{ marginBottom: 8 }}>
					<label>Password</label>
					<input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ width: '100%' }} />
				</div>

				{isRegister && (
					<>
						<div style={{ marginBottom: 8 }}>
							<label>First name</label>
							<input value={firstName} onChange={e => setFirstName(e.target.value)} required style={{ width: '100%' }} />
						</div>
						<div style={{ marginBottom: 8 }}>
							<label>Last name</label>
							<input value={lastName} onChange={e => setLastName(e.target.value)} required style={{ width: '100%' }} />
						</div>
					</>
				)}

				<div style={{ display: 'flex', gap: 8 }}>
					<button type="submit">{isRegister ? 'Register' : 'Login'}</button>
					<button type="button" onClick={() => setIsRegister(v => !v)}>{isRegister ? 'Switch to Login' : 'Switch to Register'}</button>
				</div>
			</form>

			{message && <p style={{ marginTop: 12 }}>{message}</p>}
		</div>
	);
}
