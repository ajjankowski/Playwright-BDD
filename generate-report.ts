import { generate, Options } from 'cucumber-html-reporter';
import * as path from 'path';

const options: Options = {
  theme: 'bootstrap',
  jsonFile: path.join('./reports/cucumber_report.json'),
  output: path.join('./reports/cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Local",
    "Browser": "Chrome",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Local"
  }
};

try {
  generate(options);
  console.log('Report generated successfully.');
} catch (error) {
  console.error('Error generating report:', error);
}
