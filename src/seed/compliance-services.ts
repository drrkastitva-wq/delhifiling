export const COMPLIANCE_SERVICES = [
  // Annual Compliance by Entity
  { name: 'Private Limited Annual Compliance Package', slug: 'pvt-ltd-annual-compliance', shortDescription: 'Complete annual compliance package for Private Limited Companies.', timeline: 'Ongoing', professionalFee: 'Starting ₹9,999/year', subcategories: ['annual-compliance-by-entity'] },
  { name: 'OPC Annual Compliance Package', slug: 'opc-annual-compliance', shortDescription: 'Complete annual compliance package for One Person Companies.', timeline: 'Ongoing', professionalFee: 'Starting ₹7,999/year', subcategories: ['annual-compliance-by-entity'] },
  { name: 'LLP Annual Compliance Package', slug: 'llp-annual-compliance', shortDescription: 'Complete annual compliance package for LLPs.', timeline: 'Ongoing', professionalFee: 'Starting ₹6,999/year', subcategories: ['annual-compliance-by-entity'] },
  { name: 'Public Company Annual Compliance Package', slug: 'public-company-annual-compliance', shortDescription: 'Complete annual compliance package for Public Limited Companies.', timeline: 'Ongoing', professionalFee: 'Starting ₹19,999/year', subcategories: ['annual-compliance-by-entity'] },
  { name: 'Section 8 Annual Compliance Package', slug: 'section-8-annual-compliance', shortDescription: 'Complete annual compliance package for Section 8 Companies.', timeline: 'Ongoing', professionalFee: 'Starting ₹8,999/year', subcategories: ['annual-compliance-by-entity'] },
  { name: 'Foreign Company Compliance', slug: 'foreign-company-compliance', shortDescription: 'Annual compliance for foreign companies, branch and liaison offices.', timeline: 'Ongoing', professionalFee: 'Starting ₹24,999/year', subcategories: ['annual-compliance-by-entity'] },
  // ROC / MCA Compliance
  { name: 'Annual Return Filing (MGT-7)', slug: 'annual-return-mgt7', shortDescription: 'Filing of Annual Return in Form MGT-7 with ROC.', timeline: '2-3 days', professionalFee: 'Starting ₹2,499', subcategories: ['roc-mca-compliance'] },
  { name: 'Financial Statement Filing (AOC-4)', slug: 'financial-statement-aoc4', shortDescription: 'Filing of Financial Statements in Form AOC-4 with ROC.', timeline: '2-3 days', professionalFee: 'Starting ₹2,499', subcategories: ['roc-mca-compliance'] },
  { name: 'AOC-4 XBRL Filing', slug: 'aoc4-xbrl', shortDescription: 'Filing of Financial Statements in XBRL format for applicable companies.', timeline: '3-5 days', professionalFee: 'Starting ₹4,999', subcategories: ['roc-mca-compliance'] },
  { name: 'MGT-7A Filing', slug: 'mgt7a-filing', shortDescription: 'Filing of Annual Return in Form MGT-7A for OPC and small companies.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['roc-mca-compliance'] },
  { name: 'DPT-3 Filing', slug: 'dpt3-filing', shortDescription: 'Filing of DPT-3 return for deposits and outstanding loans.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['roc-mca-compliance'] },
  { name: 'MSME Form-1 Filing', slug: 'msme-form1-filing', shortDescription: 'Filing of MSME Form-1 for outstanding dues to MSME vendors.', timeline: '1-2 days', professionalFee: 'Starting ₹1,499', subcategories: ['roc-mca-compliance', 'other-statutory-compliance'] },
  { name: 'MCA Compliance Review', slug: 'mca-compliance-review', shortDescription: 'Review of MCA master data and pending compliance status.', timeline: '1-2 days', professionalFee: 'Starting ₹999', subcategories: ['roc-mca-compliance', 'compliance-check-due-diligence'] },
  // Director / DIN Compliance
  { name: 'DIR-3 KYC', slug: 'dir3-kyc', shortDescription: 'Annual DIR-3 KYC filing for directors.', timeline: '1-2 days', professionalFee: 'Starting ₹999', subcategories: ['director-din-compliance'] },
  { name: 'DIR-3 KYC Web', slug: 'dir3-kyc-web', shortDescription: 'DIR-3 KYC Web filing for directors with unchanged details.', timeline: '1 day', professionalFee: 'Starting ₹499', subcategories: ['director-din-compliance'] },
  { name: 'DIN Reactivation', slug: 'din-reactivation', shortDescription: 'Reactivation of deactivated DIN of director.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['director-din-compliance'] },
  { name: 'DIN Update / Correction', slug: 'din-update-correction', shortDescription: 'Update or correction of DIN details on MCA portal.', timeline: '2-3 days', professionalFee: 'Starting ₹1,499', subcategories: ['director-din-compliance'] },
  // Director Changes
  { name: 'Director Appointment', slug: 'director-appointment', shortDescription: 'Filing for appointment of new director in company.', timeline: '3-5 days', professionalFee: 'Starting ₹2,999', subcategories: ['director-changes'] },
  { name: 'Director Resignation', slug: 'director-resignation', shortDescription: 'Filing for resignation of director from company.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['director-changes'] },
  { name: 'Director Removal', slug: 'director-removal', shortDescription: 'Filing for removal of director from company.', timeline: '3-5 days', professionalFee: 'Starting ₹3,499', subcategories: ['director-changes'] },
  { name: 'Director Reappointment', slug: 'director-reappointment', shortDescription: 'Filing for reappointment of retiring director.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['director-changes'] },
  // DSC Services — Master Service
  { name: 'New DSC', slug: 'new-dsc', shortDescription: 'New Digital Signature Certificate for directors and authorized signatories.', timeline: '1-2 days', professionalFee: 'Starting ₹999', subcategories: ['dsc-services'] },
  { name: 'DSC Renewal', slug: 'dsc-renewal', shortDescription: 'Renewal of expired Digital Signature Certificate.', timeline: '1-2 days', professionalFee: 'Starting ₹999', subcategories: ['dsc-services'] },
  { name: 'DSC Token', slug: 'dsc-token', shortDescription: 'USB token for Digital Signature Certificate.', timeline: '1-2 days', professionalFee: 'Starting ₹499', subcategories: ['dsc-services'] },
  // Board / AGM
  { name: 'Board Meeting Documentation', slug: 'board-meeting-documentation', shortDescription: 'Complete board meeting documentation — notice, agenda, minutes.', timeline: '1-2 days', professionalFee: 'Starting ₹1,999', subcategories: ['board-agm-corporate-governance'] },
  { name: 'Board Resolution Drafting', slug: 'board-resolution-compliance', shortDescription: 'Drafting board resolutions for compliance purposes.', timeline: '1 day', professionalFee: 'Starting ₹999', subcategories: ['board-agm-corporate-governance'] },
  { name: 'AGM Documentation', slug: 'agm-documentation', shortDescription: 'Complete AGM documentation — notice, agenda, minutes, resolutions.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['board-agm-corporate-governance'] },
  { name: 'EGM Documentation', slug: 'egm-documentation', shortDescription: 'Complete EGM documentation for special resolutions.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['board-agm-corporate-governance'] },
  { name: 'Special Resolution', slug: 'special-resolution', shortDescription: 'Drafting and filing special resolution with ROC.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['board-agm-corporate-governance'] },
  // Company Changes
  { name: 'Company Name Change', slug: 'company-name-change', shortDescription: 'Filing for change of company name with ROC.', timeline: '10-15 days', professionalFee: 'Starting ₹4,999', subcategories: ['company-changes-event-based'] },
  { name: 'Registered Office Change', slug: 'registered-office-change', shortDescription: 'Filing for change of registered office address.', timeline: '5-10 days', professionalFee: 'Starting ₹2,999', subcategories: ['company-changes-event-based'] },
  { name: 'MOA Amendment', slug: 'moa-amendment', shortDescription: 'Amendment of Memorandum of Association.', timeline: '10-15 days', professionalFee: 'Starting ₹4,999', subcategories: ['company-changes-event-based'] },
  { name: 'AOA Amendment', slug: 'aoa-amendment', shortDescription: 'Amendment of Articles of Association.', timeline: '10-15 days', professionalFee: 'Starting ₹3,999', subcategories: ['company-changes-event-based'] },
  // Share Capital
  { name: 'Share Allotment (PAS-3)', slug: 'share-allotment-pas3', shortDescription: 'Filing PAS-3 for allotment of shares.', timeline: '2-3 days', professionalFee: 'Starting ₹2,499', subcategories: ['share-capital-shareholding'] },
  { name: 'Authorized Capital Increase (SH-7)', slug: 'authorized-capital-increase', shortDescription: 'Filing SH-7 for increase in authorized share capital.', timeline: '3-5 days', professionalFee: 'Starting ₹2,999', subcategories: ['share-capital-shareholding'] },
  { name: 'Share Transfer', slug: 'share-transfer', shortDescription: 'Processing and documentation of share transfer.', timeline: '3-5 days', professionalFee: 'Starting ₹1,999', subcategories: ['share-capital-shareholding'] },
  { name: 'Share Certificate', slug: 'share-certificate', shortDescription: 'Issuance of share certificates to shareholders.', timeline: '2-3 days', professionalFee: 'Starting ₹999', subcategories: ['share-capital-shareholding'] },
  // Charge Compliance
  { name: 'Charge Creation', slug: 'charge-creation', shortDescription: 'Filing for creation of charge on company assets.', timeline: '2-3 days', professionalFee: 'Starting ₹2,499', subcategories: ['charge-loan-compliance'] },
  { name: 'Charge Modification', slug: 'charge-modification', shortDescription: 'Filing for modification of existing charge.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['charge-loan-compliance'] },
  { name: 'Charge Satisfaction', slug: 'charge-satisfaction', shortDescription: 'Filing for satisfaction / release of charge.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['charge-loan-compliance'] },
  // Statutory Records
  { name: 'Statutory Records Maintenance', slug: 'statutory-records-maintenance', shortDescription: 'Maintenance of all statutory registers and records.', timeline: 'Ongoing', professionalFee: 'Starting ₹4,999/year', subcategories: ['statutory-records'] },
  // SBO
  { name: 'BEN-1 / BEN-2 Filing', slug: 'ben1-ben2-filing', shortDescription: 'Filing BEN-1 and BEN-2 for significant beneficial ownership.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['beneficial-ownership-sbo'] },
  // Auditor
  { name: 'Auditor Appointment (ADT-1)', slug: 'auditor-appointment-adt1', shortDescription: 'Filing ADT-1 for appointment of statutory auditor.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['auditor-financial-compliance'] },
  { name: 'Auditor Resignation', slug: 'auditor-resignation', shortDescription: 'Filing for resignation of statutory auditor.', timeline: '2-3 days', professionalFee: 'Starting ₹1,999', subcategories: ['auditor-financial-compliance'] },
  // GST & Tax Compliance
  { name: 'GSTR-1 Filing', slug: 'gstr1-filing', shortDescription: 'Monthly/quarterly GSTR-1 return filing.', timeline: '1-2 days', professionalFee: 'Starting ₹999/month', subcategories: ['gst-tax-compliance'] },
  { name: 'GSTR-3B Filing', slug: 'gstr3b-filing', shortDescription: 'Monthly GSTR-3B summary return filing.', timeline: '1-2 days', professionalFee: 'Starting ₹999/month', subcategories: ['gst-tax-compliance'] },
  { name: 'GSTR-9 Annual Return', slug: 'gstr9-annual-return', shortDescription: 'Annual GST return filing in Form GSTR-9.', timeline: '3-5 days', professionalFee: 'Starting ₹2,999', subcategories: ['gst-tax-compliance'] },
  { name: 'GSTR-9C Reconciliation', slug: 'gstr9c-reconciliation', shortDescription: 'GST audit reconciliation statement in Form GSTR-9C.', timeline: '5-7 days', professionalFee: 'Starting ₹4,999', subcategories: ['gst-tax-compliance'] },
  { name: 'GST Notice Response', slug: 'gst-notice-response', shortDescription: 'Drafting and filing reply to GST notices and show cause notices.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['gst-tax-compliance'] },
  { name: 'Company ITR Filing', slug: 'company-itr-filing', shortDescription: 'Income tax return filing for companies.', timeline: '5-7 days', professionalFee: 'Starting ₹4,999', subcategories: ['gst-tax-compliance'] },
  { name: 'LLP ITR Filing', slug: 'llp-itr-filing', shortDescription: 'Income tax return filing for LLPs.', timeline: '3-5 days', professionalFee: 'Starting ₹3,499', subcategories: ['gst-tax-compliance'] },
  { name: 'Tax Audit', slug: 'tax-audit', shortDescription: 'Tax audit under Section 44AB of Income Tax Act.', timeline: '7-10 days', professionalFee: 'Starting ₹7,999', subcategories: ['gst-tax-compliance'] },
  { name: 'TDS Compliance', slug: 'tds-compliance', shortDescription: 'TDS deduction, payment and return filing compliance.', timeline: 'Monthly', professionalFee: 'Starting ₹1,499/month', subcategories: ['gst-tax-compliance'] },
  { name: 'Income Tax Notice Response', slug: 'income-tax-notice-response', shortDescription: 'Drafting and filing reply to income tax notices.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['gst-tax-compliance'] },
  // Other Statutory
  { name: 'EPFO Compliance', slug: 'epfo-compliance', shortDescription: 'Monthly EPFO / PF return filing and compliance.', timeline: 'Monthly', professionalFee: 'Starting ₹1,499/month', subcategories: ['other-statutory-compliance'] },
  { name: 'ESIC Compliance', slug: 'esic-compliance', shortDescription: 'Monthly ESIC return filing and compliance.', timeline: 'Monthly', professionalFee: 'Starting ₹1,499/month', subcategories: ['other-statutory-compliance'] },
  { name: 'Professional Tax Compliance', slug: 'professional-tax-compliance', shortDescription: 'Professional tax return filing and compliance.', timeline: 'Monthly/Quarterly', professionalFee: 'Starting ₹999/month', subcategories: ['other-statutory-compliance'] },
  // Compliance Check
  { name: 'Annual Compliance Check', slug: 'annual-compliance-check', shortDescription: 'Comprehensive review of annual compliance status.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['compliance-check-due-diligence'] },
  { name: 'Compliance Gap Analysis', slug: 'compliance-gap-analysis', shortDescription: 'Identifying compliance gaps and pending filings.', timeline: '3-5 days', professionalFee: 'Starting ₹3,999', subcategories: ['compliance-check-due-diligence'] },
  // Late Filing
  { name: 'Late Filing / Default Compliance', slug: 'late-filing-default', shortDescription: 'Filing of overdue returns and regularisation of defaults.', timeline: '2-5 days', professionalFee: 'Starting ₹2,999', subcategories: ['late-filing-default-regularisation'] },
  { name: 'MCA Default Rectification', slug: 'mca-default-rectification', shortDescription: 'Rectification of MCA defaults and pending compliance.', timeline: '3-7 days', professionalFee: 'Starting ₹3,999', subcategories: ['late-filing-default-regularisation'] },
  // MCA Notice
  { name: 'MCA Notice Response', slug: 'mca-notice-response', shortDescription: 'Drafting and filing reply to MCA / ROC notices.', timeline: '2-3 days', professionalFee: 'Starting ₹2,999', subcategories: ['mca-roc-notice-query'] },
  { name: 'Show Cause Notice Response', slug: 'show-cause-notice-response', shortDescription: 'Drafting reply to show cause notices from ROC / MCA.', timeline: '2-3 days', professionalFee: 'Starting ₹3,499', subcategories: ['mca-roc-notice-query'] },
  // Company Closure
  { name: 'Company Strike Off (STK-2)', slug: 'company-strike-off', shortDescription: 'Filing STK-2 for voluntary strike off of company.', timeline: '30-60 days', professionalFee: 'Starting ₹7,999', subcategories: ['company-closure-strike-off'] },
  { name: 'LLP Closure', slug: 'llp-closure', shortDescription: 'Filing for closure and winding up of LLP.', timeline: '30-60 days', professionalFee: 'Starting ₹6,999', subcategories: ['company-closure-strike-off'] },
  { name: 'Dormant Company', slug: 'dormant-company', shortDescription: 'Filing for obtaining dormant company status.', timeline: '15-20 days', professionalFee: 'Starting ₹4,999', subcategories: ['company-closure-strike-off'] },
  // Compliance Packages
  { name: 'Basic Compliance Package', slug: 'basic-compliance-package', shortDescription: 'Mandatory annual filings and basic compliance review.', timeline: 'Annual', professionalFee: 'Starting ₹5,999/year', subcategories: ['compliance-packages'] },
  { name: 'Standard Compliance Package', slug: 'standard-compliance-package', shortDescription: 'Annual filings, director compliance, board/AGM documentation.', timeline: 'Annual', professionalFee: 'Starting ₹9,999/year', subcategories: ['compliance-packages'] },
  { name: 'Complete Compliance Package', slug: 'complete-compliance-package', shortDescription: 'Complete ROC/MCA, director, board/AGM, statutory records, GST/tax compliance.', timeline: 'Annual', professionalFee: 'Starting ₹19,999/year', subcategories: ['compliance-packages'] },
  // Advisory
  { name: 'Compliance Calendar', slug: 'compliance-calendar', shortDescription: 'Customised compliance calendar with due date tracking and reminders.', timeline: 'Annual', professionalFee: 'Starting ₹1,999/year', subcategories: ['compliance-advisory-ongoing-support'] },
  { name: 'Ongoing Compliance Management', slug: 'ongoing-compliance-management', shortDescription: 'Dedicated compliance management and corporate secretarial support.', timeline: 'Ongoing', professionalFee: 'Starting ₹4,999/month', subcategories: ['compliance-advisory-ongoing-support'] },
  { name: 'Compliance Advisory', slug: 'compliance-advisory', shortDescription: 'Expert compliance advisory and annual compliance planning.', timeline: '1-2 days', professionalFee: 'Starting ₹2,999', subcategories: ['compliance-advisory-ongoing-support'] },
]
