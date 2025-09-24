
import React from 'react';
import { colors } from '../theme/colors';

type JobPostProps = {
  title?: string;
  description?: string;
  requirements?: string;
  offer?: string;
  created_at?: string | Date;
  recruiter_name?: string;
  company?: string;
  className?: string;
};

export default function JobPost({
  title = 'Job Title',
  description = 'Short role summary goes here — exciting opportunity to contribute and grow.',
  requirements = 'Experience with web technologies. Good communication skills.',
  offer = 'Competitive salary, remote friendly, equity.',
  created_at,
  recruiter_name = 'Acme Recruiting',
  company = 'Acme Corp',
  className = '',
}: JobPostProps) {
  const created = created_at ? new Date(created_at).toLocaleDateString() : '';

  return (
    <article
      className={`job-post-card ${className}`}
      aria-label={`Job post: ${company} - ${recruiter_name}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'stretch',
        padding: '16px 20px',
        borderRadius: 10,
        background: colors.primary,
        color: colors.text,
        border: '3px solid transparent',
        boxShadow: 'none',
  width: '85vw',
  maxWidth: '85vw',
        minWidth: 320,
        minHeight: 75,
        backdropFilter: 'blur(6px)',
      }}
    >



      {/* First row: job title (largest), then company and recruiter smaller, then date right-aligned */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.1 }}>{title}</span>
          <span style={{ fontWeight: 600, fontSize: 16, opacity: 0.92 }}>{company}</span>
          <span style={{ fontSize: 15, opacity: 0.85 }}>{recruiter_name}</span>
        </div>
        <div style={{ fontSize: 15, opacity: 0.85, textAlign: 'right', minWidth: 80 }}>{created}</div>
      </div>

      {/* Description row */}
      <div
        style={{
          marginTop: 8,
          fontSize: 18,
          lineHeight: 1.4,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={description}
      >
        {description}
      </div>

      {/* Requirements row */}
      <div
        style={{
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1.4,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={requirements}
      >
        Requirements: {requirements}
      </div>

      {/* Offer row */}
      <div
        style={{
          marginTop: 4,
          fontSize: 18,
          lineHeight: 1.4,
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={offer}
      >
        Offer: {offer}
      </div>
    </article>
  );
}
