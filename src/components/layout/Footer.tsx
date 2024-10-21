export default function Footer() {
  return (
    <footer
      className="relative z-[100] pt-20 pb-10 
      bg-gradient-to-t from-black from-70% to-transparent to-100%"
    >
      <section className="max-w-screen-lg mx-auto">
        <small>youserstack © 2024 all right reserved.</small>
        <ul>
          <li>
            <i className="bi bi-github"></i>
          </li>
          <li>
            <i className="bi bi-slack"></i>
          </li>
        </ul>
      </section>
    </footer>
  );
}
