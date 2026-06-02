export function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
        >
            {status}
        </span>
    );
}