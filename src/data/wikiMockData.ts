// Wiki Mock Data — ISCP General Surgery Curriculum (Aug 2021)

export interface WikiModule {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  phase: string;
  sort_order: number;
  topicCount: number;
  criticalCount: number;
  articleCount: number;
  readPercent: number;
}

export interface WikiTopic {
  id: string;
  module_id: string;
  moduleSlug: string;
  title: string;
  slug: string;
  description: string;
  is_critical: boolean;
  critical_label?: string;
  critical_assessment_note?: string;
  subgroup?: string;
  phase_tags: string[];
  sort_order: number;
  articleCount: number;
  readCount: number;
  indexProcedures: IndexProcedure[];
}

export interface IndexProcedure {
  id: string;
  topic_id: string;
  procedure_name: string;
  pba_level?: string;
  indicative_numbers_phase2?: string;
  indicative_numbers_cert?: string;
  sort_order: number;
}

export interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'key_point' | 'warning' | 'clinical_pearl' | 'exam_tip' | 'image' | 'expandable' | 'reference';
  level?: number; // for headings: 2, 3, 4
  text?: string;
  items?: string[];
  ordered?: boolean;
  headers?: string[];
  rows?: string[][];
  caption?: string;
  src?: string;
  title?: string; // for expandable
  content?: string; // for expandable
  references?: { number: number; text: string }[];
}

export interface WikiArticle {
  id: string;
  topic_id: string;
  topicSlug: string;
  moduleSlug: string;
  title: string;
  slug: string;
  author: { name: string; role: string; avatar?: string };
  content: ContentBlock[];
  key_points: string[];
  excerpt: string;
  estimated_read_minutes: number;
  depth: 'quick' | 'core' | 'deep';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  updated_at: string;
  isRead?: boolean;
  readDaysAgo?: number;
}

export interface CriticalCondition {
  id: string;
  name: string;
  module: string;
  moduleSlug: string;
  topicSlug: string;
  assessment: string;
  category: string;
  isRead: boolean;
  readDaysAgo?: number;
}

// ===== MODULES =====
export const wikiModules: WikiModule[] = [
  {
    id: "m1", title: "Elective General Surgery", slug: "elective-general-surgery",
    description: "Core elective surgical conditions including hernias, skin lesions, breast assessment and surgical nutrition.",
    icon: "file-text", color: "#1a365d", phase: "Phase 2 + 3",
    sort_order: 1, topicCount: 11, criticalCount: 0, articleCount: 18, readPercent: 45,
  },
  {
    id: "m2", title: "Emergency General Surgery", slug: "emergency-general-surgery",
    description: "Assessment and management of acute surgical presentations including the acute abdomen, GI bleeding, and surgical complications.",
    icon: "zap", color: "#9b2c2c", phase: "Phase 2 + 3",
    sort_order: 2, topicCount: 30, criticalCount: 12, articleCount: 55, readPercent: 28,
  },
  {
    id: "m3", title: "Trauma", slug: "trauma",
    description: "Management of blunt and penetrating trauma including damage control surgery and organ-specific injuries.",
    icon: "activity", color: "#b7791f", phase: "Phase 2 + 3",
    sort_order: 3, topicCount: 10, criticalCount: 1, articleCount: 15, readPercent: 20,
  },
  {
    id: "m4", title: "Upper GI / Oesophagogastric", slug: "upper-gi",
    description: "Benign and malignant oesophagogastric conditions including reflux, cancer, and bariatric surgery.",
    icon: "layers", color: "#2d6a4f", phase: "Phase 2 GI + Phase 3 OG",
    sort_order: 4, topicCount: 12, criticalCount: 2, articleCount: 20, readPercent: 15,
  },
  {
    id: "m5", title: "Hepatopancreatobiliary (HPB)", slug: "hpb",
    description: "Surgical management of hepatic, pancreatic and biliary pathology including malignancy and transplant.",
    icon: "target", color: "#6b46c1", phase: "Phase 2 GI + Phase 3 HPB",
    sort_order: 5, topicCount: 9, criticalCount: 2, articleCount: 16, readPercent: 10,
  },
  {
    id: "m6", title: "Colorectal Surgery", slug: "colorectal",
    description: "Management of benign and malignant colorectal conditions, IBD, functional disorders and endoscopy.",
    icon: "stethoscope", color: "#c05621", phase: "Phase 2 GI + Phase 3 Colorectal",
    sort_order: 6, topicCount: 14, criticalCount: 1, articleCount: 25, readPercent: 52,
  },
  {
    id: "m7", title: "Breast Surgery", slug: "breast",
    description: "Breast assessment, cancer management, oncoplastic and reconstructive breast surgery.",
    icon: "heart", color: "#d53f8c", phase: "Phase 3 Breast 2A / 2B",
    sort_order: 7, topicCount: 8, criticalCount: 0, articleCount: 14, readPercent: 5,
  },
  {
    id: "m8", title: "Endocrine Surgery", slug: "endocrine",
    description: "Surgical management of thyroid, parathyroid, adrenal and neuroendocrine conditions.",
    icon: "shield", color: "#2b6cb0", phase: "Phase 3 Endocrine",
    sort_order: 8, topicCount: 5, criticalCount: 0, articleCount: 8, readPercent: 0,
  },
  {
    id: "m9", title: "Transplant Surgery", slug: "transplant",
    description: "Organ transplantation including renal, hepatic and pancreatic transplant, and dialysis access.",
    icon: "award", color: "#319795", phase: "Phase 3 Transplant",
    sort_order: 9, topicCount: 7, criticalCount: 0, articleCount: 10, readPercent: 0,
  },
  {
    id: "m10", title: "General Surgery of Childhood", slug: "gsoc",
    description: "Common paediatric surgical conditions including congenital anomalies and childhood emergencies.",
    icon: "users", color: "#38a169", phase: "Phase 2 Option + Phase 3 GI&GSoC",
    sort_order: 10, topicCount: 7, criticalCount: 0, articleCount: 10, readPercent: 30,
  },
  {
    id: "m11", title: "Cross-Cutting Themes", slug: "cross-cutting",
    description: "Professional competencies spanning patient safety, communication, ethics, leadership and research.",
    icon: "graduation-cap", color: "#4a5568", phase: "All Phases",
    sort_order: 11, topicCount: 10, criticalCount: 0, articleCount: 12, readPercent: 40,
  },
];

// ===== TOPICS =====
export const wikiTopics: WikiTopic[] = [
  // --- Elective General Surgery ---
  { id: "t1-1", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Skin & Subcutaneous Tissues", slug: "skin-subcutaneous", description: "Recognition and referral of malignant skin lesions (BCC, SCC, melanoma) and management of benign subcutaneous lesions.", is_critical: false, phase_tags: ["phase2"], sort_order: 1, articleCount: 2, readCount: 1, indexProcedures: [{ id: "ip1-1", topic_id: "t1-1", procedure_name: "Punch biopsy", pba_level: "Level 3", sort_order: 1 }, { id: "ip1-2", topic_id: "t1-1", procedure_name: "Excision of skin and subcutaneous lesions", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t1-2", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Abdominal Wall", slug: "abdominal-wall", description: "Management of abnormalities of the abdominal wall, excluding hernia.", is_critical: false, phase_tags: ["phase2"], sort_order: 2, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t1-3", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Reticulo-Endothelial System", slug: "reticulo-endothelial", description: "Surgical support in conditions affecting the reticulo-endothelial and haemopoietic systems.", is_critical: false, phase_tags: ["phase2"], sort_order: 3, articleCount: 1, readCount: 1, indexProcedures: [] },
  { id: "t1-4", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Venous Thrombosis & Embolism", slug: "vte", description: "Pathophysiology of VTE, prevention, diagnosis and management.", is_critical: false, phase_tags: ["phase2"], sort_order: 4, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t1-5", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Genetic Aspects of Surgical Disease", slug: "genetics", description: "Genetically determined diseases related to breast, endocrine and GI disease.", is_critical: false, phase_tags: ["phase2"], sort_order: 5, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t1-6", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Generic Oncology for Surgeons", slug: "generic-oncology", description: "Basic principles of surgical oncology, risk factors, management and evaluation.", is_critical: false, phase_tags: ["phase2"], sort_order: 6, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t1-7", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Elective Hernia", slug: "elective-hernia", description: "Diagnosis and operative management of primary and recurrent abdominal wall hernia.", is_critical: false, phase_tags: ["phase2"], sort_order: 7, articleCount: 3, readCount: 2, indexProcedures: [{ id: "ip1-3", topic_id: "t1-7", procedure_name: "Repair primary abdominal wall hernias", pba_level: "Level 4", indicative_numbers_phase2: "30", indicative_numbers_cert: "60", sort_order: 1 }, { id: "ip1-4", topic_id: "t1-7", procedure_name: "Repair incisional/recurrent hernias", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t1-8", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Surgical Nutrition", slug: "surgical-nutrition", description: "Nutritional assessment, requirements and routes of administration.", is_critical: false, phase_tags: ["phase2"], sort_order: 8, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t1-9", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Neck Swellings", slug: "neck-swellings", description: "Assessment and management of neck swellings.", is_critical: false, phase_tags: ["phase2"], sort_order: 9, articleCount: 1, readCount: 0, indexProcedures: [{ id: "ip1-5", topic_id: "t1-9", procedure_name: "Cervical lymph node biopsy", pba_level: "Level 3", sort_order: 1 }] },
  { id: "t1-10", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Breast Conditions (General)", slug: "breast-conditions", description: "Assessment and initial management of breast disease.", is_critical: false, phase_tags: ["phase2"], sort_order: 10, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t1-11", module_id: "m1", moduleSlug: "elective-general-surgery", title: "Multidisciplinary Team Working", slug: "mdt-working", description: "Principles, organisation and running of MDT meetings.", is_critical: false, phase_tags: ["phase2"], sort_order: 11, articleCount: 1, readCount: 1, indexProcedures: [] },

  // --- Emergency General Surgery ---
  { id: "t2-1", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Superficial Sepsis & Necrotising Infections", slug: "superficial-sepsis", description: "Recognition and management of superficial soft tissue infections and necrotising fasciitis.", is_critical: true, critical_label: "Necrotising fasciitis", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Soft Tissue & Sepsis", phase_tags: ["phase2", "phase3"], sort_order: 1, articleCount: 2, readCount: 1, indexProcedures: [{ id: "ip2-1", topic_id: "t2-1", procedure_name: "Drainage of superficial sepsis", pba_level: "Level 4", indicative_numbers_phase2: "20", sort_order: 1 }, { id: "ip2-2", topic_id: "t2-1", procedure_name: "Radical excisional surgery of necrotising infections", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t2-2", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Breast Infections", slug: "breast-infections", description: "Management of breast abscesses and infections including lactational and non-lactational.", subgroup: "Soft Tissue & Sepsis", is_critical: false, phase_tags: ["phase2"], sort_order: 2, articleCount: 1, readCount: 0, indexProcedures: [{ id: "ip2-3", topic_id: "t2-2", procedure_name: "Aspiration of breast abscess", pba_level: "Level 3", sort_order: 1 }, { id: "ip2-4", topic_id: "t2-2", procedure_name: "Open drainage of breast abscess", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t2-3", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Abdomen", slug: "acute-abdomen", description: "Systematic assessment and management of the acute abdomen.", is_critical: true, critical_label: "Assessment of the acute abdomen", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Acute Abdomen & Obstruction", phase_tags: ["phase2", "phase3"], sort_order: 3, articleCount: 3, readCount: 2, indexProcedures: [{ id: "ip2-5", topic_id: "t2-3", procedure_name: "Emergency laparotomy", pba_level: "Level 4", indicative_numbers_phase2: "30", indicative_numbers_cert: "80", sort_order: 1 }] },
  { id: "t2-4", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Emergency Surgical Ambulatory Care", slug: "esac", description: "Principles of ambulatory emergency surgery and safe patient selection.", subgroup: "Acute Abdomen & Obstruction", is_critical: false, phase_tags: ["phase2"], sort_order: 4, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-5", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Appendicitis", slug: "acute-appendicitis", description: "Diagnosis, investigation and management of acute appendicitis in adults and children.", subgroup: "Acute Abdomen & Obstruction", is_critical: false, phase_tags: ["phase2"], sort_order: 5, articleCount: 3, readCount: 1, indexProcedures: [{ id: "ip2-6", topic_id: "t2-5", procedure_name: "Appendicectomy - open and laparoscopic", pba_level: "Level 4", indicative_numbers_phase2: "40", indicative_numbers_cert: "80", sort_order: 1 }] },
  { id: "t2-6", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Obstructed & Strangulated Hernia", slug: "obstructed-hernia", description: "Emergency management of obstructed and strangulated abdominal wall hernias.", is_critical: true, critical_label: "Strangulated / obstructed hernia", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Acute Abdomen & Obstruction", phase_tags: ["phase2", "phase3"], sort_order: 6, articleCount: 2, readCount: 0, indexProcedures: [{ id: "ip2-7", topic_id: "t2-6", procedure_name: "Repair obstructed/strangulated hernia", pba_level: "Level 4", indicative_numbers_phase2: "15", sort_order: 1 }] },
  { id: "t2-7", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Gastrointestinal Bleeding", slug: "gi-bleeding", description: "Assessment and management of upper and lower gastrointestinal haemorrhage.", is_critical: true, critical_label: "Acute gastrointestinal haemorrhage", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "GI Bleeding & Shock", phase_tags: ["phase2", "phase3"], sort_order: 7, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t2-8", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Shock", slug: "shock", description: "Recognition and management of different types of shock in the surgical patient.", subgroup: "GI Bleeding & Shock", is_critical: false, phase_tags: ["phase2"], sort_order: 8, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-9", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Complications of Abdominal Surgery", slug: "complications", description: "Recognition and management of post-operative complications including anastomotic leak.", is_critical: true, critical_label: "Anastomotic leak / Post-operative haemorrhage", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Acute Abdomen & Obstruction", phase_tags: ["phase2", "phase3"], sort_order: 9, articleCount: 2, readCount: 1, indexProcedures: [{ id: "ip2-8", topic_id: "t2-9", procedure_name: "Re-laparotomy for post-op complication", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t2-10", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Abdominal Pain in Childhood", slug: "paediatric-abdominal-pain", description: "Assessment of the child with acute abdominal pain.", subgroup: "Paediatric Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 10, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-11", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Intussusception", slug: "intussusception", description: "Diagnosis and management of intussusception in children.", subgroup: "Paediatric Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 11, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-12", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Groin & Scrotal Conditions in Childhood", slug: "paediatric-groin", description: "Emergency management of testicular torsion and groin pathology in children.", subgroup: "Paediatric Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 12, articleCount: 1, readCount: 0, indexProcedures: [{ id: "ip2-9", topic_id: "t2-12", procedure_name: "Operation for testicular torsion", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t2-13", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Dysphagia", slug: "acute-dysphagia", description: "Assessment and management of acute dysphagia including foreign body.", subgroup: "Upper GI Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 13, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-14", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Oesophageal Varices", slug: "oesophageal-varices", description: "Emergency management of variceal haemorrhage.", subgroup: "Upper GI Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 14, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-15", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Oesophageal Perforation (incl. Boerhaave's)", slug: "oesophageal-perforation", description: "Recognition and management of oesophageal perforation and Boerhaave's syndrome.", is_critical: true, critical_label: "Oesophageal perforation", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Upper GI Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 15, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-16", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Gastric Dilatation", slug: "gastric-dilatation", description: "Recognition and emergency management of acute gastric dilatation.", subgroup: "Upper GI Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 16, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-17", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Perforation", slug: "acute-perforation", description: "Management of perforated viscus including peptic ulcer and diverticular perforation.", subgroup: "Upper GI Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 17, articleCount: 1, readCount: 0, indexProcedures: [{ id: "ip2-10", topic_id: "t2-17", procedure_name: "Operative management of perforated viscus", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t2-18", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Gastric Volvulus", slug: "gastric-volvulus", description: "Recognition and management of acute gastric volvulus.", subgroup: "Upper GI Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 18, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-19", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Gallstone Disease (Emergency)", slug: "gallstones-emergency", description: "Emergency presentations of gallstone disease including biliary sepsis and cholecystitis.", is_critical: true, critical_label: "Biliary sepsis", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Hepatobiliary Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 19, articleCount: 2, readCount: 1, indexProcedures: [{ id: "ip2-11", topic_id: "t2-19", procedure_name: "Cholecystectomy", pba_level: "Level 4", indicative_numbers_phase2: "50", indicative_numbers_cert: "110", sort_order: 1 }, { id: "ip2-12", topic_id: "t2-19", procedure_name: "Cholecystostomy", pba_level: "Level 3", sort_order: 2 }] },
  { id: "t2-20", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Pancreatitis", slug: "acute-pancreatitis", description: "Assessment, severity stratification and management of acute pancreatitis.", is_critical: true, critical_label: "Acute pancreatitis", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Hepatobiliary Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 20, articleCount: 2, readCount: 0, indexProcedures: [] },
  { id: "t2-21", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Chronic Pancreatitis (Emergency aspects)", slug: "chronic-pancreatitis-emergency", description: "Emergency presentations of chronic pancreatitis.", subgroup: "Hepatobiliary Emergencies", is_critical: false, phase_tags: ["phase2"], sort_order: 21, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-22", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Peri-anal Sepsis", slug: "perianal-sepsis", description: "Assessment and drainage of perianal abscesses and fistula.", subgroup: "Lower GI & Perineal", is_critical: false, phase_tags: ["phase2"], sort_order: 22, articleCount: 2, readCount: 1, indexProcedures: [{ id: "ip2-13", topic_id: "t2-22", procedure_name: "EUA, rigid sigmoidoscopy, drain perianal haematoma", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t2-23", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Painful Peri-anal Conditions", slug: "painful-perianal", description: "Management of acute painful perianal conditions including thrombosed haemorrhoids.", subgroup: "Lower GI & Perineal", is_critical: false, phase_tags: ["phase2"], sort_order: 23, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-24", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Colonic Diverticulitis", slug: "diverticulitis", description: "Classification, assessment and management of acute diverticulitis and its complications.", subgroup: "Lower GI & Perineal", is_critical: false, phase_tags: ["phase2"], sort_order: 24, articleCount: 2, readCount: 0, indexProcedures: [{ id: "ip2-14", topic_id: "t2-24", procedure_name: "Hartmann's procedure", pba_level: "Level 4", sort_order: 1 }, { id: "ip2-15", topic_id: "t2-24", procedure_name: "Segmental colectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t2-25", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Colonic Volvulus", slug: "colonic-volvulus", description: "Diagnosis and management of sigmoid and caecal volvulus.", subgroup: "Lower GI & Perineal", is_critical: false, phase_tags: ["phase2"], sort_order: 25, articleCount: 1, readCount: 0, indexProcedures: [{ id: "ip2-16", topic_id: "t2-25", procedure_name: "Insertion of flatus tube", pba_level: "Level 3", sort_order: 1 }] },
  { id: "t2-26", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Colitis", slug: "acute-colitis", description: "Management of acute colitis and toxic megacolon.", is_critical: true, critical_label: "Acute colitis / toxic megacolon", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Lower GI & Perineal", phase_tags: ["phase2", "phase3"], sort_order: 26, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-27", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Emergency Aneurysm Disease", slug: "emergency-aneurysm", description: "Emergency management of ruptured abdominal aortic aneurysm.", is_critical: true, critical_label: "Ruptured AAA", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Vascular Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 27, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-28", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Mesenteric Vascular Disease", slug: "mesenteric-vascular", description: "Diagnosis and management of acute and chronic mesenteric ischaemia.", is_critical: true, critical_label: "Intestinal ischaemia", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Vascular Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 28, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-29", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Acute Limb Ischaemia", slug: "acute-limb-ischaemia", description: "Emergency assessment and management of acute limb ischaemia and compartment syndrome.", is_critical: true, critical_label: "Acute limb ischaemia / Compartment syndrome", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Vascular Emergencies", phase_tags: ["phase2", "phase3"], sort_order: 29, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t2-30", module_id: "m2", moduleSlug: "emergency-general-surgery", title: "Sepsis", slug: "sepsis", description: "Recognition, investigation and management of sepsis in the surgical patient.", is_critical: true, critical_label: "Sepsis", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", subgroup: "Soft Tissue & Sepsis", phase_tags: ["phase2", "phase3"], sort_order: 30, articleCount: 2, readCount: 1, indexProcedures: [] },

  // --- Trauma ---
  { id: "t3-1", module_id: "m3", moduleSlug: "trauma", title: "Trauma Principles & Primary Survey", slug: "trauma-principles", description: "ATLS principles, primary and secondary survey, trauma team activation.", is_critical: true, critical_label: "Blunt / penetrating abdominal injury", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", phase_tags: ["phase2"], sort_order: 1, articleCount: 2, readCount: 1, indexProcedures: [] },
  { id: "t3-2", module_id: "m3", moduleSlug: "trauma", title: "Abdomen & Thorax Trauma", slug: "abdomen-thorax-trauma", description: "Assessment and management of abdominal and thoracic trauma.", phase_tags: ["phase2"], sort_order: 2, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-1", topic_id: "t3-2", procedure_name: "Laparotomy - trauma", pba_level: "Level 4", sort_order: 1 }, { id: "ip3-2", topic_id: "t3-2", procedure_name: "Chest drain insertion", pba_level: "Level 4", sort_order: 2 }, { id: "ip3-3", topic_id: "t3-2", procedure_name: "Splenectomy", pba_level: "Level 4", sort_order: 3 }] },
  { id: "t3-3", module_id: "m3", moduleSlug: "trauma", title: "Head & Neck Trauma", slug: "head-neck-trauma", description: "Management of head and neck injuries in the trauma setting.", phase_tags: ["phase2"], sort_order: 3, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-4", topic_id: "t3-3", procedure_name: "Cricothyroidotomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t3-4", module_id: "m3", moduleSlug: "trauma", title: "Extremity & Soft Tissue Trauma", slug: "extremity-trauma", description: "Management of extremity injuries including wound care and soft tissue repair.", phase_tags: ["phase2"], sort_order: 4, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-5", topic_id: "t3-4", procedure_name: "Wound debridement and lavage", pba_level: "Level 4", sort_order: 1 }, { id: "ip3-6", topic_id: "t3-4", procedure_name: "Fasciotomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t3-5", module_id: "m3", moduleSlug: "trauma", title: "Vascular Trauma", slug: "vascular-trauma", description: "Assessment and management of traumatic vascular injuries.", phase_tags: ["phase2"], sort_order: 5, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-7", topic_id: "t3-5", procedure_name: "Vascular control with compression", pba_level: "Level 3", sort_order: 1 }, { id: "ip3-8", topic_id: "t3-5", procedure_name: "Exposure and control of major vessels", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t3-6", module_id: "m3", moduleSlug: "trauma", title: "Colon Trauma", slug: "colon-trauma", description: "Management of traumatic colon injuries.", phase_tags: ["phase2"], sort_order: 6, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-9", topic_id: "t3-6", procedure_name: "Colon - primary repair", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t3-7", module_id: "m3", moduleSlug: "trauma", title: "Anorectal Trauma", slug: "anorectal-trauma", description: "Management of anorectal injuries.", phase_tags: ["phase2"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t3-8", module_id: "m3", moduleSlug: "trauma", title: "Pancreatic Trauma", slug: "pancreatic-trauma", description: "Diagnosis and management of pancreatic injuries.", phase_tags: ["phase2"], sort_order: 8, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t3-9", module_id: "m3", moduleSlug: "trauma", title: "Liver Trauma", slug: "liver-trauma", description: "Assessment and management of liver injuries including packing.", phase_tags: ["phase2"], sort_order: 9, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip3-10", topic_id: "t3-9", procedure_name: "Salvage liver surgery / packing", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t3-10", module_id: "m3", moduleSlug: "trauma", title: "Damage Control Surgery", slug: "damage-control", description: "Principles and techniques of damage control surgery.", phase_tags: ["phase2"], sort_order: 10, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip3-11", topic_id: "t3-10", procedure_name: "Laparotomy and damage limitation surgery", pba_level: "Level 4", sort_order: 1 }] },

  // --- Upper GI ---
  { id: "t4-1", module_id: "m4", moduleSlug: "upper-gi", title: "Gastro-Oesophageal Reflux Disease", slug: "gord", description: "Investigation and management of GORD including anti-reflux surgery.", phase_tags: ["phase2", "phase3_og"], sort_order: 1, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-1", topic_id: "t4-1", procedure_name: "Anti-reflux surgery", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t4-2", module_id: "m4", moduleSlug: "upper-gi", title: "Hiatus Hernia", slug: "hiatus-hernia", description: "Classification and management of hiatus hernias.", phase_tags: ["phase2", "phase3_og"], sort_order: 2, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-2", topic_id: "t4-2", procedure_name: "Hiatus hernia repair", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t4-3", module_id: "m4", moduleSlug: "upper-gi", title: "Achalasia & Oesophageal Motility Disorders", slug: "achalasia", description: "Diagnosis and management of achalasia and motility disorders.", phase_tags: ["phase3_og"], sort_order: 3, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-3", topic_id: "t4-3", procedure_name: "Cardiomyotomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t4-4", module_id: "m4", moduleSlug: "upper-gi", title: "Oesophageal Perforation (Specialist)", slug: "oesophageal-perforation-specialist", description: "Specialist management of oesophageal perforation.", is_critical: true, critical_label: "Oesophageal perforation", phase_tags: ["phase3_og"], sort_order: 4, articleCount: 1, readCount: 0, indexProcedures: [] },
  { id: "t4-5", module_id: "m4", moduleSlug: "upper-gi", title: "Oesophageal Cancer", slug: "oesophageal-cancer", description: "Staging, neoadjuvant therapy and surgical management of oesophageal cancer.", phase_tags: ["phase3_og"], sort_order: 5, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-4", topic_id: "t4-5", procedure_name: "Oesophagectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip4-5", topic_id: "t4-5", procedure_name: "Oesophagogastrectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t4-6", module_id: "m4", moduleSlug: "upper-gi", title: "Peptic Ulcer Disease", slug: "peptic-ulcer", description: "Management of peptic ulcer disease and its complications.", phase_tags: ["phase2"], sort_order: 6, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-6", topic_id: "t4-6", procedure_name: "Surgery for peptic ulcer", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t4-7", module_id: "m4", moduleSlug: "upper-gi", title: "Gastric & Duodenal Polyps", slug: "gastric-polyps", description: "Assessment and management of gastric and duodenal polyps.", phase_tags: ["phase2"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t4-8", module_id: "m4", moduleSlug: "upper-gi", title: "Acute Upper GI Haemorrhage (Specialist)", slug: "upper-gi-haemorrhage", description: "Specialist management of acute upper GI bleeding.", is_critical: true, critical_label: "Acute GI haemorrhage (UGI)", phase_tags: ["phase3_og"], sort_order: 8, articleCount: 2, readCount: 0, indexProcedures: [] },
  { id: "t4-9", module_id: "m4", moduleSlug: "upper-gi", title: "Gastric Carcinoma", slug: "gastric-carcinoma", description: "Staging and surgical management of gastric cancer.", phase_tags: ["phase3_og"], sort_order: 9, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-7", topic_id: "t4-9", procedure_name: "Total gastrectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip4-8", topic_id: "t4-9", procedure_name: "Partial gastrectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t4-10", module_id: "m4", moduleSlug: "upper-gi", title: "GIST & Lymphoma", slug: "gist-lymphoma", description: "Management of gastrointestinal stromal tumours and gastric lymphoma.", phase_tags: ["phase3_og"], sort_order: 10, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-9", topic_id: "t4-10", procedure_name: "Open excision of GIST", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t4-11", module_id: "m4", moduleSlug: "upper-gi", title: "Bariatric Surgery", slug: "bariatric", description: "Indications, procedures and management of bariatric surgery.", phase_tags: ["phase3_og"], sort_order: 11, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-10", topic_id: "t4-11", procedure_name: "Gastric bypass", pba_level: "Level 4", sort_order: 1 }, { id: "ip4-11", topic_id: "t4-11", procedure_name: "Sleeve gastrectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t4-12", module_id: "m4", moduleSlug: "upper-gi", title: "Upper GI Endoscopy", slug: "upper-gi-endoscopy", description: "Diagnostic and therapeutic upper GI endoscopy.", phase_tags: ["phase2"], sort_order: 12, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip4-12", topic_id: "t4-12", procedure_name: "Gastroscopy", pba_level: "Level 4", indicative_numbers_phase2: "100", sort_order: 1 }] },

  // --- HPB (representative subset) ---
  { id: "t5-1", module_id: "m5", moduleSlug: "hpb", title: "Gallstone Disease (Elective)", slug: "gallstones-elective", description: "Elective management of gallstone disease including cholecystectomy.", is_critical: true, critical_label: "Biliary sepsis", phase_tags: ["phase2", "phase3_hpb"], sort_order: 1, articleCount: 2, readCount: 0, indexProcedures: [{ id: "ip5-1", topic_id: "t5-1", procedure_name: "Cholecystectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip5-2", topic_id: "t5-1", procedure_name: "CBD exploration", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t5-2", module_id: "m5", moduleSlug: "hpb", title: "Acute Pancreatitis (Specialist)", slug: "acute-pancreatitis-specialist", description: "Specialist management of severe acute pancreatitis.", is_critical: true, critical_label: "Acute pancreatitis", phase_tags: ["phase3_hpb"], sort_order: 2, articleCount: 2, readCount: 0, indexProcedures: [{ id: "ip5-3", topic_id: "t5-2", procedure_name: "Pancreatic debridement", pba_level: "Level 4", sort_order: 1 }, { id: "ip5-4", topic_id: "t5-2", procedure_name: "Necrosectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t5-3", module_id: "m5", moduleSlug: "hpb", title: "Chronic Pancreatitis (Specialist)", slug: "chronic-pancreatitis-specialist", description: "Surgical management of chronic pancreatitis.", phase_tags: ["phase3_hpb"], sort_order: 3, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-5", topic_id: "t5-3", procedure_name: "Pancreaticojejunostomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t5-4", module_id: "m5", moduleSlug: "hpb", title: "Pancreatic & Periampullary Cancer", slug: "pancreatic-cancer", description: "Staging and surgical management of pancreatic and periampullary malignancy.", phase_tags: ["phase3_hpb"], sort_order: 4, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-6", topic_id: "t5-4", procedure_name: "Pancreaticoduodenectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip5-7", topic_id: "t5-4", procedure_name: "Distal pancreatectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t5-5", module_id: "m5", moduleSlug: "hpb", title: "Other Pancreatic Tumours", slug: "other-pancreatic-tumours", description: "Management of cystic and neuroendocrine pancreatic tumours.", phase_tags: ["phase3_hpb"], sort_order: 5, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-8", topic_id: "t5-5", procedure_name: "Pancreatic enucleation", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t5-6", module_id: "m5", moduleSlug: "hpb", title: "Liver Metastases", slug: "liver-metastases", description: "Assessment and surgical management of hepatic metastases.", phase_tags: ["phase3_hpb"], sort_order: 6, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-9", topic_id: "t5-6", procedure_name: "Liver resection", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t5-7", module_id: "m5", moduleSlug: "hpb", title: "Primary Liver Cancer", slug: "primary-liver-cancer", description: "Management of hepatocellular carcinoma.", phase_tags: ["phase3_hpb"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-10", topic_id: "t5-7", procedure_name: "Extended hepatectomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t5-8", module_id: "m5", moduleSlug: "hpb", title: "Cholangiocarcinoma & Gallbladder Cancer", slug: "cholangiocarcinoma", description: "Assessment and management of biliary tract malignancy.", phase_tags: ["phase3_hpb"], sort_order: 8, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-11", topic_id: "t5-8", procedure_name: "Hepaticodochojejunostomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t5-9", module_id: "m5", moduleSlug: "hpb", title: "Benign & Cystic Liver Tumours", slug: "benign-liver-tumours", description: "Management of benign hepatic lesions and liver cysts.", phase_tags: ["phase3_hpb"], sort_order: 9, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip5-12", topic_id: "t5-9", procedure_name: "Fenestration of liver cyst", pba_level: "Level 3", sort_order: 1 }] },

  // --- Colorectal ---
  { id: "t6-1", module_id: "m6", moduleSlug: "colorectal", title: "Pilonidal Disease", slug: "pilonidal", description: "Management of pilonidal sinus disease.", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 1, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-1", topic_id: "t6-1", procedure_name: "Pilonidal sinus lay open, excision + suture", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t6-2", module_id: "m6", moduleSlug: "colorectal", title: "Benign Anal Conditions", slug: "benign-anal", description: "Management of haemorrhoids, fissures, and fistula-in-ano.", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 2, articleCount: 3, readCount: 2, is_critical: false, indexProcedures: [{ id: "ip6-2", topic_id: "t6-2", procedure_name: "Haemorrhoidectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-3", topic_id: "t6-2", procedure_name: "Lateral sphincterotomy", pba_level: "Level 4", sort_order: 2 }, { id: "ip6-4", topic_id: "t6-2", procedure_name: "Fistula-in-ano operations", pba_level: "Level 4", sort_order: 3 }] },
  { id: "t6-3", module_id: "m6", moduleSlug: "colorectal", title: "Benign Colorectal Conditions", slug: "benign-colorectal", description: "Management of benign colorectal pathology.", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 3, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-5", topic_id: "t6-3", procedure_name: "Segmental colectomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t6-4", module_id: "m6", moduleSlug: "colorectal", title: "Rectal Bleeding", slug: "rectal-bleeding", description: "Assessment and investigation of rectal bleeding.", phase_tags: ["phase2"], sort_order: 4, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t6-5", module_id: "m6", moduleSlug: "colorectal", title: "Colorectal Neoplasia", slug: "colorectal-neoplasia", description: "Screening, staging and surgical management of colorectal cancer.", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 5, articleCount: 3, readCount: 2, is_critical: false, indexProcedures: [{ id: "ip6-6", topic_id: "t6-5", procedure_name: "Segmental colectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-7", topic_id: "t6-5", procedure_name: "En-bloc resections", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t6-6", module_id: "m6", moduleSlug: "colorectal", title: "Rectal Neoplasia", slug: "rectal-neoplasia", description: "Staging and management of rectal cancer including neoadjuvant therapy.", phase_tags: ["phase3_colorectal"], sort_order: 6, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-8", topic_id: "t6-6", procedure_name: "High anterior resection", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-9", topic_id: "t6-6", procedure_name: "Low anterior resection", pba_level: "Level 4", sort_order: 2 }, { id: "ip6-10", topic_id: "t6-6", procedure_name: "AP excision (ELAPE)", pba_level: "Level 4", sort_order: 3 }] },
  { id: "t6-7", module_id: "m6", moduleSlug: "colorectal", title: "Anal Neoplasia", slug: "anal-neoplasia", description: "Management of anal squamous cell carcinoma.", phase_tags: ["phase3_colorectal"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip6-11", topic_id: "t6-7", procedure_name: "Anal tumour local excision", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t6-8", module_id: "m6", moduleSlug: "colorectal", title: "Inflammatory Bowel Disease", slug: "ibd", description: "Surgical management of Crohn's disease and ulcerative colitis.", is_critical: true, critical_label: "Acute colitis / toxic megacolon", critical_assessment_note: "Requires CBD/CEX to Level 4 by certification", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 8, articleCount: 3, readCount: 1, indexProcedures: [{ id: "ip6-12", topic_id: "t6-8", procedure_name: "Total colectomy + ileostomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-13", topic_id: "t6-8", procedure_name: "Ileoanal anastomosis + pouch", pba_level: "Level 4", sort_order: 2 }, { id: "ip6-14", topic_id: "t6-8", procedure_name: "Ileocaecectomy", pba_level: "Level 4", sort_order: 3 }, { id: "ip6-15", topic_id: "t6-8", procedure_name: "Strictureplasty", pba_level: "Level 4", sort_order: 4 }] },
  { id: "t6-9", module_id: "m6", moduleSlug: "colorectal", title: "Other Colitides", slug: "other-colitides", description: "Differential diagnosis and management of other inflammatory conditions.", phase_tags: ["phase2"], sort_order: 9, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t6-10", module_id: "m6", moduleSlug: "colorectal", title: "Faecal Incontinence", slug: "faecal-incontinence", description: "Assessment and management of faecal incontinence.", phase_tags: ["phase3_colorectal"], sort_order: 10, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip6-16", topic_id: "t6-10", procedure_name: "Anal sphincter repair", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t6-11", module_id: "m6", moduleSlug: "colorectal", title: "Rectal Prolapse", slug: "rectal-prolapse", description: "Assessment and surgical management of rectal prolapse.", phase_tags: ["phase3_colorectal"], sort_order: 11, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-17", topic_id: "t6-11", procedure_name: "Abdominal rectopexy", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-18", topic_id: "t6-11", procedure_name: "Ventral mesh rectopexy", pba_level: "Level 4", sort_order: 2 }, { id: "ip6-19", topic_id: "t6-11", procedure_name: "Perineal repair", pba_level: "Level 4", sort_order: 3 }] },
  { id: "t6-12", module_id: "m6", moduleSlug: "colorectal", title: "Constipation & Outlet Obstruction", slug: "constipation", description: "Investigation and management of chronic constipation and outlet obstruction.", phase_tags: ["phase3_colorectal"], sort_order: 12, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t6-13", module_id: "m6", moduleSlug: "colorectal", title: "Stomas", slug: "stomas", description: "Formation, management and reversal of intestinal stomas.", phase_tags: ["phase2", "phase3_colorectal"], sort_order: 13, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-20", topic_id: "t6-13", procedure_name: "Ileostomy construction/closure", pba_level: "Level 4", sort_order: 1 }, { id: "ip6-21", topic_id: "t6-13", procedure_name: "Colostomy construction/closure", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t6-14", module_id: "m6", moduleSlug: "colorectal", title: "Lower GI Endoscopy", slug: "lower-gi-endoscopy", description: "Diagnostic and therapeutic colonoscopy.", phase_tags: ["phase2"], sort_order: 14, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip6-22", topic_id: "t6-14", procedure_name: "Colonoscopy", pba_level: "Level 4", indicative_numbers_phase2: "200", sort_order: 1 }] },

  // --- Breast ---
  { id: "t7-1", module_id: "m7", moduleSlug: "breast", title: "Breast & Axillary Assessment", slug: "breast-assessment", description: "Triple assessment and axillary evaluation.", phase_tags: ["phase3_breast"], sort_order: 1, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-1", topic_id: "t7-1", procedure_name: "Punch biopsy", pba_level: "Level 3", sort_order: 1 }, { id: "ip7-2", topic_id: "t7-1", procedure_name: "Core biopsy", pba_level: "Level 3", sort_order: 2 }] },
  { id: "t7-2", module_id: "m7", moduleSlug: "breast", title: "Breast Infections", slug: "breast-infections-specialist", description: "Specialist management of breast infections and implant-related infections.", phase_tags: ["phase3_breast"], sort_order: 2, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-3", topic_id: "t7-2", procedure_name: "Removal of infected breast implant", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t7-3", module_id: "m7", moduleSlug: "breast", title: "Breast Cancer", slug: "breast-cancer", description: "Comprehensive management of breast cancer including staging, surgery and adjuvant therapy.", phase_tags: ["phase3_breast"], sort_order: 3, articleCount: 3, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-4", topic_id: "t7-3", procedure_name: "Breast conservation", pba_level: "Level 4", sort_order: 1 }, { id: "ip7-5", topic_id: "t7-3", procedure_name: "Image guided excision", pba_level: "Level 4", sort_order: 2 }, { id: "ip7-6", topic_id: "t7-3", procedure_name: "Mastectomy", pba_level: "Level 4", sort_order: 3 }, { id: "ip7-7", topic_id: "t7-3", procedure_name: "SLNB", pba_level: "Level 4", sort_order: 4 }, { id: "ip7-8", topic_id: "t7-3", procedure_name: "Axillary clearance", pba_level: "Level 4", sort_order: 5 }] },
  { id: "t7-4", module_id: "m7", moduleSlug: "breast", title: "High-Risk Breast Cancer Management", slug: "high-risk-breast", description: "Risk assessment and management of high-risk patients.", phase_tags: ["phase3_breast"], sort_order: 4, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t7-5", module_id: "m7", moduleSlug: "breast", title: "Oncoplastic Breast Surgery", slug: "oncoplastic", description: "Oncoplastic techniques for breast conservation.", phase_tags: ["phase3_breast"], sort_order: 5, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-9", topic_id: "t7-5", procedure_name: "Oncoplastic WLE", pba_level: "Level 4", sort_order: 1 }, { id: "ip7-10", topic_id: "t7-5", procedure_name: "Mammoplasty WLE", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t7-6", module_id: "m7", moduleSlug: "breast", title: "Implant-Based Reconstruction", slug: "implant-reconstruction", description: "Implant-based breast reconstruction techniques.", phase_tags: ["phase3_breast"], sort_order: 6, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-11", topic_id: "t7-6", procedure_name: "TEX reconstruction", pba_level: "Level 4", sort_order: 1 }, { id: "ip7-12", topic_id: "t7-6", procedure_name: "FVI reconstruction", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t7-7", module_id: "m7", moduleSlug: "breast", title: "Autologous Reconstruction", slug: "autologous-reconstruction", description: "Autologous tissue breast reconstruction.", phase_tags: ["phase3_breast"], sort_order: 7, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-13", topic_id: "t7-7", procedure_name: "Pedicled LD flap", pba_level: "Level 4", sort_order: 1 }, { id: "ip7-14", topic_id: "t7-7", procedure_name: "Local perforator flap", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t7-8", module_id: "m7", moduleSlug: "breast", title: "Benign Breast Surgery & Gynaecomastia", slug: "benign-breast-gynaecomastia", description: "Management of benign breast conditions and gynaecomastia.", phase_tags: ["phase3_breast"], sort_order: 8, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip7-15", topic_id: "t7-8", procedure_name: "Breast reduction", pba_level: "Level 4", sort_order: 1 }, { id: "ip7-16", topic_id: "t7-8", procedure_name: "Gynaecomastia excision", pba_level: "Level 4", sort_order: 2 }] },

  // --- Endocrine ---
  { id: "t8-1", module_id: "m8", moduleSlug: "endocrine", title: "Thyroid", slug: "thyroid", description: "Assessment and surgical management of thyroid disease.", phase_tags: ["phase3_endocrine"], sort_order: 1, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip8-1", topic_id: "t8-1", procedure_name: "Thyroid lobectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip8-2", topic_id: "t8-1", procedure_name: "Total thyroidectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t8-2", module_id: "m8", moduleSlug: "endocrine", title: "Parathyroid", slug: "parathyroid", description: "Management of primary and secondary hyperparathyroidism.", phase_tags: ["phase3_endocrine"], sort_order: 2, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip8-3", topic_id: "t8-2", procedure_name: "Parathyroidectomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t8-3", module_id: "m8", moduleSlug: "endocrine", title: "Adrenal", slug: "adrenal", description: "Surgical management of adrenal pathology.", phase_tags: ["phase3_endocrine"], sort_order: 3, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip8-4", topic_id: "t8-3", procedure_name: "Laparoscopic adrenalectomy", pba_level: "Level 4", sort_order: 1 }, { id: "ip8-5", topic_id: "t8-3", procedure_name: "Open adrenalectomy", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t8-4", module_id: "m8", moduleSlug: "endocrine", title: "Pancreatic Endocrine Tumours", slug: "pancreatic-endocrine", description: "Diagnosis and management of functioning and non-functioning pancreatic endocrine tumours.", phase_tags: ["phase3_endocrine"], sort_order: 4, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t8-5", module_id: "m8", moduleSlug: "endocrine", title: "MEN & Genetic Syndromes", slug: "men-syndromes", description: "Multiple endocrine neoplasia and related genetic conditions.", phase_tags: ["phase3_endocrine"], sort_order: 5, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },

  // --- Transplant ---
  { id: "t9-1", module_id: "m9", moduleSlug: "transplant", title: "Access for Dialysis", slug: "dialysis-access", description: "Creation and management of vascular access for haemodialysis.", phase_tags: ["phase3_transplant"], sort_order: 1, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip9-1", topic_id: "t9-1", procedure_name: "AV fistula construction", pba_level: "Level 4", sort_order: 1 }, { id: "ip9-2", topic_id: "t9-1", procedure_name: "PD catheter insertion", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t9-2", module_id: "m9", moduleSlug: "transplant", title: "Kidney Transplant", slug: "kidney-transplant", description: "Deceased and live donor kidney transplantation.", phase_tags: ["phase3_transplant"], sort_order: 2, articleCount: 2, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip9-3", topic_id: "t9-2", procedure_name: "Kidney transplant (deceased/live)", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t9-3", module_id: "m9", moduleSlug: "transplant", title: "Paediatric Kidney Transplantation", slug: "paediatric-kidney-transplant", description: "Kidney transplantation in children.", phase_tags: ["phase3_transplant"], sort_order: 3, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t9-4", module_id: "m9", moduleSlug: "transplant", title: "Principles of Transplantation", slug: "transplant-principles", description: "Immunology, organ allocation and ethical considerations.", phase_tags: ["phase3_transplant"], sort_order: 4, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t9-5", module_id: "m9", moduleSlug: "transplant", title: "Pancreatic Transplantation", slug: "pancreatic-transplant", description: "Indications and techniques for pancreas transplantation.", phase_tags: ["phase3_transplant"], sort_order: 5, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip9-4", topic_id: "t9-5", procedure_name: "Pancreas transplant", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t9-6", module_id: "m9", moduleSlug: "transplant", title: "Liver Transplantation", slug: "liver-transplant", description: "Indications, surgery and post-operative management.", phase_tags: ["phase3_transplant"], sort_order: 6, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip9-5", topic_id: "t9-6", procedure_name: "Deceased donor liver transplant", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t9-7", module_id: "m9", moduleSlug: "transplant", title: "Organ Retrieval", slug: "organ-retrieval", description: "Multi-organ retrieval procedures.", phase_tags: ["phase3_transplant"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip9-6", topic_id: "t9-7", procedure_name: "Multi-organ retrieval", pba_level: "Level 4", sort_order: 1 }] },

  // --- GSoC ---
  { id: "t10-1", module_id: "m10", moduleSlug: "gsoc", title: "Child with Vomiting", slug: "child-vomiting", description: "Assessment of the vomiting child including pyloric stenosis.", phase_tags: ["phase2"], sort_order: 1, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip10-1", topic_id: "t10-1", procedure_name: "Pyloromyotomy", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t10-2", module_id: "m10", moduleSlug: "gsoc", title: "Constipation in Children", slug: "paediatric-constipation", description: "Assessment and management of constipation in children.", phase_tags: ["phase2"], sort_order: 2, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t10-3", module_id: "m10", moduleSlug: "gsoc", title: "Abdominal Wall Conditions", slug: "paediatric-abdominal-wall", description: "Management of paediatric abdominal wall conditions.", phase_tags: ["phase2"], sort_order: 3, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip10-2", topic_id: "t10-3", procedure_name: "Repair of abdominal wall hernia", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t10-4", module_id: "m10", moduleSlug: "gsoc", title: "Groin Conditions", slug: "paediatric-groin-conditions", description: "Management of inguinal hernia, undescended testis and hydrocele.", phase_tags: ["phase2"], sort_order: 4, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [{ id: "ip10-3", topic_id: "t10-4", procedure_name: "Orchidopexy", pba_level: "Level 4", sort_order: 1 }, { id: "ip10-4", topic_id: "t10-4", procedure_name: "Inguinal hernia operation", pba_level: "Level 4", sort_order: 2 }] },
  { id: "t10-5", module_id: "m10", moduleSlug: "gsoc", title: "Paediatric Urological Conditions", slug: "paediatric-urology", description: "Management of common paediatric urological conditions.", phase_tags: ["phase2"], sort_order: 5, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip10-5", topic_id: "t10-5", procedure_name: "Circumcision", pba_level: "Level 4", sort_order: 1 }] },
  { id: "t10-6", module_id: "m10", moduleSlug: "gsoc", title: "Head & Neck Swellings in Children", slug: "paediatric-head-neck", description: "Assessment and management of head and neck masses in children.", phase_tags: ["phase2"], sort_order: 6, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip10-6", topic_id: "t10-6", procedure_name: "Lymph node biopsy", pba_level: "Level 3", sort_order: 1 }] },
  { id: "t10-7", module_id: "m10", moduleSlug: "gsoc", title: "Skin Conditions in Children", slug: "paediatric-skin", description: "Management of common skin conditions in children.", phase_tags: ["phase2"], sort_order: 7, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [{ id: "ip10-7", topic_id: "t10-7", procedure_name: "Abscess drainage", pba_level: "Level 3", sort_order: 1 }, { id: "ip10-8", topic_id: "t10-7", procedure_name: "Ingrowing toenail operation", pba_level: "Level 3", sort_order: 2 }] },

  // --- Cross-Cutting Themes ---
  { id: "t11-1", module_id: "m11", moduleSlug: "cross-cutting", title: "Patient Safety & Human Factors", slug: "patient-safety", description: "GPC Domain 6: Never events, duty of candour, WHO checklist.", phase_tags: ["all"], sort_order: 1, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-2", module_id: "m11", moduleSlug: "cross-cutting", title: "Communication & Consent", slug: "communication-consent", description: "GPC Domain 2: Breaking bad news, shared decision making, capacity.", phase_tags: ["all"], sort_order: 2, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-3", module_id: "m11", moduleSlug: "cross-cutting", title: "Ethics & Medical Law", slug: "ethics-law", description: "GPC Domain 1: Probity, ethical frameworks, medico-legal.", phase_tags: ["all"], sort_order: 3, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t11-4", module_id: "m11", moduleSlug: "cross-cutting", title: "Leadership & Management", slug: "leadership", description: "GPC Domain 5: NHS structures, rota management, governance.", phase_tags: ["all"], sort_order: 4, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-5", module_id: "m11", moduleSlug: "cross-cutting", title: "Research & Evidence-Based Practice", slug: "research-evidence", description: "GPC Domain 9: Critical appraisal, methodology, audit, trials.", phase_tags: ["all"], sort_order: 5, articleCount: 2, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-6", module_id: "m11", moduleSlug: "cross-cutting", title: "Education & Training", slug: "education-training", description: "GPC Domain 8: Teaching skills, feedback, supervision, assessment.", phase_tags: ["all"], sort_order: 6, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t11-7", module_id: "m11", moduleSlug: "cross-cutting", title: "Safeguarding Vulnerable Groups", slug: "safeguarding", description: "GPC Domain 7: Children, vulnerable adults, mental capacity.", phase_tags: ["all"], sort_order: 7, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-8", module_id: "m11", moduleSlug: "cross-cutting", title: "Health Promotion & Prevention", slug: "health-promotion", description: "GPC Domain 4: Screening, lifestyle modification, prehabilitation.", phase_tags: ["all"], sort_order: 8, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
  { id: "t11-9", module_id: "m11", moduleSlug: "cross-cutting", title: "Perioperative Care", slug: "perioperative-care", description: "Pre-assessment, enhanced recovery, thromboprophylaxis, antibiotic prophylaxis, critical care.", phase_tags: ["all"], sort_order: 9, articleCount: 1, readCount: 1, is_critical: false, indexProcedures: [] },
  { id: "t11-10", module_id: "m11", moduleSlug: "cross-cutting", title: "Quality Improvement & Audit", slug: "quality-improvement", description: "QI methodology, PDSA cycles, GIRFT, national audits.", phase_tags: ["all"], sort_order: 10, articleCount: 1, readCount: 0, is_critical: false, indexProcedures: [] },
];

// ===== CRITICAL CONDITIONS =====
export const criticalConditions: CriticalCondition[] = [
  { id: "cc1", name: "Assessment of the acute abdomen", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "acute-abdomen", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 3 },
  { id: "cc2", name: "Strangulated / obstructed hernia", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "obstructed-hernia", assessment: "CBD/CEX to Level 4", category: "General", isRead: false },
  { id: "cc3", name: "Intestinal ischaemia", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "mesenteric-vascular", assessment: "CBD/CEX to Level 4", category: "General", isRead: false },
  { id: "cc4", name: "Intestinal obstruction", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "acute-abdomen", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 12 },
  { id: "cc5", name: "Post-operative haemorrhage", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "complications", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 5 },
  { id: "cc6", name: "Acute gastrointestinal haemorrhage", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "gi-bleeding", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 20 },
  { id: "cc7", name: "Blunt / penetrating abdominal injury", module: "Trauma", moduleSlug: "trauma", topicSlug: "trauma-principles", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 8 },
  { id: "cc8", name: "Necrotising fasciitis", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "superficial-sepsis", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 15 },
  { id: "cc9", name: "Sepsis", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "sepsis", assessment: "CBD/CEX to Level 4", category: "General", isRead: true, readDaysAgo: 2 },
  { id: "cc10", name: "Anastomotic leak", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "complications", assessment: "CBD/CEX to Level 4", category: "General", isRead: false },
  { id: "cc11", name: "Acute colitis / toxic megacolon", module: "Colorectal Surgery", moduleSlug: "colorectal", topicSlug: "ibd", assessment: "CBD/CEX to Level 4", category: "Colorectal", isRead: false },
  { id: "cc12", name: "Faecal peritonitis", module: "Colorectal Surgery", moduleSlug: "colorectal", topicSlug: "colorectal-neoplasia", assessment: "CBD/CEX to Level 4", category: "Colorectal", isRead: false },
  { id: "cc13", name: "Biliary sepsis", module: "HPB", moduleSlug: "hpb", topicSlug: "gallstones-elective", assessment: "CBD/CEX to Level 4", category: "Upper GI", isRead: false },
  { id: "cc14", name: "Acute pancreatitis", module: "HPB", moduleSlug: "hpb", topicSlug: "acute-pancreatitis-specialist", assessment: "CBD/CEX to Level 4", category: "Upper GI", isRead: false },
  { id: "cc15", name: "Oesophageal perforation", module: "Upper GI / Oesophagogastric", moduleSlug: "upper-gi", topicSlug: "oesophageal-perforation-specialist", assessment: "CBD/CEX to Level 4", category: "Upper GI", isRead: false },
  { id: "cc16", name: "Upper GI anastomotic leak", module: "Upper GI / Oesophagogastric", moduleSlug: "upper-gi", topicSlug: "oesophageal-cancer", assessment: "CBD/CEX to Level 4", category: "Upper GI", isRead: false },
  { id: "cc17", name: "Ruptured AAA", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "emergency-aneurysm", assessment: "CBD/CEX to Level 4", category: "Vascular", isRead: false },
  { id: "cc18", name: "Acute limb ischaemia", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "acute-limb-ischaemia", assessment: "CBD/CEX to Level 4", category: "Vascular", isRead: false },
  { id: "cc19", name: "Compartment syndrome", module: "Emergency General Surgery", moduleSlug: "emergency-general-surgery", topicSlug: "acute-limb-ischaemia", assessment: "CBD/CEX to Level 4", category: "Vascular", isRead: false },
];

// ===== SAMPLE ARTICLES =====
export const wikiArticles: WikiArticle[] = [
  {
    id: "a1",
    topic_id: "t2-5",
    topicSlug: "acute-appendicitis",
    moduleSlug: "emergency-general-surgery",
    title: "Acute Appendicitis: Diagnosis & Management",
    slug: "diagnosis-management",
    author: { name: "Miss Emma Richardson", role: "Education Lead" },
    excerpt: "A comprehensive review of the clinical assessment, investigation and management of acute appendicitis, covering the Alvarado score, imaging modalities and operative vs conservative approaches.",
    estimated_read_minutes: 12,
    depth: "core",
    tags: ["Emergency", "Phase 2", "Acute Abdomen"],
    status: "published",
    published_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-02-01T14:30:00Z",
    isRead: true,
    readDaysAgo: 5,
    key_points: [
      "Lifetime risk is approximately 7-8%, with peak incidence at 10-20 years",
      "The Alvarado score (MANTRELS) can help stratify patients — score ≥7 is highly predictive",
      "CT abdomen/pelvis is the gold standard investigation in adults (sensitivity >95%)",
      "Appendicectomy (open or laparoscopic) remains the definitive treatment",
      "Conservative management with antibiotics alone may be considered in uncomplicated cases",
      "Always consider appendicitis in the differential for a woman of reproductive age with RIF pain",
    ],
    content: [
      { type: "heading", level: 2, text: "Epidemiology" },
      { type: "paragraph", text: "Acute appendicitis is the most common surgical emergency, with a lifetime risk of approximately 7-8%. Peak incidence occurs between 10 and 20 years of age, though it can present at any age. Males are slightly more affected than females (ratio 1.4:1). The incidence appears to be increasing in developing countries, possibly related to dietary changes." },
      { type: "paragraph", text: "The aetiology is thought to relate to luminal obstruction — by faecolith, lymphoid hyperplasia, or rarely neoplasm — leading to bacterial overgrowth, distension, and ischaemia of the appendiceal wall." },
      { type: "heading", level: 2, text: "Diagnosis" },
      { type: "paragraph", text: "The diagnosis of acute appendicitis remains predominantly clinical. Classical features include periumbilical pain migrating to the right iliac fossa (RIF), associated with anorexia, nausea and low-grade pyrexia. Examination findings include RIF tenderness, guarding and rebound tenderness." },
      { type: "clinical_pearl", text: "The position of the appendix determines the clinical presentation — a retrocaecal appendix may present with flank pain rather than RIF pain. A pelvic appendix may cause suprapubic pain and urinary symptoms, leading to misdiagnosis." },
      { type: "heading", level: 3, text: "Alvarado Score (MANTRELS)" },
      { type: "paragraph", text: "The Alvarado score is a validated clinical scoring system used to stratify the likelihood of appendicitis:" },
      { type: "table", headers: ["Parameter", "Score"], rows: [["Migration of pain to RIF", "1"], ["Anorexia", "1"], ["Nausea / Vomiting", "1"], ["Tenderness in RIF", "2"], ["Rebound pain", "1"], ["Elevated temperature (>37.3°C)", "1"], ["Leucocytosis (>10 × 10⁹/L)", "2"], ["Shift to left (neutrophilia)", "1"], ["Total", "10"]] },
      { type: "key_point", text: "An Alvarado score of ≥7 is highly predictive of acute appendicitis and warrants urgent surgical review. A score of 5-6 suggests a 'possible' diagnosis requiring further investigation. A score of ≤4 makes appendicitis unlikely." },
      { type: "warning", text: "Always exclude ectopic pregnancy in women of reproductive age presenting with RIF pain. A urinary β-hCG should be performed in all women of childbearing age before proceeding to theatre." },
      { type: "heading", level: 3, text: "Imaging" },
      { type: "paragraph", text: "CT abdomen and pelvis with IV contrast is the gold standard imaging modality in adults, with sensitivity exceeding 95% and specificity of 94-98%. Findings include an enlarged appendix (>6mm diameter), periappendiceal fat stranding, appendicolith, and abscess formation." },
      { type: "paragraph", text: "Ultrasound is the first-line investigation in children and pregnant women. MRI may be used in pregnancy when ultrasound is inconclusive." },
      { type: "heading", level: 2, text: "Management" },
      { type: "paragraph", text: "The mainstay of treatment for acute appendicitis is appendicectomy, which can be performed via open or laparoscopic approach. Laparoscopic appendicectomy is increasingly preferred as it offers shorter hospital stay, less post-operative pain, lower wound infection rates, and better cosmesis." },
      { type: "exam_tip", text: "A common FRCS viva scenario: how would you manage an appendix mass? Key points: if stable, initial conservative management with IV antibiotics ± percutaneous drainage of any collection, followed by interval appendicectomy at 6-8 weeks. If clinical deterioration or peritonitis, proceed to surgery." },
      { type: "expandable", title: "Differential Diagnosis of RIF Pain", content: "The differential diagnosis of right iliac fossa pain is broad and includes: Mesenteric lymphadenitis (particularly in children), Meckel's diverticulitis, Crohn's disease (terminal ileal), Caecal pathology (diverticulitis, carcinoma), Gynaecological causes (ruptured ovarian cyst, ovarian torsion, ectopic pregnancy, PID), Urological causes (right ureteric colic, UTI), Psoas abscess, and Referred pain from testicular torsion." },
      { type: "heading", level: 3, text: "Operative Technique" },
      { type: "paragraph", text: "Laparoscopic appendicectomy is typically performed via a 3-port technique. The mesoappendix is divided using bipolar diathermy or an energy device. The base of the appendix is secured with two endoloops or a linear stapler, and the appendix is divided between them. The specimen is extracted in a retrieval bag." },
      { type: "heading", level: 3, text: "Conservative Management" },
      { type: "paragraph", text: "The CODA trial (2020) demonstrated that antibiotics alone were non-inferior to surgery for uncomplicated appendicitis, though nearly 30% of patients in the antibiotics group required appendicectomy within 90 days. Patient selection is key — conservative management should be reserved for uncomplicated cases without appendicolith." },
      { type: "reference", references: [{ number: 1, text: "CODA Collaborative. A Randomized Trial Comparing Antibiotics with Appendectomy for Appendicitis. N Engl J Med. 2020;383(20):1907-1919." }, { number: 2, text: "Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986;15(5):557-564." }, { number: 3, text: "Di Saverio S, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15(1):27." }] },
    ],
  },
  {
    id: "a2",
    topic_id: "t2-5",
    topicSlug: "acute-appendicitis",
    moduleSlug: "emergency-general-surgery",
    title: "Appendicectomy: Operative Technique",
    slug: "operative-technique",
    author: { name: "Mr James Hartley", role: "Consultant Colorectal Surgeon" },
    excerpt: "A step-by-step guide to open and laparoscopic appendicectomy, covering port placement, key operative steps, and management of the difficult appendix.",
    estimated_read_minutes: 15,
    depth: "deep",
    tags: ["Operative", "Index Procedure", "Laparoscopic"],
    status: "published",
    published_at: "2026-01-20T09:00:00Z",
    updated_at: "2026-01-25T11:00:00Z",
    isRead: false,
    key_points: [
      "Laparoscopic approach is preferred for most patients — offers faster recovery and lower wound infection",
      "Three-port technique: 10mm umbilical (camera), 5mm suprapubic, 5mm LIF",
      "Secure the appendix base with two endoloops or stapler before division",
      "Always retrieve the specimen in a bag to prevent port-site contamination",
      "Convert to open early if unsafe — conversion is good judgement, not failure",
    ],
    content: [
      { type: "heading", level: 2, text: "Pre-operative Preparation" },
      { type: "paragraph", text: "Patients should receive IV antibiotics at induction (typically co-amoxiclav or metronidazole + cephalosporin). VTE prophylaxis with LMWH should be administered. The bladder should be emptied (catheterisation is not routinely required for straightforward cases)." },
      { type: "heading", level: 2, text: "Laparoscopic Technique" },
      { type: "paragraph", text: "Position the patient supine with the left arm tucked. The surgeon stands on the patient's left side. Establish pneumoperitoneum via open (Hasson) or closed (Veress) technique at the umbilicus." },
      { type: "clinical_pearl", text: "In thin patients, a direct trocar entry technique is safe and efficient. In patients with previous midline surgery, consider an alternative entry point such as Palmer's point." },
      { type: "heading", level: 2, text: "Open Technique" },
      { type: "paragraph", text: "A Lanz incision is made at McBurney's point (two-thirds of the way from the umbilicus to the ASIS). The external oblique aponeurosis is split, and the internal oblique and transversus abdominis muscles are separated in the direction of their fibres." },
      { type: "warning", text: "If the appendix is not immediately visible, ensure you are in the correct anatomical plane. Follow the taeniae coli distally to locate the appendiceal base. Avoid excessive traction on an inflamed appendix to prevent perforation." },
    ],
  },
  {
    id: "a3",
    topic_id: "t2-5",
    topicSlug: "acute-appendicitis",
    moduleSlug: "emergency-general-surgery",
    title: "Paediatric Appendicitis: Special Considerations",
    slug: "paediatric-appendicitis",
    author: { name: "Dr Sarah Chen", role: "Paediatric Surgery Fellow" },
    excerpt: "Key differences in the presentation, investigation and management of appendicitis in children compared to adults.",
    estimated_read_minutes: 5,
    depth: "quick",
    tags: ["Emergency", "Paediatric", "Phase 2"],
    status: "published",
    published_at: "2026-02-05T08:00:00Z",
    updated_at: "2026-02-05T08:00:00Z",
    isRead: false,
    key_points: [
      "Children under 5 have a higher perforation rate (>50%) due to delayed presentation and atypical symptoms",
      "Ultrasound is the first-line imaging in children — avoid unnecessary radiation",
      "The Paediatric Appendicitis Score (PAS) is more sensitive than Alvarado in children",
      "Laparoscopic approach is safe and preferred in children — single-incision techniques increasingly used",
    ],
    content: [
      { type: "heading", level: 2, text: "Presentation Differences" },
      { type: "paragraph", text: "Young children often present atypically. Symptoms may include diffuse abdominal pain, vomiting (often preceding pain), irritability and lethargy. The classic migratory pain pattern is less reliable in children under 5." },
      { type: "key_point", text: "Children under 5 years have a perforation rate exceeding 50% at presentation, compared to approximately 20% in older children and adults. This is partly due to diagnostic difficulty and partly due to the thinner appendiceal wall and less developed omentum in young children." },
      { type: "heading", level: 2, text: "Investigation" },
      { type: "paragraph", text: "Ultrasound is the first-line imaging modality in children, avoiding radiation exposure. In experienced hands, sensitivity is 88-94%. CT should be reserved for equivocal cases where clinical concern is high and ultrasound is non-diagnostic." },
      { type: "heading", level: 2, text: "Management" },
      { type: "paragraph", text: "Appendicectomy remains the standard of care. Laparoscopic approach is increasingly preferred in children, with some centres offering single-incision laparoscopic surgery through the umbilicus for excellent cosmesis." },
      { type: "exam_tip", text: "In the FRCS exam, be prepared to discuss the management of an appendix mass in a child. Unlike adults, early operative intervention is often preferred in children due to the higher failure rate of conservative management." },
    ],
  },
];

// ===== HELPER FUNCTIONS =====
export const getModuleBySlug = (slug: string) => wikiModules.find(m => m.slug === slug);
export const getTopicsByModule = (moduleId: string) => wikiTopics.filter(t => t.module_id === moduleId).sort((a, b) => a.sort_order - b.sort_order);
export const getTopicBySlug = (moduleSlug: string, topicSlug: string) => wikiTopics.find(t => t.moduleSlug === moduleSlug && t.slug === topicSlug);
export const getArticlesByTopic = (topicSlug: string, moduleSlug: string) => wikiArticles.filter(a => a.topicSlug === topicSlug && a.moduleSlug === moduleSlug);
export const getArticleBySlug = (moduleSlug: string, topicSlug: string, articleSlug: string) => wikiArticles.find(a => a.moduleSlug === moduleSlug && a.topicSlug === topicSlug && a.slug === articleSlug);
export const getAllIndexProcedures = () => wikiTopics.flatMap(t => t.indexProcedures.map(ip => ({ ...ip, topicTitle: t.title, moduleTitle: wikiModules.find(m => m.id === t.module_id)?.title || "", moduleSlug: t.moduleSlug, topicSlug: t.slug, moduleColor: wikiModules.find(m => m.id === t.module_id)?.color || "" })));

// Module accent colors map for easy inline styling
export const moduleColors: Record<string, string> = {
  "elective-general-surgery": "#1a365d",
  "emergency-general-surgery": "#9b2c2c",
  "trauma": "#b7791f",
  "upper-gi": "#2d6a4f",
  "hpb": "#6b46c1",
  "colorectal": "#c05621",
  "breast": "#d53f8c",
  "endocrine": "#2b6cb0",
  "transplant": "#319795",
  "gsoc": "#38a169",
  "cross-cutting": "#4a5568",
};

// Emergency Surgery subgroups for display
export const emergencySubgroups = [
  "Soft Tissue & Sepsis",
  "Acute Abdomen & Obstruction",
  "Paediatric Emergencies",
  "Upper GI Emergencies",
  "Hepatobiliary Emergencies",
  "Lower GI & Perineal",
  "Vascular Emergencies",
  "GI Bleeding & Shock",
];

// Mock user wiki preferences
export const mockWikiPreferences = {
  training_stage: "ST5",
  current_phase: "phase2",
  phase3_modules: [] as string[],
  onboarded_at: "2026-01-10T09:00:00Z",
  last_active_date: "2026-02-15",
  streak_count: 5,
};

// Mock recent activity
export const mockRecentReads = [
  { articleTitle: "Acute Appendicitis: Diagnosis & Management", topicTitle: "Acute Appendicitis", moduleTitle: "Emergency General Surgery", depth: "core" as const, readAt: "2026-02-10" },
  { articleTitle: "Sepsis Recognition & Management", topicTitle: "Sepsis", moduleTitle: "Emergency General Surgery", depth: "core" as const, readAt: "2026-02-13" },
  { articleTitle: "Patient Safety Essentials", topicTitle: "Patient Safety & Human Factors", moduleTitle: "Cross-Cutting Themes", depth: "quick" as const, readAt: "2026-02-14" },
];

// Search suggestions
export const searchSuggestions = ["appendicitis", "anastomotic leak", "acute pancreatitis", "cholecystectomy"];
