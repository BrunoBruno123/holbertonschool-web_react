import path from 'path';

const fileTransformer = {
    process(sourceText, sourcePath) {
        return {
            code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
        };
    },
};

export default fileTransformer;