import { createElement, Fragment, type ReactNode } from 'react';

/** 스텝 크레딧 본문에서 강조할 역할 라벨 (긴 문자열 우선 매칭) */
export const CREDIT_ROLE_LABELS: readonly string[] = [
  'Mixing & Mastering',
  'Session Musicians',
  'Production Assistants',
  'Project Coordinators',
  'Translation Team',
  'Recording Engineers',
  'Executive Director',
  'Assistant Pastor',
  'Website Developers',
  'Website Designer',
  'English Vocalists',
  'Spanish Vocalists',
  'Worship Coaches',
  'Praise Coaches',
  'Praise Director',
  'Chief Advisor',
  'Video Directors',
  'Video Support',
  'Lead Pastor',
  'Color Editor',
  'Art Director',
  'Album Design',
  'Arrangement',
  'Accounting',
  'Singers',
  'Worship',
];

export function formatCreditLine(line: string, roleLabelClassName: string): ReactNode {
  const normalized = line.trimEnd();

  for (const label of CREDIT_ROLE_LABELS) {
    if (normalized === label) {
      return createElement('span', { className: roleLabelClassName }, label);
    }
    if (normalized.startsWith(`${label} `)) {
      return createElement(
        Fragment,
        null,
        createElement('span', { className: roleLabelClassName }, label),
        normalized.slice(label.length),
      );
    }
  }

  return normalized || '\u00A0';
}
