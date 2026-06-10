// ----------------------------------------------------
// Global State & Fallback Data
// ----------------------------------------------------
let recipients = [];
let templates = {};

const fallbackRecipients = [
  { "name": "Josh Crisp", "email": "joshcrisp@gaston.k12.nc.us", "role": "Chairman", "area": "Dallas Township" },
  { "name": "Dot Cherry", "email": "dotcherry@gaston.k12.nc.us", "role": "Vice Chairman", "area": "At-Large Member" },
  { "name": "Lee Dedmon", "email": "leededmon@gaston.k12.nc.us", "role": "Board Member", "area": "Gastonia Township" },
  { "name": "Tod Kinlaw", "email": "todkinlaw@gaston.k12.nc.us", "role": "Board Member", "area": "South Point Township" },
  { "name": "Robbie Lovelace", "email": "robbielovelace@gaston.k12.nc.us", "role": "Board Member", "area": "Cherryville Township" },
  { "name": "Brent Moore", "email": "brentmoore@gaston.k12.nc.us", "role": "Board Member", "area": "Crowders Mountain Township" },
  { "name": "Jeff Ramsey", "email": "jefframsey@gaston.k12.nc.us", "role": "Board Member", "area": "At-Large Member" },
  { "name": "Janna Smith", "email": "jannasmith@gaston.k12.nc.us", "role": "Board Member", "area": "Gastonia Township" },
  { "name": "A.M. Stephens III", "email": "amstephens@gaston.k12.nc.us", "role": "Board Member", "area": "Riverbend Township" },
  { "name": "Morgen A. Houchard", "email": "superintendent@gaston.k12.nc.us", "role": "Superintendent", "area": "Gaston County Schools" }
];

const fallbackTemplates = {
  subjectPrefixes: [
    "Urgent: Please vote to save",
    "Do not close",
    "Save our school - Keep",
    "A concerned resident's appeal:",
    "Please reconsider the closure of",
    "Protect Cherryville's future - Save",
    "Voting NO on closing",
    "An urgent appeal regarding",
    "Please vote against closing",
    "Reject the proposal to close"
  ],
  subjectSchools: [
    "W.B. Beam Intermediate School",
    "Beam Intermediate School",
    "W.B. Beam Intermediate",
    "our local Beam Intermediate",
    "W.B. Beam",
    "Beam School in Cherryville"
  ],
  subjectSuffixes: [
    "!",
    " - Think of our kids",
    " - A short-sighted decision",
    " - Keep Beam open!",
    " - Community appeal",
    " - Review the feasibility study",
    " - Focus on the kids"
  ],
  relationshipOpeners: {
    resident: [
      "As a resident of Cherryville and a deeply concerned citizen, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today as a Cherryville resident to express my strong opposition to the closing of W.B. Beam Intermediate.",
      "As a resident who cares deeply about public education in Gaston County, I urge you to vote 'NO' on the proposal to close Beam Intermediate."
    ],
    parent: [
      "As a parent of children in the Gaston County school system, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today as a parent who is deeply concerned about my children's educational future to oppose the closing of W.B. Beam Intermediate.",
      "As a local parent, I urge you to vote against the closure of Beam Intermediate. Our kids deserve stability, quality education, and safe learning environments."
    ],
    citizen: [
      "As a concerned citizen of Gaston County, I am writing to urge you to vote against the proposed closure of W.B. Beam Intermediate School.",
      "I am writing to you today to express my opposition to the closing of W.B. Beam Intermediate. This decision will hurt the entire Cherryville community.",
      "Please protect the strength of our public school system by voting against the closure of W.B. Beam Intermediate School."
    ]
  },
  financialsPart1: [
    "The board's projected savings of $288,342 from closing Beam Intermediate are highly suspect and mathematically overstated.",
    "The independent community feasibility study reveals that the district's estimated $288,342 savings are deeply flawed.",
    "Many residents are questioning the district's claim that closing Beam will save $288,342.",
    "We must look closely at the district's financial math, which claims $288,342 in savings from this closure.",
    "The argument that closing Beam Intermediate will save Gaston County $288,342 simply does not hold up under scrutiny.",
    "Looking at the district's budget, the projected $288,342 in cost savings from closing Beam is incredibly misleading.",
    "The Gaston County school board's projected cost savings of $288,342 from shutting down W.B. Beam Intermediate are highly questionable."
  ],
  financialsPart2: [
    "Once you account for student-tied Title 1 funds, shared teachers, and grant-funded SROs transferring with the children, the true net savings fall to a meager $90,000 to $160,000.",
    "In reality, when you track the Title 1 resources, shared personnel, and SRO funding that must follow the students to other campuses, the actual savings drop to between $89,904 and $161,971.",
    "The community feasibility analysis shows that true savings are only $89,904 to $161,971, since major expenses like SROs and Title 1 support staff will just be shifted to other schools.",
    "A detailed community audit shows the true net savings are actually between $90,000 and $162,000, as the student-tied resources and shared staff budgets will transfer directly with the kids.",
    "Accounting for the transfer of Title 1 funding, shared teachers, and SRO grant resources reveals that the county will only save a fraction of the projected amount—somewhere between $89,904 and $161,971.",
    "When factoring in student-linked Title 1 funds, specialized teacher allocations, and SRO grants that move with the students, the net savings dwindle to just $90,000 to $160,000.",
    "When we look closely at the budget, the student-specific funding, staff salaries, and security resources that transfer with the children will shrink the actual savings to a fraction of that estimate ($90k - $160k)."
  ],
  financialsPart3: [
    "Furthermore, public records show Gaston County Schools does not even track individual budgets per school. Voting to close a school without knowing its baseline operating cost is fiscally irresponsible.",
    "More concerning is the revelation from public records that the district doesn't maintain per-school operating budgets. It is impossible to make an informed, responsible vote to close a school without baseline spending data.",
    "Recent public records requests reveal that Gaston County Schools doesn't maintain per-school baseline budgets. How can the board responsibly vote on a closure when they lack individual campus spending data?",
    "To make matters worse, records requests show that the district does not track baseline budgets for individual schools. The board cannot claim to make a sound financial decision when it lacks per-school spending tracking.",
    "Additionally, public records confirm that Gaston County Schools does not maintain per-school baseline budgets. It is a major governance failure to vote to close a specific school without knowing its baseline operating costs.",
    "On top of that, public records indicate the school system doesn't track school-level operational budgets, making a vote to close Beam fiscally blind.",
    "Additionally, public records verify that GCS does not track campus-specific budgets, rendering any claims of specific savings mathematically baseless."
  ],
  capacityPart1: [
    "We must also look at school capacity, as W.B. Beam Intermediate is currently operating at an efficient 87% utilization.",
    "Beam Intermediate is not underutilized, currently running at approximately 87% of its capacity.",
    "The physical capacity data from the district shows that Beam Intermediate operates comfortably at 87% utilization.",
    "Closing a school that is at 87% capacity makes no sense when the surrounding schools are already busy.",
    "Beam is an active, well-utilized school operating at 87% capacity today.",
    "With Beam Intermediate currently operating at a strong 87% capacity, it is clear the building is actively needed.",
    "W.B. Beam Intermediate is currently running at a very efficient utilization rate of 87%."
  ],
  capacityPart2: [
    "Voting to close Beam will immediately push Cherryville Elementary to a crushing 97% capacity at best.",
    "If Beam is closed, Cherryville Elementary will be forced to absorb these students, spiking its utilization to 97%.",
    "The sudden influx of students would immediately push Cherryville Elementary to 97% capacity, crowding out our youngest learners.",
    "This closure would force Cherryville Elementary to operate at 97% capacity, straining every classroom and resource.",
    "Our community elementary school will see its capacity utilization soar to 97% if it has to absorb Beam's student body.",
    "Reassigning Beam's students will immediately overload Cherryville Elementary, driving its capacity to a near-maximum 97%.",
    "If Beam is closed, Cherryville Elementary will have to absorb its student population, forcing it to run at a staggering 97% capacity."
  ],
  capacityPart3: [
    "Overcrowded classrooms degrade the learning environment and stretch our teachers to their limits.",
    "Forcing our children into overcrowded classrooms will hurt educational outcomes and increase teacher burnout.",
    "Packing our elementary schools to 97% capacity will degrade safety, class sizes, and individual student attention.",
    "Our children deserve space to learn, not packed classrooms that make it harder for teachers to educate.",
    "Such high utilization rates will inevitably lead to overcrowded classrooms and a decline in student engagement.",
    "Operating at near-maximum capacity hurts class sizes, limits individualized instruction, and strains school facilities.",
    "This level of overcrowding will inevitably diminish individual student attention and place an unfair burden on our teachers."
  ],
  growthPart1: [
    "This closure is particularly short-sighted because Cherryville is entering a period of significant residential growth.",
    "Closing a school now ignores the fact that Cherryville is experiencing rapid new home construction.",
    "The district's long-term plan fails to account for the major residential growth currently taking place in Cherryville.",
    "We are seeing significant new residential housing developments being built right here in Cherryville.",
    "The population of Cherryville is growing, with multiple residential developments actively expanding.",
    "Shutting down Beam completely ignores the major housing and population growth currently transforming Cherryville.",
    "We are seeing a major wave of residential expansion and new construction in Cherryville right now."
  ],
  growthPart2: [
    "With hundreds of new housing units already approved, school enrollment will rise steadily over the next decade.",
    "Hundreds of new residential units are currently in development, which will bring an influx of new families to the area.",
    "Approved plans show hundreds of new homes in the pipeline, which will drive significant school-age enrollment.",
    "There are hundreds of new homes being added to our community, which will directly translate to higher student enrollment.",
    "The hundreds of new housing starts in the pipeline mean our school system must prepare for more students, not fewer.",
    "Given that hundreds of new homes are already approved and under construction, student enrollment is set to climb significantly.",
    "With hundreds of new homes already approved by local planners, student enrollment is guaranteed to spike in the coming years."
  ],
  growthPart3: [
    "Closing Beam now is a short-sighted mistake that will leave our district unprepared and force us to build new facilities later.",
    "It is counterproductive to close schools when enrollment is set to rise, creating a capacity crisis in the near future.",
    "Shutting down active classrooms now will only force the county to spend more on building new capacity in a few years.",
    "The board is making a short-sighted decision that ignores the 3-to-10-year growth projections for our community.",
    "Failing to plan for this imminent growth will create an avoidable overcrowding crisis and cost taxpayers more in the long run.",
    "Reducing school capacity now is a backward-looking policy that will force Gaston County to build expensive new facilities later.",
    "Closing a viable school facility in the face of this growth is incredibly short-sighted and will lead to an expensive crowding crisis."
  ],
  educationalPart1: [
    "Additionally, moving fifth graders to John Chavis Middle School is a major developmental mistake.",
    "We must also consider the developmental risks of reassigning fifth graders to a middle school setting.",
    "Placing fifth-grade children in John Chavis Middle School is developmentally inappropriate for their age group.",
    "Forcing 10-year-olds into an environment with much older middle school students presents serious safety and developmental risks.",
    "Reassigning fifth-grade students to a middle school campus is a disservice to their age-specific needs.",
    "Exposing fifth-grade children to a middle school environment at Chavis is developmentally counterproductive.",
    "Reassigning fifth graders to John Chavis Middle School is developmentally inappropriate for children of that age."
  ],
  educationalPart2: [
    "Fifth graders thrive in elementary environments, and moving them will strip them of essential upper-elementary identity programs.",
    "This transition will eliminate their access to vital programs like Battle of the Books, Math Masters, and Robotics.",
    "By removing them from an intermediate setting, they will lose access to specialized programs like Robotics and Math Masters.",
    "These students will lose the nurturing intermediate structure that hosts vital activities like Battle of the Books and Math Masters.",
    "A middle school transition threatens the very survival of intermediate programs like Robotics, Math Masters, and Battle of the Books.",
    "These young learners will lose their intermediate identity and the targeted academic programs like Robotics and Math Masters that support them.",
    "This move will deny them access to specialized intermediate-level activities like robotics and the Battle of the Books."
  ],
  educationalPart3: [
    "These identity programs are critical for their academic engagement and self-esteem.",
    "We must protect these specialized programs that prepare our children for future academic success.",
    "We cannot afford to strip away these enrichment opportunities from Cherryville's children.",
    "Please do not deny our students these vital upper-elementary programs that keep them excited about learning.",
    "These educational and extra-curricular programs are crucial for the development of our young students.",
    "Losing these enrichment programs will negatively impact student engagement and academic readiness.",
    "These enrichment programs are vital for maintaining student motivation and ensuring academic growth."
  ],
  closings: [
    "Please listen to the parents, teachers, and taxpayers of Cherryville. I urge you to vote 'NO' on the proposal to close W.B. Beam Intermediate.",
    "I ask you to stand with our community and protect our schools. Please vote to keep Beam Intermediate open.",
    "Thank you for your time and for your dedication to Gaston County's students. I trust you will make the right decision and vote against this closure.",
    "Please review the independent community feasibility study details and vote to reject the closure of W.B. Beam Intermediate. Our community is counting on you.",
    "Our children's future depends on your decision. Please reject this short-sighted proposal and vote to preserve Beam Intermediate.",
    "For the sake of our students, teachers, and Cherryville's future, please vote against the closure of Beam Intermediate School at the upcoming meeting."
  ],
  signoffs: [
    "Sincerely,",
    "Best regards,",
    "Respectfully,",
    "A concerned Gaston County resident,"
  ]
};

// ----------------------------------------------------
// Helper Utilities
// ----------------------------------------------------
function getRandomElement(arr) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ----------------------------------------------------
// Dynamic Recipient Rendering
// ----------------------------------------------------
function renderRecipients() {
  const container = document.getElementById('board-members-list');
  if (!container) return;
  container.innerHTML = '';

  recipients.forEach(member => {
    const div = document.createElement('div');
    div.className = 'board-member-card';

    const area = member.area || member.township || "";
    let roleText = member.role || "Board Member";
    if (roleText === 'Member') {
      roleText = 'Board Member';
    }

    div.innerHTML = `
      <div class="member-info">
        <span class="member-name">${member.name}</span>
        <span class="member-role">${roleText}</span>
        <span class="member-township">${area}</span>
      </div>
      <a class="member-email" href="mailto:${member.email}" title="Email ${member.name} individually">${member.email}</a>
    `;
    container.appendChild(div);
  });
}

// ----------------------------------------------------
// Dynamic On-The-Fly Argument Generator
// ----------------------------------------------------
function getArgumentParagraph(category) {
  const p1 = getRandomElement(templates[`${category}Part1`]);
  const p2 = getRandomElement(templates[`${category}Part2`]);
  const p3 = getRandomElement(templates[`${category}Part3`]);

  if (!p1 && !p2 && !p3) return "";
  return `${p1} ${p2} ${p3}`.trim();
}

// ----------------------------------------------------
// Main Email Generator Engine
// ----------------------------------------------------
function generateEmail() {
  const nameInput = document.getElementById('user-name');
  const nameVal = nameInput ? nameInput.value.trim() : "";

  // 1. Generate Subject line
  const prefix = getRandomElement(templates.subjectPrefixes);
  const school = getRandomElement(templates.subjectSchools);
  const suffix = getRandomElement(templates.subjectSuffixes);
  const subject = `${prefix} ${school}${suffix}`;

  // 2. Generate Body
  const salutation = "Dear Gaston County School Board Members and Superintendent Houchard,";

  // Gather openers from resident, parent, citizen pools
  let allOpeners = [];
  if (templates.relationshipOpeners) {
    allOpeners = [
      ...(templates.relationshipOpeners.resident || []),
      ...(templates.relationshipOpeners.parent || []),
      ...(templates.relationshipOpeners.citizen || [])
    ];
  }

  // Fallback check if opener list is empty
  const opener = allOpeners.length > 0 ? getRandomElement(allOpeners) : "I am writing to express my concern regarding W.B. Beam Intermediate School.";

  // Select exactly 3 random key arguments dynamically behind the scenes
  const argKeys = ['financials', 'capacity', 'growth', 'educational'];
  const shuffledKeys = shuffleArray(argKeys);
  const keysToUse = shuffledKeys.slice(0, 3);

  const selectedArgs = keysToUse.map(key => getArgumentParagraph(key)).filter(para => para !== "");

  const bodyParagraphs = selectedArgs.join("\n\n");
  const closing = getRandomElement(templates.closings);

  // Generate signature
  let signature = "";
  if (nameVal) {
    signature = `Respectfully,\n${nameVal}`;
  } else {
    const defaultSignoff = getRandomElement(templates.signoffs);
    signature = `${defaultSignoff}`;
  }

  const body = `${salutation}\n\n${opener}\n\n${bodyParagraphs}\n\n${closing}\n\n${signature}`;

  // Update UI preview elements if they exist
  const previewSubject = document.getElementById('preview-subject');
  const previewBody = document.getElementById('preview-body');

  if (previewSubject) previewSubject.value = subject;
  if (previewBody) previewBody.value = body;

  // Sync mailto links and buttons
  updateMailtoLink(subject, body);
}

// Update mailto URL builder
function updateMailtoLink(subject, body) {
  const toEmails = recipients.map(r => r.email).join(',');
  const mailtoUrl = `mailto:${toEmails}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&bcc=zshuford@gmail.com`;

  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.href = mailtoUrl;
  }
}

// Copy to clipboard utility
function copyToClipboard() {
  const previewSubject = document.getElementById('preview-subject');
  const previewBody = document.getElementById('preview-body');

  const subject = previewSubject ? previewSubject.value : "";
  const body = previewBody ? previewBody.value : "";
  const fullText = `Subject: ${subject}\n\n${body}`;

  const copyBtn = document.getElementById('copy-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-icon');

  navigator.clipboard.writeText(fullText).then(() => {
    if (copyBtn) copyBtn.className = "btn btn-success";
    if (copyBtnText) copyBtnText.innerText = "Copied!";
    if (copyIcon) copyIcon.innerHTML = `<path d="M20 6L9 17l-5-5" stroke-width="3"/>`; // Checkmark icon

    setTimeout(() => {
      if (copyBtn) copyBtn.className = "btn btn-secondary";
      if (copyBtnText) copyBtnText.innerText = "Copy Text";
      if (copyIcon) copyIcon.innerHTML = `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Setup Event Listeners and Initializers
function setupListeners() {
  const userNameInput = document.getElementById('user-name');
  if (userNameInput) {
    userNameInput.addEventListener('input', generateEmail);
  }

  const previewSubject = document.getElementById('preview-subject');
  if (previewSubject) {
    previewSubject.addEventListener('input', (e) => {
      const previewBody = document.getElementById('preview-body');
      updateMailtoLink(e.target.value, previewBody ? previewBody.value : "");
    });
  }

  const previewBody = document.getElementById('preview-body');
  if (previewBody) {
    previewBody.addEventListener('input', (e) => {
      const previewSubject = document.getElementById('preview-subject');
      updateMailtoLink(previewSubject ? previewSubject.value : "", e.target.value);
    });
  }
}

// ----------------------------------------------------
// Initialization & Data Loading
// ----------------------------------------------------
async function loadData() {
  // 1. Fetch Recipients
  try {
    const response = await fetch('recepients.json');
    if (response.ok) {
      recipients = await response.json();
    } else {
      recipients = fallbackRecipients;
    }
  } catch (e) {
    console.warn("Could not fetch recepients.json (likely due to CORS offline), using fallback data", e);
    recipients = fallbackRecipients;
  }

  // 2. Fetch Templates
  try {
    const response = await fetch('templates.json');
    if (response.ok) {
      templates = await response.json();
    } else {
      templates = fallbackTemplates;
    }
  } catch (e) {
    console.warn("Could not fetch templates.json (likely due to CORS offline), using fallback data", e);
    templates = fallbackTemplates;
  }

  renderRecipients();
  setupListeners();
  generateEmail();
}

// Fire on DOMContentLoaded
window.addEventListener('DOMContentLoaded', loadData);
