import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { NewMeeting } from "./components/NewMeeting";
import { MeetingResults } from "./components/MeetingResults";
import { ActionItemsBoard } from "./components/ActionItemsBoard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "new-meeting", Component: NewMeeting },
      { path: "meeting/:id", Component: MeetingResults },
      { path: "action-items", Component: ActionItemsBoard },
    ],
  },
]);
