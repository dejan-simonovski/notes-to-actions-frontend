import { getAllActionItems, mockMeetings } from "../data/mockData";

export function useDashboard() {
    const allActionItems = getAllActionItems();

    const openActionItems = allActionItems.filter(
        (item) => item.status !== "Done"
    ).length;

    const completedTasks = allActionItems.filter(
        (item) => item.status === "Done"
    ).length;

    return {
        meetings: mockMeetings,
        totalMeetings: mockMeetings.length,
        openActionItems,
        completedTasks,
    };
}