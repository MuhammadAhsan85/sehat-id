const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('C:/projects/sehat-id/src/app');

console.log("Checking File Naming Conventions...");
files.forEach(f => {
    const fNormalized = f.replace(/\\/g, '/');
    const isComponent = fNormalized.includes('/components/');
    if (f.endsWith('.tsx') && !f.endsWith('page.tsx') && !f.endsWith('layout.tsx') && !f.endsWith('error.tsx') && !f.endsWith('loading.tsx') && !f.endsWith('not-found.tsx') && !f.endsWith('LocationPickerDemo.tsx') && !isComponent) {
        console.log("Suspicious file directly inside route folder:", f);
    }
});

console.log("\nChecking for Missing 'use client', Default Exports, and Children Props...");
files.forEach(f => {
    if (!f.endsWith('.tsx')) return;
    const content = fs.readFileSync(f, 'utf8');

    if ((f.endsWith('page.tsx') || f.endsWith('layout.tsx')) && !content.includes('export default')) {
        console.log("Missing default export in:", f);
    }

    const hasHooks = /(useRouter|useState|useEffect|useForm|usePathname)/.test(content);
    if (hasHooks && !content.includes('"use client"') && !content.includes("'use client'")) {
        console.log("Client hooks used but 'use client' missing in:", f);
    }

    if (f.endsWith('layout.tsx') && !content.includes('children')) {
        console.log("Missing children prop in layout:", f);
    }
});
