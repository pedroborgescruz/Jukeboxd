import {User, Link} from "@heroui/react";

export default function App() {
  return (
    <User
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
      }}
      description={
        <Link isExternal href="https://www.adriannelenker.com/" size="sm">
          @alenker
        </Link>
      }
      name="Adrianne Lenker"
    />
  );
}
