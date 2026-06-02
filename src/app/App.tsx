import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { MeetingProvider } from './context/MeetingContext';

export default function App() {
  return (
    <MeetingProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </MeetingProvider>
  );
}