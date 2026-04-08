Makes similar ones. Changes categories. % words. Specific theme.


1. Describe a super detailed scene in this world. Try to make it feel realistic. Like it actually happened.
2. Tell me first: To create a 16:9 image based on your description, here’s how I’d visualize and direct its layout for the frame.
3. Give each layout category a score of importance as a percentage of 100% for how important it is to make the overall image look best.

4. In the script in Section 2 (DEFINITIONS), rename all category variables to reflect those you used in point 2 to describe the image layout for the frame.
5. Give each category variable 10 variables similar to the layout description in point 2. Put them straight inside the script variables.
6. Specify best overall final length of the final prompt in words.
7. Give each category variable as many words from the whole as specified in point 3. Each category’s selected phrase to be approximately the allocated word count

8. New subject: 🚀 Spaceships & Spacecraft (drone ship allowed):
9. Select 20 categories from the new subject in point 8 and implement all 20 into the script as well. So each is used once. Select categories with same words in them only once. Count each one out loud after making the script to make sure there are 20 different ones in the script.
10. Add the image style to new subject. Like how the main subject and main image looks. Add that style, but to new subject. Make the script about new subjct only. That uses the style from the image.

11. Give me back whole script.

"(async () => {
// --- 1. CONFIGURATION ---
const TARGET_IMAGES = 25;
const MAX_WAIT_TIME_MS = 120000;

// --- 2. DEFINITIONS ---
const categories = {
    category1: [],
    category2: [],
    category3: [],
    category4: [],
    category5: [],
    category6: [],
    category7: [],
    category8: [],
    prompt_templates: [
        ""{category1}. {category2}. {category3}. {category4}. {category5}. {category6}. {category7}. {category8}."",
        ""Focusing on {category7}, the scene shows {category1} with {category2} and {category3} behind. Sky is {category4}. Rule: {category5}. Depth: {category6}. Mood: {category8}."",
        ""A visual of {category2} and {category3}. Foreground details: {category1}. Overhead: {category4}. Compositional style: {category5}. Depth cues: {category6}. Main point of interest: {category7}. Tone: {category8}.""
    ]
};

// --- 3. HELPER FUNCTIONS ---
function generatePrompt() {
    const template = categories.prompt_templates[Math.floor(Math.random() * categories.prompt_templates.length)];
    
    return template
        .replace(""{category1}"", categories.category1[Math.floor(Math.random() * categories.category1.length)])
        .replace(""{category2}"", categories.category2[Math.floor(Math.random() * categories.category2.length)])
        .replace(""{category3}"", categories.category3[Math.floor(Math.random() * categories.category3.length)])
        .replace(""{category4}"", categories.category4[Math.floor(Math.random() * categories.category4.length)])
        .replace(""{category5}"", categories.category5[Math.floor(Math.random() * categories.category5.length)])
        .replace(""{category6}"", categories.category6[Math.floor(Math.random() * categories.category6.length)])
        .replace(""{category7}"", categories.category7[Math.floor(Math.random() * categories.category7.length)])
        .replace(""{category8}"", categories.category8[Math.floor(Math.random() * categories.category8.length)]);
}

const wait = ms => new Promise(res => setTimeout(res, ms));

function getPromptInput() {
    const inputs = document.querySelectorAll('.paragraph-input');
    if (inputs.length >= 2) return inputs[1]; 
    if (inputs.length === 1) return inputs[0]; 
    return document.querySelector('textarea');
}

function saveSpecificImage(sourceWindow) {
    const iframes = document.querySelectorAll('iframe');
    for (const iframe of iframes) {
        if (iframe.contentWindow === sourceWindow) {
            const container = iframe.closest('.t2i-image-ctn');
            if (container) {
                const saveBtn = container.querySelector('.private-save-button');
                if (saveBtn) {
                    saveBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    saveBtn.click();
                    return true;
                }
            }
        }
    }
    return false;
}

async function waitForGenerationAndSave() {
    return new Promise((resolve) => {
        let resolved = false;
        const startTime = Date.now();
        const messageHandler = async (event) => {
            if (!resolved && event.data && event.data.type === ""finished"") {
                await wait(500); 
                const saved = saveSpecificImage(event.source);
                if (saved) cleanup(true);
            }
        };
        window.addEventListener(""message"", messageHandler);
        function cleanup(success) {
            if (resolved) return;
            resolved = true;
            window.removeEventListener(""message"", messageHandler);
            resolve(success);
        }
        const checkTimeout = setInterval(() => {
            if (resolved) { clearInterval(checkTimeout); return; }
            if (Date.now() - startTime > MAX_WAIT_TIME_MS) { cleanup(false); clearInterval(checkTimeout); }
        }, 1000);
    });
}

const genButton = document.querySelector('#generateButtonEl');
if (!genButton) return console.error(""Could not find Generate button"");
window.alert = () => true; 

for (let i = 0; i < TARGET_IMAGES; i++) {
    const prompt = generatePrompt();
    const input = getPromptInput();
    if (input) {
        input.value = """";
        input.dispatchEvent(new Event('input', { bubbles: true })); 
        await wait(100);
        input.value = prompt;
        input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    await wait(500);
    const processPromise = waitForGenerationAndSave();
    genButton.click();
    const success = await processPromise;
    await wait(success ? 2000 : 3000);
}
})();"
