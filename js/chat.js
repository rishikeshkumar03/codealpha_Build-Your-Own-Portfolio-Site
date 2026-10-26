/**
 * RISHIKESH KUMAR PORTFOLIO — AI PERSONA CHATBOT MODULE
 * Interactive conversational portfolio assistant with contextual knowledge.
 */

// Comprehensive knowledge base for Rishikesh Kumar
const rishikeshKnowledge = {
  name: "Rishikesh Kumar",
  role: "B.E. Computer Science Engineering Student & Aspiring Software Developer",
  status: "Fresher / Available for Internships",
  location: "Chikkamagaluru, Karnataka, India",
  college: "Adichunchanagiri Institute of Technology (AIT)",
  batch: "2025–2029",
  email: "thesidharthray@gmail.com",
  skills: {
    core: ["Dev Oracle", "AutoCAD", "Cybersecurity", "Java", "Front-End Development", "Oracle Database", "Python", "C Programming"],
    languages: ["Java", "Python", "C Programming", "SQL", "HTML", "CSS", "JavaScript"],
    domains: ["Dev Oracle", "AutoCAD", "Cybersecurity", "Front-End Development", "Oracle Database"],
    tools: ["AutoCAD", "Oracle APEX", "Oracle Database", "Git", "GitHub"]
  },
  projects: [
    {
      title: "Smart Dustbin IoT System",
      tech: "Arduino UNO, ESP8266, HC-SR04 ultrasonic sensor, I2C LCD, C/C++",
      summary: "Detects real-time waste level, displays live capacity on an LCD screen, and transmits IoT telemetry over Wi-Fi."
    },
    {
      title: "Smart Mail Drop",
      tech: "HTML5, CSS3, JavaScript, Firebase Realtime Database, QR Code Engine",
      summary: "QR-based parcel dispatch and real-time package status synchronization system."
    },
    {
      title: "PHISHGUARD — Link Verification",
      tech: "Python, JavaScript, URL Analysis API, Heuristic Threat Scanners, SSL Validator",
      summary: "A working link-verification and phishing-analysis system that inspects URLs and identifies suspicious or unsafe links."
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');
  const typingIndicator = document.getElementById('typing-indicator');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const suggestionBtns = document.querySelectorAll('.chat-suggestion');

  if (!chatForm || !chatInput || !chatMessages) return;

  // Handle suggestion chips click
  suggestionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chatInput.value = btn.innerText.trim();
      chatForm.dispatchEvent(new Event('submit'));
    });
  });

  // Handle Clear Chat
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-7 h-7 rounded-full bg-purple-700/60 border border-purple-400/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
            AI
          </div>
          <div class="max-w-[80%] rounded-2xl rounded-tl-sm p-4 bg-white/[0.05] border border-white/10 text-zinc-200 leading-relaxed shadow-lg">
            Hi! I'm Rishikesh's AI portfolio assistant. Ask me anything about his projects, skills, education at AIT, or his ongoing journey in software engineering.
          </div>
        </div>
      `;
    });
  }

  // Handle message submission
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Append user message
    appendMessage(query, 'user');
    chatInput.value = '';
    chatInput.disabled = true;

    // Show typing indicator
    if (typingIndicator) typingIndicator.classList.remove('hidden');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate AI thinking and response generation
    // =========================================================================
    // TODO: Replace simulated response with OpenAI API integration.
    // Example:
    // const res = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message: query })
    // });
    // const data = await res.json();
    // const aiResponse = data.reply;
    // =========================================================================
    
    setTimeout(() => {
      const response = generateAIResponse(query);
      if (typingIndicator) typingIndicator.classList.add('hidden');
      appendMessage(response, 'ai');
      chatInput.disabled = false;
      chatInput.focus();
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
  });

  function appendMessage(text, sender) {
    const isUser = sender === 'user';
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;

    if (isUser) {
      messageDiv.innerHTML = `
        <div class="max-w-[80%] rounded-2xl rounded-tr-sm p-4 bg-purple-600/30 border border-purple-500/30 text-white leading-relaxed shadow-lg font-sans">
          ${escapeHtml(text)}
        </div>
        <div class="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold text-zinc-300 shrink-0 mt-0.5">
          YOU
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-purple-700/60 border border-purple-400/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
          AI
        </div>
        <div class="max-w-[80%] rounded-2xl rounded-tl-sm p-4 bg-white/[0.05] border border-white/10 text-zinc-200 leading-relaxed shadow-lg font-sans">
          ${text}
        </div>
      `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAIResponse(input) {
    const q = input.toLowerCase();

    if (q.includes('project') || q.includes('work') || q.includes('build') || q.includes('phishguard')) {
      return `Rishikesh has built several practical systems:
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li><strong class="text-white">PHISHGUARD — Link Verification:</strong> A working cybersecurity URL analysis project that analyzes link structures, detects suspicious patterns, and flags phishing risks.</li>
          <li><strong class="text-white">Smart Dustbin IoT System:</strong> Arduino UNO & ESP8266 ultrasonic fill-level tracking with real-time I2C LCD telemetry.</li>
          <li><strong class="text-white">Smart Mail Drop:</strong> QR-authenticated package tracking suite powered by Firebase cloud sync.</li>
        </ul>
        You can explore detailed architecture in the <a href="#projects" class="text-purple-300 underline">Projects section</a>!`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('java') || q.includes('kotlin') || q.includes('c++') || q.includes('python')) {
      return `Rishikesh's primary technologies include:
        <br/><strong class="text-white">Languages:</strong> Java, Kotlin, C++, Python, C, JavaScript, SQL, HTML/CSS.
        <br/><strong class="text-white">Domains:</strong> Backend Development, Android App Engineering, Cybersecurity, Data Structures & Algorithms, and Applied IoT.
        <br/>He is focused on clean code, strong OOP design, and low-level understanding.`;
    }

    if (q.includes('college') || q.includes('education') || q.includes('study') || q.includes('degree') || q.includes('ait')) {
      return `Rishikesh is currently pursuing his <strong>B.E. in Computer Science Engineering (2025–2029)</strong> at <strong>Adichunchanagiri Institute of Technology (AIT)</strong> in Chikkamagaluru, Karnataka, India.`;
    }

    if (q.includes('intern') || q.includes('hire') || q.includes('job') || q.includes('available') || q.includes('opportunity')) {
      return `Yes! Rishikesh is currently <strong>Available for Internships & Software Engineering Opportunities</strong>. He brings high curiosity, strong problem-solving skills, and a solid foundation in Java, Kotlin, and backend concepts. You can reach out directly via <a href="mailto:thesidharthray@gmail.com" class="text-purple-300 underline">thesidharthray@gmail.com</a> or use the <a href="#contact" class="text-purple-300 underline">Contact Form</a>.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('social') || q.includes('github') || q.includes('linkedin')) {
      return `You can connect with Rishikesh through:
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Email:</strong> <a href="mailto:thesidharthray@gmail.com" class="text-purple-300 underline">thesidharthray@gmail.com</a></li>
          <li><strong>GitHub:</strong> <a href="https://github.com/rishikeshkumar03" target="_blank" rel="noopener noreferrer" class="text-purple-300 underline">github.com/rishikeshkumar03</a></li>
          <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/rishikesh-kumar-a03b50397" target="_blank" rel="noopener noreferrer" class="text-purple-300 underline">linkedin.com/in/rishikesh-kumar</a></li>
          <li><strong>X / Twitter:</strong> <a href="https://x.com/sidhxrthray" target="_blank" rel="noopener noreferrer" class="text-purple-300 underline">@sidhxrthray</a></li>
        </ul>`;
    }

    if (q.includes('who are you') || q.includes('who is rishikesh') || q.includes('about')) {
      return `Rishikesh Kumar is a B.E. Computer Science Engineering student and aspiring software developer from Chikkamagaluru, Karnataka. He loves building software with curiosity, logic, and clean engineering.`;
    }

    return `That's an interesting question! Rishikesh is constantly learning and building in the areas of Java, Kotlin, Backend Development, Android, and IoT. Feel free to ask about his specific projects, tech stack, or academic background!`;
  }
});
