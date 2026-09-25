# CV Print Design

**Status:** approved design for the CV PDF layout slice.

## Purpose

The generated CV PDF should read as a deliberately composed A4 paper document. Its print layout must keep all content within page bounds, preserve readable type, and make a purposeful two-page composition from the current content.

## Approved composition

- Page 1 contains the identity, profile, Access Group role, Barbican/Arch role, and Brand Addition.
- Page 2 contains independent engineering projects, technical skills, and education. Prefer some whitespace at the end of page two over leaving avoidable unused space at the end of page one.
- Group the existing technical skills by domain under peer headings: Languages, Frameworks & libraries, Cloud & delivery, Data & integration, and Testing. Do not divide the list by recency or mix recency labels with technical categories.
- The Access Group, Barbican/Arch, and Brand Addition are peer employer headings with the same typographic treatment.
- The two-page layout is an editorial intention for the current content. If the content cannot fit legibly in that composition, stop with rendered evidence and decide whether a third page is earned. Do not add a page solely because the layout implementation is inconvenient, and do not shrink type to force a page count.
- Print header regions have explicit shrink-safe widths. The identity and role must not be squeezed by long URL content.
- The page-two running title and page count appear only in the PDF/print rendering. They do not appear on the web CV.
- The PDF uses no tinted sheet, mineral surface, or decorative background fill. Its page canvas leaves the paper background unpainted.

## Print information and links

- The print header shows these destinations as plain, non-interactive text without the `https://` scheme or trailing slash: `harleybartles.com`, `github.com/HarleyBartles`, and `linkedin.com/in/harley-bartles-92326110`.
- Each independent engineering project shows its bare GitHub repository URL as plain text beneath its summary in the print CV.
- Do not include the Contact route in the print representation.
- Links elsewhere in the CV, including project names, render as ordinary text in the PDF. The generated PDF has no clickable link annotations.
- The web CV keeps its existing navigable site, project, GitHub, LinkedIn, Contact, and download links.

## Observable acceptance

- The generated PDF has the approved two-page A4 composition and all text remains within its page sheet.
- The PDF has no coloured page or sheet background; its visual ground is the reader's paper.
- In the print composition, the header identity, role, availability, and URL text do not overlap or overflow horizontally.
- Page one contains both engineering roles and Brand Addition; page two begins with independent engineering projects.
- Screen rendering contains no print-only page title or page count.
- Print rendering contains the page-two running title and plain URL text, omits Contact, and emits no PDF link annotations.
- CV copy, role facts, project descriptions, and education facts remain unchanged.
- Existing technical skills appear under the five approved domain headings without added proficiency or recency claims.

## Out of scope

- Rewriting CV copy or changing professional facts.
- Changing the web CV's information hierarchy or its interactive link destinations.
- Adding QR codes, URL shorteners, or new contact channels.
- Approving the result through pixel snapshots. Use rendered PDF inspection and browser geometry for layout behavior.
