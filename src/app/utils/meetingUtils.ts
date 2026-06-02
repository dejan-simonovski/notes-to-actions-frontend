import type { Meeting } from "../data/mockData";

export function formatMeetingExport(meeting: Meeting) {
  return `Meeting: ${meeting.title}
Date: ${meeting.date}

Summary:
${meeting.summary.join("\n")}

Key Decisions:
${meeting.decisions.join("\n")}

Action Items:
${meeting.actionItems
    .map(
      (item) =>
        `- ${item.task} (${item.assignedTo}, Due: ${item.deadline})`
    )
    .join("\n")}`;
}

export function formatTranscript(transcript: string) {
  return transcript.split("\n\n").map((paragraph, idx) => ({
    id: idx,
    lines: paragraph.split("\n"),
  }));
}