import React from 'react';
import JobPost from './job_post';

export type JobPostListItem = {
  id?: string | number;
  title?: string;
  description?: string;
  requirements?: string;
  offer?: string;
  created_at?: string | Date;
  recruiter_name?: string;
  company?: string;
};

export type JobPostListProps = {
  posts: JobPostListItem[];
  className?: string;
};

export default function JobPostList({ posts, className = '' }: JobPostListProps) {
  return (
    <div className={`job-post-list ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 0, margin: 0 }}>
      {posts.map((post, idx) => (
        <JobPost key={post.id ?? idx} {...post} />
      ))}
    </div>
  );
}
