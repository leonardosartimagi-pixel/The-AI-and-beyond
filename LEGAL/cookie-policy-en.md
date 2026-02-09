# Cookie and Tracking Technology Policy

**Website:** https://theaiandbeyond.it
**Last Updated:** February 2026

---

## 1. What are Cookies and Tracking Technologies

Cookies are small text files stored on a user's device (computer, tablet, smartphone) when visiting a website. Other tracking technologies, such as localStorage and sessionStorage, work in a similar manner: they store data locally on the device for specific purposes.

According to the provisions of the ePrivacy Directive and the General Data Protection Regulation (GDPR), websites must inform users clearly and transparently about the use of these technologies and obtain explicit consent before storing personal information (except for strictly necessary cookies).

---

## 2. Data Controller

**Name:** Leonardo Sarti Magi - "The AI and Beyond di Leonardo Sarti Magi"
**Tax ID (P.IVA):** 02754730469
**Registered Office:** Via Genova 9, 55049 Viareggio (LU), Italy
**Privacy Email:** privacy@theaiandbeyond.it

If you have any questions regarding this policy or the use of cookies, please do not hesitate to contact us.

---

## 3. Types of Cookies and Tracking Technologies Used

Our website uses only strictly necessary cookies and analytical cookies, with explicit user consent where required.

### 3.1 Technical and Necessary Cookies (no consent required)

Technical cookies are essential for the proper functioning of the website. According to applicable law, they do not require prior consent as they are strictly necessary to provide services explicitly requested by the user.

#### Consent Cookie
- **Name:** `cookie-consent`
- **Type:** localStorage
- **Duration:** persistent (until user reset via "Manage Cookies" button)
- **Content:** user's consent preferences (e.g., `{analytics: boolean, timestamp: number}`)
- **Purpose:** to store user preferences regarding analytical cookies and tracking tools
- **Manager:** The AI and Beyond

#### Language Preference
- **Name:** `next-intl locale` (and related variants)
- **Type:** cookie/localStorage managed by Next.js internationalization middleware
- **Duration:** session or persistent depending on browser settings
- **Purpose:** to store the user's language preference to display the website in the selected language
- **Manager:** The AI and Beyond

#### Vercel Development Token (preview only)
- **Name:** `__vercel_live_token`
- **Type:** cookie
- **Duration:** session
- **Purpose:** development token for preview/staging environments (NOT present in production)
- **Note:** This cookie is only present in development environments and is not accessible to end users on the production website

### 3.2 Analytical Cookies (require explicit consent)

Analytical cookies allow the website owner to collect information about visitor behavior in order to improve user experience and optimize the website. These cookies do not directly identify the user, but store a unique identifier to track sessions and page views.

#### Vercel Analytics and Web Vitals
- **Name:** tracking variables managed by Vercel (not a cookie in the traditional sense, but an analytics technology)
- **Type:** beacons and localStorage
- **Duration:** data is processed and not permanently stored
- **Purpose:**
  - Collect page view metrics in a privacy-respectful way
  - Analyze Core Web Vitals and website performance (loading speed, interactivity, visual stability)
- **Manager:** Vercel Inc., San Francisco, USA
- **Privacy Policy:** https://vercel.com/legal/privacy-policy
- **Activation:** only after explicit user consent
- **Compliance:** Vercel Analytics is designed to be GDPR-compliant without the need for additional IP anonymization

#### Google Analytics 4
- **Preliminary Notes:** Google Analytics 4 is currently configured but disabled until implemented in the website code. When activated, it will be loaded ONLY after explicit user consent.
- **Cookies Used:**
  - `_ga` - Stores a random client ID to distinguish visitors. Duration: 2 years
  - `_ga_<container-id>` - Stores session state. Duration: 2 years
  - `_gid` - Stores an anonymous ID to distinguish visitors per page. Duration: 24 hours
  - `_gat` - Used to throttle request rate. Duration: 1 minute
- **Purpose:**
  - Analyze visitor behavior
  - Generate statistics on website traffic
  - Identify common navigation paths
  - Improve content based on user behavior
- **Manager:**
  - Primary: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland
  - Secondary: Google LLC, USA
- **Privacy Policy:** https://policies.google.com/privacy
- **Cookie Policy:** https://policies.google.com/technologies/cookies
- **Configuration:** `anonymize_ip: true` (IP address anonymization)
- **Opt-out:** https://tools.google.com/dlpage/gaoptout
- **Activation:** only after explicit user consent

---

## 4. Summary Cookie Table

| Cookie Name | Manager | Type | Duration | Purpose | Consent Required |
|---|---|---|---|---|---|
| `cookie-consent` | The AI and Beyond | localStorage | Persistent | Store consent preferences | No |
| `next-intl locale` | The AI and Beyond | cookie/localStorage | Session/Persistent | Language preference | No |
| `__vercel_live_token` | Vercel | cookie | Session | Development token (preview only) | No |
| Vercel Analytics | Vercel Inc. | beacon/localStorage | Non-persistent | Performance and page view analysis | Yes |
| `_ga` | Google LLC | cookie | 2 years | Anonymous user identification | Yes |
| `_ga_<container-id>` | Google LLC | cookie | 2 years | Session state | Yes |
| `_gid` | Google LLC | cookie | 24 hours | Page identification | Yes |
| `_gat` | Google LLC | cookie | 1 minute | Request throttling | Yes |

---

## 5. How to Manage Cookies

Users have the right to control and manage cookies at any time using one of the following methods:

### 5.1 Management via the Website Banner

Our website provides a cookie consent banner at the bottom of the page. Through this banner, you can:

1. **Accept All Cookies** - Allows the use of all cookies (technical and analytical)
2. **Reject Non-Essential Cookies** - Allows only strictly necessary cookies
3. **Customize Preferences** - Access "Manage Cookies" to selectively choose which cookies to authorize
4. **Modify Preferences Later** - The "Manage Cookies" button is available during subsequent visits

When you modify preferences through the banner, your choice is stored in the `cookie-consent` cookie and analytical cookies are loaded or removed accordingly.

### 5.2 Management via Browser Settings

Users can also manage cookies through their web browser settings. Below are instructions for the most common browsers:

#### Google Chrome
1. Open Chrome
2. At the top right, click **Menu** (three dots) → **Settings**
3. Select **Privacy and security** → **Cookies and other site data**
4. Configure your preferences:
   - **Block third-party cookies** - blocks tracking cookies from third parties
   - **Block all cookies** - blocks all cookies (not recommended, may break website functionality)
5. Optionally, add exceptions for specific websites

**Direct Link:** https://support.google.com/accounts/answer/61050

#### Mozilla Firefox
1. Open Firefox
2. At the top right, click the menu (three lines) → **Settings**
3. Select **Privacy & Security**
4. Scroll down to **Cookies and Site Data**
5. Configure your preferences (Standard, Strict, Custom)

**Direct Link:** https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop

#### Apple Safari (macOS)
1. Open Safari
2. Click **Safari** in the menu bar → **Preferences**
3. Select the **Privacy** tab
4. Configure cookie options under "Prevent cross-site tracking"

**Direct Link:** https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac

#### Microsoft Edge
1. Open Edge
2. At the top right, click **Settings** (three dots) → **Settings**
3. Select **Privacy, search, and services**
4. Scroll down to **Clear browsing data**
5. Configure cookie options

**Direct Link:** https://support.microsoft.com/en-us/microsoft-edge

### 5.3 Opt-out from Specific Analytics Services

#### Opt-out from Vercel Analytics
Vercel Analytics does not provide an explicit opt-out mechanism because it is designed to be privacy-preserving by default. However, you can:
- Decline the analytics cookie through our website banner
- Disable beacons in your browser if available
- Contact us to request exclusion

#### Opt-out from Google Analytics 4
Google provides an official browser extension to disable Google Analytics:

**Google Analytics Opt-out Browser Add-on:** https://tools.google.com/dlpage/gaoptout

This extension signals to Google that you do not wish to be tracked by Google Analytics on any website. After installation, your data will not be sent to Google Analytics.

**Configuration Method:** You can also disable Google Analytics through your browser settings or by declining consent through our cookie consent banner.

### 5.4 Do Not Track (DNT) Mode

If your browser supports the "Do Not Track" feature, you can enable it:

- **Chrome:** Settings → Privacy and security → Cookies and other site data → Uncheck "Allow sites to check if you have payment methods saved"
- **Firefox:** Settings → Privacy & Security → "Send websites a 'Do Not Track' signal" (advanced setting)
- **Safari:** Preferences → Privacy → "Prevent cross-site tracking"
- **Edge:** Settings → Privacy, search, and services → Turn on "Tracking prevention"

---

## 6. Third-Party Cookies and Tools

Our website uses services provided by third parties for analytics and functionality. The third parties used are:

### 6.1 Vercel Inc.
- **Service:** Vercel Analytics, Web Vitals
- **Website:** https://vercel.com
- **Privacy Policy:** https://vercel.com/legal/privacy-policy
- **Usage:** Website performance analysis and user behavior tracking
- **Location:** San Francisco, USA
- **Compliance:** GDPR-compliant

### 6.2 Google LLC / Google Ireland Limited
- **Service:** Google Analytics 4
- **Website:** https://analytics.google.com
- **Privacy Policy:** https://policies.google.com/privacy
- **Cookie Policy:** https://policies.google.com/technologies/cookies
- **Usage:** Website traffic analysis and user behavior tracking
- **Location:** Dublin (Google Ireland Limited) and USA (Google LLC)
- **Compliance:** GDPR-compliant with IP anonymization enabled

### Information on Data Transfers to Third Countries

Analytics services from Vercel and Google involve the transfer of data to the United States. For data transfer to third countries, the Data Controller relies on the following mechanisms:

- **For Vercel:** Vercel has implemented appropriate security measures in accordance with the GDPR. For details, please consult their Privacy Policy.
- **For Google:** Google uses Standard Contractual Clauses and other safeguards. For details, visit https://policies.google.com/privacy/frameworks

---

## 7. Consent and Consent Management

### 7.1 Explicit Consent

According to the General Data Protection Regulation (GDPR) and the ePrivacy Directive, our website requires **explicit and informed consent** before installing non-essential cookies.

**Consent is obtained through:**
1. A cookie consent banner that appears on the first page load
2. Clear information about the type of cookies and their purpose
3. The ability to accept or selectively refuse cookies

**Consent is:**
- Free (it is not a prerequisite for accessing website content)
- Specific (for each cookie category)
- Informed (with links to this policy)
- Revocable (the user can change their mind at any time)

### 7.2 Revoking Consent

Users can revoke cookie consent at any time by:

1. Clicking the "Manage Cookies" button (present in the website footer or accessible via the banner)
2. Modifying consent preferences
3. Deleting the `cookie-consent` and analytics cookies from their browser
4. Contacting the Data Controller at privacy@theaiandbeyond.it

Once consent is revoked, analytical cookies will be removed from the browser and no further analytical data will be collected.

### 7.3 Consent Storage

Consent is stored in the `cookie-consent` cookie with a timestamp. This allows the website to:
- Remember the user's preference in subsequent visits
- Reload analytical cookies if the user authorized them
- Request new consent if the cookie is deleted or expires

---

## 8. Regulatory Compliance

This policy is drafted in compliance with:

- **Regulation (EU) 2016/679** (General Data Protection Regulation - GDPR)
- **Directive 2002/58/EC** (ePrivacy Directive, as amended by Directive 2009/136/EC)
- **Decision by the Italian Data Protection Authority (Garante) of June 10, 2021** - "Guidelines on cookies and other tracking technologies"
- **Italian Legislative Decree of June 30, 2003, No. 196** (Personal Data Protection Code, as amended by the GDPR)
- **Italian Legislative Decree of December 1, 2018, No. 145** (Implementation of the ePrivacy Directive)

Our website has been configured to:
- Require explicit consent before loading analytical cookies
- Provide complete and transparent information about cookie usage
- Allow users to manage and revoke consent at any time
- Not use profiling, marketing, or advertising cookies
- Not track users through third-party cookies (except for Google Analytics and Vercel Analytics, loaded only with consent)

---

## 9. Updates to This Policy

The Data Controller reserves the right to update this policy at any time, in particular:

- If new cookies or tracking tools are introduced
- If the use of existing cookies is modified
- If new regulations are introduced requiring updates
- If data processors or their privacy policies change

Updates will be communicated through:
- Publication of the updated version on the website (with "Last Updated" date)
- Request for new consent, if necessary

The "Last Updated" date at the top of this policy indicates when it was last updated.

---

## 10. User Rights

In accordance with the GDPR, users have the following rights:

- **Right of Access** (Art. 15 GDPR): access personal data concerning you
- **Right to Rectification** (Art. 16 GDPR): correct inaccurate data
- **Right to Erasure** (Art. 17 GDPR): request deletion of your data
- **Right to Restrict Processing** (Art. 18 GDPR): limit data processing
- **Right to Data Portability** (Art. 20 GDPR): receive your data in a structured format
- **Right to Object** (Art. 21 GDPR): object to data processing
- **Right Not to Be Subject to Automated Decision Making** (Art. 22 GDPR)

To exercise these rights, please contact:
- **Email:** privacy@theaiandbeyond.it
- **Address:** Via Genova 9, 55049 Viareggio (LU), Italy

---

## 11. Contact Information

For questions, clarifications, or to exercise your rights regarding cookies and personal data processing, you can contact:

**The AI and Beyond di Leonardo Sarti Magi**

- **Email:** privacy@theaiandbeyond.it
- **Website:** https://theaiandbeyond.it
- **Address:** Via Genova 9, 55049 Viareggio (LU), Italy
- **Tax ID (P.IVA):** 02754730469

To report privacy violations or complaints regarding data processing, you can also contact the Italian Data Protection Authority (Garante):

**Garante per la protezione dei dati personali (Italian Data Protection Authority)**
- **Website:** https://www.garanteprivacy.it
- **Phone:** +39 06 696771
- **Address:** Piazza di Monte Citorio, 121 - 00186 Rome, Italy

---

**This policy is updated as of February 2026.**
