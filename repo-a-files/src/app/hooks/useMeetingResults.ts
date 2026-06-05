import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useAppSelector } from '../store/hooks';
import { exportMeetingToPDF } from "../../utils/exportMeetingToPdf";

export function useMeetingResults() {
  const { id } = useParams();
  const navigate = useNavigate();

  const meeting = useAppSelector((state) =>
    state.meetings.meetings.find((m) => m.id === id),
  );

  const handleCopy = () => {
    if (!meeting) return;

    const actionLines = meeting.action_items
      .map((item) => `- ${item.description} (${item.assignee_name})`)
      .join('\n');

    const content = [
      `Meeting: ${meeting.title}`,
      `Date: ${meeting.date}`,
      '',
      `Summary:\n${meeting.summary}`,
      '',
      `Action Items:\n${actionLines}`,
      '',
      `Key Topics:\n${meeting.key_topics.join(', ')}`,
    ].join('\n');

    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const handleExport = () => {
    if (!meeting) return;
    try {
      exportMeetingToPDF(meeting);
      toast.success('PDF downloaded');
    } catch (err) {
      console.error('PDF export failed:', err);
      toast.error('Failed to export PDF');
    }
  };

  const handleRegenerate = () => {
    toast.info('Regenerating insights...');
  };

  const goBack = () => {
    navigate('/app');
  };

  return {
    meeting,
    handleCopy,
    handleExport,
    handleRegenerate,
    goBack,
  };
}