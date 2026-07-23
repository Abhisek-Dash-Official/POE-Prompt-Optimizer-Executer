export const faqs = [
    {
        question: "What exactly does POE do?",
        answer: "POE (Prompt Optimizer & Executor) acts as a middleware between your raw thoughts and an LLM. It intercepts your vague, unstructured input, uses a reasoning engine to compile it into a highly constrained 'Master Prompt', and then executes it instantly."
    },
    {
        question: "Why can't I just use ChatGPT directly?",
        answer: "You can, but standard LLMs often guess your intent when given short, unoptimized prompts. This leads to hallucinations, inconsistent formatting, and generic answers. POE forces strict parameters (Role, Context, Constraints, Format) before executing, guaranteeing a professional-grade output every time."
    },
    {
        question: "What engines power the optimization and execution layers?",
        answer: "The Optimization Layer uses Google Gemini 1.5 Flash for advanced context reasoning and prompt engineering. The compiled prompt is then sent to the Execution Layer, which utilizes Groq's LPU hardware (running Llama-3) for ultra-low latency, real-time streaming."
    },
    {
        question: "Is my data stored or used for training?",
        answer: "No. Your raw inputs and optimized prompts are processed in real-time. We do not store your execution outputs on our servers, and your queries are absolutely never used to train our underlying models. Enterprise-grade privacy is built-in."
    },
    {
        question: "Why is the execution so fast?",
        answer: "Unlike traditional GPU-based cloud processing, POE routes the final execution through Groq's specialized Language Processing Units (LPUs). This allows the system to stream tokens to your screen faster than human reading speed."
    },
    {
        question: "Are there any usage limits?",
        answer: "To maintain zero-latency execution and prevent API abuse, free-tier accounts operate on a strict Daily Token Limit. We track the number of AI tokens processed during both optimization and execution. You can monitor your real-time token usage directly in your workspace dashboard."
    }
];