export default function Contact() {
  return (
    <section className="section contact-section">
      <h2>📞 Get in Touch</h2>

      <p>
        We’d love to hear from you — whether you have questions, feedback, or you're interested in working with us.
        Feel free to reach out through any of the following methods:
      </p>

      <div className="contact-details">
        <div className="contact-item">
          <strong>Email:</strong>
          <a href="mailto:francgod693@gmail.com"> francgod693@gmail.com</a>
        </div>

        <div className="contact-item">
          <strong>Phone:</strong>
          <a href="tel:+255656306692"> +255 656 306 692</a>
        </div>

        <div className="contact-item">
          <strong>Location:</strong>
          <span> Zanzibar, Tanzania</span>
        </div>
      </div>

      <p style={{ marginTop: '1.5rem' }}>
        We typically respond within 24–48 hours. Your voice matters to us — let’s connect and make a difference together.
      </p>
    </section>
  );
}
