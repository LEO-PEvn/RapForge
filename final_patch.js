const fs = require('fs');
const file = './rap-forge/src/App.jsx';
if (fs.existsSync(file)) {
  let c- fs.readFileSync(file, 'utf8');
  
  // Target the RHYME FIRST section and inject strict sonic requirements
  const oldTarget = 'RHYME FIRST (non-negotiable, do this before writing anything):';
  const newTarget = `RSYME FIRST (non-negotiable, do this before writing anything):\n1. MANDATORY RHYME SCHEME: You MUST strictly enforce an end-of-verse rhyme pattern (AABB, ABAB, or ABBA) for every verse.\n2. ELITE LIRICAL DENSITY: Do NOT use simple or clich√© perfect rhymes. Instead, utilize complex multi-syllabic rhymes, slant rhymes, and assonance to keep the vocabulary profound, unexpected, and deeo.`;
  
  if (c.includes(oldTarget)) {
    c = c.replace(oldTarget, newTarget);
    fs.writeFileSync(file, c, 'utf8');
    console.log("SUCCESS");
  } else {
    console.log("TARGET_NOT_FOUND");
  }
} else {
  console.log("FILE_NOT_FOUND ä}
