
import { extractTextFromPDF } from "@/app/utils/extractPdfText";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from 'openai';



export async function POST(req:NextRequest) {
    const formData = await req.formData();
    const file = formData.get('resume') as File;

    if(!file){
        return NextResponse.json(
            {error: 'no File Uploaded'},
            {status: 400},
        )};

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let extractedText = "" ; 

    try {
       extractedText = await extractTextFromPDF(buffer);

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Failed to parse resume. "}, {status:500});
    }

    const {atsScore,strengths,improvements} = await getAiReview(extractedText);
    return NextResponse.json({atsScore,strengths,improvements})
}

async function getAiReview(text:string): Promise<{atsScore: string;strengths: string;improvements: string;}> {

    const prompt1 =`You are a brutally honest ATS (Applicant Tracking System) engine, trained by hiring managers at Google, Amazon, and Meta.

Your job is to assign a **realistic ATS score out of 100** (in plain text like: "48/100)" based on a resume's ability to pass ATS filters for a generic software engineering job.

Your score breakdown (100 points):

🟠 30 pts – Keyword Relevance  
Only give full credit if **critical keywords** like TypeScript, REST API, React, Git, Agile, CI/CD, Tailwind, PostgreSQL, Docker, etc. appear **naturally in context**, not just dumped in skills list.

🟠 25 pts – Project Quality  
Give credit only for **real-world** projects with clear impact (e.g., “increased X by Y%”), deployed links, or proof of usage. Penalize academic-only or vague side projects.

🟠 20 pts – Formatting & Structure  
Resume must use **standard fonts, no tables/columns**, single-column layout, proper spacing, and ATS-friendly structure. Deduct for custom design, icons, or poor layout.

🟠 15 pts – Technical Skill Clarity  
Skill section must be **concise and context-supported**. Deduct for buzzword stuffing, mixing soft skills, or lack of tech stack details in projects.

🟠 10 pts – Professionalism  
Check grammar, clarity, consistent formatting, and appropriate contact details. Deduct for unprofessional email, broken links, typos, or excessive personal info.

STRICT RULES:
- Weak or average resumes score **below 50**
- Good resumes score **68–76**
- Exceptional ones can reach 80–85, but only if all areas are strong
- Be firm. No partial points. Penalize any fluff, lack of results, or clutter.
        
        **IMPORTANT INSTRUCTIONS**
        - Do not provide explanations or comments.
        - Do not use Markdown.
        - Do not use code blocks.
        give just number out of/100
        Resume content:\n\n${text}`;
    const prompt2= `You are an AI Resume Reviewer. Analyze the following resume and provide strengths of the resume \n\n${text}`;
    const prompt3= `You are an AI Resume Reviewer. Analyze the following resume and provide weaknesses, and 3 improvement suggestions: \n\n${text}`;

    const api = new OpenAI({
      baseURL: process.env.API_URL,
      apiKey: process.env.API_KEY,
    });

    const [result1,result2,result3] = await Promise.all([
        
        api.chat.completions.create({
            model: 'google/gemma-3n-e4b-it',
            messages: [{"role": "user","content": prompt1,}],
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 1,
        }) ,
    
        api.chat.completions.create({
            model: 'google/gemma-3n-e4b-it',
            messages: [{"role": "user","content": prompt2,}],
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 1,
        }),

        api.chat.completions.create({
            model: 'google/gemma-3n-e4b-it',
            messages: [{"role": "user","content": prompt3,}
            ],
            temperature: 0.7,
            top_p: 0.7,
            frequency_penalty: 1,

        }),
    ]);
    
      const message1 = result1.choices[0].message.content?.match(/\d{1,3}/)?.[0] ?? "N/A";
      const message2 = result2.choices[0].message.content ?? "";
      const message3 = result3.choices[0].message.content ?? "";
      console.log(`Assistant: ${message1}, ${message2}, ${message3}`);
    return {atsScore:message1, strengths:message2, improvements:message3}
}