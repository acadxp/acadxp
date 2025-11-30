"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();

  return (
    <header className="absolute">
      <div className="logo-container">
        <Image
          src="/assets/img/acadxp-logo.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </div>

      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link href="/login">Get Started</Link>
      </div>
    </header>
  );
};
export default NavBar;
