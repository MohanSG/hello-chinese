import '../styles/footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Mandarin Academy</h3>
          <p>
            Helping children build confidence and develop a love for learning
            Mandarin.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/lessons">Lessons</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📧 hello@mandarinacademy.com</p>
          <p>📞 +44 1234 567890</p>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 Mandarin Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;