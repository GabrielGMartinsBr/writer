import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { FiLink } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className={
      'container h-full mx-auto py-12'
      + ' overflow-auto'
      + ' scrollbar-thin'
      + ' scrollbar-thumb-main-black scrollbar-track-main-black/5'
      + ' text-zinc-700'
    }>


      <div className="flex flex-col items-center">
        <div className="">
          <h2 className="flex items-center text-3xl font-medium">
            <span className="mx-2">
              Dev Routes
            </span>
          </h2>

          <div className="px-3 mt-6">
            {contentLinks}
          </div>
        </div>
      </div>

    </div>
  )
}


const contentLinks = (
  <nav>
    {[
      '/writer',
    ].map((i) => (
      <Link to={i}
        key={i}
        className={
          'flex items-center px-3 py-2'
          + ' cursor-pointer font-medium'
          + ' text-sm text-zinc-600'
          + ' border-solid border-light-gray'
          + ' border-x border-t last:border-b'
          + ' first:rounded-t-md last:rounded-b-md'
          + ' hover:bg-zinc-950/5 hover:text-zinc-800'
          + ' focus:bg-zinc-950/5 focus:text-zinc-800'
          + ' transition-colors duration-300'
        }
      >
        <FiLink className='mr-2 text-xs' />
        {i}
        <FaChevronRight className='ml-auto' />
      </Link>
    ))}
  </nav>
)