const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style = {{backgroundColor: "#19121f"}} className="w-full p-8">
      <div style = {{backgroundColor: "#19121f"}} className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img 
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png" 
          alt="logo-ct" 
          className="w-10" 
        />
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
      <p style = {{color: "#ded4df"}} className="text-center font-normal">
        &copy; {currentYear} <a href="https://material-tailwind.com/">Jukeboxd</a>.
      </p>

    </footer>
  );
}