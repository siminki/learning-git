const concepts = [
  ["Repository", "The project folder Git watches. It contains your files plus a hidden history of every saved version.", "Keep one focused project in each repository.", "repo"],
  ["Clone", "Download a complete working copy of a repository from GitHub to your own machine.", "Clone once; pull later to receive new changes.", "clone"],
  ["Branch", "A safe parallel timeline where you can experiment without disturbing the main version.", "Give branches short, descriptive names.", "branch"],
  ["Commit", "A named snapshot of your changes—a dependable point you can inspect or return to later.", "Commit one logical change at a time.", "commit"],
  ["Push / Pull", "Push uploads your commits to GitHub. Pull brings other people’s commits down to you.", "Pull before you begin; push when your work is ready to share.", "sync"],
  ["Diff", "A precise view of what was added, removed, or changed between two versions of a file.", "Always scan the diff before committing.", "diff"],
  ["Merge", "Combine the work from one branch back into another branch, usually into main.", "Test the branch before merging it.", "merge"],
  ["Rebase", "Replay your commits on top of the latest main branch to create a cleaner, linear history.", "Avoid rebasing commits other people already use.", "rebase"],
  ["Merge conflict", "Git found competing edits on the same lines and needs a human to choose the right result.", "Read both versions, resolve carefully, then test.", "conflict"],
  ["Pull Request", "A proposal on GitHub asking collaborators to review, discuss, and merge your branch.", "Explain what changed, why, and how it was tested.", "pr"],
  ["Issue", "A trackable ticket for a bug, feature, question, or task that the project needs to address.", "Describe the outcome and include enough context to reproduce it.", "issue"]
];

const svg = inner => `<svg class="diagram" viewBox="0 0 520 190" role="img" aria-label="Animated concept diagram">${inner}</svg>`;
const path = d => `<path class="track draw" d="${d}" fill="none"/>`;
const dot = (x, y, type = "node") => `<circle class="${type} pop" cx="${x}" cy="${y}" r="12"/>`;

function makeDiagram(kind) {
  if (kind === "repo") return svg(`<rect class="accent pop" x="120" y="42" width="280" height="110" rx="10"/><path class="solid" d="M150 78h115M150 100h220M150 122h175"/><text x="135" y="28">project-folder/</text>`);
  if (kind === "clone") return svg(`<rect class="cool pop" x="45" y="55" width="120" height="90" rx="8"/><rect class="accent pop" x="355" y="55" width="120" height="90" rx="8"/>${path("M175 100 H345")}<circle class="warm mover" cx="195" cy="100" r="11"/><text x="64" y="105">GitHub</text><text x="380" y="105">local</text>`);
  if (kind === "branch") return svg(`${path("M50 110 H470")}<path class="solid draw" d="M190 110 C250 110 250 45 320 45 H460" fill="none"/>${dot(190,110,"accent")}${dot(320,45,"cool")}${dot(460,45,"cool")}${dot(460,110)}<text x="390" y="28">feature</text><text x="425" y="140">main</text>`);
  if (kind === "sync") return svg(`<rect class="cool pop" x="50" y="55" width="115" height="90" rx="8"/><rect class="accent pop" x="355" y="55" width="115" height="90" rx="8"/><path class="solid draw" d="M180 80 H340"/><path class="solid draw" d="M340 120 H180"/><text x="220" y="68">push →</text><text x="220" y="145">← pull</text>`);
  if (kind === "diff") return svg(`<rect class="node pop" x="80" y="35" width="150" height="120" rx="7"/><rect class="node pop" x="290" y="35" width="150" height="120" rx="7"/><path class="solid" d="M105 70h90M105 95h90M105 120h60M315 70h90M315 95h60"/><path class="solid warm changed" d="M315 120h90"/><text x="125" y="178">before</text><text x="340" y="178">after</text>`);
  if (kind === "merge") return svg(`${path("M55 120 H465")}<path class="solid draw" d="M150 120 C220 120 225 55 305 55 C365 55 370 120 430 120" fill="none"/>${dot(150,120)}${dot(305,55,"cool")}${dot(430,120,"accent")}<text x="280" y="35">branch</text><text x="407" y="155">merged</text>`);
  if (kind === "rebase") return svg(`${path("M55 130 H465")}${dot(100,130)}${dot(200,130)}${dot(300,130,"accent")}<circle class="cool rebase-dot" cx="175" cy="55" r="11"/><circle class="cool rebase-dot" cx="275" cy="55" r="11"/>${path("M175 55 H275")}<text x="135" y="30">your commits replay</text>`);
  if (kind === "conflict") return svg(`<path class="solid draw" d="M60 95 H220M300 95 H460"/><rect class="warm conflict" x="215" y="50" width="90" height="90" rx="8"/><text x="260" y="104" text-anchor="middle" style="font-size:28px">!</text>${dot(115,95,"cool")}${dot(405,95,"accent")}<text x="70" y="130">change A</text><text x="360" y="130">change B</text>`);
  if (kind === "pr") return svg(`<rect class="node pop" x="75" y="42" width="370" height="110" rx="10"/>${dot(115,78,"cool")}<path class="solid" d="M145 72h160M145 92h230"/><rect class="accent action" x="315" y="112" width="100" height="25" rx="12"/><text x="333" y="129">Merge PR</text>`);
  if (kind === "issue") return svg(`<rect class="node pop" x="110" y="38" width="300" height="120" rx="10"/>${dot(150,76,"warm")}<text x="150" y="81" text-anchor="middle">!</text><path class="solid" d="M185 68h175M185 92h135M140 125h220"/>${dot(386,135,"accent")}`);
  return svg(`${path("M50 100 H470")}${dot(90,100)}${dot(220,100)}${dot(350,100,"accent")}${dot(460,100)}<text x="318" y="65">snapshot</text>`);
}

document.querySelector("#concept-grid").innerHTML = concepts.map(([name, description, tip, kind], i) => `
  <article class="concept-card" tabindex="0" data-kind="${kind}">
    <span class="card-number">${String(i + 1).padStart(2, "0")}</span>
    <h3>${name}</h3><p>${description}</p>${makeDiagram(kind)}
    <div class="card-footer"><div class="tip"><strong>Keep in mind</strong>${tip}</div><button class="replay" type="button" aria-label="Replay ${name} animation">↻</button></div>
  </article>`).join("");

function animate(card) {
  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const tl = gsap.timeline();
  tl.set(card.querySelectorAll(".draw"), {strokeDasharray:700, strokeDashoffset:700})
    .fromTo(card.querySelectorAll(".pop"), {scale:0, transformOrigin:"center"}, {scale:1, duration:.45, stagger:.08, ease:"back.out(1.8)"})
    .to(card.querySelectorAll(".draw"), {strokeDashoffset:0, duration:.9, stagger:.08, ease:"power2.out"}, 0);
  if (card.dataset.kind === "clone") tl.fromTo(card.querySelector(".mover"), {x:0}, {x:130, duration:1, ease:"power2.inOut"}, .2);
  if (card.dataset.kind === "rebase") tl.fromTo(card.querySelectorAll(".rebase-dot"), {y:0}, {y:75, duration:.8, stagger:.15, ease:"power2.inOut"}, .2);
  if (card.querySelector(".changed")) tl.fromTo(card.querySelector(".changed"), {opacity:0}, {opacity:1, duration:.3, repeat:1, yoyo:true});
  if (card.querySelector(".conflict")) tl.to(card.querySelector(".conflict"), {rotation:5, duration:.12, repeat:5, yoyo:true, transformOrigin:"center"});
  if (card.querySelector(".action")) tl.fromTo(card.querySelector(".action"), {scale:.8, transformOrigin:"center"}, {scale:1, duration:.5, ease:"back.out(2)"});
}

document.querySelectorAll(".concept-card").forEach(card => {
  card.addEventListener("mouseenter", () => animate(card));
  card.addEventListener("focus", () => animate(card));
  card.querySelector(".replay").addEventListener("click", event => { event.stopPropagation(); animate(card); });
});

if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.from(".hero-content > *", {y:35, opacity:0, duration:.8, stagger:.1, ease:"power3.out"});
  gsap.to(".hero-orbit", {rotation:12, duration:10, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"center"});
}
