const colorVarCss = `:root {
--color-main-1: hsl(180, 50%, 90%);
--color-main-2: hsl(180, 50%, 80%);
--color-main-3: hsl(180, 50%, 70%);
--color-main-4: hsl(180, 50%, 60%);
--color-main-5: hsl(180, 50%, 50%);
--color-main-6: hsl(180, 50%, 40%);
--color-main-7: hsl(180, 50%, 30%);
--color-main-8: hsl(180, 50%, 20%);
--color-main-9: hsl(180, 50%, 10%);
--color-error-1: hsl(345, 95%, 90%);
--color-error-2: hsl(345, 95%, 80%);
--color-error-3: hsl(345, 95%, 70%);
--color-error-4: hsl(345, 95%, 60%);
--color-error-5: hsl(345, 95%, 50%);
--color-error-6: hsl(345, 95%, 40%);
--color-error-7: hsl(345, 95%, 30%);
--color-error-8: hsl(345, 95%, 20%);
--color-error-9: hsl(345, 95%, 10%);
--color-warning-1: hsl(64, 95%, 90%);
--color-warning-2: hsl(64, 95%, 80%);
--color-warning-3: hsl(64, 95%, 70%);
--color-warning-4: hsl(64, 95%, 60%);
--color-warning-5: hsl(64, 95%, 50%);
--color-warning-6: hsl(64, 95%, 40%);
--color-warning-7: hsl(64, 95%, 30%);
--color-warning-8: hsl(64, 95%, 20%);
--color-warning-9: hsl(64, 95%, 10%);
--color-success-1: hsl(125, 95%, 90%);
--color-success-2: hsl(125, 95%, 80%);
--color-success-3: hsl(125, 95%, 70%);
--color-success-4: hsl(125, 95%, 60%);
--color-success-5: hsl(125, 95%, 50%);
--color-success-6: hsl(125, 95%, 40%);
--color-success-7: hsl(125, 95%, 30%);
--color-success-8: hsl(125, 95%, 20%);
--color-success-9: hsl(125, 95%, 10%);
--color-light-0: hsl(0, 0%, 100%);
--color-light-1: hsl(0, 0%, 95%);
--color-light-2: hsl(0, 0%, 90%);
--color-light-3: hsl(0, 0%, 85%);
--color-light-4: hsl(0, 0%, 80%);
--color-light-5: hsl(0, 0%, 75%);
--color-light-6: hsl(0, 0%, 70%);
--color-light-7: hsl(0, 0%, 65%);
--color-light-8: hsl(0, 0%, 60%);
--color-light-9: hsl(0, 0%, 55%);
--color-dark-1: hsl(0, 0%, 45%);
--color-dark-2: hsl(0, 0%, 40%);
--color-dark-3: hsl(0, 0%, 35%);
--color-dark-4: hsl(0, 0%, 30%);
--color-dark-5: hsl(0, 0%, 25%);
--color-dark-6: hsl(0, 0%, 20%);
--color-dark-7: hsl(0, 0%, 15%);
--color-dark-8: hsl(0, 0%, 10%);
--color-dark-9: hsl(0, 0%, 5%);
--color-dark-10: hsl(0, 0%, 0%);
}
`;

const colorCss = `.color-back-main-1,
.color-back-info-1 {
    background-color: var(--color-main-1) !important;
}
.color-back-main-2,
.color-back-info-2 {
    background-color: var(--color-main-2) !important;
}
.color-back-main-3,
.color-back-info-3 {
    background-color: var(--color-main-3) !important;
}
.color-back-main-4,
.color-back-info-4 {
    background-color: var(--color-main-4) !important;
}
.color-back-main,
.color-back-main-5,
.color-back-info-5 {
    background-color: var(--color-main-5) !important;
}
.color-back-main-6,
.color-back-info-6 {
    background-color: var(--color-main-6) !important;
}
.color-back-main-7,
.color-back-info-7 {
    background-color: var(--color-main-7) !important;
}
.color-back-main-8,
.color-back-info-8 {
    background-color: var(--color-main-8) !important;
}
.color-back-main-9,
.color-back-info-9 {
    background-color: var(--color-main-9) !important;
}
.color-back-error-1 {
    background-color: var(--color-error-1) !important;
}
.color-back-error-2 {
    background-color: var(--color-error-2) !important;
}
.color-back-error-3 {
    background-color: var(--color-error-3) !important;
}
.color-back-error-4 {
    background-color: var(--color-error-4) !important;
}
.color-back-error-5 {
    background-color: var(--color-error-5) !important;
}
.color-back-error-6 {
    background-color: var(--color-error-6) !important;
}
.color-back-error-7 {
    background-color: var(--color-error-7) !important;
}
.color-back-error-8 {
    background-color: var(--color-error-8) !important;
}
.color-back-warning-1 {
    background-color: var(--color-warning-1) !important;
}
.color-back-warning-2 {
    background-color: var(--color-warning-2) !important;
}
.color-back-warning-3 {
    background-color: var(--color-warning-3) !important;
}
.color-back-warning-4 {
    background-color: var(--color-warning-4) !important;
}
.color-back-warning-5 {
    background-color: var(--color-warning-5) !important;
}
.color-back-warning-6 {
    background-color: var(--color-warning-6) !important;
}
.color-back-warning-7 {
    background-color: var(--color-warning-7) !important;
}
.color-back-warning-8 {
    background-color: var(--color-warning-8) !important;
}
.color-back-success-1 {
    background-color: var(--color-success-1) !important;
}
.color-back-success-2 {
    background-color: var(--color-success-2) !important;
}
.color-back-success-3 {
    background-color: var(--color-success-3) !important;
}
.color-back-success-4 {
    background-color: var(--color-success-4) !important;
}
.color-back-success-5 {
    background-color: var(--color-success-5) !important;
}
.color-back-success-6 {
    background-color: var(--color-success-6) !important;
}
.color-back-success-7 {
    background-color: var(--color-success-7) !important;
}
.color-back-success-8 {
    background-color: var(--color-success-8) !important;
}
.color-back-light-1 {
    background-color: var(--color-light-1) !important;
    color: black;
}
.color-back-light-2 {
    background-color: var(--color-light-2) !important;
    color: black;
}
.color-back-light-3 {
    background-color: var(--color-light-3) !important;
    color: black;
}
.color-back-light-4 {
    background-color: var(--color-light-4) !important;
    color: black;
}
.color-back-light-5 {
    background-color: var(--color-light-5) !important;
    color: black;
}
.color-back-light-6 {
    background-color: var(--color-light-6) !important;
    color: black;
}
.color-back-light-7 {
    background-color: var(--color-light-7) !important;
    color: black;
}
.color-back-light-8 {
    background-color: var(--color-light-8) !important;
    color: black;
}
.color-back-light-9 {
    background-color: var(--color-light-9) !important;
    color: black;
}
.color-back-dark-2 {
    background-color: var(--color-dark-2) !important;
    color: white;
}
.color-back-dark-3 {
    background-color: var(--color-dark-3) !important;
    color: white;
}
.color-back-dark-4 {
    background-color: var(--color-dark-4) !important;
    color: white;
}
.color-back-dark-5 {
    background-color: var(--color-dark-5) !important;
    color: white;
}
.color-back-dark-6 {
    background-color: var(--color-dark-6) !important;
    color: white;
}
.color-back-dark-7 {
    background-color: var(--color-dark-7) !important;
    color: white;
}
.color-back-dark-8 {
    background-color: var(--color-dark-8) !important;
    color: white;
}
.color-back-dark-9 {
    background-color: var(--color-dark-9) !important;
    color: white;
}
.color-back-dark-10 {
    background-color: var(--color-dark-10) !important;
    color: white;
}
`;

function siteCss(cssFileUrls) {
    let file = ``;
    if (!Array.isArray(cssFileUrls)) {
        return false;
    }
    file += `@import url('color.var.css');\n`;
    file += `@import url('color.css');\n`;
    for (let i = 0; i < cssFileUrls.length; i++) {
        if (cssFileUrls[i] === 'color.var.css' || cssFileUrls[i] === 'color.css') {
            continue;
        }
        file += `@import url('${cssFileUrls[i]}');\n`;
    }
    return file;
}

export {
    colorVarCss,
    colorCss,
    siteCss
}
