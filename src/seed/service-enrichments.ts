interface ServiceEnrichment {
  whoNeedsIt: string
  documentsRequired: string[]
  process: { step: number; title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

export const SERVICE_ENRICHMENTS: Record<string, ServiceEnrichment> = {
  'regular-bail': {
    whoNeedsIt: 'Any person who has been arrested or is in judicial custody and seeks release on bail from a Sessions Court or High Court.',
    documentsRequired: ['Copy of FIR', 'Arrest memo / remand order', 'Identity proof of accused', 'Address proof of accused', 'Surety documents (if applicable)', 'Previous bail rejection order (if any)'],
    process: [
      { step: 1, title: 'Case Review', description: 'Our advocate reviews the FIR, charges and grounds for bail.' },
      { step: 2, title: 'Bail Application Drafting', description: 'Detailed bail application drafted with all legal grounds and precedents.' },
      { step: 3, title: 'Filing in Court', description: 'Application filed before the competent court (Sessions/High Court).' },
      { step: 4, title: 'Hearing & Arguments', description: 'Our advocate appears and argues the bail application.' },
      { step: 5, title: 'Order & Release', description: 'On grant of bail, we assist with compliance of bail conditions and release formalities.' },
    ],
    faqs: [
      { question: 'What is the difference between regular bail and anticipatory bail?', answer: 'Regular bail is applied after arrest, while anticipatory bail is applied before arrest in anticipation of arrest.' },
      { question: 'How long does it take to get bail?', answer: 'Typically 1-3 days depending on court schedule and urgency. We can file on the same day in urgent matters.' },
      { question: 'Can bail be cancelled after it is granted?', answer: 'Yes, bail can be cancelled by the court if the accused violates bail conditions or if new grounds emerge.' },
    ],
  },
  'anticipatory-bail': {
    whoNeedsIt: 'Any person who apprehends arrest in a non-bailable offence and wants to seek bail in advance under Section 438 CrPC / BNSS.',
    documentsRequired: ['Identity proof', 'Address proof', 'Details of the case / FIR (if registered)', 'Any prior notice from police', 'Passport (if travel restriction needed)'],
    process: [
      { step: 1, title: 'Consultation & Case Analysis', description: 'Detailed discussion of facts and assessment of grounds for anticipatory bail.' },
      { step: 2, title: 'Application Drafting', description: 'Comprehensive anticipatory bail application with legal grounds, precedents and personal details.' },
      { step: 3, title: 'Filing Before Sessions/High Court', description: 'Application filed before the appropriate court.' },
      { step: 4, title: 'Hearing', description: 'Advocate appears and argues the application.' },
      { step: 5, title: 'Interim Protection & Final Order', description: 'Interim protection obtained if needed; final order obtained on merits.' },
    ],
    faqs: [
      { question: 'Can anticipatory bail be applied even if no FIR is registered?', answer: 'Yes, anticipatory bail can be applied if there is a reasonable apprehension of arrest even without an FIR.' },
      { question: 'Which court has jurisdiction for anticipatory bail?', answer: 'Sessions Court has primary jurisdiction. High Court can also be approached directly in appropriate cases.' },
      { question: 'Does anticipatory bail protect from arrest permanently?', answer: 'No, it provides protection during investigation. The court may impose conditions and can cancel it if violated.' },
    ],
  },
  'private-limited-company-registration': {
    whoNeedsIt: 'Entrepreneurs, startups, and businesses wanting to incorporate a Private Limited Company in India for limited liability, investor-readiness and professional credibility.',
    documentsRequired: ['PAN card of all directors', 'Aadhaar card of all directors', 'Passport-size photographs', 'Address proof of directors (bank statement/utility bill)', 'Proof of registered office (rent agreement + NOC or ownership proof)', 'Utility bill of registered office (not older than 2 months)', 'Email IDs and mobile numbers of all directors'],
    process: [
      { step: 1, title: 'Name Reservation (RUN)', description: 'We check name availability and file RUN application on MCA portal to reserve your company name.' },
      { step: 2, title: 'DSC & DIN', description: 'Digital Signature Certificates and Director Identification Numbers obtained for all directors.' },
      { step: 3, title: 'MOA & AOA Drafting', description: 'Memorandum and Articles of Association drafted as per your business objectives.' },
      { step: 4, title: 'SPICe+ Filing', description: 'Integrated incorporation form SPICe+ filed on MCA portal along with all documents.' },
      { step: 5, title: 'Certificate of Incorporation', description: 'Certificate of Incorporation issued by ROC with CIN, PAN and TAN.' },
      { step: 6, title: 'Post-Incorporation', description: 'Bank account opening assistance, GST registration and other post-incorporation compliances.' },
    ],
    faqs: [
      { question: 'What is the minimum number of directors required?', answer: 'Minimum 2 directors and 2 shareholders are required. One director must be an Indian resident.' },
      { question: 'What is the minimum paid-up capital required?', answer: 'There is no minimum paid-up capital requirement. You can start with ₹1 as paid-up capital.' },
      { question: 'How long does incorporation take?', answer: 'Typically 10-15 working days from submission of all documents, subject to MCA processing time.' },
      { question: 'Can a foreign national be a director?', answer: 'Yes, but at least one director must be an Indian resident (stayed in India for 182+ days in the previous year).' },
    ],
  },
  'gst-registration': {
    whoNeedsIt: 'Any business with annual turnover exceeding ₹40 lakhs (₹20 lakhs for services), businesses involved in inter-state supply, e-commerce operators, or those required to register mandatorily.',
    documentsRequired: ['PAN card of business/proprietor/partners/directors', 'Aadhaar card of proprietor/partners/directors', 'Proof of business registration', 'Address proof of principal place of business', 'Bank account details (cancelled cheque/bank statement)', 'Digital signature (for companies/LLPs)', 'Photographs of proprietor/partners/directors'],
    process: [
      { step: 1, title: 'Document Collection', description: 'We collect all required documents and verify completeness.' },
      { step: 2, title: 'Application Preparation', description: 'GST registration application prepared on GST portal with all details.' },
      { step: 3, title: 'Application Filing', description: 'Application filed on GST portal with ARN generated.' },
      { step: 4, title: 'Verification', description: 'GST officer verifies the application. We respond to any queries raised.' },
      { step: 5, title: 'GSTIN Issued', description: 'GST Identification Number (GSTIN) issued within 3-7 working days.' },
    ],
    faqs: [
      { question: 'Is GST registration mandatory for all businesses?', answer: 'No, it is mandatory only if your turnover exceeds the threshold limit or if you are involved in inter-state supply, e-commerce, etc.' },
      { question: 'Can I have multiple GST registrations?', answer: 'Yes, you need separate GST registration for each state where you have a business presence.' },
      { question: 'What is the penalty for not registering under GST?', answer: 'Penalty of 10% of tax due (minimum ₹10,000) or 100% of tax due in case of fraud.' },
    ],
  },
  'divorce-petition': {
    whoNeedsIt: 'Spouses seeking dissolution of marriage — either by mutual consent or contested divorce — under Hindu Marriage Act, Special Marriage Act, or other applicable personal laws.',
    documentsRequired: ['Marriage certificate', 'Identity proof of both parties', 'Address proof of both parties', 'Photographs of both parties', 'Evidence of marriage (wedding photos, invitation card)', 'Evidence supporting grounds for divorce (if contested)', "Children's birth certificates (if applicable)"],
    process: [
      { step: 1, title: 'Consultation', description: 'Detailed discussion of facts, grounds for divorce and applicable law.' },
      { step: 2, title: 'Petition Drafting', description: 'Divorce petition drafted with all relevant facts, grounds and prayers.' },
      { step: 3, title: 'Filing in Family Court', description: 'Petition filed in the appropriate Family Court with all supporting documents.' },
      { step: 4, title: 'Service of Notice', description: 'Notice served on the respondent spouse.' },
      { step: 5, title: 'Mediation / Hearing', description: 'Court may refer to mediation. Hearings conducted and evidence recorded.' },
      { step: 6, title: 'Decree of Divorce', description: 'Final decree of divorce passed by the court.' },
    ],
    faqs: [
      { question: 'What is the difference between mutual consent and contested divorce?', answer: 'In mutual consent divorce, both parties agree to divorce. In contested divorce, one party opposes. Mutual consent is faster (6 months minimum).' },
      { question: 'What are valid grounds for divorce under Hindu Marriage Act?', answer: 'Cruelty, adultery, desertion (2 years), conversion, mental disorder, leprosy, venereal disease, renunciation, and presumption of death.' },
      { question: 'How long does a divorce case take?', answer: 'Mutual consent divorce takes 6-18 months. Contested divorce can take 2-5 years depending on complexity and court schedule.' },
    ],
  },
  'civil-suit-filing': {
    whoNeedsIt: 'Individuals, businesses or organizations seeking to enforce civil rights, recover money, resolve property disputes, or seek any civil remedy through courts.',
    documentsRequired: ['Identity proof of plaintiff', 'Address proof', 'All documents supporting the claim', 'Cause of action documents', 'Valuation of suit for court fee calculation', 'Power of attorney / vakalatnama'],
    process: [
      { step: 1, title: 'Case Assessment', description: 'Review of facts, documents and assessment of legal merits.' },
      { step: 2, title: 'Plaint Drafting', description: 'Detailed plaint drafted with all facts, legal grounds and reliefs sought.' },
      { step: 3, title: 'Court Fee Calculation', description: 'Court fee calculated based on valuation of suit.' },
      { step: 4, title: 'Filing', description: 'Plaint filed in the appropriate court with all annexures.' },
      { step: 5, title: 'Summons & Service', description: 'Court issues summons to defendant. Service of summons arranged.' },
      { step: 6, title: 'Proceedings', description: 'Written statement, evidence, arguments and final hearing.' },
    ],
    faqs: [
      { question: 'What is the limitation period for filing a civil suit?', answer: 'Generally 3 years from the date of cause of action under the Limitation Act, 1963. Specific suits have different limitation periods.' },
      { question: 'Which court has jurisdiction for civil suits?', answer: 'Jurisdiction depends on the subject matter, valuation and territorial location. District courts handle most civil suits.' },
      { question: 'Can I file a civil suit without a lawyer?', answer: 'Yes, you can file in person, but having an advocate significantly improves your chances.' },
    ],
  },
  'llp-registration': {
    whoNeedsIt: 'Professionals, consultants, and small businesses wanting the benefits of limited liability with the flexibility of a partnership structure.',
    documentsRequired: ['PAN card of all designated partners', 'Aadhaar card of all designated partners', 'Passport-size photographs', 'Address proof of designated partners', 'Proof of registered office', 'Utility bill of registered office', 'Consent of designated partners'],
    process: [
      { step: 1, title: 'Name Reservation (RUN-LLP)', description: 'LLP name checked and reserved on MCA portal.' },
      { step: 2, title: 'DPIN & DSC', description: 'Designated Partner Identification Numbers and DSCs obtained.' },
      { step: 3, title: 'LLP Agreement Drafting', description: 'LLP Agreement drafted covering profit sharing, roles and responsibilities.' },
      { step: 4, title: 'FiLLiP Filing', description: 'Incorporation form FiLLiP filed on MCA portal.' },
      { step: 5, title: 'Certificate of Incorporation', description: 'Certificate of Incorporation with LLPIN issued by ROC.' },
      { step: 6, title: 'LLP Agreement Filing', description: 'LLP Agreement filed in Form 3 within 30 days of incorporation.' },
    ],
    faqs: [
      { question: 'What is the minimum number of partners for an LLP?', answer: 'Minimum 2 designated partners are required. There is no maximum limit on partners.' },
      { question: 'Is audit mandatory for LLP?', answer: 'Audit is mandatory if turnover exceeds ₹40 lakhs or contribution exceeds ₹25 lakhs.' },
      { question: 'Can an LLP be converted to a company?', answer: 'Yes, an LLP can be converted to a Private Limited Company under the Companies Act.' },
    ],
  },
  'annual-return-mgt7': {
    whoNeedsIt: 'All companies registered under the Companies Act 2013 must file Annual Return in Form MGT-7 with the Registrar of Companies every year.',
    documentsRequired: ['Certificate of Incorporation', 'List of shareholders with shareholding details', 'List of directors', 'Details of changes during the year', 'Financial statements', 'MGT-8 certification (for listed companies)'],
    process: [
      { step: 1, title: 'Data Collection', description: 'Collection of all company data — shareholders, directors, share capital, charges.' },
      { step: 2, title: 'MGT-7 Preparation', description: 'Annual return form prepared with all required details.' },
      { step: 3, title: 'Review & Certification', description: 'Form reviewed and certified by Company Secretary (if applicable).' },
      { step: 4, title: 'Filing on MCA Portal', description: 'MGT-7 filed on MCA21 portal within due date.' },
      { step: 5, title: 'Acknowledgement', description: 'Filing acknowledgement and SRN provided.' },
    ],
    faqs: [
      { question: 'What is the due date for filing MGT-7?', answer: 'Within 60 days from the date of AGM. For companies with AGM in September, due date is typically November 29.' },
      { question: 'What is the penalty for late filing?', answer: 'Additional fee of ₹100 per day of delay. Directors may also face disqualification for non-filing.' },
      { question: 'Is MGT-7 applicable to all companies?', answer: 'MGT-7 is for all companies except OPC and small companies which file MGT-7A.' },
    ],
  },
  'quashing-application': {
    whoNeedsIt: 'Persons against whom an FIR has been registered or criminal proceedings have been initiated, seeking quashing before the High Court under Section 482 CrPC / Section 528 BNSS.',
    documentsRequired: ['Copy of FIR', 'Copy of charge sheet (if filed)', 'Identity proof of petitioner', 'All documents supporting grounds for quashing', 'Previous court orders (if any)', 'Settlement agreement (if quashing sought on settlement grounds)'],
    process: [
      { step: 1, title: 'Case Analysis', description: 'Detailed review of FIR, charges and grounds for quashing.' },
      { step: 2, title: 'Petition Drafting', description: 'Quashing petition drafted with all legal grounds, precedents and prayers.' },
      { step: 3, title: 'Filing in High Court', description: 'Petition filed in the High Court under Section 482 CrPC.' },
      { step: 4, title: 'Stay of Proceedings', description: 'Application for stay of trial court proceedings filed simultaneously.' },
      { step: 5, title: 'Hearing & Arguments', description: 'Advocate appears and argues the petition before the High Court.' },
      { step: 6, title: 'Order', description: 'High Court passes order — quashing FIR or dismissing petition.' },
    ],
    faqs: [
      { question: 'On what grounds can an FIR be quashed?', answer: 'Grounds include: no prima facie offence, abuse of process, settlement between parties, manifestly frivolous complaint, and where continuation would be oppressive.' },
      { question: 'Can a quashing petition be filed in all types of cases?', answer: 'Courts are generally reluctant to quash FIRs in serious offences like murder, rape, dacoity. It is more common in compoundable offences and civil disputes.' },
      { question: 'Does settlement between parties guarantee quashing?', answer: 'In compoundable offences, settlement is a strong ground. In non-compoundable offences, courts have discretion.' },
    ],
  },
  'consumer-case': {
    whoNeedsIt: 'Any consumer who has suffered from defective goods, deficient services, unfair trade practices, or overcharging by a seller or service provider.',
    documentsRequired: ['Purchase receipt / invoice', 'Warranty card (if applicable)', 'Correspondence with seller/service provider', 'Legal notice sent (if any)', 'Evidence of defect or deficiency', 'Identity proof of complainant'],
    process: [
      { step: 1, title: 'Consultation', description: 'Review of facts and assessment of consumer complaint.' },
      { step: 2, title: 'Legal Notice', description: 'Legal notice sent to opposite party demanding redressal.' },
      { step: 3, title: 'Complaint Drafting', description: 'Consumer complaint drafted with all facts, reliefs and compensation sought.' },
      { step: 4, title: 'Filing', description: 'Complaint filed before District/State/National Consumer Commission based on value.' },
      { step: 5, title: 'Hearing', description: 'Advocate appears at hearings and presents evidence.' },
      { step: 6, title: 'Order & Execution', description: 'Commission passes order for compensation, replacement or refund.' },
    ],
    faqs: [
      { question: 'Which consumer forum has jurisdiction?', answer: 'District Commission: up to ₹50 lakhs. State Commission: ₹50 lakhs to ₹2 crores. National Commission: above ₹2 crores.' },
      { question: 'What compensation can I claim?', answer: 'You can claim refund, replacement, repair, compensation for loss, and punitive damages for unfair trade practices.' },
      { question: 'Is there a time limit to file a consumer complaint?', answer: 'Yes, complaint must be filed within 2 years from the date of cause of action.' },
    ],
  },
  'government-tender-filing': {
    whoNeedsIt: 'Businesses, contractors and vendors who want to participate in government tenders on NIC, CPPP, GePNIC and state portals.',
    documentsRequired: ['Company registration certificate', 'GST registration certificate', 'PAN card', 'Bank solvency certificate', 'Turnover certificate / audited financials', 'Experience certificates', 'DSC of authorized signatory', 'EMD / bid security'],
    process: [
      { step: 1, title: 'Tender Review', description: 'We review the tender document, eligibility criteria and technical specifications.' },
      { step: 2, title: 'Eligibility Check', description: 'Verify your eligibility against all tender conditions.' },
      { step: 3, title: 'Document Preparation', description: 'All required documents compiled and formatted as per tender requirements.' },
      { step: 4, title: 'Technical Bid Preparation', description: 'Technical bid prepared with all compliance documents.' },
      { step: 5, title: 'Financial Bid / BOQ', description: 'Financial bid and BOQ prepared and reviewed.' },
      { step: 6, title: 'Online Submission', description: 'Tender submitted online on the portal before deadline with DSC.' },
    ],
    faqs: [
      { question: 'What is EMD and is it mandatory?', answer: 'Earnest Money Deposit is a security deposit required with most tenders. It is refunded to unsuccessful bidders after tender finalization.' },
      { question: 'Can a new company participate in government tenders?', answer: 'Yes, but many tenders require prior experience. Startups can participate in tenders with relaxed eligibility or through joint ventures.' },
      { question: 'What happens if the tender is rejected?', answer: 'We review the rejection reason and advise on whether to challenge it or improve for future tenders.' },
    ],
  },
  'pvt-ltd-annual-compliance': {
    whoNeedsIt: 'All Private Limited Companies registered under the Companies Act 2013 must complete mandatory annual compliances to avoid penalties and director disqualification.',
    documentsRequired: ['Certificate of Incorporation', 'Financial statements (Balance Sheet, P&L)', 'Board meeting minutes', 'AGM minutes and resolutions', 'List of shareholders and directors', 'Auditor appointment details', 'DSC of directors'],
    process: [
      { step: 1, title: 'Compliance Calendar', description: 'We prepare a customised compliance calendar with all due dates for your company.' },
      { step: 2, title: 'Board Meetings', description: 'Board meeting notices, agendas and minutes prepared for all 4 quarterly meetings.' },
      { step: 3, title: 'AGM Documentation', description: 'AGM notice, agenda, minutes and resolutions prepared.' },
      { step: 4, title: 'Financial Statement Filing (AOC-4)', description: 'Financial statements filed with ROC in Form AOC-4.' },
      { step: 5, title: 'Annual Return Filing (MGT-7)', description: 'Annual return filed with ROC in Form MGT-7.' },
      { step: 6, title: 'Director KYC (DIR-3)', description: 'Annual DIR-3 KYC filed for all directors.' },
    ],
    faqs: [
      { question: 'What are the mandatory annual compliances for a Private Limited Company?', answer: 'Board meetings (4/year), AGM, AOC-4 (financial statements), MGT-7 (annual return), DIR-3 KYC, auditor appointment, and income tax return.' },
      { question: 'What is the penalty for non-compliance?', answer: 'Additional filing fees, director disqualification, company strike-off, and prosecution under Companies Act.' },
      { question: 'When is the AGM due?', answer: 'AGM must be held within 6 months from the end of financial year, i.e., by September 30 for companies with March 31 year-end.' },
    ],
  },
}
