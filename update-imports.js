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
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('C:/projects/sehat-id/src');

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;

    // Replace default Link imports
    if (content.includes('import Link from "next/link"')) {
        content = content.replace(/import Link from "next\/link";?/g, 'import { Link } from "@/i18n/navigation";');
        changed = true;
    }
    if (content.includes("import Link from 'next/link'")) {
        content = content.replace(/import Link from 'next\/link';?/g, 'import { Link } from "@/i18n/navigation";');
        changed = true;
    }

    // Replace useRouter and usePathname 
    if (content.includes('import { useRouter } from "next/navigation"')) {
        content = content.replace(/import \{ useRouter \} from "next\/navigation";?/g, 'import { useRouter } from "@/i18n/navigation";');
        changed = true;
    }
    if (content.includes("import { useRouter } from 'next/navigation'")) {
        content = content.replace(/import \{ useRouter \} from 'next\/navigation';?/g, 'import { useRouter } from "@/i18n/navigation";');
        changed = true;
    }

    // Multiple navigation imports (e.g., usePathname, useRouter)
    if (content.includes('from "next/navigation"') || content.includes("from 'next/navigation'")) {
        // Find imports like: import { useParams, useRouter } from 'next/navigation';
        // and carefully split them. Let's do a simple regex for the most common ones we found earlier.

        // Handle: import { usePathname } from "next/navigation";
        content = content.replace(/import\s*\{\s*usePathname\s*\}\s*from\s*["']next\/navigation["'];?/g, 'import { usePathname } from "@/i18n/navigation";');

        // Handle: import { useParams, useRouter } from 'next/navigation';
        // In next-intl v3+, useParams is NOT from createNavigation, it's from next/navigation (or next-intl config). 
        // Next-intl expects standard next-navigation for useParams.
        // Let's manually replace `useRouter` if it's mixed with other things.
        const routingRegex = /import\s*\{\s*([^}]*)\s*\}\s*from\s*["']next\/navigation["'];?/g;
        content = content.replace(routingRegex, (match, p1) => {
            const imports = p1.split(',').map(s => s.trim());
            const retainedNextNavigation = [];
            const newIntlNavigation = [];

            imports.forEach(imp => {
                if (['useRouter', 'usePathname', 'redirect'].includes(imp)) {
                    newIntlNavigation.push(imp);
                } else {
                    retainedNextNavigation.push(imp);
                }
            });

            let replaced = '';
            if (retainedNextNavigation.length > 0) {
                replaced += `import { ${retainedNextNavigation.join(', ')} } from "next/navigation";\n`;
            }
            if (newIntlNavigation.length > 0) {
                replaced += `import { ${newIntlNavigation.join(', ')} } from "@/i18n/navigation";`;
            }

            return replaced || match;
        });

        changed = true;
    }

    if (changed && f !== path.normalize('C:/projects/sehat-id/src/i18n/navigation.ts')) {
        fs.writeFileSync(f, content);
        console.log('Updated:', f);
    }
});
