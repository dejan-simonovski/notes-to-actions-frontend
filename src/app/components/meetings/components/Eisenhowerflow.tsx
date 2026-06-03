import { useState } from 'react';
import type { ActionItem, TaskPriority } from '../../types/meeting';

interface EisenhowerLane {
    key: TaskPriority;
    step: number;
    title: string;
    subtitle: string;
    containerClass: string;
    headerClass: string;
    badgeClass: string;
    titleClass: string;
    subtitleClass: string;
}

const LANES: EisenhowerLane[] = [
    {
        key: 'urgent_important',
        step: 1,
        title: 'Do now',
        subtitle: 'Urgent & important',
        containerClass: 'bg-indigo-50 border-indigo-200',
        headerClass: 'bg-indigo-50 border-b border-indigo-200',
        badgeClass: 'bg-indigo-600 text-white',
        titleClass: 'text-indigo-900',
        subtitleClass: 'text-indigo-500',
    },
    {
        key: 'important_not_urgent',
        step: 2,
        title: 'Schedule',
        subtitle: 'Important, not urgent',
        containerClass: 'bg-teal-50 border-teal-200',
        headerClass: 'bg-teal-50 border-b border-teal-200',
        badgeClass: 'bg-teal-600 text-white',
        titleClass: 'text-teal-900',
        subtitleClass: 'text-teal-500',
    },
    {
        key: 'urgent_not_important',
        step: 3,
        title: 'Delegate',
        subtitle: 'Urgent, not important',
        containerClass: 'bg-amber-50 border-amber-200',
        headerClass: 'bg-amber-50 border-b border-amber-200',
        badgeClass: 'bg-amber-500 text-white',
        titleClass: 'text-amber-900',
        subtitleClass: 'text-amber-500',
    },
    {
        key: 'low_priority',
        step: 4,
        title: 'Defer / eliminate',
        subtitle: 'Low priority',
        containerClass: 'bg-gray-50 border-gray-200',
        headerClass: 'bg-gray-50 border-b border-gray-200',
        badgeClass: 'bg-gray-400 text-white',
        titleClass: 'text-gray-700',
        subtitleClass: 'text-gray-400',
    },
];

interface EisenhowerFlowProps {
    actionItems: ActionItem[];
}

export function EisenhowerFlow({ actionItems }: EisenhowerFlowProps) {
    const assignees = Array.from(
        new Set(actionItems.map((i) => i.assignee_name)),
    ).sort();
    const [selectedAssignee, setSelectedAssignee] = useState<string>('all');

    const filtered =
        selectedAssignee === 'all'
            ? actionItems
            : actionItems.filter((i) => i.assignee_name === selectedAssignee);

    const grouped = LANES.reduce<Record<string, ActionItem[]>>((acc, lane) => {
        acc[lane.key] = filtered.filter((item) => item.priority === lane.key);
        return acc;
    }, {});

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 gap-4">
                <div>
                    <h3 className="text-gray-900 font-semibold">Recommended flow</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                        Action items sorted by Eisenhower priority
                    </p>
                </div>
                <select
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="all">All assignees</option>
                    {assignees.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            {/* 4 equal columns, no horizontal scroll — lanes stretch to fill */}
            <div className="grid grid-cols-4 gap-3">
                {LANES.map((lane) => {
                    const items = grouped[lane.key] ?? [];
                    return (
                        <div
                            key={lane.key}
                            className={`rounded-lg border ${lane.containerClass} overflow-hidden`}
                        >
                            <div className={`flex items-center gap-2 px-3 py-2.5 ${lane.headerClass}`}>
                                <span
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0 ${lane.badgeClass}`}
                                >
                                    {lane.step}
                                </span>
                                <div>
                                    <p className={`text-xs font-semibold leading-tight ${lane.titleClass}`}>
                                        {lane.title}
                                    </p>
                                    <p className={`text-[10px] leading-tight ${lane.subtitleClass}`}>
                                        {lane.subtitle}
                                    </p>
                                </div>
                            </div>

                            <div className="px-2 py-2 space-y-1.5">
                                {items.length === 0 ? (
                                    <p className="text-[11px] text-gray-400 italic px-1 py-1">
                                        No items
                                    </p>
                                ) : (
                                    items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-md border border-gray-200 px-2.5 py-2"
                                        >
                                            <p className="text-xs text-gray-800 leading-snug">
                                                {item.description}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {item.assignee_name}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}