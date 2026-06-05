import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StoredMeeting, AnalyzeResponse } from '../types/meeting';

const seedMeetings: StoredMeeting[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Q2 Product Roadmap Planning',
    summary:
      'Discussed Q2 product roadmap priorities. AI-powered search identified as top priority feature. Mobile app redesign scheduled for design review. Performance issues flagged for immediate investigation.',
    transcript: `Sarah Chen: Alright everyone, let's get started. Today we're locking in our Q2 priorities before engineering kicks off sprint planning next week. Michael, you want to lead us through the backlog?

Michael: Sure. The three big candidates are the AI-powered search feature, the mobile app redesign, and the ongoing performance investigation. We need to decide what's in for Q2 and what slips.

Jennifer: From a design perspective, we've already done early wireframes for the mobile redesign. We're ready to move into high-fidelity mockups as soon as we get sign-off.

Alex: On the performance side — I've been doing some preliminary profiling and the issues are concentrated in the data ingestion pipeline. It's not a quick fix but it's also not a mystery. I think we can scope it properly.

Michael: AI search is the one I'd flag as highest strategic value. We've had three enterprise prospects ask about it in the last month alone.

Sarah Chen: Agreed. Let's set AI search as the top priority. Alex, I want you on performance immediately — that's affecting current users. Jennifer, let's get those mockups moving in parallel.

Jennifer: Got it. I'll have initial high-fidelity screens ready for review by end of next week.

Alex: I'll have a proper scope doc on the performance work by Thursday so engineering can size it.

Michael: I'll coordinate with the engineering leads on the search feature architecture. We should probably do a short spike before committing to a full estimate.

Sarah Chen: Good call. Let's plan a 3-day spike starting Monday. Any blockers anyone wants to flag before we wrap?

Alex: None from me.

Jennifer: All clear.

Michael: We're good. I'll send out the sprint plan draft by end of day Friday.

Sarah Chen: Perfect. Thanks everyone.`,
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
    transcript: `Lisa: Let's dig into last month's feedback. Overall sentiment is up — the new dashboard is landing well. But there are two recurring pain points we need to address.

Tom: I saw the export complaints. It looks like users are running into timeout errors on larger datasets, and the CSV formatting has some issues with special characters.

Lisa: Exactly. We had 14 separate tickets about export in May alone. That's up from 3 in April, so it's getting worse as people import more data.

Tom: The Slack integration requests are also worth noting. I counted at least 8 users asking for it across support tickets and the feedback form. A couple of them mentioned it as a reason they were evaluating competitors.

Lisa: That's a stronger signal than I expected. Do we know if it's technically feasible without a big lift?

Tom: I haven't looked closely yet. Slack's API is pretty well documented. My gut says a basic integration — posting action item updates to a channel — is probably a few weeks of work. A full two-way sync would be more involved.

Lisa: Let's start there. Tom, can you do a proper feasibility assessment and come back with a recommendation?

Tom: Sure. I'll have something by next Friday.

Lisa: Great. I'll compile all the export feedback into a structured report so engineering has the full picture when they scope the fix. I'll ping you both when it's ready.

Tom: Sounds good.`,
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
    transcript: `Ryan: Alright, let's run through the May retro. We closed 17 of 20 tickets — 85% completion. That's our best rate in three sprints, so the velocity trend is heading in the right direction.

Sophia: The three tickets that didn't close were all blocked at some point. Two were waiting on code review for longer than they should have been.

Ryan: That's a recurring theme. We don't have a written standard for what a review should cover or how quickly reviewers should respond. It ends up being inconsistent.

Sophia: Agreed. I think if we had clear guidelines it would also help onboard new team members faster. Right now it's all tribal knowledge.

Ryan: I'll take that on — I'll draft a code review best practices doc and share it with the team before the next sprint kicks off.

Sophia: On the deployment side — we're still doing a lot of manual steps. I've been meaning to look into proper CI/CD tooling. There are a few options that would fit our stack well.

Ryan: That would save us a lot of time. What are you thinking — GitHub Actions, or something more involved?

Sophia: I want to compare a couple of options before recommending anything. GitHub Actions is the obvious choice but I want to see if there's something that handles our staging environment better.

Ryan: Makes sense. Do the research, bring your findings to the next planning meeting and we'll decide as a team.

Sophia: Will do. I'll have a comparison ready by Tuesday.

Ryan: Great sprint overall though. The team is finding its rhythm. Let's keep it going.`,
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
    addMeeting(state, action: PayloadAction<AnalyzeResponse & { transcript?: string }>) {
      const newMeeting: StoredMeeting = {
        ...action.payload,
        id: crypto.randomUUID(),
        date: new Date().toISOString().split('T')[0],
      };
      state.meetings.unshift(newMeeting);
    },
    clearMeetings(state) {
      state.meetings = [];
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

export const { addMeeting, clearMeetings, updateActionItemStatus } = meetingsSlice.actions;
export default meetingsSlice.reducer;