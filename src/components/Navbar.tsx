"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

function Navbar() {
    const pathName = usePathname();

    const navLinks = [
        {
            href: "/",
            title: "Home",
        },
        {
            href: "/store",
            title: "Store",
        },
    ];

    return (
        <nav className="shadow p-4">
            <Container>
                <div className="flex justify-start items-center">


                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`mr-4 ${pathName === item.href ? "text-sky-300" : ""}`}
                        >
                            {item.title}
                        </Link>
                    ))}


                </div>
                <div className="flex justify-end"><Link href="/cart">

                    <span>سبد خرید</span></Link>
                </div>
            </Container>
        </nav>
    );
}

export default Navbar;