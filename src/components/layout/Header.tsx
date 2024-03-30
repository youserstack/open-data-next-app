import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <section>
        <nav>
          <Link href={"/"}>HOME</Link>
          <Link href={"/open-data"}>OPEN DATA</Link>
        </nav>
      </section>
    </header>
  );
}
