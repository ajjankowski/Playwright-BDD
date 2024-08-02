import fs from 'fs';
import path from 'path';

async function main() {
    const { default: markdownTable } = await import('markdown-table');

    function escapeMarkdown(text) {
        return text.replace(/([`*_[\]()~>#+\-=|{}.!])/g, '\\$1');
    }

    function formatSteps(steps) {
        return steps.map(step => {
            const status = step.result.status === 'passed' ? '✔️' : '❌';
            const stepName = escapeMarkdown(step.name).replace(/"(.*?)"/g, '`$1`');
            return `${status} ${step.keyword} ${stepName}  `;
        }).join('\n');
    }

    function formatScenario(scenario) {
        const title = `### ${escapeMarkdown(scenario.name)}`;
        const steps = formatSteps(scenario.steps);
        return `${title}\n\n${steps}\n\n`;
    }

    function convertJsonToMarkdown(jsonFilePath, mdFilePath) {
        const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

        let markdownContent = '';

        data.forEach(feature => {
            const featureTitle = `## ${escapeMarkdown(feature.name)}`;
            markdownContent += `${featureTitle}\n\n`;

            feature.elements.forEach(scenario => {
                if (scenario.type === 'scenario' || scenario.type === 'scenarioOutline') {
                    markdownContent += formatScenario(scenario);
                }
            });
        });

        fs.writeFileSync(mdFilePath, markdownContent);
        console.log(`Markdown file created at ${mdFilePath}`);
    }

    const jsonFilePath = path.join('reports', 'cucumber_report.json');
    const mdFilePath = path.join('reports', 'report.md');

    convertJsonToMarkdown(jsonFilePath, mdFilePath);
}

main().catch(err => {
    console.error('Error:', err);
});
