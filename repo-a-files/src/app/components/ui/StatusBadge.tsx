type Status = 'to_do' | 'in_progress' | 'done';

type Props = {
  status: Status;
};

const STATUS_STYLES: Record<Status, string> = {
  done: 'bg-green-100 text-green-700',
  in_progress: 'bg-amber-100 text-amber-700',
  to_do: 'bg-gray-100 text-gray-700',
};

const STATUS_LABELS: Record<Status, string> = {
  done: 'Done',
  in_progress: 'In Progress',
  to_do: 'To Do',
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}