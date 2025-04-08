import { useState } from "react";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <nav>
        <button onClick={handleNav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="orange"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* menu mobile */}
        <div
          className={`${
            nav ? "block" : "hidden"
          } lg:hidden absolute top-0 left-0 right-3/12 bottom-0`}
        >
          <aside className="h-full w-[80%] bg-gray-500 p-3">
            <ul className="flex flex-col gap-10">
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
              <li>LINK 1</li>
            </ul>
          </aside>
          <button onClick={handleNav} className="absolute right-0 top-0 m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
