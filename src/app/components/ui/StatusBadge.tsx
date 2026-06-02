type Status =
    | "Completed"
    | "Pending"
    | "To Do"
    | "In Progress"
    | "Done";

interface StatusBadgeProps {
    status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const styles: Record<Status, string> = {
        Completed: "bg-green-100 text-green-700",
        Pending: "bg-amber-100 text-amber-700",
        Done: "bg-green-100 text-green-700",
        "In Progress": "bg-amber-100 text-amber-700",
        "To Do": "bg-gray-100 text-gray-700",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}