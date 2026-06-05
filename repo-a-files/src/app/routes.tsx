import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/dashboard/DashboardPage";
import { NewMeeting } from "./components/meetings/NewMeeting";
import { MeetingResults } from "./components/meetings/MeetingResults";
import { ActionItemsBoard } from "./components/action-items/ActionItemsPage";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./components/home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "new-meeting", Component: NewMeeting },
      { path: "meeting/:id", Component: MeetingResults },
      { path: "action-items", Component: ActionItemsBoard },
    ],
  },
]);