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

    const prompt1 = `You are an AI Resume Reviewer. Analyze the following resume and provide ATS score (out of 100)\n\n${text}`;
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
    
      const message1 = result1.choices[0].message.content ?? "";
      const message2 = result2.choices[0].message.content ?? "";
      const message3 = result3.choices[0].message.content ?? "";
      console.log(`Assistant: ${message1}, ${message2}, ${message3}`);
    return {atsScore:message1, strengths:message2, improvements:message3}
}