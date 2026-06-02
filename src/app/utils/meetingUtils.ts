export function formatMeetingExport(meeting: any) {
    return `Meeting: ${meeting.title}
Date: ${meeting.date}

Summary:
${meeting.summary.join("\n")}

Key Decisions:
${meeting.decisions.join("\n")}

Action Items:
${meeting.actionItems
            .map(
                (item: any) =>
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