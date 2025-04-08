const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style = {{backgroundColor: "#19121f"}} className="w-full p-8">
      <div style = {{backgroundColor: "#19121f"}} className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <a href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-vinyl-fill" viewBox="0 0 16 16">
          <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0"/>
        </svg>
        </a>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          {['About Us', 'License', 'Contribute', 'Contact Us'].map((item) => (
            <li key={item}>
              <a
                href="#"
                style = {{color: "#ded4df"}}
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

    <hr className="my-8 border-blue-gray-50" />

    <div className="flex justify-center items-center gap-4">
      <p style = {{color: "#ded4df"}} className="text-center font-normal">
        &copy; {currentYear} <a href="/">Jukeboxd</a>
      </p>
      <a href="https://github.com/pedroborgescruz/jukeboxd" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
        </svg>
      </a>
    </div>

    </footer>
  );
}