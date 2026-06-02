export interface Meeting {
  id: string;
  title: string;
  date: string;
  actionItemsCount: number;
  completedCount: number;
  status: "Completed" | "Pending";
  transcript: string;
  summary: string[];
  decisions: string[];
  actionItems: ActionItem[];
  topics: string[];
}

export interface ActionItem {
  id: string;
  meetingId: string;
  task: string;
  assignedTo: string;
  deadline: string;
  status: "To Do" | "In Progress" | "Done";
  meetingTitle: string;
}

export const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Q2 Product Roadmap Planning",
    date: "2026-06-01",
    actionItemsCount: 5,
    completedCount: 3,
    status: "Pending",
    transcript: `Sarah: Good morning everyone. Let's dive into our Q2 product roadmap. We need to prioritize features for the next release.

Michael: I think we should focus on the AI-powered search functionality. Our users have been requesting this for months.

Sarah: Agreed. Michael, can you take the lead on scoping that out? I'd like a proposal by Friday.

Michael: Absolutely. I'll coordinate with the engineering team and get you something by end of week.

Jennifer: What about the mobile app redesign? We've been talking about it for a while.

Sarah: Good point. Jennifer, let's schedule a design review for next Tuesday. Can you pull together some mockups?

Jennifer: Sure thing. I'll have three different directions ready.

Michael: One more thing - we need to address the performance issues users reported last week.

Sarah: Priority one. Michael, can you assign someone from your team to investigate today?

Michael: I'll have Alex look into it immediately.`,
    summary: [
      "Discussed Q2 product roadmap priorities",
      "AI-powered search identified as top priority feature",
      "Mobile app redesign scheduled for design review",
      "Performance issues flagged for immediate investigation"
    ],
    decisions: [
      "Prioritize AI-powered search for next release",
      "Schedule mobile app design review for next Tuesday",
      "Assign immediate resources to performance investigation"
    ],
    actionItems: [
      {
        id: "a1",
        meetingId: "1",
        task: "Create AI search feature proposal",
        assignedTo: "Michael",
        deadline: "2026-06-06",
        status: "In Progress",
        meetingTitle: "Q2 Product Roadmap Planning"
      },
      {
        id: "a2",
        meetingId: "1",
        task: "Prepare mobile app redesign mockups",
        assignedTo: "Jennifer",
        deadline: "2026-06-10",
        status: "To Do",
        meetingTitle: "Q2 Product Roadmap Planning"
      },
      {
        id: "a3",
        meetingId: "1",
        task: "Investigate performance issues",
        assignedTo: "Alex",
        deadline: "2026-06-03",
        status: "Done",
        meetingTitle: "Q2 Product Roadmap Planning"
      },
      {
        id: "a4",
        meetingId: "1",
        task: "Coordinate with engineering team on search feature",
        assignedTo: "Michael",
        deadline: "2026-06-05",
        status: "Done",
        meetingTitle: "Q2 Product Roadmap Planning"
      },
      {
        id: "a5",
        meetingId: "1",
        task: "Schedule design review meeting",
        assignedTo: "Jennifer",
        deadline: "2026-06-04",
        status: "Done",
        meetingTitle: "Q2 Product Roadmap Planning"
      }
    ],
    topics: [
      "AI-powered search",
      "Mobile app redesign",
      "Performance optimization",
      "Q2 priorities"
    ]
  },
  {
    id: "2",
    title: "Customer Feedback Review",
    date: "2026-05-28",
    actionItemsCount: 3,
    completedCount: 3,
    status: "Completed",
    transcript: `David: Let's review the customer feedback from last month.

Lisa: We received great feedback on the new dashboard, but several users mentioned the export feature is confusing.

David: Interesting. Can you compile those specific comments into a report?

Lisa: Will do. I'll have it ready by tomorrow.

Tom: I noticed a pattern in support tickets - users want better integration with Slack.

David: That's valuable insight. Tom, can you research what that integration would look like?

Tom: Sure, I'll check out the Slack API documentation and put together a feasibility report.`,
    summary: [
      "Reviewed customer feedback from previous month",
      "Positive reception to new dashboard",
      "Export feature identified as pain point",
      "Slack integration requested by multiple users"
    ],
    decisions: [
      "Compile detailed report on export feature feedback",
      "Research Slack integration feasibility"
    ],
    actionItems: [
      {
        id: "a6",
        meetingId: "2",
        task: "Compile export feature feedback report",
        assignedTo: "Lisa",
        deadline: "2026-05-29",
        status: "Done",
        meetingTitle: "Customer Feedback Review"
      },
      {
        id: "a7",
        meetingId: "2",
        task: "Research Slack API integration",
        assignedTo: "Tom",
        deadline: "2026-06-02",
        status: "Done",
        meetingTitle: "Customer Feedback Review"
      },
      {
        id: "a8",
        meetingId: "2",
        task: "Create Slack integration feasibility report",
        assignedTo: "Tom",
        deadline: "2026-06-03",
        status: "Done",
        meetingTitle: "Customer Feedback Review"
      }
    ],
    topics: [
      "Customer feedback analysis",
      "Dashboard performance",
      "Export functionality",
      "Slack integration"
    ]
  },
  {
    id: "3",
    title: "Sprint Retrospective - May",
    date: "2026-05-25",
    actionItemsCount: 4,
    completedCount: 4,
    status: "Completed",
    transcript: `Emma: Welcome to our May sprint retrospective. Let's start with what went well.

Ryan: The team velocity was great this sprint. We completed 85% of our planned stories.

Emma: Excellent. What could we improve?

Sophia: Code reviews took longer than expected. Maybe we need clearer guidelines.

Emma: Good point. Ryan, can you draft some code review best practices?

Ryan: I'll have a document ready by Monday.

Emma: What about the deployment process?

Sophia: It's still manual. We should automate it.

Emma: Agreed. Sophia, can you look into CI/CD options and present findings at next week's planning?`,
    summary: [
      "Sprint achieved 85% completion rate",
      "Code review process needs improvement",
      "Deployment automation identified as priority",
      "Team velocity trending positively"
    ],
    decisions: [
      "Create code review guidelines document",
      "Research and implement CI/CD automation"
    ],
    actionItems: [
      {
        id: "a9",
        meetingId: "3",
        task: "Draft code review best practices",
        assignedTo: "Ryan",
        deadline: "2026-05-27",
        status: "Done",
        meetingTitle: "Sprint Retrospective - May"
      },
      {
        id: "a10",
        meetingId: "3",
        task: "Research CI/CD automation options",
        assignedTo: "Sophia",
        deadline: "2026-05-30",
        status: "Done",
        meetingTitle: "Sprint Retrospective - May"
      },
      {
        id: "a11",
        meetingId: "3",
        task: "Present CI/CD findings at planning meeting",
        assignedTo: "Sophia",
        deadline: "2026-06-01",
        status: "Done",
        meetingTitle: "Sprint Retrospective - May"
      },
      {
        id: "a12",
        meetingId: "3",
        task: "Share code review guidelines with team",
        assignedTo: "Ryan",
        deadline: "2026-05-28",
        status: "Done",
        meetingTitle: "Sprint Retrospective - May"
      }
    ],
    topics: [
      "Sprint velocity",
      "Code review process",
      "CI/CD automation",
      "Team collaboration"
    ]
  }
];

export const getAllActionItems = (): ActionItem[] => {
  return mockMeetings.flatMap(meeting => meeting.actionItems);
};
