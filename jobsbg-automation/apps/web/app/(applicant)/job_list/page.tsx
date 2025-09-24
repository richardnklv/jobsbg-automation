
'use client';

import { useEffect, useState } from "react";
import JobPostList from "../../../components/shared/job_post_list";
import { fetchJobsByIds } from '../../../services/applicant/fetch_jobs';
import { useJobMatching } from '../layout';
import { colors } from '../../../components/theme/colors';

export default function JobListPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { jobs: matchedJobs } = useJobMatching();

  useEffect(() => {
    if (!matchedJobs || matchedJobs.length === 0) {
      setError("No job matches found.");
      setLoading(false);
      return;
    }
    const jobIds = matchedJobs.map(j => j.job_id);
    fetchJobsByIds(jobIds)
      .then((res) => {
        const jobsWithSimilarity = res.jobs.map((job: any) => {
          const match = matchedJobs.find(m => m.job_id === job.id);
          return { ...job, best_similarity: match?.best_similarity };
        });
        setJobs(jobsWithSimilarity);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch jobs");
        setLoading(false);
      });
  }, [matchedJobs]);

  if (loading) return <div style={{ color: '#39FF14', padding: 32, background: colors.background, minHeight: '100vh' }}>Loading jobs...</div>;
  if (error) return <div style={{ color: '#ff4444', padding: 32, background: colors.background, minHeight: '100vh' }}>Error: {error}</div>;

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, background: colors.background, minHeight: '100vh' }}>
      <h1 style={{ color: '#39FF14', fontSize: 32, fontWeight: 900 }}>Matched Jobs</h1>
      {jobs.length === 0 ? (
        <div style={{ color: '#888' }}>No jobs found.</div>
      ) : (
        <JobPostList posts={jobs} />
      )}
    </div>
  );
}
