import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <div className={
            'w-screen h-screen fixed inset-0'
            + ' overflow-hidden'
            + ' font-inter text-base text-zinc-900'
        }>
            <Outlet />
        </div >
    )
}

