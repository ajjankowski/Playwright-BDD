const common = [
    'src/features/*.feature',
    '--require-module ts-node/register',
    '--require src/steps/*.steps.ts',
    '--format progress',
    '--format json:reports/cucumber_report.json'
  ].join(' ');
  
  module.exports = {
    default: common
  };
