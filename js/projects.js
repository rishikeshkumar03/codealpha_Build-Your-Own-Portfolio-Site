/**
 * RISHIKESH KUMAR PORTFOLIO — PROJECT CASE STUDIES & DATA
 * High-performance project catalog and rich case study modals.
 */

const projectData = {
  'project-1': {
    title: 'SMART DUSTBIN IoT SYSTEM',
    subtitle: 'Autonomous ultrasonic sensing & real-time telemetry infrastructure',
    category: 'IoT & Embedded Systems',
    timeline: '2025 – 2026',
    status: 'Completed / Hardware Prototype',
    image: './assets/smart_dustbin_iot.jpg',
    technologies: ['Arduino UNO', 'ESP8266 Wi-Fi', 'HC-SR04 Sensor', 'I2C LCD 16x2', 'C/C++', 'IoT Telemetry'],
    overview: `
      The Smart Dustbin IoT System addresses urban waste management bottlenecks through automated proximity detection and volumetric waste level monitoring. 
      Built around an Arduino UNO microcontroller connected to an HC-SR04 ultrasonic transducer and ESP8266 Wi-Fi transceiver, the system calculates garbage elevation in real-time, displays live status on an I2C LCD screen, and broadcasts threshold triggers across the local network.
    `,
    architecture: [
      { step: '1. Transducer Ping', desc: 'HC-SR04 emits 40kHz ultrasonic burst and calculates echo flight time to determine waste depth.' },
      { step: '2. Microcontroller Logic', desc: 'Arduino UNO processes distance readings, computes percentage capacity, and applies smoothing filters.' },
      { step: '3. Local I2C Visuals', desc: 'Real-time telemetry and capacity metrics are rendered on a low-power 16x2 I2C Liquid Crystal Display.' },
      { step: '4. Network Broadcast', desc: 'ESP8266 node dispatches threshold alerts when bin exceeds 80% capacity to notify maintenance staff.' }
    ],
    codeSnippet: `// Arduino UNO Core Distance & Capacity Calculation (C++)
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int BIN_HEIGHT_CM = 45;

LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  lcd.init();
  lcd.backlight();
}

float measureDistanceCm() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH, 30000);
  if (duration == 0) return BIN_HEIGHT_CM;
  return (duration * 0.0343) / 2.0;
}`
  },

  'project-2': {
    title: 'SMART MAIL DROP',
    subtitle: 'Secure QR-authenticated parcel dispatch & real-time tracking suite',
    category: 'Cloud & Web Logistics',
    timeline: '2025',
    status: 'Completed Prototype',
    image: './assets/smart_mail_drop.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Firebase Realtime DB', 'QR Code API', 'Responsive UI'],
    overview: `
      Smart Mail Drop reimagines parcel submission and local mailbox management for modern workflows.
      Users scan a cryptographically signed QR code to authenticate drop-offs, record timestamps, and track delivery lifecycles in real-time. 
      Powered by Firebase backend services, state synchronization across sender, courier, and recipient dashboards occurs in sub-100ms intervals.
    `,
    architecture: [
      { step: '1. QR Generation & Scan', desc: 'Dynamic QR codes encode package UUID, recipient metadata, and dispatch tokens.' },
      { step: '2. Client Authentication', desc: 'Web scanner verifies drop credentials with zero external app dependencies.' },
      { step: '3. Firebase Cloud Sync', desc: 'Real-time Firestore listeners trigger instantaneous dashboard updates.' },
      { step: '4. Audit & Telemetry', desc: 'Time-stamped audit trails allow granular package traceability.' }
    ],
    codeSnippet: `// Firebase Parcel Dispatch Handler (JavaScript)
async function recordParcelDrop(parcelId, senderData) {
  const parcelRef = firebase.database().ref('parcels/' + parcelId);
  const timestamp = Date.now();
  
  const payload = {
    id: parcelId,
    sender: senderData.name,
    recipient: senderData.recipient,
    status: 'DROPPED_OFF',
    timestamp: timestamp,
    verifiedVia: 'QR_SCANNER'
  };
  
  await parcelRef.set(payload);
  console.log('Parcel recorded with realtime synchronization:', parcelId);
}`
  },

  'project-3': {
    title: 'PHISHGUARD — Link Verification',
    subtitle: 'High-accuracy URL analysis, phishing heuristic scanner & threat detection engine',
    category: 'Cybersecurity & Web Safety',
    timeline: '2025 – 2026',
    status: 'Working System / Active',
    image: './assets/phishguard.jpg',
    technologies: ['Python', 'JavaScript (ES6+)', 'URL Analysis API', 'Heuristic Threat Scanners', 'HTML5/CSS3', 'SSL Validator'],
    overview: `
      PHISHGUARD is a working link-verification and phishing-analysis project designed to analyze URLs and identify suspicious or potentially unsafe links in real-time.
      The engine parses structural URL anomalies (typosquatting, suspicious IP hosts, multiple subdomains, abnormal port bindings), queries domain reputation databases, validates SSL certificate chains, and flags deceptive redirects to safeguard users against fraudulent websites.
    `,
    architecture: [
      { step: '1. Lexical URL Parsing', desc: 'Deconstructs domain entropy, TLD risk profiles, character obfuscation, and URL length metrics.' },
      { step: '2. SSL & Host Validation', desc: 'Inspects TLS/SSL issuer legitimacy, domain age, and reverse DNS records in real-time.' },
      { step: '3. Heuristic Scoring Engine', desc: 'Calculates dynamic composite threat score (0-100%) against verified phishing patterns.' },
      { step: '4. User Security Verdict', desc: 'Renders intuitive status HUD with actionable breakdown (Safe, Suspicious, or Malicious).' }
    ],
    codeSnippet: `// PhishGuard Core URL Verification & Analysis Engine (Python)
import re
import urllib.parse
from datetime import datetime

class PhishGuardAnalyzer:
    def __init__(self, target_url: str):
        self.url = target_url
        self.parsed = urllib.parse.urlparse(target_url)
        self.threat_score = 0.0
        
    def analyze_link(self) -> dict:
        flags = []
        domain = self.parsed.netloc.lower()
        
        # Check for direct IP address usage in URL
        if re.match(r"^\\d{1,3}(\\.\\d{1,3}){3}$", domain):
            self.threat_score += 40.0
            flags.append("RAW_IP_HOST_DETECTED")
            
        # Check subdomain entropy & length
        if domain.count('.') > 3:
            self.threat_score += 25.0
            flags.append("SUSPICIOUS_SUBDOMAIN_DEPTH")
            
        # Check suspicious keywords in path
        suspicious_terms = ['login', 'verify', 'banking', 'secure', 'update-account']
        if any(term in self.parsed.path.lower() for term in suspicious_terms) and self.parsed.scheme != 'https':
            self.threat_score += 35.0
            flags.append("UNENCRYPTED_CREDENTIAL_PATH")
            
        is_safe = self.threat_score < 30.0
        return {
            "url": self.url,
            "threat_score": self.threat_score,
            "status": "SAFE" if is_safe else "SUSPICIOUS_PHISHING_RISK",
            "flags": flags,
            "verified_at": datetime.utcnow().isoformat()
        }`
  }
};

/**
 * Open Project Modal with Rich Details
 */
function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');

  const techBadges = data.technologies.map(t => `<span class="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">${t}</span>`).join(' ');

  const architectureSteps = data.architecture.map(item => `
    <div class="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
      <div class="text-xs font-bold text-purple-300 font-mono">${item.step}</div>
      <div class="text-xs text-zinc-400 leading-relaxed">${item.desc}</div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="space-y-6">
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300">${data.category}</span>
          <span class="text-xs font-mono text-zinc-500">${data.timeline}</span>
        </div>
        <h3 id="modal-title" class="font-display text-2xl sm:text-3xl font-extrabold text-white">${data.title}</h3>
        <p class="text-sm text-purple-300 font-mono">${data.subtitle}</p>
      </div>

      <div class="relative rounded-2xl overflow-hidden border border-white/10 max-h-72">
        <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover" />
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">// Project Overview</h4>
        <p class="text-sm text-zinc-300 leading-relaxed">${data.overview}</p>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">// Tech Stack</h4>
        <div class="flex flex-wrap gap-2">${techBadges}</div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">// Architecture & Flow</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">${architectureSteps}</div>
      </div>

      <div class="space-y-3">
        <h4 class="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">// Implementation Snippet</h4>
        <pre class="p-4 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed"><code>${escapeHtml(data.codeSnippet)}</code></pre>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Close modal when pressing ESC or clicking outside
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('project-modal');
  if (e.target === modal) {
    closeProjectModal();
  }
});
