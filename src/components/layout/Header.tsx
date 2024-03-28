import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <section>
        <nav>
          <Link href={"/"}>home</Link>
          <Link href={"/open-data"}>open data</Link>
        </nav>
      </section>
    </header>
  );
}
