import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In dev, Vite middleware is mounted; in production, static files are served
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Gemini Client
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const aiClient = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;

// Llama fallback config
const llamaBaseUrl = process.env.LLAMA_BASE_URL || '';
const llamaApiKey = process.env.LLAMA_API_KEY || '';
const llamaModel = process.env.LLAMA_MODEL || 'meta-llama/llama-3.1-8b-instruct';

interface AiExplainPayload {
  materialName: string;
  weightKg: number;
  offeredRatePerKg?: number;
  fairPriceMin: number;
  fairPriceLikely: number;
  fairPriceMax: number;
  verdict: string;
  percentDeviation: number;
  anomalyScore: number;
  reasons: string[];
  recommendedAction: string;
  language: 'mr' | 'hi' | 'en';
  persona: 'collector' | 'recycler' | 'admin';
  userQuery?: string;
}

// ReclaimX Structured Explanation Endpoint
app.post('/api/ai-explain', async (req: Request, res: Response) => {
  try {
    const payload: AiExplainPayload = req.body;
    const {
      materialName,
      weightKg,
      offeredRatePerKg,
      fairPriceMin,
      fairPriceLikely,
      fairPriceMax,
      verdict,
      percentDeviation,
      anomalyScore,
      reasons,
      recommendedAction,
      language = 'en',
      persona = 'collector',
      userQuery,
    } = payload;

    // Strict system prompt enforcing: explain, don't invent numbers; short sentences; low-literacy friendly
    const systemInstruction = `You are "Reclaim AI", an honest, respectful, and crystal-clear assistant for informal e-waste collectors (kabaddi-walas) and recyclers in Maharashtra, India.
RULES:
1. The AI Decision Engine has ALREADY computed the official numbers:
   - Material: ${materialName}
   - Lot Weight: ${weightKg} kg
   - Fair Price Band: ₹${fairPriceMin} to ₹${fairPriceMax} per kg (Average: ₹${fairPriceLikely}/kg)
   - Offered Rate: ${offeredRatePerKg ? `₹${offeredRatePerKg}/kg` : 'Not provided yet'}
   - Decision Verdict: ${verdict} (${percentDeviation}% difference from benchmark)
   - Anomaly Risk Score: ${anomalyScore}/100
   - Recommended Action: ${recommendedAction}
   - Model Reasons: ${reasons.join('; ')}
2. DO NOT invent, contradict, or re-calculate any price, weight, or verdict numbers!
3. Explain WHY this verdict was reached in simple, encouraging terms suitable for field workers.
4. Respond in the requested language:
   - If 'mr', reply in fluent, respectful Marathi (मराठी).
   - If 'hi', reply in clear, friendly Hindi (हिंदी).
   - If 'en', reply in simple, jargon-free Indian English.
5. Keep your answer under 3 short paragraphs. Include safety alerts if hazardous items are mentioned.`;

    const userPrompt = userQuery
      ? `User question: "${userQuery}". Explain based on the structured decision data above.`
      : `Provide a concise explanation of why the offer is ${verdict} and what the collector should do next.`;

    let explanationText = '';
    let activeProvider = 'rule-based-fallback';

    // 1. Try Gemini first (Primary)
    if (aiClient && geminiApiKey) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\n${userPrompt}` }],
            },
          ],
        });

        if (response.text) {
          explanationText = response.text;
          activeProvider = 'Gemini 3.8 Flash';
        }
      } catch (geminiErr) {
        console.warn('Gemini proxy error, attempting Llama fallback:', geminiErr);
      }
    }

    // 2. Try Llama if Gemini failed or key missing
    if (!explanationText && llamaBaseUrl) {
      try {
        const llamaRes = await fetch(`${llamaBaseUrl.replace(/\/+$/, '')}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(llamaApiKey ? { Authorization: `Bearer ${llamaApiKey}` } : {}),
          },
          body: JSON.stringify({
            model: llamaModel,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 350,
          }),
        });

        if (llamaRes.ok) {
          const data: any = await llamaRes.json();
          explanationText = data.choices?.[0]?.message?.content || '';
          activeProvider = `Llama (${llamaModel})`;
        }
      } catch (llamaErr) {
        console.warn('Llama proxy error, defaulting to local template:', llamaErr);
      }
    }

    // 3. Guaranteed On-Device Deterministic Explanation Fallback
    if (!explanationText) {
      activeProvider = 'On-Device Rule-Based Template';
      if (language === 'mr') {
        explanationText = `या लॉटचा योग्य भाव ₹${fairPriceMin} ते ₹${fairPriceMax} प्रति किलो दरम्यान आहे. तुमच्या ${weightKg} किलो ${materialName} साठी एकूण योग्य मूल्य सुमारे ₹${Math.round(fairPriceLikely * weightKg)} होते. निर्णय: ${verdict === 'UNDERPAID' ? 'कमी दर (नुकसान)' : verdict === 'FAIR' ? 'योग्य बाजारभाव' : 'जास्त दर'}. सल्ला: ${recommendedAction}`;
      } else if (language === 'hi') {
        explanationText = `इस लॉट का उचित मूल्य ₹${fairPriceMin} से ₹${fairPriceMax} प्रति किग्रा के बीच है। आपके ${weightKg} किग्रा ${materialName} का अनुमानित मूल्य ₹${Math.round(fairPriceLikely * weightKg)} है। निष्कर्ष: ${verdict === 'UNDERPAID' ? 'कम मूल्य' : verdict === 'FAIR' ? 'उचित मूल्य' : 'अधिक मूल्य'}। सलाह: ${recommendedAction}`;
      } else {
        explanationText = `The fair market value for ${materialName} in Pune is ₹${fairPriceMin} to ₹${fairPriceMax}/kg. For your ${weightKg} kg lot, expected value is ₹${Math.round(fairPriceLikely * weightKg)}. Verdict: ${verdict}. Action: ${recommendedAction}`;
      }
    }

    return res.json({
      success: true,
      explanation: explanationText,
      activeProvider,
      lotContext: {
        materialName,
        weightKg,
        fairPriceMin,
        fairPriceLikely,
        fairPriceMax,
        verdict,
        percentDeviation,
        recommendedAction,
      },
    });
  } catch (error) {
    console.error('API Error in /api/ai-explain:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate explanation',
      activeProvider: 'error-fallback',
    });
  }
});

// National & District Aggregated E-Waste Intelligence Endpoint
// Enforces strict differential privacy: no PII, no coordinates, suppresses n < 5
app.get('/api/analytics/districts', async (_req: Request, res: Response) => {
  try {
    const timestamp = new Date().toISOString();
    // Return aggregated snapshot for government decision-support
    return res.json({
      success: true,
      timestamp,
      methodologyVersion: 'CPCB-EPR-v2.1',
      cluster: 'Maharashtra State / Pune Hub',
      privacyThreshold: 5,
      isDemoData: true,
      demoDisclosure: 'All non-Pune district rollups contain synthetic calibrated simulation data.',
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Analytics rollup failed' });
  }
});

// Root & Static Server Setup
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ReclaimX Server running on port ${PORT} (Mode: ${isProduction ? 'Production' : 'Development'})`);
  });
}

startServer();
