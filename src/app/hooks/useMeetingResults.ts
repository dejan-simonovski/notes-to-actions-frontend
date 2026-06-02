import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { mockMeetings } from "../data/mockData";

export function useMeetingResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const meeting = useMemo(() => {
    return mockMeetings.find((m) => m.id === id);
  }, [id]);

  const handleCopy = () => {
    if (!meeting) return;

    const content = `Meeting: ${meeting.title}\nDate: ${meeting.date
    }\n\nSummary:\n${meeting.summary.join("\n")}\n\nKey Decisions:\n${meeting.decisions.join(
      "\n"
    )}\n\nAction Items:\n${meeting.actionItems
      .map(
        (item) =>
          `- ${item.task} (${item.assignedTo}, Due: ${item.deadline})`
      )
      .join("\n")}`;

    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  const handleExport = () => {
    toast.success("Exported to PDF");
  };

  const handleRegenerate = () => {
    toast.info("Regenerating insights...");
  };

  const goBack = () => {
    navigate("/app");
  };

  const getStatusIcon = (status: string) => {
    return status;
  };

  return {
    meeting,
    handleCopy,
    handleExport,
    handleRegenerate,
    goBack,
    getStatusIcon,
  };
}