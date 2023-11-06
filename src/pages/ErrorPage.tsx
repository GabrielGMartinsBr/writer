import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError() as any;
    console.error(error);

    return (
        <div className="max-w-6xl mx-auto text-center px-9 py-16">
            <h1 className='font-semibold text-2xl mb-3'>Oops!</h1>

            <p className='mb-3'>
                Sorry, an unexpected error has occurred.
            </p>

            <div className={
                'max-w-lg mx-auto mb-3 bg-zinc-50 text-zinc-400 ' +
                'p-6 text-left rounded-lg text-sm'
            }>
                <p className=''>
                    {error?.statusText || error?.message}
                </p>
                <p className=''>
                    {error?.data}
                </p>
            </div>

            <Link to='/'
                className='text-primary text-base underline underline-offset-[.1rem]'
            >
                Go back to title
            </Link>
        </div>
    )
}
