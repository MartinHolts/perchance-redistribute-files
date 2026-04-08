(async () => {
    // --- Define Arrays for Prompt Components ---
    const organism_type = [
        "bioluminescent fungus", "sentient crystalline flora", "silicon-based insectoid", "gaseous nebula creature",
        "symbiotic coral-like organism", "electromagnetic energy being", "metallic predatory plant", "psionic amoeboid colony",
        "chromatic shifting cephalopod", "lithovoric rock-like mammal", "aero-plankton swarm", "cryo-volcanic vent tube worm",
        "radioactive crystal formation", "temporal-shifting viral entity", "gravity-manipulating fungal network"
    ];

    const organism_adjectives = [
        "colossal", "microscopic", "ethereal", "gargantuan", "bioluminescent", "sentient",
        "symbiotic", "predatory", "docile", "ancient", "newly-evolved", "intelligent",
        "hive-minded", "solitary", "iridescent", "translucent", "camouflaged", "radiant"
    ];

    const organism_functions = [
        "terraforming a barren moon", "acting as a planetary defense system", "producing a psychoactive pollen",
        "serving as a biological supercomputer", "filtering toxins from the atmosphere", "creating a stable wormhole",
        "generating a planet-wide energy shield", "communicating through complex light patterns", "being a living library of genetic code",
        "farming exotic matter", "producing incredibly strong silk for spacecraft cables", "acting as a nursery for a symbiotic species",
        "metabolizing starlight for energy", "creating breathtaking auroras", "decomposing fallen spacecraft"
    ];

    const unique_features = [
        "with crystalline wings that refract light into rainbows", "with tentacles that hum with cosmic energy", "with a hide that mimics the starry night sky",
        "with flowers that bloom in zero gravity", "with eyes that are miniature galaxies", "with roots that tap into the planet's molten core",
        "with spores that create miniature, temporary black holes", "with skin that is a living, shifting fractal pattern", "with a song that can alter local gravity",
        "with leaves that are solar sails", "with a shell made of solidified light", "that communicates through intricate sand paintings",
        "that has a symbiotic relationship with tiny, glowing sprites", "that leaves a trail of sparkling, life-giving dust", "that can phase in and out of reality"
    ];

    const views_and_compositions = [
        "a macro shot of its intricate skin patterns", "a wide-angle view of it towering over a valley", "an aerial shot of a colony of these organisms",
        "a close-up of its multifaceted eyes reflecting a supernova", "a view from below, looking up at its massive form against a backdrop of twin moons",
        "an intimate portrait of a smaller organism nestled in the glowing foliage", "a dynamic action shot of it hunting its prey", "a time-lapse view of its life cycle",
        "a serene landscape shot with the organism as a central feature", "a dramatic shot of it silhouetted against a galactic core",
        "a split-view showing both its above-ground and subterranean structures", "an artistic rendering of its energy field",
        "a shot from the perspective of a tiny explorer standing before it", "a view of it interacting with a spacecraft", "a shot of its bioluminescence illuminating a dark cavern"
    ];

    const background_elements = [
        "on a planet with a ring system made of ice crystals", "in a nebula with swirling, vibrant colors", "on a world with two suns setting, casting long, dramatic shadows",
        "in a landscape of giant, glowing crystals", "amidst the ruins of an ancient, alien city", "on a planet with oceans of liquid methane under a green sky",
        "in a forest of pulsating, bioluminescent trees", "on a volcanic world with rivers of blue lava", "in the debris field of a shattered moon",
        "on a world with floating islands and waterfalls that flow upwards", "under a sky filled with a meteor shower", "in a cavern filled with giant, sparkling geodes",
        "on a desolate salt flat under a sky with a massive gas giant on the horizon", "in orbit around a black hole, at a safe distance", "on a world perpetually bathed in the twilight of a distant nebula"
    ];

    const moods = [
        "serene and majestic", "dark and menacing", "vibrant and full of life", "lonely and desolate",
        "mysterious and enigmatic", "joyful and utopian", "chaotic and destructive", "peaceful and contemplative",
        "surreal and dreamlike", "epic and awe-inspiring", "eerie and unsettling", "hopeful and optimistic",
        "ancient and wise", "wild and untamed", "fragile and delicate"
    ];

    const prompt_templates = [
        "A {mood} digital painting of a {organism_adjective} {organism_type}, {unique_features}. It is currently {organism_functions}. The scene is a {views_and_compositions} {background_elements}.",
        "Generate an image of a {organism_type} that is {organism_adjective}. A key feature is its {unique_features}. The organism's main purpose is {organism_functions}. The composition is a {views_and_compositions}, set {background_elements}, creating a {mood} atmosphere.",
        "A {mood} concept art for a sci-fi film. The creature is a {organism_adjective} {organism_type}, characterized by {unique_features}. We see it {organism_functions}. The camera is positioned for a {views_and_compositions}, showcasing the stunning {background_elements}.",
        "Create a vivid illustration of a {organism_type}, known for being {organism_adjective}. It has {unique_features} and is in the middle of {organism_functions}. The image should be a {views_and_compositions} to capture the scale, with a background of {background_elements}. The overall feeling should be {mood}.",
        "An artwork depicting a {organism_adjective} {organism_type}. Its design includes {unique_features}. This organism is {organism_functions}. The perspective is a {views_and_compositions}, and the environment is {background_elements}, which contributes to a {mood} feeling."
    ];

    // --- Generate a Single Prompt ---
    function generatePrompt() {
        const template = prompt_templates[Math.floor(Math.random() * prompt_templates.length)];
        const mood = moods[Math.floor(Math.random() * moods.length)];
        const organismAdjective = organism_adjectives[Math.floor(Math.random() * organism_adjectives.length)];
        const organismType = organism_type[Math.floor(Math.random() * organism_type.length)];
        const uniqueFeature = unique_features[Math.floor(Math.random() * unique_features.length)];
        const organismFunction = organism_functions[Math.floor(Math.random() * organism_functions.length)];
        const viewAndComposition = views_and_compositions[Math.floor(Math.random() * views_and_compositions.length)];
        const backgroundElement = background_elements[Math.floor(Math.random() * background_elements.length)];

        return template
            .replace("{mood}", mood)
            .replace("{organism_adjective}", organismAdjective)
            .replace("{organism_type}", organismType)
            .replace("{unique_features}", uniqueFeature)
            .replace("{organism_functions}", organismFunction)
            .replace("{views_and_compositions}", viewAndComposition)
            .replace("{background_elements}", backgroundElement);
    }

    // --- Generate 25 Unique Prompts ---
    console.log('Generating 25 unique sci-fi organism prompts...');
    const promptsSet = new Set();
    while (promptsSet.size < 25) {
        promptsSet.add(generatePrompt());
    }
    const prompts = Array.from(promptsSet);
    console.log('Prompts generated successfully! Starting automation...');

    // --- Automation Setup ---
    const generationWaitTime = 120000; // 120 seconds; adjust as needed
    const wait = ms => new Promise(res => setTimeout(res, ms));
    // This is the corrected part: we are now selecting the specific elements from the list of all possible matches.
    const input = document.querySelectorAll('.paragraph-input')[1];
    const genButton = document.querySelectorAll('#generateButtonEl')[0];
    const suppressedAlerts = [];
    window.alert = msg => suppressedAlerts.push(msg);

    async function clickAllSaveButtons() {
        const buttons = Array.from(document.querySelectorAll('.private-save-button'));
        console.log(`→ Found ${buttons.length} save buttons.`);

        for (let i = 0; i < buttons.length; i++) {
            const btn = buttons[i];
            btn.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
            await wait(300);
            btn.click();
            console.log(` Clicked save button #${i + 1}`);
            await wait(300);
        }
    }

    // --- Automation Loop ---
    for (let i = 0; i < prompts.length; i++) {
        console.log(`\n [${i + 1}/${prompts.length}] Inserting prompt: "${prompts[i]}"`);
        input.value = prompts[i];
        input.dispatchEvent(new Event('input', {
            bubbles: true
        }));
        genButton.click();
        console.log(' Generation started.');
        await wait(generationWaitTime);
        await clickAllSaveButtons();
        if (suppressedAlerts.length) {
            console.log(` Suppressed ${suppressedAlerts.length} alert(s):`, suppressedAlerts);
            suppressedAlerts.length = 0;
        } else {
            console.log(' No alerts this round.');
        }
        await wait(2000);
    }

    console.log('\n All prompts processed!');
})();