import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-human-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Consultation & Site Visit Booking Section -->
    <section id="consultation" class="booking-section">
      <div class="site-container-fluid">
        <div class="booking-card">
          <div class="booking-info">
            <span class="human-pill human-pill-dark">Direct Consultation</span>
            <h2 class="booking-title font-serif">Request a Site Visit & Substrate Inspection</h2>
            <p class="booking-desc">
              Our Senior Technical Finisher will visit your site anywhere in Kerala to measure square footage, check wall moisture levels with electronic hygrometers, and bring physical mineral sample boards.
            </p>

            <div class="guarantee-points">
              <div class="g-point">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A27F4C" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Free on-site sample board review for architects & homeowners</span>
              </div>
              <div class="g-point">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A27F4C" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Zero obligation, transparent itemized square-foot quotation</span>
              </div>
              <div class="g-point">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A27F4C" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Direct coordination with your architect or civil contractor</span>
              </div>
            </div>
          </div>

          <div class="booking-form-box">
            <h3 class="form-title font-serif">Book Site Assessment</h3>
            
            <div *ngIf="submitted()" class="success-message">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="16 12 12 8 8 12"></polyline>
                <line x1="12" y1="16" x2="12" y2="8"></line>
              </svg>
              <h4>Thank you, {{ formData.name }}!</h4>
              <p>Our senior technical finisher in {{ formData.city }} will reach out within 2 hours on {{ formData.phone }}.</p>
            </div>

            <form *ngIf="!submitted()" (ngSubmit)="onSubmit()" class="site-form">
              <div class="input-field">
                <label>Your Name / Architecture Firm</label>
                <input type="text" [(ngModel)]="formData.name" name="name" placeholder="e.g. Thomas Kurian" required />
              </div>

              <div class="input-field">
                <label>Mobile / WhatsApp Number</label>
                <input type="tel" [(ngModel)]="formData.phone" name="phone" placeholder="+91 98470 XXXXX" required />
              </div>

              <div class="input-row">
                <div class="input-field half">
                  <label>Project City in Kerala</label>
                  <select [(ngModel)]="formData.city" name="city">
                    <option value="Kochi / Ernakulam">Kochi / Ernakulam</option>
                    <option value="Kozhikode / Calicut">Kozhikode / Calicut</option>
                    <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Kottayam">Kottayam</option>
                    <option value="Alappuzha">Alappuzha</option>
                    <option value="Kannur">Kannur</option>
                    <option value="Other Kerala Location">Other Kerala Location</option>
                  </select>
                </div>

                <div class="input-field half">
                  <label>Finish of Interest</label>
                  <select [(ngModel)]="formData.finish" name="finish">
                    <option value="Marble Texture Painting">Marble Texture Painting</option>
                    <option value="Cement Texture Painting">Cement Texture Painting</option>
                    <option value="Line Brush Painting">Line Brush Painting</option>
                    <option value="Combination of Multiple Finishes">Combination of All 3</option>
                  </select>
                </div>
              </div>

              <button type="submit" class="btn-submit">
                Confirm Site Inspection Request
              </button>

              <div class="whatsapp-alt">
                <span>Or connect immediately via:</span>
                <a 
                  href="https://wa.me/919847082910?text=Hi%2C%20I%20would%20like%20to%20schedule%20a%20site%20visit%20for%20wall%20textures." 
                  target="_blank" 
                  rel="noopener"
                  class="btn-whatsapp"
                >
                  WhatsApp Helpline (+91 98470 82910)
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Centers & Showrooms Across Kerala -->
    <section id="experience-centers" class="centers-section">
      <div class="site-container-fluid">
        <div class="centers-header">
          <span class="human-pill">Visit Our Physical Studios</span>
          <h2 class="centers-title font-serif">Kerala Experience Centers</h2>
          <p class="centers-desc">Feel full 8-foot monolithic walls of Venetian marble stucco, seamless microcement, and combed line-brush textures under natural architectural lighting.</p>
        </div>

        <div class="centers-grid">
          <!-- Kochi -->
          <div class="center-card">
            <div class="city-badge">Central Kerala Studio</div>
            <h3 class="city-name font-serif">Kochi / Ernakulam</h3>
            <p class="center-addr">
              KAS Surface Atelier, 3rd Floor, Panampilly Nagar Main Avenue, Ernakulam, Kerala 682036
            </p>
            <div class="center-contact">
              <span><strong>Phone:</strong> +91 98470 82910</span>
              <span><strong>Hours:</strong> Mon – Sat: 9:30 AM – 6:30 PM</span>
            </div>
            <a href="https://wa.me/919847082910?text=I%20would%20like%20to%20visit%20the%20Panampilly%20Nagar%20Atelier%20in%20Kochi" target="_blank" rel="noopener" class="center-link">
              Schedule Kochi Visit &rarr;
            </a>
          </div>

          <!-- Calicut -->
          <div class="center-card">
            <div class="city-badge">North Kerala Studio</div>
            <h3 class="city-name font-serif">Kozhikode / Calicut</h3>
            <p class="center-addr">
              2nd Floor, Mavoor Road, Arayidathupalam Junction, Kozhikode, Kerala 673004
            </p>
            <div class="center-contact">
              <span><strong>Phone:</strong> +91 98470 82911</span>
              <span><strong>Hours:</strong> Mon – Sat: 9:30 AM – 6:30 PM</span>
            </div>
            <a href="https://wa.me/919847082910?text=I%20would%20like%20to%20visit%20the%20Mavoor%20Road%20Studio%20in%20Calicut" target="_blank" rel="noopener" class="center-link">
              Schedule Calicut Visit &rarr;
            </a>
          </div>

          <!-- Trivandrum -->
          <div class="center-card">
            <div class="city-badge">South Kerala Studio</div>
            <h3 class="city-name font-serif">Thiruvananthapuram</h3>
            <p class="center-addr">
              Near Raj Bhavan, Kowdiar, Thiruvananthapuram, Kerala 695003
            </p>
            <div class="center-contact">
              <span><strong>Phone:</strong> +91 98470 82912</span>
              <span><strong>Hours:</strong> Mon – Sat: 9:30 AM – 6:00 PM</span>
            </div>
            <a href="https://wa.me/919847082910?text=I%20would%20like%20to%20visit%20the%20Kowdiar%20Atelier%20in%20Trivandrum" target="_blank" rel="noopener" class="center-link">
              Schedule Trivandrum Visit &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Footer -->
    <footer class="main-footer">
      <div class="site-container-fluid">
        <div class="footer-top">
          <div class="footer-brand">
            <span class="f-brand-name font-serif">KERALA ARCHITECTURAL SURFACES</span>
            <p class="f-brand-tagline">
              Dedicated exclusively to the craft of Italian marble texture painting, architectural microcement, and artisanal line brush corduroy plaster across Kerala since 1998.
            </p>
            <div class="cert-badges">
              <span class="cert-item">&bull; Certified Italian Venetian Plaster Masters</span>
              <span class="cert-item">&bull; 100% Zero-VOC Eco-Mineral Formulations</span>
              <span class="cert-item">&bull; Kerala Anti-Fungal Monsoon Formulations</span>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="col-heading">Disciplines</h4>
            <ul class="col-list">
              <li><a href="#marble-section">Marble Texture Painting</a></li>
              <li><a href="#cement-section">Cement Texture Painting</a></li>
              <li><a href="#linebrush-section">Line Brush Painting</a></li>
              <li><a href="#pricing-specs">Pricing & Rate Cards</a></li>
              <li><a href="#before-after">Before & After Slider</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="col-heading">Kerala Locations</h4>
            <ul class="col-list">
              <li><a href="#experience-centers">Kochi (Panampilly Nagar)</a></li>
              <li><a href="#experience-centers">Calicut (Mavoor Road)</a></li>
              <li><a href="#experience-centers">Trivandrum (Kowdiar)</a></li>
              <li><a href="#consultation">Thrissur & Palakkad</a></li>
              <li><a href="#consultation">Kottayam & Alappuzha</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="col-heading">Direct Helpline</h4>
            <div class="phone-box">
              <span class="p-label">Senior Technical Finisher:</span>
              <a href="tel:+919847082910" class="p-num">+91 98470 82910</a>
              <span class="p-label">Email Inquiries:</span>
              <a href="mailto:info@keralaarchitecturalsurfaces.com" class="p-email">info&#64;keralaarchitecturalsurfaces.com</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            &copy; 2026 Kerala Architectural Surfaces LLP. All rights reserved. Registered under Kerala State Commercial Tax & GST.
          </p>
          <div class="bottom-links">
            <span>GSTIN: 32AABCK4819M1Z5</span>
            <span class="dot">&bull;</span>
            <span>Master Craftsmen Guild of Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .booking-section {
      background-color: var(--bg-dark);
      color: var(--text-light);
      padding: clamp(3.5rem, 6vw, 6rem) 0;
      width: 100%;
    }
    .booking-card {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(2rem, 4vw, 4.5rem);
      align-items: center;
      width: 100%;
    }
    @media (min-width: 992px) {
      .booking-card {
        grid-template-columns: 1.15fr 1fr;
      }
    }
    .booking-title {
      font-size: clamp(1.75rem, 3vw, 2.35rem);
      font-weight: 600;
      color: #FFFFFF;
      margin: 1.25rem 0 0.8rem 0;
      line-height: 1.25;
    }
    .booking-desc {
      font-size: clamp(0.92rem, 1.1vw, 1.05rem);
      color: var(--text-light-muted);
      line-height: 1.65;
      margin-bottom: 1.75rem;
    }
    .guarantee-points {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .g-point {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-size: clamp(0.84rem, 1vw, 0.92rem);
      color: #E2DDD5;
    }
    .g-point svg {
      flex-shrink: 0;
      margin-top: 2px;
    }

    .booking-form-box {
      background-color: var(--bg-dark-card);
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      padding: clamp(1.5rem, 3vw, 2.5rem);
      box-shadow: 0 16px 36px rgba(0,0,0,0.3);
      width: 100%;
    }
    .form-title {
      font-size: clamp(1.25rem, 2vw, 1.55rem);
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 1.25rem;
    }
    .site-form {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      width: 100%;
    }
    .input-field {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      width: 100%;
    }
    .input-field label {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--text-light-muted);
      text-transform: uppercase;
    }
    .input-field input, .input-field select {
      padding: 0.8rem 0.95rem;
      background-color: #1A1917;
      border: 1px solid var(--border-dark);
      border-radius: 4px;
      color: #FFFFFF;
      font-family: var(--font-sans);
      font-size: 16px; /* Prevents iOS safari zoom */
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
    }
    .input-field input:focus, .input-field select:focus {
      border-color: var(--accent-brass);
    }
    .input-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    @media (min-width: 600px) {
      .input-row {
        flex-direction: row;
      }
      .input-field.half {
        flex: 1;
      }
    }
    .btn-submit {
      margin-top: 0.5rem;
      padding: 0.95rem 1.5rem;
      background-color: var(--accent-brass);
      color: #FFFFFF;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: var(--transition-smooth);
      width: 100%;
      min-height: 48px;
    }
    .btn-submit:hover {
      background-color: var(--accent-brass-dark);
    }
    .whatsapp-alt {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;
      margin-top: 0.75rem;
      font-size: 0.78rem;
      color: var(--text-light-muted);
      text-align: center;
      width: 100%;
    }
    .whatsapp-alt .btn-whatsapp {
      width: 100%;
    }
    .success-message {
      text-align: center;
      padding: 2rem 1rem;
    }
    .success-message h4 {
      font-size: 1.3rem;
      color: #FFFFFF;
      margin: 0.8rem 0 0.4rem 0;
    }
    .success-message p {
      color: var(--text-light-muted);
      font-size: 0.9rem;
    }

    /* Experience Centers */
    .centers-section {
      padding: clamp(3.5rem, 6vw, 6rem) 0;
      background-color: var(--bg-primary);
      border-top: 1px solid var(--border-subtle);
      width: 100%;
    }
    .centers-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto clamp(2rem, 4vw, 3.5rem) auto;
    }
    .centers-title {
      font-size: clamp(1.85rem, 3vw, 2.35rem);
      font-weight: 600;
      color: var(--text-primary);
      margin: 0.75rem 0 0.5rem 0;
    }
    .centers-desc {
      font-size: clamp(0.88rem, 1.1vw, 1rem);
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .centers-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(1.25rem, 2.5vw, 2rem);
      width: 100%;
    }
    @media (min-width: 768px) {
      .centers-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .center-card {
      background-color: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: clamp(1.5rem, 2.5vw, 2rem);
      box-shadow: var(--shadow-subtle);
      display: flex;
      flex-direction: column;
      transition: var(--transition-smooth);
      width: 100%;
    }
    .center-card:hover {
      border-color: var(--accent-brass);
      transform: translateY(-2px);
      box-shadow: var(--shadow-hover);
    }
    .city-badge {
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--accent-brass-dark);
      margin-bottom: 0.4rem;
    }
    .city-name {
      font-size: clamp(1.25rem, 1.8vw, 1.45rem);
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.75rem;
    }
    .center-addr {
      font-size: 0.86rem;
      color: var(--text-secondary);
      line-height: 1.55;
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }
    .center-contact {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.78rem;
      color: var(--text-muted);
      padding: 0.85rem 0;
      border-top: 1px solid var(--border-subtle);
      margin-bottom: 1rem;
    }
    .center-link {
      font-size: 0.84rem;
      font-weight: 700;
      color: var(--accent-brass-dark);
      text-decoration: none;
      transition: color 0.2s;
    }
    .center-link:hover {
      color: var(--text-primary);
    }

    /* Main Footer */
    .main-footer {
      background-color: #141312;
      color: var(--text-light);
      padding: clamp(3rem, 5vw, 4.5rem) 0 2.5rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      width: 100%;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(2rem, 3.5vw, 3rem);
      padding-bottom: clamp(2.5rem, 4vw, 3.5rem);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      width: 100%;
    }
    @media (min-width: 640px) {
      .footer-top {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (min-width: 1024px) {
      .footer-top {
        grid-template-columns: 2fr 1fr 1fr 1.3fr;
      }
    }
    .f-brand-name {
      font-size: clamp(1.05rem, 1.8vw, 1.25rem);
      font-weight: 700;
      letter-spacing: 0.06em;
      color: #FFFFFF;
      display: block;
      margin-bottom: 0.85rem;
    }
    .f-brand-tagline {
      font-size: 0.88rem;
      color: var(--text-light-muted);
      line-height: 1.6;
      max-width: 380px;
      margin-bottom: 1.25rem;
    }
    .cert-badges {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      font-size: 0.76rem;
      color: var(--accent-brass-light);
    }

    .col-heading {
      font-size: 0.82rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #FFFFFF;
      margin-bottom: 1.25rem;
    }
    .col-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }
    .col-list a {
      color: var(--text-light-muted);
      text-decoration: none;
      font-size: 0.84rem;
      transition: color 0.2s;
    }
    .col-list a:hover {
      color: #FFFFFF;
    }

    .phone-box {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }
    .p-label {
      font-size: 0.72rem;
      color: var(--text-light-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .p-num {
      font-size: clamp(1.1rem, 1.8vw, 1.35rem);
      font-weight: 700;
      color: var(--accent-brass-light);
      text-decoration: none;
      margin-bottom: 0.75rem;
    }
    .p-email {
      color: var(--text-light);
      text-decoration: none;
      font-size: 0.82rem;
      word-break: break-all;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding-top: 2rem;
      font-size: 0.75rem;
      color: var(--text-light-muted);
      width: 100%;
    }
    .bottom-links {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      flex-wrap: wrap;
    }
    .dot {
      color: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class HumanFooterComponent {
  readonly submitted = signal(false);

  formData = {
    name: '',
    phone: '',
    city: 'Kochi / Ernakulam',
    finish: 'Marble Texture Painting'
  };

  onSubmit(): void {
    if (this.formData.name && this.formData.phone) {
      this.submitted.set(true);
    }
  }
}
