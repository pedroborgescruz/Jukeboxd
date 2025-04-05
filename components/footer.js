const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
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
                className="font-normal text-gray-600 transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <p className="text-center font-normal text-gray-600">
        &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>.
      </p>
    </footer>
  );
}