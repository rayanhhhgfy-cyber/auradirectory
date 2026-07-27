const fs = require('fs');
const path = require('path');

const websites = [
  // --- AI & Machine Learning ---
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chatgpt.com",
    category: "AI & Machine Learning",
    subcategory: "Conversational AI",
    tags: ["AI", "GPT-4o", "OpenAI", "Chat", "Assistant", "Writing"],
    description: "The world-leading conversational AI model by OpenAI for writing, coding, brainstorming, and complex task automation.",
    descriptionAr: "نموذج الذكاء الاصطناعي التفاعلي الأشهر عالمياً من أوبن أي آي للكتابة والتشفير والتحليل وحل المشكلات.",
    plans: [
      { tier: "Free", price: "Free", details: "Standard GPT-4o mini access and basic chat." },
      { tier: "Plus", price: "$20/mo", details: "Access to GPT-4o, o1 reasoning, DALL-E 3, and custom GPTs." },
      { tier: "Team", price: "$25/user/mo", details: "Higher message limits and workspace admin control." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["chatgpt free", "ai chat assistant", "openai gpt-4o", "ai writer"],
    rating: 4.98
  },
  {
    id: "claude-ai",
    name: "Claude AI",
    url: "https://claude.ai",
    category: "AI & Machine Learning",
    subcategory: "Conversational AI",
    tags: ["AI", "Anthropic", "Claude 3.5 Sonnet", "Coding", "Research"],
    description: "Next-generation AI assistant built by Anthropic with incredible coding accuracy, nuanced writing, and multi-file project analysis.",
    descriptionAr: "مساعد الذكاء الاصطناعي الجيل القادم من أنثروبيك مع إمكانيات فائقة في التحليل البرمجي، كتابة المقالات، ومعالجة الملفات المعقدة.",
    plans: [
      { tier: "Free", price: "Free", details: "Access to Claude 3.5 Sonnet with daily message limits." },
      { tier: "Pro", price: "$20/mo", details: "5x usage quota, priority server access, and early feature preview." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["claude 3.5 sonnet", "anthropic ai", "ai coding assistant", "claude pro free"],
    rating: 4.99
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    url: "https://perplexity.ai",
    category: "AI & Machine Learning",
    subcategory: "AI Search Engine",
    tags: ["AI Search", "Research", "Citations", "Real-time Web"],
    description: "An AI-powered search engine that scans the real-time web to deliver direct, cited answers with deep reasoning.",
    descriptionAr: "محرك إجابات ذكي يبحث في شبكة الويب فورياً لتقديم إجابات دقيقة وموثقة بالراجع والمصادر.",
    plans: [
      { tier: "Free", price: "Free", details: "Unlimited standard search queries with citations." },
      { tier: "Pro", price: "$20/mo", details: "300+ Pro Search queries/day, file uploads, and model selection." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["perplexity ai search", "ai search engine with sources", "realtime web ai"],
    rating: 4.95
  },
  {
    id: "cursor-editor",
    name: "Cursor",
    url: "https://cursor.com",
    category: "AI & Machine Learning",
    subcategory: "AI Code Editor",
    tags: ["AI", "IDE", "Coding", "VS Code", "Developer Tools"],
    description: "The AI-first code editor designed to make engineers hyper-productive with agentic multi-file codebase indexing.",
    descriptionAr: "محرر الأكواد الأذكى في العالم والمبني على VS Code لمساعدة المطورين في كتابة الأكواد وتوليدها تلقائياً مع فهم شامل للمشروع.",
    plans: [
      { tier: "Hobby", price: "Free", details: "2,000 completions and 50 slow premium requests." },
      { tier: "Pro", price: "$20/mo", details: "500 fast premium requests per month and unlimited autocomplete." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["cursor ide", "ai code editor", "vs code ai plugin", "cursor composer"],
    rating: 4.97
  },
  {
    id: "midjourney",
    name: "Midjourney",
    url: "https://midjourney.com",
    category: "AI & Machine Learning",
    subcategory: "AI Image Generation",
    tags: ["AI Art", "Image Generator", "Photorealism", "Design"],
    description: "State-of-the-art AI image generator producing hyper-realistic photography, concept art, and visual graphics.",
    descriptionAr: "المنصة الأولى عالمياً في توليد الصور والرسومات بالفن الاصطناعي بدقة سينمائية وتفاصيل واقعية مذهلة.",
    plans: [
      { tier: "Basic", price: "$10/mo", details: "~200 image generations per month." },
      { tier: "Standard", price: "$30/mo", details: "15 hrs of fast generation and unlimited relax mode." }
    ],
    isBest: true,
    pricingCategory: "$1-$10/mo",
    intentKeywords: ["midjourney image generator", "ai art creator", "photorealistic ai images"],
    rating: 4.96
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    url: "https://huggingface.co",
    category: "AI & Machine Learning",
    subcategory: "AI Community & Models",
    tags: ["Open Source", "LLM", "Models", "Datasets", "Spaces"],
    description: "The GitHub of Machine Learning. Host, discover, and deploy open-source models, datasets, and AI apps.",
    descriptionAr: "المنصة والأرشيف الأكبر عالمياً لنماذج الذكاء الاصطناعي مفتوحة المصدر، مجموعات البيانات، والتطبيقات التفاعلية.",
    plans: [
      { tier: "Free", price: "Free", details: "Public datasets, model hosting, and community Spaces." },
      { tier: "PRO", price: "$9/mo", details: "Higher CPU/GPU compute quotas and priority support." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["huggingface open source ai", "download llm models", "ai spaces hosting"],
    rating: 4.94
  },
  {
    id: "groq-inc",
    name: "Groq",
    url: "https://groq.com",
    category: "AI & Machine Learning",
    subcategory: "AI Inference Engine",
    tags: ["LPU", "Ultra-Fast", "Inference", "Llama 3", "API"],
    description: "The fastest AI inference technology powered by LPU chip hardware, running open-source models at 800+ tokens/sec.",
    descriptionAr: "أسرع شريحة حاسوبية ومعالج LPU في العالم لتشغيل نماذج الذكاء الاصطناعي مفتوحة المصدر بسرعات فائقة للغاية.",
    plans: [
      { tier: "Free Developer Tier", price: "Free", details: "High rate limits for Llama 3, Mixtral, and Whisper." },
      { tier: "Pay-As-You-Go", price: "Usage Based", details: "$0.05 - $0.59 per million tokens." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["groq fast ai api", "ultra fast llama 3", "groq cloud lpu"],
    rating: 4.96
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    category: "AI & Machine Learning",
    subcategory: "AI Voice & Speech",
    tags: ["Text to Speech", "Voice Cloning", "Audio", "Dubbing"],
    description: "Pioneering voice AI technology for realistic text-to-speech, voice cloning, and multilingual audio dubbing.",
    descriptionAr: "المنصة الرائدة في توليد الأصوات البشرية بالذكاء الاصطناعي، استنساخ الأصوات، والدبلجة الصوتية متعددة اللغات.",
    plans: [
      { tier: "Free", price: "Free", details: "10,000 characters per month with standard voices." },
      { tier: "Starter", price: "$5/mo", details: "30,000 characters and instant voice cloning." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["elevenlabs text to speech", "ai voice clone free", "ai audio dubbing"],
    rating: 4.93
  },
  {
    id: "v0-dev",
    name: "v0 by Vercel",
    url: "https://v0.dev",
    category: "AI & Machine Learning",
    subcategory: "AI UI Generation",
    tags: ["React", "Tailwind", "Vercel", "Generative UI", "Design"],
    description: "Generative UI system by Vercel. Turn natural language prompts into production-ready React and Tailwind CSS components.",
    descriptionAr: "أداة توليد واجهات المستخدم من فرسيل. تحول الأوامر النصية إلى مكونات برمجية بلغة React و Tailwind جاهزة للاستخدام.",
    plans: [
      { tier: "Free", price: "Free", details: "200 free credits per month." },
      { tier: "Premium", price: "$20/mo", details: "5,000 credits per month and private generations." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["v0 vercel ui generator", "generate react code with ai", "tailwind component generator"],
    rating: 4.95
  },
  {
    id: "deepseek",
    name: "DeepSeek AI",
    url: "https://deepseek.com",
    category: "AI & Machine Learning",
    subcategory: "Reasoning & LLMs",
    tags: ["DeepSeek V3", "R1", "Reasoning", "Open Weights", "Coding"],
    description: "Advanced open-weights AI models specializing in math, coding, and complex step-by-step reasoning.",
    descriptionAr: "نماذج ذكاء اصطناعي متقدمة للغاية ومفتوحة المصدر متخصصة في الرياضيات، البرمجة والتفكير المنطقي خطوة بخطوة.",
    plans: [
      { tier: "Free Chat", price: "Free", details: "Free web chat with DeepSeek V3 & R1 reasoning model." },
      { tier: "API", price: "Usage Based", details: "Ultra affordable API ($0.14 per M tokens)." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["deepseek r1 free", "deepseek open source llm", "deepseek coding model"],
    rating: 4.97
  },
  {
    id: "suno-ai",
    name: "Suno AI",
    url: "https://suno.com",
    category: "AI & Machine Learning",
    subcategory: "AI Music Generation",
    tags: ["Music", "Audio", "Song Generator", "Vocals", "Creativity"],
    description: "Generate full songs with custom lyrics, vocals, and instruments from simple text descriptions.",
    descriptionAr: "منصة توليد الأغاني والموسيقى بالذكاء الاصطناعي مع الكلمات والألحان والأصوات الغنائية المتكاملة.",
    plans: [
      { tier: "Free Basic", price: "Free", details: "50 credits daily (~10 songs per day)." },
      { tier: "Pro Plan", price: "$10/mo", details: "2,500 credits per month and commercial license." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["suno ai music generator", "make song with ai free", "ai music producer"],
    rating: 4.92
  },
  {
    id: "ollama",
    name: "Ollama",
    url: "https://ollama.com",
    category: "AI & Machine Learning",
    subcategory: "Local AI Execution",
    tags: ["Local AI", "Llama 3", "Mistral", "Open Source", "Privacy"],
    description: "Get up and running with large language models locally on macOS, Linux, and Windows.",
    descriptionAr: "أداة تشغيل نماذج الذكاء الاصطناعي محلياً على جهازك الشخصي بدون الحاجة للاتصال بالإنترنت.",
    plans: [
      { tier: "100% Free & Open Source", price: "Free", details: "Free software to run local LLM models." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["ollama local llm", "run llama 3 locally", "private offline ai chat"],
    rating: 4.98
  },
  {
    id: "ideogram",
    name: "Ideogram AI",
    url: "https://ideogram.ai",
    category: "AI & Machine Learning",
    subcategory: "AI Typography & Design",
    tags: ["Text in Images", "Logos", "Poster Design", "Typography", "Art"],
    description: "Advanced AI image generation with flawless typography, poster design, and vector logo rendering.",
    descriptionAr: "مولد الصور بالذكاء الاصطناعي المتخصص بدقة متناهية في رسم الكلمات والنصوص واللوجو داخل الصور.",
    plans: [
      { tier: "Free", price: "Free", details: "10 slow prompt generations daily." },
      { tier: "Basic", price: "$8/mo", details: "400 fast prompt generations per month." }
    ],
    isBest: false,
    pricingCategory: "Free",
    intentKeywords: ["ideogram text image generator", "ai logo generator with text", "ideogram free"],
    rating: 4.91
  },

  // --- Web & Software Development ---
  {
    id: "vercel",
    name: "Vercel",
    url: "https://vercel.com",
    category: "Web & Software Development",
    subcategory: "Frontend Cloud & Hosting",
    tags: ["Hosting", "Next.js", "Serverless", "CDN", "Deploy"],
    description: "The Frontend Cloud platform for developer workflow. Deploy Next.js, React, Vue, and static sites effortlessly.",
    descriptionAr: "المنصة السحابية الأولى لنشر وتستضيف مواقع Next.js و React والتطبيقات بسرعة فائقة وشبكة توزيع عالمية.",
    plans: [
      { tier: "Hobby", price: "Free", details: "Free SSL, automatic CI/CD, and global edge network." },
      { tier: "Pro", price: "$20/user/mo", details: "Advanced analytics, speed insights, and team collaboration." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["host nextjs website free", "vercel deployment", "free react hosting"],
    rating: 4.98
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    category: "Web & Software Development",
    subcategory: "Code Hosting & Collaboration",
    tags: ["Git", "Repositories", "CI/CD", "Copilot", "Open Source"],
    description: "The world's largest developer platform for code hosting, version control, GitHub Actions, and Copilot AI.",
    descriptionAr: "المنصة البرمجية الأضخم عالمياً لاستضافة الأكواد، التحكم بالإصدارات Git، وإدارة المشاريع مفتوحة المصدر.",
    plans: [
      { tier: "Free", price: "Free", details: "Unlimited public/private repos and 2,000 Action mins/mo." },
      { tier: "Team", price: "$4/user/mo", details: "Advanced code review and pull request drafting." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["github git repository", "free git host", "github actions ci cd"],
    rating: 4.99
  },
  {
    id: "bolt-new",
    name: "Bolt.new",
    url: "https://bolt.new",
    category: "Web & Software Development",
    subcategory: "In-Browser Web IDE",
    tags: ["WebContainer", "Full Stack", "StackBlitz", "AI Coder", "React"],
    description: "An AI-powered full-stack web development workspace running node.js servers entirely inside your browser.",
    descriptionAr: "بيئة تطوير حية ومتكاملة تعمل بالكامل داخل المتصفح مع دعم الذكاء الاصطناعي لتشغيل السيرفرات والتطبيقات مباشرة.",
    plans: [
      { tier: "Free", price: "Free", details: "Free daily AI prompt tokens and container runtime." },
      { tier: "Pro", price: "$20/mo", details: "Unlimited high-speed AI code edits and private projects." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["bolt.new stackblitz", "in-browser fullstack IDE", "ai app generator browser"],
    rating: 4.94
  },
  {
    id: "netlify",
    name: "Netlify",
    url: "https://netlify.com",
    category: "Web & Software Development",
    subcategory: "Web Hosting & Serverless",
    tags: ["Hosting", "Jamstack", "Serverless Functions", "Forms"],
    description: "All-in-one platform for automating web projects with continuous integration, serverless functions, and global CDN.",
    descriptionAr: "منصة سحابية متكاملة لنشر تطبيقات الويب، دعم الدوال السحابية بدون سيرفر، وإدارة النماذج والشهادات مجاناً.",
    plans: [
      { tier: "Free Starter", price: "Free", details: "100GB bandwidth/mo and 300 build minutes." },
      { tier: "Pro", price: "$19/user/mo", details: "1TB bandwidth, audit logs, and priority builds." }
    ],
    isBest: false,
    pricingCategory: "Free",
    intentKeywords: ["netlify free hosting", "deploy website free", "serverless functions netlify"],
    rating: 4.88
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "Web & Software Development",
    subcategory: "UI Component Library",
    tags: ["Tailwind", "React", "Radix UI", "Components", "Design System"],
    description: "Beautifully designed, accessible components that you can copy and paste directly into your apps.",
    descriptionAr: "مكتبة مكونات برمجية أنيقة وميسرة الوصول تعتمد على Tailwind CSS ومتاحة للنسخ المباشر في مشروعك.",
    plans: [
      { tier: "100% Free & Open Source", price: "Free", details: "Free for commercial and personal projects." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["shadcn ui components", "copy paste react components", "tailwind UI library free"],
    rating: 4.99
  },
  {
    id: "lucide-icons",
    name: "Lucide Icons",
    url: "https://lucide.dev",
    category: "Web & Software Development",
    subcategory: "Icon Library",
    tags: ["Icons", "React Icons", "SVG", "Open Source", "Design"],
    description: "Beautiful & consistent open-source icon suite engineered for React, Vue, and web components.",
    descriptionAr: "مجموعة أيقونات متجهة عالية الدقة ومفتوحة المصدر للمطورين مع دعم شامل لـ React و Tailwind.",
    plans: [
      { tier: "Open Source", price: "Free", details: "100% free open-source MIT licensed icons." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["lucide icons react", "free svg icons library", "lucide dev"],
    rating: 4.98
  },
  {
    id: "nextjs",
    name: "Next.js",
    url: "https://nextjs.org",
    category: "Web & Software Development",
    subcategory: "React Web Framework",
    tags: ["React", "SSR", "App Router", "Full Stack", "JavaScript"],
    description: "The React Framework for the Web. Build full-stack web applications with Server Components and SSR.",
    descriptionAr: "إطار العمل الأشهر لبناء تطبيقات React متكاملة مع دعم التقديم من السيرفر (SSR) والتحسين للبحث SEO.",
    plans: [
      { tier: "Open Source", price: "Free", details: "Free open-source web framework maintained by Vercel." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["nextjs react framework", "ssr react framework", "full stack react"],
    rating: 4.97
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    category: "Web & Software Development",
    subcategory: "CSS Framework",
    tags: ["CSS", "Utility-First", "Styling", "Design", "Web Dev"],
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    descriptionAr: "إطار العمل الرائد لتنسيق واجهات الويب بكلاسات جاهزة وسريعة دون الحاجة لكتابة ملفات CSS تقليدية.",
    plans: [
      { tier: "Open Source", price: "Free", details: "100% free open-source framework." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["tailwind css utility framework", "modern css styling", "responsive web design css"],
    rating: 4.98
  },
  {
    id: "postman",
    name: "Postman",
    url: "https://postman.com",
    category: "Web & Software Development",
    subcategory: "API Development & Testing",
    tags: ["API", "REST", "GraphQL", "Testing", "Documentation"],
    description: "The world's leading API platform for building, testing, documenting, and monitoring API endpoints.",
    descriptionAr: "المنصة القياسية الأولى لاختبار وتطوير واستكشاف واجهات البرمجة APIs وتوثيقها بدقة عالية.",
    plans: [
      { tier: "Free", price: "Free", details: "30 members, core API testing, and collection runner." },
      { tier: "Basic", price: "$14/user/mo", details: "Unlimited collection runs and custom domains." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["postman api testing", "test rest api online", "api documentation tool"],
    rating: 4.91
  },
  {
    id: "sentry",
    name: "Sentry",
    url: "https://sentry.io",
    category: "Web & Software Development",
    subcategory: "Error Tracking & Monitoring",
    tags: ["Debugging", "Errors", "Logs", "Performance", "Monitoring"],
    description: "Application performance monitoring and error tracking software that helps software teams fix crashes in real time.",
    descriptionAr: "منصة تتبع أخطاء البرمجة ومراقبة أداء التطبيقات في الوقت الفعلي مع تنبيهات وفحوصات لمصدر الخطأ.",
    plans: [
      { tier: "Developer Free", price: "Free", details: "5,000 errors/mo and 10,000 performance units." },
      { tier: "Team", price: "$26/mo", details: "50,000 errors/mo and advanced transaction tracing." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["sentry error tracking", "debug javascript errors", "app error logs monitoring"],
    rating: 4.92
  },
  {
    id: "render-cloud",
    name: "Render",
    url: "https://render.com",
    category: "Web & Software Development",
    subcategory: "Cloud Hosting & Services",
    tags: ["Hosting", "Docker", "Node.js", "Postgres", "Redis"],
    description: "Unified cloud platform to build and run all your web services, static sites, Cron jobs, and PostgreSQL databases.",
    descriptionAr: "منصة استضافة سحابية شاملة لسيرفرات Node.js، وقواعد بيانات Postgres وتطبيقات Docker بأسعار مرنة.",
    plans: [
      { tier: "Free Tier", price: "Free", details: "Free static sites, web services, and PostgreSQL (90 days)." },
      { tier: "Individual", price: "$7/mo", details: "Always-on web service instances." }
    ],
    isBest: false,
    pricingCategory: "Free",
    intentKeywords: ["render cloud hosting", "free nodejs backend hosting", "render vs heroku"],
    rating: 4.89
  },

  // --- Data & Databases ---
  {
    id: "supabase",
    name: "Supabase",
    url: "https://supabase.com",
    category: "Data & Databases",
    subcategory: "Backend-as-a-Service",
    tags: ["PostgreSQL", "Database", "Authentication", "Edge Functions", "Vector"],
    description: "The open source Firebase alternative. Build with Postgres database, Instant APIs, Auth, Realtime, and Vector Storage.",
    descriptionAr: "البديل المفتوح المصدر لـ Firebase والمبني على قاعدة بيانات PostgreSQL الحقيقية مع دعم المصادقة والتخزين الذكي.",
    plans: [
      { tier: "Free Tier", price: "Free", details: "2 active projects, 500MB database, 1GB storage." },
      { tier: "Pro", price: "$25/mo", details: "8GB database space, 100GB storage, and zero pauses." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["supabase free postgresql", "open source firebase alternative", "postgres database auth"],
    rating: 4.98
  },
  {
    id: "neon-tech",
    name: "Neon Postgres",
    url: "https://neon.tech",
    category: "Data & Databases",
    subcategory: "Serverless Postgres",
    tags: ["PostgreSQL", "Serverless", "Database", "Branching", "Scale to Zero"],
    description: "Serverless Postgres built for the cloud. Features instant database branching, auto-scaling, and scale to zero cost.",
    descriptionAr: "قاعدة بيانات بوسطجريس سحابية وبدون سيرفر تتميز بالإيقاف التلقائي لمنع الهدر والتفرع الفوري مثل Git.",
    plans: [
      { tier: "Free Tier", price: "Free", details: "0.5 GiB storage, 10 branch databases, auto-suspend." },
      { tier: "Launch", price: "$19/mo", details: "10 GiB storage, auto-scaling compute, point-in-time restore." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["neon serverless postgresql", "free postgresql database", "instant database branching"],
    rating: 4.96
  },
  {
    id: "turso-db",
    name: "Turso",
    url: "https://turso.tech",
    category: "Data & Databases",
    subcategory: "Edge Database",
    tags: ["SQLite", "libsql", "Edge Database", "Low Latency", "Serverless"],
    description: "The edge database based on libSQLite designed for ultra low-latency queries close to users worldwide.",
    descriptionAr: "قاعدة بيانات فائقة السرعة مبنية على SQLite وموزعة حول العالم لتقديم أسرع وقت استجابة لأقل من مللي ثانية.",
    plans: [
      { tier: "Starter", price: "Free", details: "9GB total storage, 500 database locations." },
      { tier: "Scaler", price: "$29/mo", details: "100GB total storage and 20M read queries." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["turso sqlite edge database", "fast sqlite cloud", "libsql serverless"],
    rating: 4.93
  },
  {
    id: "pinecone-db",
    name: "Pinecone",
    url: "https://pinecone.io",
    category: "Data & Databases",
    subcategory: "Vector Database",
    tags: ["Vector Search", "AI Database", "Embeddings", "RAG", "LLM"],
    description: "The vector database for AI infrastructure. Search billions of high-dimensional vectors with sub-second latency.",
    descriptionAr: "قاعدة بيانات المتجهات المخصصة للبنية التحتية للذكاء الاصطناعي والاستعلامات الدلالية فائقة السرعة.",
    plans: [
      { tier: "Free Starter", price: "Free", details: "2GB storage for up to 1 million 768-dim vectors." },
      { tier: "Standard", price: "Usage Based", details: "Serverless usage per read/write query unit." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["pinecone vector database", "vector search rag llm", "free embeddings database"],
    rating: 4.94
  },
  {
    id: "upstash-redis",
    name: "Upstash",
    url: "https://upstash.com",
    category: "Data & Databases",
    subcategory: "Serverless Data & Cache",
    tags: ["Redis", "Vector", "Kafka", "Rate Limiting", "Serverless"],
    description: "Serverless data platform offering Redis, Vector database, and QStash for serverless and edge developers.",
    descriptionAr: "منصة بيانات وسيرفرات ريديس كاش وبنك معلومات المتجهات للوظائف والتطبيقات بدون سيرفر.",
    plans: [
      { tier: "Free Tier", price: "Free", details: "10,000 commands/day for Redis and Vector DB." },
      { tier: "Pay-As-You-Go", price: "Usage Based", details: "$0.20 per 100,000 requests." }
    ],
    isBest: false,
    pricingCategory: "Free",
    intentKeywords: ["upstash serverless redis", "free redis database", "edge rate limiting redis"],
    rating: 4.90
  },
  {
    id: "mongodb-atlas",
    name: "MongoDB Atlas",
    url: "https://mongodb.com/atlas",
    category: "Data & Databases",
    subcategory: "Document NoSQL Database",
    tags: ["NoSQL", "Document DB", "JSON", "Cloud", "Vector Search"],
    description: "Fully managed cloud database service for MongoDB. Deploy scalable NoSQL document clusters worldwide.",
    descriptionAr: "قاعدة بيانات المستندات NoSQL السحابية مع دعم مرن لتخزين بيانات JSON والبحث المتقدم.",
    plans: [
      { tier: "M0 Free Cluster", price: "Free", details: "512MB free storage with shared RAM." },
      { tier: "Serverless", price: "Usage Based", details: "Pay per read/write operation unit." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["mongodb atlas free cluster", "nosql json database", "mongodb cloud free"],
    rating: 4.92
  },

  // --- Design & Creative ---
  {
    id: "figma",
    name: "Figma",
    url: "https://figma.com",
    category: "Design & Creative",
    subcategory: "UI/UX Design Platform",
    tags: ["Design", "UI/UX", "Prototyping", "Collaboration", "Vector"],
    description: "The leading collaborative interface design tool. Design, prototype, and gather real-time feedback in browser.",
    descriptionAr: "البرنامج الرقمي القياسي عالمياً لتصميم واجهات المستخدم (UI/UX) والبروتوتايب والعمل الجماعي بمرونة مطلقة.",
    plans: [
      { tier: "Starter", price: "Free", details: "3 Figma files and unlimited collaborators." },
      { tier: "Professional", price: "$12/user/mo", details: "Unlimited Figma files, team libraries, and dev mode." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["figma ui ux design free", "collaborative prototype tool", "figma web design"],
    rating: 4.99
  },
  {
    id: "canva",
    name: "Canva",
    url: "https://canva.com",
    category: "Design & Creative",
    subcategory: "Graphic Design & Content",
    tags: ["Graphic Design", "Social Media", "Templates", "Video", "AI"],
    description: "Empowers everyone to create professional graphics, social media posts, slide decks, and video content.",
    descriptionAr: "أسهل منصة تصميم جرافيك وصناعة المحتوى المرئي، العروض التقديمية، والمنشورات عبر ملايين القوالب الجاهزة.",
    plans: [
      { tier: "Free", price: "Free", details: "250,000+ free templates and 5GB cloud storage." },
      { tier: "Pro", price: "$12.99/mo", details: "100M+ premium stock photos, brand kit, and background remover." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["canva free design templates", "social media graphic creator", "canva pro free trial"],
    rating: 4.95
  },
  {
    id: "framer",
    name: "Framer",
    url: "https://framer.com",
    category: "Design & Creative",
    subcategory: "Website Builder & Design",
    tags: ["Web Builder", "No Code", "Animations", "Design", "Publish"],
    description: "Design and publish stunning, high-performance web pages directly from a canvas with smooth interactions.",
    descriptionAr: "منصة تصميم وبناء المواقع الإلكترونية التفاعلية بدون كود مع دعم الحركة والسلاسة الفائقة.",
    plans: [
      { tier: "Free", price: "Free", details: "Framer domain banner and core canvas design tool." },
      { tier: "Mini", price: "$5/mo", details: "Custom domain and 1,000 visitors/mo." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["framer website builder", "no code animated website", "framer vs webflow"],
    rating: 4.94
  },
  {
    id: "spline-3d",
    name: "Spline 3D",
    url: "https://spline.design",
    category: "Design & Creative",
    subcategory: "3D Design & Interactive Web",
    tags: ["3D", "WebGl", "Interactive", "Design", "Export"],
    description: "Design 3D experiences for the web. Create interactive 3D scenes, animations, and export directly to React.",
    descriptionAr: "أداة تصاميم ثلاثية الأبعاد تفاعلية تعمل عبر المتصفح مع إمكانية التصدير إلى موقعك بلغة React بضغطة زر.",
    plans: [
      { tier: "Basic Free", price: "Free", details: "Unlimited personal files and 3D web embeds." },
      { tier: "Super", price: "$9/mo", details: "Remove watermark, video export, and AI 3D model generator." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["spline 3d web design", "interactive 3d website", "free 3d canvas editor"],
    rating: 4.93
  },
  {
    id: "coolors",
    name: "Coolors",
    url: "https://coolors.co",
    category: "Design & Creative",
    subcategory: "Color Palette Generator",
    tags: ["Color Palette", "Design", "UI/UX", "Generators", "Themes"],
    description: "Create the perfect color palettes or get inspired by thousands of beautiful color schemes.",
    descriptionAr: "مولد لوحات الألوان الأسرع عالمياً لاختيار تدرجات متناسقة لتطبيقات الويب والتصميم الجرافيكي.",
    plans: [
      { tier: "Free", price: "Free", details: "Generate palettes, extract colors from images, and save." },
      { tier: "Pro", price: "$3/mo", details: "Unlimited saved palettes, custom fonts, and zero ads." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["coolors color palette generator", "ui design color scheme", "coolors free"],
    rating: 4.96
  },
  {
    id: "remove-bg",
    name: "Remove.bg",
    url: "https://remove.bg",
    category: "Design & Creative",
    subcategory: "Background Removal",
    tags: ["Background Remover", "Image Editing", "PNG", "E-commerce"],
    description: "Remove image backgrounds 100% automatically in 5 seconds with one single click.",
    descriptionAr: "أداة إزالة خلفيات الصور تلقائياً خلال 5 ثوانٍ بدقة عالية وسهولة فائقة.",
    plans: [
      { tier: "Free Account", price: "Free", details: "Unlimited preview resolution image background removals." },
      { tier: "Subscription", price: "$9/mo", details: "High-resolution HD image credits." }
    ],
    isBest: false,
    pricingCategory: "Free",
    intentKeywords: ["remove bg background remover free", "transparent png creator", "erase photo background"],
    rating: 4.88
  },

  // --- Productivity & Workspaces ---
  {
    id: "notion",
    name: "Notion",
    url: "https://notion.so",
    category: "Productivity & Workspaces",
    subcategory: "All-In-One Workspace",
    tags: ["Notes", "Docs", "Tasks", "Wikis", "AI Workspace"],
    description: "The connected workspace where better, faster work happens. Write, plan, organize tasks, and build databases.",
    descriptionAr: "مساحة العمل المتكاملة للملاحظات، تنظيم المشاريع، كتابة التوثيق، وبناء قواعد البيانات المرنة بالذكاء الاصطناعي.",
    plans: [
      { tier: "Free", price: "Free", details: "Unlimited pages and block sync for individuals." },
      { tier: "Plus", price: "$10/user/mo", details: "Unlimited file uploads and custom databases." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["notion free notes", "all in one workspace", "notion task manager"],
    rating: 4.98
  },
  {
    id: "linear-app",
    name: "Linear",
    url: "https://linear.app",
    category: "Productivity & Workspaces",
    subcategory: "Project & Issue Tracking",
    tags: ["Issue Tracker", "Agile", "Software Teams", "Roadmaps", "Productivity"],
    description: "The issue tracking tool software teams actually love. Built for speed, keyboard shortcuts, and modern workflows.",
    descriptionAr: "النظام الأسرع والأحدث لإدارة مهام وتذاكر البرمجة والمشاريع التقنية المصمم خصيصاً لفرق التطوير المحترفة.",
    plans: [
      { tier: "Free", price: "Free", details: "250 active issues and unlimited workspace members." },
      { tier: "Basic", price: "$8/user/mo", details: "Unlimited issues and guest access control." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["linear issue tracker", "agile project manager software", "modern jira alternative"],
    rating: 4.97
  },
  {
    id: "obsidian-md",
    name: "Obsidian",
    url: "https://obsidian.md",
    category: "Productivity & Workspaces",
    subcategory: "Markdown Knowledge Base",
    tags: ["Markdown", "Notes", "Local First", "PKM", "Second Brain"],
    description: "A powerful knowledge base that works on top of a local folder of plain text Markdown files.",
    descriptionAr: "مساحة الملاحظات الشخصية وبناء العقل الثاني المحفوظ بالكامل على جهازك الشخصي بصيغة Markdown.",
    plans: [
      { tier: "100% Free Personal", price: "Free", details: "Free for personal use with plugins and local storage." },
      { tier: "Commercial", price: "$50/user/yr", details: "Commercial license for team use." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["obsidian markdown notes free", "second brain note taking", "offline note manager"],
    rating: 4.96
  },
  {
    id: "raycast",
    name: "Raycast",
    url: "https://raycast.com",
    category: "Productivity & Workspaces",
    subcategory: "Productivity Launcher",
    tags: ["Mac", "Launcher", "Shortcuts", "AI", "Extensions"],
    description: "Raycast is a blazingly fast, extendable launcher that lets you control your tools with a few keystrokes.",
    descriptionAr: "أداة إطلاق الأوامر والإنتاجية الفائقة لأجهزة أبل مع آلاف الإضافات والمساعد الذكي المستجيب فورياً.",
    plans: [
      { tier: "Free", price: "Free", details: "Core launcher, clipboard history, and extensions." },
      { tier: "Pro", price: "$8/mo", details: "Built-in Raycast AI, cloud sync, and custom themes." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["raycast mac launcher", "productivity shortcuts mac", "spotlight alternative raycast"],
    rating: 4.98
  },
  {
    id: "excalidraw",
    name: "Excalidraw",
    url: "https://excalidraw.com",
    category: "Productivity & Workspaces",
    subcategory: "Virtual Whiteboard",
    tags: ["Whiteboard", "Diagrams", "Sketching", "Collaboration", "Open Source"],
    description: "Virtual whiteboard for sketching hand-drawn like diagrams, architecture flowcharts, and wireframes.",
    descriptionAr: "لوحة رسم افتراضية بأسلوب الرسم اليدوي لتصميم المخططات الهندسية ورسم الخرائط الذهنية فورياً.",
    plans: [
      { tier: "100% Free & Open Source", price: "Free", details: "Free browser whiteboard tool with link sharing." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["excalidraw free whiteboard", "architecture diagram sketch", "hand drawn flowchart tool"],
    rating: 4.97
  },

  // --- Payments & Finance ---
  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    category: "Payments & Finance",
    subcategory: "Payment Processing",
    tags: ["Payments", "Billing", "Subscriptions", "E-commerce", "API"],
    description: "Financial infrastructure for the internet. Millions of businesses use Stripe to accept payments and manage revenue.",
    descriptionAr: "البنية التحتية للمدفوعات عبر الإنترنت لاستقبال بطاقات الائتمان الاشتراكات وإدارة الأموال عالمياً.",
    plans: [
      { tier: "Standard", price: "2.9% + 30¢", details: "Pay as you go transaction fee per successful card charge." }
    ],
    isBest: true,
    pricingCategory: "Enterprise",
    intentKeywords: ["stripe payments api", "accept credit card online", "stripe subscription billing"],
    rating: 4.98
  },
  {
    id: "lemon-squeezy",
    name: "Lemon Squeezy",
    url: "https://lemonsqueezy.com",
    category: "Payments & Finance",
    subcategory: "Merchant of Record SaaS",
    tags: ["Merchant of Record", "SaaS Billing", "Global Tax", "Digital Goods", "Checkout"],
    description: "All-in-one platform for running SaaS businesses with merchant-of-record global tax compliance.",
    descriptionAr: "منصة المدفوعات والضرائب الشاملة لبيع البرمجيات والاشتراكات الرقمية وتسهيل المحاسبة العالمية.",
    plans: [
      { tier: "Pay As You Grow", price: "5% + 50¢", details: "Includes global sales tax compliance and payout processing." }
    ],
    isBest: true,
    pricingCategory: "Enterprise",
    intentKeywords: ["lemon squeezy saas payments", "merchant of record tax saas", "sell digital software"],
    rating: 4.95
  },

  // --- Marketing & Analytics ---
  {
    id: "posthog",
    name: "PostHog",
    url: "https://posthog.com",
    category: "Marketing & Analytics",
    subcategory: "Product Analytics Suite",
    tags: ["Analytics", "Session Replay", "Feature Flags", "Open Source", "A/B Testing"],
    description: "The single open source platform for product analytics, session recording, feature flags, and survey collection.",
    descriptionAr: "منصة تحليلات المنتجات والتطبيقات مفتوحة المصدر، إعادة تسجيل جلسات المستخدمين، واختبار الميزات المباشرة.",
    plans: [
      { tier: "Free Generous Tier", price: "Free", details: "1 Million events/mo free every month." },
      { tier: "Pay-As-You-Go", price: "Usage Based", details: "Pay only for what you use above 1M events." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["posthog product analytics free", "open source Google analytics alternative", "session replay tool"],
    rating: 4.95
  },
  {
    id: "plausible",
    name: "Plausible Analytics",
    url: "https://plausible.io",
    category: "Marketing & Analytics",
    subcategory: "Privacy Web Analytics",
    tags: ["Privacy", "Analytics", "GDPR", "Lightweight", "Open Source"],
    description: "Lightweight and open-source web analytics. No cookies, fully privacy-compliant, and under 1KB script size.",
    descriptionAr: "حزمة تحليلات الويب الخفيفة والآمنة للخصوصية، تعمل بدون ملفات تعريف ارتباط الكوكيز ومتوافقة مع قوانين الحماية.",
    plans: [
      { tier: "Free Trial", price: "Free Trial", details: "30-day full feature free trial." },
      { tier: "Growth", price: "$9/mo", details: "Up to 10k monthly pageviews for unlimited websites." }
    ],
    isBest: false,
    pricingCategory: "Free Trial",
    intentKeywords: ["plausible privacy web analytics", "gdpr compliant analytics", "lightweight website counter"],
    rating: 4.89
  },
  {
    id: "resend-email",
    name: "Resend",
    url: "https://resend.com",
    category: "Marketing & Analytics",
    subcategory: "Developer Email API",
    tags: ["Email API", "Transactional Email", "React Email", "SMTP", "Developers"],
    description: "The email API built for developers. Design modern transactional emails using React Email components.",
    descriptionAr: "أحدث واجهة برمجة لإرسال البريد الإلكتروني للمطورين وتصميم القوالب التفاعلية بلغة React Email.",
    plans: [
      { tier: "Free", price: "Free", details: "3,000 emails/month and 100 emails/day." },
      { tier: "Pro", price: "$20/mo", details: "50,000 emails/month and dedicated IP option." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["resend email api developer", "free transactional email api", "react email template builder"],
    rating: 4.96
  },

  // --- Security & Utilities ---
  {
    id: "cloudflare",
    name: "Cloudflare",
    url: "https://cloudflare.com",
    category: "Security & Cloud Utilities",
    subcategory: "CDN & Global Security",
    tags: ["CDN", "DNS", "DDoS Protection", "Workers", "Zero Trust"],
    description: "Global cloud platform providing ultra-fast DNS, free SSL certificates, DDoS protection, and edge compute Workers.",
    descriptionAr: "شبكة الأمان وتسريع المواقع الأولى عالمياً لتوفير حماية DDoS، تسريع DNS، وشهادات الأمان المجانية SSL.",
    plans: [
      { tier: "Free Tier", price: "Free", details: "Free DNS, global CDN, SSL, and unmetered DDoS mitigation." },
      { tier: "Pro", price: "$20/mo", details: "Enhanced web application firewall (WAF) and image optimization." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["cloudflare free cdn ssl", "free ddos protection", "fast global dns"],
    rating: 4.99
  },
  {
    id: "bitwarden",
    name: "Bitwarden",
    url: "https://bitwarden.com",
    category: "Security & Cloud Utilities",
    subcategory: "Password Manager",
    tags: ["Password Manager", "Open Source", "Security", "Encryption", "2FA"],
    description: "Open-source, end-to-end encrypted password manager trusted by millions to secure credentials everywhere.",
    descriptionAr: "مدير كلمة المرور المفتوح المصدر والمشفّر بالكامل لحفظ الحسابات والرموز السرية بأعلى معايير الأمان.",
    plans: [
      { tier: "Free Forever", price: "Free", details: "Unlimited passwords and items across all personal devices." },
      { tier: "Premium", price: "$10/yr", details: "Integrated 2FA authenticator and 1GB encrypted storage." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["bitwarden open source password manager", "free encrypted password vault", "bitwarden vs 1password"],
    rating: 4.97
  },
  {
    id: "tailscale",
    name: "Tailscale",
    url: "https://tailscale.com",
    category: "Security & Cloud Utilities",
    subcategory: "Zero Config Mesh VPN",
    tags: ["VPN", "WireGuard", "Networking", "Mesh VPN", "Security"],
    description: "Zero-configuration VPN that creates a secure mesh network between your servers, computers, and cloud instances.",
    descriptionAr: "شبكة اتصال خاصة وآمنة تماماً بدون إعدادات معقدة لربط الأجهزة والسيرفرات بسلاسة وأمان متناهي.",
    plans: [
      { tier: "Personal Free", price: "Free", details: "Up to 3 users and 100 devices on a mesh network." },
      { tier: "Starter", price: "$6/user/mo", details: "User access controls and network audit logs." }
    ],
    isBest: true,
    pricingCategory: "Free",
    intentKeywords: ["tailscale mesh vpn free", "wireguard zero config network", "connect homelab securely"],
    rating: 4.96
  }
];

// Write to extendedDirectory.ts
const extendedContent = `import { Website } from "../src/types";

export const extendedWebsiteDirectory: Website[] = ${JSON.stringify(websites, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../data/extendedDirectory.ts'), extendedContent, 'utf-8');

// Write first 30 to directory.ts
const directoryContent = `import { Website } from "../src/types";

export const websiteDirectory: Website[] = ${JSON.stringify(websites.slice(0, 30), null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../data/directory.ts'), directoryContent, 'utf-8');

console.log(`Successfully updated directories with ${websites.length} high-quality verified items!`);
