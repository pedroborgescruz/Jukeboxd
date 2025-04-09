import { FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si";

const socialLinks = [
  {
    platform: "X",
    url: "https://x.com/pedroborgespc",
    icon: SiX,
  },
  {
    platform: "github",
    url: "https://github.com/pedroborgescruz/",
    icon: FaGithub,
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mb-5 relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h5 className="text-lg accent-jukeboxd font-semibold jukeboxd-text">
            Jukeboxd
          </h5>
          <ul className="flex flex-wrap gap-y-2 gap-x-8">
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

        <div className="mt-5 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <p className="mb-4 text-center text-sm font-normal text-blue-gray-900 md:mb-0">
            &copy; {currentYear}{" "}
            <a href="/" className="hover:underline">
              Jukeboxd
            </a>. All Rights Reserved.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 text-white sm:justify-center">
            {socialLinks.map(({ platform, url, icon: Icon }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 transition-opacity hover:opacity-100"
              >
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}