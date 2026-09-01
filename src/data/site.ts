/**
 * Business details, in one place.
 *
 * These were hardcoded in both the Layout footer and the contact page, which
 * meant relocating the studio required editing the same address twice. Anything
 * that would change if the studio moved, or changed its hours or its number,
 * belongs here.
 */
export const site = {
  name: 'Aura Blush',
  legalName: 'Aura Blush Studio',
  city: 'Varanasi',

  /**
   * Locality confirmed as Sigra. The building/street line and the landmark are
   * still unknown — leave them blank rather than inventing them; both render
   * only when filled in. See HANDOFF-FOUNDER.md §16.
   */
  address: {
    /** e.g. 'Shop 4, Ravi Complex' — awaiting the actual building/street. */
    line1: '',
    line2: 'Sigra, Varanasi',
    state: 'Uttar Pradesh, India',
    /** Landmark directions matter more than a postcode here, once known. */
    landmark: '',
  },

  /**
   * PLACEHOLDER — awaiting Roshni's real numbers. Both render only when
   * `display` is filled in, so the site shows no phone at all rather than a
   * dummy one. Set `display` and `href` together. See HANDOFF-FOUNDER.md §17.
   */
  phone: { display: '', href: '' },
  whatsapp: { display: '', href: '' },
  /** PLACEHOLDER — no studio address yet. Instagram DM is the live channel. */
  email: '',

  hours: [
    { days: 'Tuesday – Sunday', time: '10:00 – 20:00' },
    { days: 'Monday',           time: 'Closed' },
  ],

  social: {
    instagram: { handle: '@1leeja10', href: 'https://www.instagram.com/1leeja10' },
  },

  languages: 'Hindi, English, Bhojpuri',
  payments: 'UPI, all major cards (Indian and international), and cash.',

  /**
   * Booking-form endpoint. Empty until a form service is connected.
   *
   * While empty, the form does NOT pretend to submit — it directs people to
   * Instagram instead, because a form that swallows a booking request is worse
   * than no form at all.
   *
   * To switch it on: create a free form at https://web3forms.com (or Formspree)
   * and paste the access key here. Nothing else needs changing.
   */
  formEndpoint: '',
  formAccessKey: '',

  /**
   * Beauty and wellness services attract 18% GST in India. Every price on the
   * site is quoted inclusive of it — a price that grows 18% at the counter is
   * the fastest way to lose a first-time client.
   */
  gstNote: 'All prices include 18% GST. No consultation fee, no card surcharge.',
  currency: '₹',
} as const;
