# Privacy Policy

**Data Controller:** Leonardo Sarti Magi (sole proprietorship)
**Business Name:** The AI and Beyond di Leonardo Sarti Magi
**Tax ID (P.IVA):** 02754730469
**Legal Seat:** Via Genova 9, 55049 Viareggio (LU), Italy
**Privacy Email:** privacy@theaiandbeyond.it
**General Information Email:** info@theaiandbeyond.it
**Website:** https://theaiandbeyond.it

**Last Updated:** February 9, 2026

---

## 1. Introduction

This privacy policy describes how the website "The AI and Beyond" (hereinafter "the Website") collects, uses, stores, and protects the personal data of users. Personal data means any information relating to an identified or identifiable natural person (data subject).

The processing of personal data is carried out in accordance with Regulation (EU) 2016/679 (GDPR) and the Italian Privacy Code (Decree-Law 196/2003 as amended by Decree-Law 101/2018).

---

## 2. Data Controller

The **Data Controller** (the person or entity determining the purposes and methods of data processing) is:

**Leonardo Sarti Magi**

- Sole proprietorship registered in the Register of Enterprises of Lucca
- Tax ID: 02754730469
- Address: Via Genova 9, 55049 Viareggio (LU), Italy
- Email: privacy@theaiandbeyond.it

No Data Protection Officer (DPO) has been appointed, as this is not mandatory under Article 37 GDPR for sole proprietorships that do not carry out large-scale processing activities.

---

## 3. Types of Data Collected

### 3.1 Data Provided Directly by the User

Through the **contact form** available on the Website, the following personal data are collected:

- **Name and Surname** (required)
- **Email Address** (required)
- **Company Name** (optional)
- **Message/Content** (required)
- **Privacy Consent** (required - consent checkbox)

The contact form includes a privacy consent statement that the user must accept before submitting the message.

### 3.2 Data Collected Automatically

During visits to the Website, the following data are collected automatically:

#### 3.2.1 Technical Access Data

- **IP Address**: Used for rate limiting on the contact form to prevent abuse. The IP address is stored exclusively in volatile memory and is NOT persisted in any database.
- **User Agent and browser information**: Collected by the Vercel server for hosting and security purposes.
- **Request timestamp**: Automatically logged by the hosting server.

#### 3.2.2 Technical Cookies and Local Storage

- **Consent Cookie**: A technical cookie named `cookie-consent` is stored in the browser's localStorage, containing:
  - Analytics consent status (`analytics: true/false`)
  - Timestamp of consent

This cookie is strictly necessary to remember the user's preferences regarding analytical tracking and does not require prior consent under the ePrivacy Directive.

#### 3.2.3 Google Fonts

- **Google Fonts**: The Website uses fonts through Next.js Font Optimization, which loads fonts in a self-hosted manner. There is no direct connection to Google servers for font loading.

### 3.3 Data from Third-Party Services (Only if Consent is Provided)

The following analytics services are integrated into the Website but activated **ONLY after explicit user consent**:

#### 3.3.1 Vercel Analytics and Speed Insights

- **Provider**: Vercel Inc. (legal seat: United States)
- **Data collected**:
  - Page views
  - Performance and site speed data
  - Basic browser and device information
- **Legal basis**: Explicit user consent (Article 6, paragraph 1, letter a, GDPR)
- **Activation**: Only after accepting the cookie banner
- **Retention**: According to Vercel's policies (available at https://vercel.com/privacy)

---

## 4. Purposes of Processing

Personal data are processed for the following purposes:

### 4.1 Contact Form

- **Purpose**: To respond to requests for information and consultation submitted by users
- **Legal basis**:
  - Article 6, paragraph 1, letter a, GDPR: Explicit consent (declaration of acceptance of this privacy policy)
  - Article 6, paragraph 1, letter b, GDPR: Performance of a contract or pre-contractual measures (when applicable)

### 4.2 Abuse Prevention

- **Purpose**: To implement security measures for rate limiting on the contact form, preventing mass or automated submissions
- **Legal basis**: Article 6, paragraph 1, letter f, GDPR: Legitimate interest of the Data Controller in protecting its systems from abuse
- **Note**: The IP address used for this purpose is stored only in RAM and not persisted

### 4.3 Analytics and Website Improvement

- **Purpose**: To understand how users interact with the Website to improve user experience, usability, and functionality
- **Legal basis**: Article 6, paragraph 1, letter a, GDPR: Explicit user consent
- **Applicable to**: Vercel Analytics, Speed Insights

### 4.4 Compliance with Legal Obligations

- **Purpose**: Compliance with tax and accounting legal obligations (retention of contact documentation for administrative purposes)
- **Legal basis**: Article 6, paragraph 1, letter c, GDPR

---

## 5. Legal Basis for Processing

The processing of personal data is carried out on the basis of the following legal grounds (Article 6 GDPR):

| Type of Data              | Legal Basis                                  | Notes                                                          |
| ------------------------- | -------------------------------------------- | -------------------------------------------------------------- |
| Contact form data         | Consent (Art. 6.1.a) + Contract (Art. 6.1.b) | Consent obtained via checkbox; potential customer relationship |
| IP for rate limiting      | Legitimate interest (Art. 6.1.f)             | Protection from abuse and spam                                 |
| Technical consent cookies | Technical necessity (ePrivacy Directive)     | Does not require consent, strictly necessary                   |
| Analytics (Vercel)        | Consent (Art. 6.1.a)                         | Activated only after explicit consent                          |
| Google Fonts              | Legitimate interest (Art. 6.1.f)             | Self-hosted, no tracking                                       |
| Legal obligations         | Legal compliance (Art. 6.1.c)                | Retention for tax/administrative purposes                      |

---

## 6. Processing Methods

### 6.1 Data Security

The Data Controller implements the following security measures:

- **Hosting on Vercel**: Cloud infrastructure with international security standards (ISO 27001)
- **HTTPS Connection**: All data in transit is encrypted via SSL/TLS
- **Input validation**: Contact form data is validated via Zod schema to prevent injections and malformed data
- **No IP persistence**: IP addresses for rate limiting are not stored in a database, only in RAM
- **No database storage**: Contact form data is NOT archived in a local or online database, but transmitted via the Resend API directly to the website owner's email
- **Limited access**: Only the data controller has access to data transmitted via the contact form

### 6.2 Contact Form Data Flow

```
User fills out form
         ↓
Client-side validation (Zod schema)
         ↓
Submission via API (HTTPS) to Resend
         ↓
Resend processes and sends email to owner
         ↓
Data NOT stored in Website database
         ↓
Email archived in owner's email client
```

### 6.3 Data Protection and Compliance

- **Encryption**: All data in transit uses TLS 1.2 or higher
- **Backups**: Managed by Vercel according to industry standards
- **Access control**: No automatic access; requires authentication on the owner's email system
- **GDPR Compliance**: All operations are documented and subject to GDPR obligations

---

## 7. Place of Processing

### 7.1 Hosting - Vercel

The Website is hosted on **Vercel Inc.** (legal seat: United States)

- **Server location**: Distributed globally (including Europe)
- **Certification**: Vercel Inc. is certified under the EU-US Data Privacy Framework
- **Data processed**: Website content, hosting logistics, optional analytics
- **Processing Agreement**: Vercel has signed a Data Processing Agreement compliant with GDPR

### 7.2 Email Service - Resend

Contact form data is transmitted to **Resend Inc.** (legal seat: United States)

- **Process**: Resend receives the message and delivers it to the website owner's email
- **Location**: Distributed servers (including Europe)
- **Certification**: Resend adheres to international security standards
- **Processing Agreement**: Resend has signed a Data Processing Agreement compliant with GDPR
- **Retention**: Data is retained for the time necessary for email delivery, then removed

### 7.3 Analytics - Vercel Analytics

- **Vercel Analytics**: Processed at Vercel Inc. (USA, with EU-US Data Privacy Framework)

### 7.4 Extra-EU Transfers

Some data may be transferred to the United States via:

- **EU-US Data Privacy Framework**: For Vercel Inc. (analytics, hosting)

Such transfers are authorized by the European Commission and provide safeguards equivalent to those under GDPR.

---

## 8. Data Retention Period

| Type of Data               | Retention Period                             | Reason                                       |
| -------------------------- | -------------------------------------------- | -------------------------------------------- |
| Contact form data          | 3 years                                      | Tax/administrative obligations               |
| IP for rate limiting       | Session (RAM)                                | Only for abuse management in current session |
| Consent cookie             | 12 months                                    | Remember user preferences                    |
| Analytics (Vercel)         | According to Vercel policy (default 90 days) | Statistical analysis                         |
| Hosting logistics (Vercel) | According to Vercel retention policy         | Security and troubleshooting                 |

**Note**: After the retention period expires, data are deleted or anonymized in accordance with the principle of data minimization.

---

## 9. Data Subject Rights

According to Chapter III of GDPR (Rights of Data Subjects), every person has the right to:

### 9.1 Right of Access (Art. 15 GDPR)

Obtain confirmation of this privacy policy and access to personal data in our possession at any time.

### 9.2 Right to Rectification (Art. 16 GDPR)

Request the correction of inaccurate or incomplete personal data.

### 9.3 Right to Erasure/Right to Be Forgotten (Art. 17 GDPR)

Request the deletion of personal data, except where legal obligations and document retention apply.

**Note**: Since we do not store data in a database (only via email), exercising this right will be facilitated by deletion from the owner's email archive, subject to retention for tax obligations (3 years).

### 9.4 Right to Restrict Processing (Art. 18 GDPR)

Request the blocking of data processing while their accuracy is verified.

### 9.5 Right to Data Portability (Art. 20 GDPR)

Receive one's data in a structured, commonly used, and machine-readable format (e.g., CSV, JSON).

### 9.6 Right to Object (Art. 21 GDPR)

Object to the processing of personal data for reasons connected to the particular situation of the data subject.

**Applicable to**:

- Analytics (you can always disable consent)
- Rate limiting (request that the Data Controller implement alternative methods)

### 9.7 Right Not to Be Subject to Automated Decision-Making (Art. 22 GDPR)

Not applicable to this Website as no automated decisions are made that produce significant effects.

### 9.8 How to Exercise Rights

To exercise any of the rights described above, the data subject must send a written request to the Data Controller:

**Email**: privacy@theaiandbeyond.it
**Address**: Via Genova 9, 55049 Viareggio (LU), Italy

The request must contain:

- Identification of the data subject (name, surname, email)
- Description of the right being exercised
- Identity documentation (for security verification)

The Data Controller will respond within **30 days** of receipt of the request (extendable by 60 days for complex matters), as required by Article 12 GDPR.

### 9.9 Right to Lodge a Complaint with the Supervisory Authority

If the data subject believes that the processing of their personal data violates GDPR provisions or the Italian Privacy Code, they have the right to lodge a complaint with:

**Garante per la Protezione dei Dati Personali** (Italian Data Protection Authority)
Piazza di Monte Citorio 60, 00186 Roma, Italy
Website: https://www.garanteprivacy.it
Email: protocollo@pec.garanteprivacy.it

---

## 10. Cookies and Tracking

### 10.1 Cookie Definition

Cookies are small text files stored on the user's device that contain information about browsing.

### 10.2 Cookies Used on This Website

#### 10.2.1 Strictly Necessary Cookies (No Consent Required)

- **`cookie-consent`** (localStorage): Stores the user's preferences regarding analytical tracking. Does not require prior consent as it is strictly necessary to provide the service under the ePrivacy Directive.

#### 10.2.2 Analytical Cookies (Require Consent)

- **Vercel Analytics**: Stores cookies to track page views. Activated only after consent.

### 10.3 Cookie Management

Users can manage cookie preferences by:

1. **Via Cookie Banner**: Upon first visit to the Website, a banner appears allowing users to accept or decline analytics
2. **Via Browser**: Users can disable cookies directly in their browser settings
3. **Third parties**: Users can revoke consent to third-party services (Vercel) through their respective settings

### 10.4 Third-Party Cookies

The Website integrates the following services that store third-party cookies:

| Service          | Type          | Consent Required | Privacy Policy             |
| ---------------- | ------------- | ---------------- | -------------------------- |
| Vercel Analytics | Analytics     | Yes              | https://vercel.com/privacy |
| Google Fonts     | Functionality | No (self-hosted) | N/A                        |

---

## 11. Third-Party Services and Data Processors

### 11.1 Data Processors

Under Article 28 GDPR, the following services act as **Data Processors** (processors acting on the instructions of the Data Controller):

#### 11.1.1 Vercel Inc.

- **Role**: Hosting, CDN, Analytics
- **Location**: United States
- **DPA**: Available at https://vercel.com/security
- **Certification**: EU-US Data Privacy Framework
- **Contact**: privacy@vercel.com

#### 11.1.2 Resend Inc.

- **Role**: Email delivery (sending contact form messages)
- **Location**: United States
- **DPA**: Available
- **Data processed**: Name, email, message from contact form
- **Retention**: Until email delivery
- **Contact**: support@resend.com

### 11.2 Data Sharing with Third Parties

Personal data are NOT shared with third parties, except:

- **Resend**: For email delivery (contact form)
- **Vercel**: For hosting and analytics (only with consent)

No data are sold, licensed, or otherwise disclosed for marketing or profit purposes.

---

## 12. Data Subject Rights Against Data Processors

Data subjects have the right to contact Data Processors directly for:

- Access to personal data processed
- Exercise of GDPR rights
- Reporting violations or abuse

**Direct contacts**:

- **Vercel**: https://vercel.com/contact (Data Privacy)
- **Resend**: support@resend.com

---

## 13. Changes to This Privacy Policy

The Data Controller reserves the right to modify this privacy policy at any time to:

- Adapt to new legal requirements
- Integrate new services into the Website
- Address security and compliance needs

Changes will be published on this page with an update to the "Last Updated" date. Continued use of the Website after changes are published constitutes acceptance of those changes.

If changes involve a material change in data processing methods, notification will be provided by email to registered users (if available).

---

## 14. Consent and Acceptance

By accessing and using the Website, the user:

1. Confirms that they have read and understood this privacy policy
2. Accepts the processing of personal data as described
3. Accepts the Website's terms and conditions

For the contact form, users must explicitly select the "I accept the privacy policy" checkbox before submitting the message.

---

## 15. Contacts and Support

For any questions, concerns, or requests related to this privacy policy or the processing of personal data:

**Privacy Email**: privacy@theaiandbeyond.it
**General Information Email**: info@theaiandbeyond.it
**Address**: Via Genova 9, 55049 Viareggio (LU), Italy
**Website**: https://theaiandbeyond.it

The Data Controller will respond to all requests within 30 days (extendable to 60 days for complex matters).

---

## 16. Glossary

- **Data Subject**: The natural person to whom personal data refers
- **Data Controller**: The natural or legal person that determines the purposes and methods of processing (in this case: Leonardo Sarti Magi)
- **Data Processor**: The natural or legal person that processes data on the instructions of the Data Controller (Vercel, Resend)
- **Processing**: Any operation on personal data (collection, storage, use, deletion, etc.)
- **Personal Data**: Any information relating to an identified or identifiable natural person
- **GDPR**: Regulation (EU) 2016/679 - General Data Protection Regulation
- **DPA**: Data Processing Agreement - Agreement governing data processing
- **SCCs**: Standard Contractual Clauses - Standard contractual clauses for international transfers
- **Cookie**: Small file stored in the browser containing browsing information
- **localStorage**: Local storage mechanism in the browser with no session limits

---

**Document prepared in accordance with GDPR (Regulation (EU) 2016/679) and the Italian Privacy Code (Decree-Law 196/2003 as amended by Decree-Law 101/2018).**

**Last review**: February 9, 2026
