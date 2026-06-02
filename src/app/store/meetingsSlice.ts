import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StoredMeeting, AnalyzeResponse } from '../types/meeting';

const seedMeetings: StoredMeeting[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Q2 Product Roadmap Planning',
    summary:
      'Discussed Q2 product roadmap priorities. AI-powered search identified as top priority feature. Mobile app redesign scheduled for design review. Performance issues flagged for immediate investigation.',
    action_items: [
      {
        description: 'Create AI search feature proposal',
        assignee_name: 'Michael',
        priority: 'urgent_important',
        status: 'in_progress',
      },
      {
        description: 'Prepare mobile app redesign mockups',
        assignee_name: 'Jennifer',
        priority: 'important_not_urgent',
        status: 'to_do',
      },
      {
        description: 'Investigate performance issues',
        assignee_name: 'Alex',
        priority: 'urgent_important',
        status: 'done',
      },
      {
        description: 'Coordinate with engineering team on search feature',
        assignee_name: 'Michael',
        priority: 'important_not_urgent',
        status: 'done',
      },
      {
        description: 'Schedule design review meeting',
        assignee_name: 'Jennifer',
        priority: 'urgent_not_important',
        status: 'done',
      },
    ],
    key_topics: [
      'AI-powered search',
      'Mobile app redesign',
      'Performance optimization',
      'Q2 priorities',
    ],
  },
  {
    id: '2',
    date: '2026-05-28',
    title: 'Customer Feedback Review',
    summary:
      'Reviewed customer feedback from previous month. Positive reception to new dashboard. Export feature identified as pain point. Slack integration requested by multiple users.',
    action_items: [
      {
        description: 'Compile export feature feedback report',
        assignee_name: 'Lisa',
        priority: 'urgent_important',
        status: 'done',
      },
      {
        description: 'Research Slack API integration',
        assignee_name: 'Tom',
        priority: 'important_not_urgent',
        status: 'done',
      },
      {
        description: 'Create Slack integration feasibility report',
        assignee_name: 'Tom',
        priority: 'important_not_urgent',
        status: 'done',
      },
    ],
    key_topics: [
      'Customer feedback analysis',
      'Dashboard performance',
      'Export functionality',
      'Slack integration',
    ],
  },
  {
    id: '3',
    date: '2026-05-25',
    title: 'Sprint Retrospective - May',
    summary:
      'Sprint achieved 85% completion rate. Code review process needs improvement. Deployment automation identified as priority. Team velocity trending positively.',
    action_items: [
      {
        description: 'Draft code review best practices',
        assignee_name: 'Ryan',
        priority: 'important_not_urgent',
        status: 'done',
      },
      {
        description: 'Research CI/CD automation options',
        assignee_name: 'Sophia',
        priority: 'important_not_urgent',
        status: 'done',
      },
      {
        description: 'Present CI/CD findings at planning meeting',
        assignee_name: 'Sophia',
        priority: 'urgent_not_important',
        status: 'done',
      },
      {
        description: 'Share code review guidelines with team',
        assignee_name: 'Ryan',
        priority: 'urgent_not_important',
        status: 'done',
      },
    ],
    key_topics: [
      'Sprint velocity',
      'Code review process',
      'CI/CD automation',
      'Team collaboration',
    ],
  },
];

type MeetingsState = {
  meetings: StoredMeeting[];
};

const initialState: MeetingsState = {
  meetings: seedMeetings,
};

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    addMeeting(state, action: PayloadAction<AnalyzeResponse>) {
      const newMeeting: StoredMeeting = {
        ...action.payload,
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
      };
      state.meetings.unshift(newMeeting);
    },
    updateActionItemStatus(
      state,
      action: PayloadAction<{
        meetingId: string;
        itemIndex: number;
        status: StoredMeeting['action_items'][number]['status'];
      }>,
    ) {
      const { meetingId, itemIndex, status } = action.payload;
      const meeting = state.meetings.find((m) => m.id === meetingId);
      if (meeting) {
        meeting.action_items[itemIndex].status = status;
      }
    },
  },
});

export const { addMeeting, updateActionItemStatus } = meetingsSlice.actions;
export default meetingsSlice.reducer;
