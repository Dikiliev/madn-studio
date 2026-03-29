const fs = require('fs');

const file = 'src/config/projects.ts';
let text = fs.readFileSync(file, 'utf8');

const prefix = "import { Project } from '../types';\n\nexport const PROJECTS: Project[] = [\n";
const suffix = "\n];\n";

// Remove prefix and suffix to get array body
let body = text.replace(prefix, '').replace(suffix, '');

// Split the array by identifying the boundary of each object
// We can use a regex that matches `  }, ` or `  }` for the last object
// A cleaner way is to parse the TS using simple text splitting. Each block starts with `  {\n    id: 'X'`
let blocks = [];
let currentLines = [];

for (const line of body.split('\n')) {
    if (line === '  },' || line === '  }') {
        currentLines.push('  }'); // ensure no trailing comma
        blocks.push(currentLines.join('\n'));
        currentLines = [];
    } else {
        currentLines.push(line);
    }
}
if (currentLines.length > 0 && currentLines.join('').trim().length > 0) {
    blocks.push(currentLines.join('\n'));
}

const idToBlock = {};
for (const b of blocks) {
    const match = b.match(/id:\s*'(\d+)'/);
    if (match) {
        idToBlock[match[1]] = b;
    }
}

// User requested order:
// Estech (4) -> 1
// Lexora (1) -> 4
// REM ECO TECH (13) -> 5
// REM Token (14) -> 6
// ... Dream Terminal(2), Xexarxo(3), Premier(5), Chesu(6), Slydex(8), Viral DNA(9), Psyfunnel(12)
// Most Random Number (7) -> 12
// Market Gen (10) -> 13
// MadN Studio (11) -> 14

const order = ['4', '2', '3', '1', '13', '14', '5', '6', '8', '9', '12', '7', '10', '11'];
const newBlocks = [];

for (const id of order) {
    if (idToBlock[id]) {
        newBlocks.push(idToBlock[id]);
    } else {
        console.error("Missing ID", id);
    }
}

const newBody = newBlocks.join(',\n');
const newText = prefix + newBody + suffix;

fs.writeFileSync(file, newText, 'utf8');
console.log("Successfully reordered projects.ts");
