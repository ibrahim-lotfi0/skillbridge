import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Using flash for speed and cost-effectiveness in MVP
});

export const geminiProModel = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Pro for complex reasoning/matching if needed
});

export async function parseResume(text: string) {
  const prompt = `
    You are an expert HR recruitment assistant. 
    Analyze the following resume text and extract the information into a strictly structured JSON format.
    
    Fields to extract:
    - name: string
    - email: string
    - phone: string
    - location: string
    - summary: string
    - skills: string[] (technical and soft skills)
    - experience: { title: string, company: string, duration: string, location: string, description: string[] }[]
    - education: { degree: string, institution: string, year: string }[]
    - languages: string[]
    
    Resume Text:
    ${text}
    
    Return ONLY the JSON object.
  `;

  try {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    throw new Error("Failed to parse resume via AI");
  }
}

export async function matchCandidateToJob(resumeJson: any, jobDescription: string) {
  const prompt = `
    You are an expert AI Job Matcher.
    Compare the following Candidate Profile (JSON) with the Job Description provided.
    
    Candidate Profile:
    ${JSON.stringify(resumeJson, null, 2)}
    
    Job Description:
    ${jobDescription}
    
    Analyze the fit and return a JSON object with:
    - matchPercentage: number (0-100)
    - matchingSkills: string[] (skills candidate has that job requires)
    - missingSkills: string[] (skills job requires but candidate lacks)
    - summary: string (1-2 sentences explaining the score)
    - recommendations: string[] (up to 3 advice points for the candidate)
    
    Return ONLY the JSON object.
  `;

  try {
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Match Error:", error);
    throw new Error("Failed to calculate match score via AI");
  }
}

export async function detectSkillGaps(profileJson: any, targetRole: string) {
  const prompt = `
    You are an expert Career Coach and Skill Analyst.
    Analyze the Candidate Profile and their Target Role.
    
    Candidate Profile:
    ${JSON.stringify(profileJson, null, 2)}
    
    Target Role:
    ${targetRole}
    
    Return a JSON object with:
    - currentLevel: string (e.g. Junior, Mid, Senior)
    - missingSkills: { name: string, importance: 'high' | 'medium' | 'low', resourceType: string }[]
    - learningPath: { step: number, title: string, description: string, estimatedTime: string }[]
    - cvImprovements: string[] (specific advice to improve their CV for this role)
    
    Return ONLY the JSON object.
  `;

  try {
    const result = await geminiProModel.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Skill Gap Error:", error);
    throw new Error("Failed to detect skill gaps via AI");
  }
}
