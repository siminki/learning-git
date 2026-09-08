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
  if (kind === "branch") return svg(`<path class="branch-main" d="M42 120 H480"/><path class="branch-feature" d="M185 120 C245 120 236 52 306 52 H455"/><circle class="git-dot main-dot" cx="105" cy="120" r="10"/><circle class="git-dot main-dot" cx="185" cy="120" r="10"/><circle class="git-dot main-dot" cx="382" cy="120" r="10"/><circle class="git-dot feature-dot" cx="306" cy="52" r="10"/><circle class="git-dot feature-dot" cx="405" cy="52" r="10"/><text class="branch-label" x="450" y="56">feature/login</text><text class="branch-label" x="445" y="124">main</text>`);
  if (kind === "sync") return svg(`<g class="repo-box"><rect x="28" y="35" width="165" height="112" rx="7"/><path class="repo-bar" d="M28 58h165"/><text x="110" y="51" text-anchor="middle">local</text><path class="repo-history" d="M55 110h108"/><circle class="git-dot" cx="78" cy="110" r="8"/><circle class="git-dot" cx="112" cy="110" r="8"/><circle class="git-dot" cx="146" cy="110" r="8"/></g><g class="repo-box"><rect x="327" y="35" width="165" height="112" rx="7"/><path class="repo-bar" d="M327 58h165"/><text x="409" y="51" text-anchor="middle">origin</text><path class="repo-history" d="M354 110h108"/><circle class="git-dot" cx="377" cy="110" r="8"/><circle class="git-dot" cx="411" cy="110" r="8"/><circle class="git-dot" cx="445" cy="110" r="8"/></g><path class="sync-arrow" d="M170 82 C235 20 292 20 351 82"/><path class="sync-arrow" d="M351 137 C292 184 232 184 170 137"/><path class="arrow-head" d="M344 72l8 10-13 2M178 147l-8-10 13-2"/><circle class="transfer-dot" cx="170" cy="82" r="7"/>`);
  if (kind === "diff") return svg(`<rect class="node pop" x="80" y="35" width="150" height="120" rx="7"/><rect class="node pop" x="290" y="35" width="150" height="120" rx="7"/><path class="solid" d="M105 70h90M105 95h90M105 120h60M315 70h90M315 95h60"/><path class="solid warm changed" d="M315 120h90"/><text x="125" y="178">before</text><text x="340" y="178">after</text>`);
  if (kind === "merge") return svg(`${path("M55 120 H465")}<path class="solid draw" d="M150 120 C220 120 225 55 305 55 C365 55 370 120 430 120" fill="none"/>${dot(150,120)}${dot(305,55,"cool")}${dot(430,120,"accent")}<text x="280" y="35">branch</text><text x="407" y="155">merged</text>`);
  if (kind === "rebase") return svg(`${path("M55 130 H465")}${dot(100,130)}${dot(200,130)}${dot(300,130,"accent")}<circle class="cool rebase-dot" cx="175" cy="55" r="11"/><circle class="cool rebase-dot" cx="275" cy="55" r="11"/>${path("M175 55 H275")}<text x="135" y="30">your commits replay</text>`);
  if (kind === "conflict") return svg(`<path class="solid draw" d="M60 95 H220M300 95 H460"/><rect class="warm conflict" x="215" y="50" width="90" height="90" rx="8"/><text x="260" y="104" text-anchor="middle" style="font-size:28px">!</text>${dot(115,95,"cool")}${dot(405,95,"accent")}<text x="70" y="130">change A</text><text x="360" y="130">change B</text>`);
  if (kind === "pr") return svg(`<rect class="node pop" x="75" y="42" width="370" height="110" rx="10"/>${dot(115,78,"cool")}<path class="solid" d="M145 72h160M145 92h230"/><rect class="accent action" x="315" y="112" width="100" height="25" rx="12"/><text x="333" y="129">Merge PR</text>`);
  if (kind === "issue") return svg(`<rect class="node pop" x="110" y="38" width="300" height="120" rx="10"/>${dot(150,76,"warm")}<text x="150" y="81" text-anchor="middle">!</text><path class="solid" d="M185 68h175M185 92h135M140 125h220"/>${dot(386,135,"accent")}`);
  return svg(`<g class="file-sheet"><rect x="40" y="22" width="180" height="145" rx="6"/><path class="file-line" d="M58 54h138M58 73h116M58 92h130M58 111h142M58 130h120"/><path class="added-line" d="M58 92h130M58 111h142"/></g><path class="commit-arrow" d="M240 95 H328"/><path class="arrow-head" d="M318 86l10 9-10 9"/><circle class="commit-hash" cx="395" cy="95" r="19"/><text class="hash-label" x="395" y="99" text-anchor="middle">3f9c1</text><g class="commit-message"><rect x="338" y="132" width="155" height="38" rx="5"/><text x="348" y="148">feat(auth):</text><text x="348" y="161">add login redirect</text></g>`);
}

document.querySelector("#concept-grid").innerHTML = concepts.map(([name, description, tip, kind], i) => `
  <article class="concept-card" tabindex="0" data-kind="${kind}">
    <span class="card-number">${String(i + 1).padStart(2, "0")}</span>
    <h3>${name}</h3><p>${description}</p>${makeDiagram(kind)}
    <div class="card-footer"><div class="tip"><strong>Keep in mind</strong>${tip}</div><div class="card-actions">${kind === "sync" ? `<button class="direction" type="button" data-direction="push">PUSH</button><button class="direction" type="button" data-direction="pull">PULL</button>` : ""}<button class="replay" type="button" aria-label="Replay ${name} animation">REPLAY <span aria-hidden="true">↻</span></button></div></div>
  </article>`).join("");

function animate(card) {
  if (!window.gsap || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (card._timeline) card._timeline.kill();
  const tl = gsap.timeline();
  card._timeline = tl;
  tl.set(card.querySelectorAll(".draw"), {strokeDasharray:700, strokeDashoffset:700})
    .fromTo(card.querySelectorAll(".pop"), {scale:0, transformOrigin:"center"}, {scale:1, duration:.45, stagger:.08, ease:"back.out(1.8)"})
    .to(card.querySelectorAll(".draw"), {strokeDashoffset:0, duration:.9, stagger:.08, ease:"power2.out"}, 0);
  if (card.dataset.kind === "clone") tl.fromTo(card.querySelector(".mover"), {x:0}, {x:130, duration:1, ease:"power2.inOut"}, .2);
  if (card.dataset.kind === "branch") {
    tl.fromTo(card.querySelector(".branch-main"), {strokeDasharray:500, strokeDashoffset:500}, {strokeDashoffset:0, duration:.7}, 0)
      .fromTo(card.querySelector(".branch-feature"), {strokeDasharray:500, strokeDashoffset:500}, {strokeDashoffset:0, duration:.9, ease:"power2.inOut"}, .35)
      .fromTo(card.querySelectorAll(".feature-dot"), {scale:0, transformOrigin:"center"}, {scale:1, stagger:.18, duration:.35, ease:"back.out(2)"}, .75)
      .fromTo(card.querySelectorAll(".branch-label"), {opacity:0}, {opacity:1, duration:.3, stagger:.15}, 1);
  }
  if (card.dataset.kind === "commit") {
    tl.fromTo(card.querySelectorAll(".file-line"), {strokeDasharray:160, strokeDashoffset:160}, {strokeDashoffset:0, duration:.5, stagger:.07}, 0)
      .fromTo(card.querySelector(".commit-arrow"), {strokeDasharray:100, strokeDashoffset:100}, {strokeDashoffset:0, duration:.4}, .65)
      .fromTo(card.querySelector(".commit-hash"), {scale:0, transformOrigin:"center"}, {scale:1, duration:.45, ease:"back.out(2)"}, .85)
      .fromTo(card.querySelector(".commit-message"), {y:12, opacity:0}, {y:0, opacity:1, duration:.45}, 1.05);
  }
  if (card.dataset.kind === "sync") animateTransfer(card, "push");
  if (card.dataset.kind === "rebase") tl.fromTo(card.querySelectorAll(".rebase-dot"), {y:0}, {y:75, duration:.8, stagger:.15, ease:"power2.inOut"}, .2);
  if (card.querySelector(".changed")) tl.fromTo(card.querySelector(".changed"), {opacity:0}, {opacity:1, duration:.3, repeat:1, yoyo:true});
  if (card.querySelector(".conflict")) tl.to(card.querySelector(".conflict"), {rotation:5, duration:.12, repeat:5, yoyo:true, transformOrigin:"center"});
  if (card.querySelector(".action")) tl.fromTo(card.querySelector(".action"), {scale:.8, transformOrigin:"center"}, {scale:1, duration:.5, ease:"back.out(2)"});
}

document.querySelectorAll(".concept-card").forEach(card => {
  card.addEventListener("mouseenter", () => animate(card));
  card.addEventListener("focus", () => animate(card));
  card.querySelector(".replay").addEventListener("click", event => { event.stopPropagation(); animate(card); });
  card.querySelectorAll(".direction").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    animateTransfer(card, button.dataset.direction);
  }));
});

function animateTransfer(card, direction) {
  if (!window.gsap) return;
  const transferDot = card.querySelector(".transfer-dot");
  const route = direction === "push" ? [{x:0,y:0},{x:84,y:-53},{x:181,y:0}] : [{x:181,y:55},{x:90,y:102},{x:0,y:55}];
  gsap.killTweensOf(transferDot);
  gsap.set(transferDot, {x:route[0].x, y:route[0].y, opacity:1});
  gsap.to(transferDot, {keyframes:route.slice(1), duration:1.15, ease:"power1.inOut", onComplete:() => gsap.to(transferDot,{opacity:0,duration:.2})});
}

if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.from(".hero-content > *", {y:35, opacity:0, duration:.8, stagger:.1, ease:"power3.out"});
  gsap.to(".hero-orbit", {rotation:12, duration:10, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"center"});
}
