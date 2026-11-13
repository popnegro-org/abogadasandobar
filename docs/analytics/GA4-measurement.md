# GA4 measurement integrity

## Production property
- GA4 Measurement ID: `G-E1VQWLYM77`
- Canonical production hostname: `abogadasandobar.com.ar`
- Secondary production alias: `www.abogadasandobar.com.ar`

The Google tag is intentionally loaded only on these production hostnames. Localhost, IP hosts, Vercel Preview URLs, and other domains must not send data to the production property.

## Event contract

| Event | Meaning | Key event |
|---|---|---|
| `contact_form_start` | First interaction with a contact form field in a mounted contact page | No |
| `contact_form_success` | Formspree returned a successful response for a contact submission | Yes, after GA4 configuration |
| `whatsapp_click` | User activated a WhatsApp link | Optional; keep separate from submitted leads |
| `phone_click` | User activated a telephone link | Optional |
| `email_click` | User activated an email link | Optional |

No form fields, names, phone numbers, email addresses, or message contents may be sent to GA4.

## Known property-level issue requiring GA4 Admin access

The current GA4 export contains 23 `generate_lead` key events during 2026-10-21–2026-11-13. All observed instances are attributed to `/contacto`; the event appears on page visits where there is no matching successful-submit signal. The application source does not emit `generate_lead`.

This strongly indicates a GA4-created event rule (or another property-side rule) that derives `generate_lead` from page activity. It must be inspected in GA4 Admin; the Windsor reporting connection is read-only and cannot change property configuration.

### Required GA4 Admin action
1. Open **Admin → Data display → Events** and inspect the event definition for `generate_lead`.
2. If it is created from `page_view` or a condition involving `page_location` / `/contacto`, disable or delete that custom event definition. Do not delete historical reports.
3. Remove `generate_lead` from key events while it is still page-visit based.
4. After `contact_form_success` appears in the Events report, mark `contact_form_success` as a key event.
5. Keep `whatsapp_click` separate from completed form leads. A click is an intent signal, not a submitted consultation.

## Verification checklist
- On localhost and Vercel Preview, no request to `googletagmanager.com/gtag/js` is made.
- On the production hostname, the existing GA4 Measurement ID is loaded.
- Invalid form attempts and Formspree failures do not emit `contact_form_success`.
- A successful Formspree response emits exactly one `contact_form_success` event.
- GA4 DebugView confirms the event name and contains no personal data.
- No real production contact form is submitted as part of automated QA.
