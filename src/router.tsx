import { createBrowserRouter, redirect } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/home/HomePage';
import WriterPage from './pages/writer/WriterPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                loader: () => redirect('/home')
            },
            {
                path: 'home',
                element: <HomePage />
            },
            {
                path: 'writer',
                element: <WriterPage />
            }
        ]
    },
]);

