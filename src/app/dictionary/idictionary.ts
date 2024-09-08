export interface IDictionary {
    word: string;
    phonetic: string;
    audioUrls: string[]; // URLs to the pronunciation audio files
    meanings: IMeaning[]; // Array of meanings for the word
    synonyms: string[]; // List of synonyms
    antonyms: string[]; // List of antonyms
}

export interface IMeaning {
    partOfSpeech: string; // Part of speech (e.g., noun, verb)
    definitions: IDefinition[]; // Array of definitions under this part of speech
}

export interface IDefinition {
    definitionText: string; // The actual definition text
    example: string; // Example sentence using the word
    synonyms: string[]; // Synonyms specific to this definition
}
