import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const knowledgeBaseFolder = path.join(__dirname, './knowledge_base');
const characterJsonPath = path.join(__dirname, '../characters/trump.character.json');

// Function to load knowledge base
async function loadKnowledgeBase() {
    const files = fs.readdirSync(knowledgeBaseFolder);
    const knowledge = files.map((file) => {
        const filePath = path.join(knowledgeBaseFolder, file);
        return fs.readFileSync(filePath, 'utf-8');
    });
    return knowledge;
}

// Update character JSON
async function updateCharacterJson() {
    const knowledge = await loadKnowledgeBase();

    // Read the existing character JSON
    const characterData = JSON.parse(fs.readFileSync(characterJsonPath, 'utf-8'));

    // Add the knowledge base to the character JSON
    characterData.knowledgeBase = knowledge;

    // Write the updated JSON back to the file
    fs.writeFileSync(characterJsonPath, JSON.stringify(characterData, null, 4));
    console.log('Character JSON updated successfully!');
}

// Run the update
updateCharacterJson().catch((error) => console.error('Error updating character JSON:', error));
