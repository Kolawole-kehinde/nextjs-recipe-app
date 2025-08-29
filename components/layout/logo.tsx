    
"use client";

import Link from "next/link";

interface LogoProps {
  toggleMenu?: () => void;
}

const Logo: React.FC<LogoProps> = ({ toggleMenu }) => {
  return (
    <Link href="/" onClick={toggleMenu}>
      <div className="flex items-center space-x-2 text-2xl font-bold text-black">
        <h2 className="text-2xl font-bold mb-3">
          FD<span className="text-primary">A</span>
        </h2>
      </div>
    </Link>
  );
};

export default Logo;

