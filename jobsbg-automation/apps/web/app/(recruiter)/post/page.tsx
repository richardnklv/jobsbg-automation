 'use client';

import { useState } from 'react';
import { createJobPost } from '../../../services/recruiter/job_post';

export default function RecruiterPostPage() {
	const [description, setDescription] = useState('');
	const [requirements, setRequirements] = useState('');
	const [offer, setOffer] = useState('');
	const [endDate, setEndDate] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const submit = async () => {
		setLoading(true);
		setMessage(null);

		try {
			const payload = { description, requirements, offer, end_date: endDate };
			const res = await createJobPost(payload as any);
			setMessage('Job created: ' + (res.job?.id ?? 'success'));
			// Clear fields optionally
			setDescription('');
			setRequirements('');
			setOffer('');
			setEndDate(null);
		} catch (err: any) {
			setMessage(err?.message || 'Failed to create job');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div style={{ maxWidth: 720, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
			<h2>Recruiter — Post a job</h2>

			<label style={{ display: 'block', marginBottom: 8 }}>
				Description
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} style={{ width: '100%' }} />
			</label>

			<label style={{ display: 'block', marginBottom: 8 }}>
				Requirements
				<textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={4} style={{ width: '100%' }} />
			</label>

			<label style={{ display: 'block', marginBottom: 8 }}>
				Offer
				<textarea value={offer} onChange={(e) => setOffer(e.target.value)} rows={3} style={{ width: '100%' }} />
			</label>

			<label style={{ display: 'block', marginBottom: 12 }}>
				End Date (optional)
				<input type="date" value={endDate ?? ''} onChange={(e) => setEndDate(e.target.value || null)} />
			</label>

			<div>
				<button onClick={submit} disabled={loading}>
					{loading ? 'Posting…' : 'Post job'}
				</button>
			</div>

			{message && <div style={{ marginTop: 12 }}>{message}</div>}
		</div>
	);
}
