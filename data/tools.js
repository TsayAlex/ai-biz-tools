export const tools = [
  {
    slug:"chatgpt", name:"ChatGPT", category:"Productivity", score:4.9,
    professions:["Consultants","Agencies","Local Businesses","Ecommerce"],
    best:"Everyday AI assistant",
    description:"A general-purpose AI assistant for writing, research, analysis, planning and business workflows.",
    useCases:["Draft emails and proposals","Summarize documents","Research and brainstorm","Create repeatable business workflows"],
    pros:["Broad range of business tasks","Strong writing and analysis","Useful for solo owners and teams"],
    cons:["Outputs still need human review","Best workflow depends on your process"],
    website:"https://chatgpt.com/",
    pricingNote:"Verified Sep 2026: ChatGPT Business Standard is $20/user/month billed annually or $25 monthly; Premium seats are higher. Free/individual plans also exist. Verify before purchase.",
    verdict:"A strong starting point for a small business that wants one flexible AI assistant before buying many specialist tools."
  },
  {
    slug:"claude", name:"Claude", category:"Productivity", score:4.8,
    professions:["Consultants","Agencies","Local Businesses"],
    best:"Documents & analysis",
    description:"An AI assistant well suited to long documents, drafting, synthesis and knowledge-heavy work.",
    useCases:["Review long documents","Draft structured reports","Analyze source material","Create internal documentation"],
    pros:["Strong document workflows","Clear long-form drafting","Useful for knowledge work"],
    cons:["Not every business needs a second general AI assistant","Feature availability can vary by plan"],
    website:"https://claude.ai/",
    pricingNote:"Check Anthropic's current pricing page before publishing specific prices.",
    verdict:"Best considered when document-heavy analysis and long-form work are central to the business."
  },
  {
    slug:"canva", name:"Canva", category:"Marketing", score:4.8,
    professions:["Restaurants","Real Estate","Ecommerce","Contractors","Agencies"],
    best:"Visual marketing",
    description:"A visual design platform with AI-assisted features for social posts, ads, presentations and brand assets.",
    useCases:["Create social graphics","Prepare presentations","Design simple ads","Build brand templates"],
    pros:["Easy for non-designers","Large template ecosystem","Useful across many marketing channels"],
    cons:["AI output still needs brand review","Advanced design work may need specialist software"],
    website:"https://www.canva.com/",
    pricingNote:"Verified Sep 2026: Canva Free is $0; Pro is listed at $180/year for one person and Business at $250/year per person on Canva’s US pricing page. AI allowances vary by plan.",
    verdict:"A practical choice for small businesses that need frequent visual content without a full-time designer."
  },
  {
    slug:"zapier", name:"Zapier", category:"Automation", score:4.7,
    professions:["Consultants","Agencies","Ecommerce","Local Businesses"],
    best:"Workflow automation",
    description:"An automation platform for connecting apps and reducing repetitive work across common business workflows.",
    useCases:["Send leads between apps","Automate notifications","Create multi-step workflows","Connect forms, CRM and spreadsheets"],
    pros:["Large integration ecosystem","No-code friendly","Scales from simple to multi-step workflows"],
    cons:["Task usage can become costly at scale","Poorly designed automations can become hard to maintain"],
    website:"https://zapier.com/",
    pricingNote:"Verified Sep 2026: Zapier offers free and paid plans. AI by Zapier on paid plans uses model-tier task multipliers, so automation cost depends on model tier and workflow usage.",
    verdict:"A high-leverage tool when a business already repeats the same admin steps across several apps."
  },
  {
    slug:"hubspot", name:"HubSpot", category:"Sales", score:4.7,
    professions:["Real Estate","Consultants","Agencies","Contractors"],
    best:"CRM & sales",
    description:"A CRM and customer platform for tracking leads, sales activity, marketing and customer relationships.",
    useCases:["Track leads","Manage sales pipeline","Centralize customer records","Automate follow-up"],
    pros:["Strong CRM foundation","Good ecosystem for growth","Useful free entry point historically"],
    cons:["Can become complex","Paid feature costs should be checked carefully"],
    website:"https://www.hubspot.com/",
    pricingNote:"Verify current HubSpot plan pricing and AI feature availability before publishing exact prices.",
    verdict:"Useful for businesses that need a real CRM rather than a collection of disconnected lead spreadsheets."
  },
  {
    slug:"tidio", name:"Tidio", category:"Customer Support", score:4.5,
    professions:["Ecommerce","Restaurants","Local Businesses"],
    best:"Customer support",
    description:"A customer-support platform combining live chat, helpdesk features and automation for online businesses.",
    useCases:["Answer common customer questions","Capture leads from website chat","Route conversations","Support ecommerce visitors"],
    pros:["Focused on customer conversations","Accessible to smaller businesses","Combines live and automated support"],
    cons:["Automation quality depends on setup","Not every local business needs live chat"],
    website:"https://www.tidio.com/",
    pricingNote:"Verified Sep 2026: Tidio lists Free at $0, Starter from $24.17/month and Growth from $49.17/month; Lyro AI conversation limits and higher tiers vary.",
    verdict:"Worth evaluating when website visitors regularly ask repetitive pre-sale or support questions."
  },
  {
    slug:"buffer", name:"Buffer", category:"Marketing", score:4.4,
    professions:["Restaurants","Real Estate","Consultants","Local Businesses"],
    best:"Social media",
    description:"A social-media publishing and planning platform with tools that help small teams create and schedule content.",
    useCases:["Schedule posts","Plan a content calendar","Repurpose ideas","Coordinate channels"],
    pros:["Simple publishing workflow","Good fit for small teams","Reduces manual posting"],
    cons:["Does not replace a marketing strategy","Platform features change frequently"],
    website:"https://buffer.com/",
    pricingNote:"Verified Sep 2026: Buffer offers a free plan for up to 3 channels; Essentials starts at $5/month per channel when billed yearly and includes AI Assistant.",
    verdict:"Useful when consistency of social publishing is the main problem rather than content strategy itself."
  },
  {
    slug:"notion-ai", name:"Notion AI", category:"Productivity", score:4.5,
    professions:["Consultants","Agencies","Real Estate"],
    best:"Operations & knowledge",
    description:"AI features inside a workspace used for notes, documentation, SOPs, project knowledge and collaboration.",
    useCases:["Create SOPs","Summarize team notes","Search internal knowledge","Draft project documentation"],
    pros:["AI works near existing notes","Good documentation workflow","Flexible workspace"],
    cons:["Can become messy without structure","AI value is lower if your team does not already use Notion"],
    website:"https://www.notion.com/",
    pricingNote:"Verified Sep 2026: Notion AI core features are included in Business ($20/member/month on the displayed monthly pricing) and Enterprise; Free/Plus receive limited AI trial usage.",
    verdict:"A good option for teams already using Notion as their operational knowledge base."
  },
  {
    slug:"otter-ai", name:"Otter.ai", category:"Productivity", score:4.4,
    professions:["Consultants","Agencies","Real Estate"],
    best:"Meeting notes",
    description:"Meeting transcription and summarization software for customer calls, interviews and internal meetings.",
    useCases:["Transcribe meetings","Create call summaries","Capture action items","Search past conversations"],
    pros:["Reduces manual note-taking","Useful for client-facing teams","Searchable meeting history"],
    cons:["Transcripts require review","Consent and privacy rules matter"],
    website:"https://otter.ai/",
    pricingNote:"Verified Sep 2026: Otter Basic is free; Pro and Business have monthly/annual pricing and usage limits. The displayed annual rates are lower than monthly billing.",
    verdict:"Most valuable for businesses where meetings create a lot of follow-up work and lost notes."
  },
  {
    slug:"jasper", name:"Jasper", category:"Content", score:4.3,
    professions:["Agencies","Ecommerce","Consultants"],
    best:"Marketing content",
    description:"An AI-focused marketing content platform designed for teams producing frequent branded campaigns.",
    useCases:["Draft campaign copy","Create content variants","Support brand consistency","Accelerate marketing production"],
    pros:["Marketing-specific workflows","Built for teams","Brand-oriented tooling"],
    cons:["May overlap with general AI assistants","ROI depends on content volume"],
    website:"https://www.jasper.ai/",
    pricingNote:"Verified Sep 2026: Jasper Pro is $59/month billed yearly or $69 monthly; Business uses custom pricing. Some advanced usage can also consume credits.",
    verdict:"Better suited to businesses with a real marketing production workload than occasional copy needs."
  },
  {
    slug:"descript", name:"Descript", category:"Content", score:4.5,
    professions:["Agencies","Consultants","Real Estate"],
    best:"Video & podcasts",
    description:"A video and audio editing platform with text-based and AI-assisted workflows.",
    useCases:["Edit talking-head videos","Create clips","Clean audio","Turn interviews into content"],
    pros:["Text-based editing is approachable","Good for repurposing content","Combines audio and video workflows"],
    cons:["Not needed for businesses that rarely create media","Final quality still depends on source material"],
    website:"https://www.descript.com/",
    pricingNote:"Check Descript's current pricing and usage limits before publishing.",
    verdict:"Strong fit for businesses turning calls, interviews or expertise into repeatable video and audio content."
  },
  {
    slug:"perplexity", name:"Perplexity", category:"Productivity", score:4.5,
    professions:["Consultants","Agencies","Local Businesses"],
    best:"Research",
    description:"An AI research product for quickly finding, summarizing and exploring web-based information.",
    useCases:["Market research","Find sources","Explore competitors","Research unfamiliar topics"],
    pros:["Fast research workflow","Source-oriented experience","Useful for discovery"],
    cons:["Sources still need verification","Not a replacement for expert judgment"],
    website:"https://www.perplexity.ai/",
    pricingNote:"Check Perplexity's current pricing and plan features before publication.",
    verdict:"Useful as a research companion when the task starts with finding and checking information on the web."
  },
  {
    slug:"jobber", name:"Jobber", category:"Operations", score:4.7,
    professions:["Contractors","Local Businesses"],
    best:"Scheduling, quoting & AI receptionist",
    description:"Field-service software for quoting, scheduling, invoicing and customer communication, with an AI Receptionist option for calls and texts.",
    useCases:["Answer calls while on jobs","Book work and capture requests","Manage quotes and scheduling","Keep customer communication in one system"],
    pros:["Purpose-built for field service","AI Receptionist can handle calls and texts","Combines operations with customer communication"],
    cons:["Some AI capabilities are add-ons or plan-dependent","May be more software than a solo operator needs"],
    website:"https://www.getjobber.com/",
    pricingNote:"Verified Sep 2026: Jobber lists plans starting at $29/month. AI Receptionist is listed as a $29/month add-on on eligible plans and is included with Plus; usage terms can apply.",
    verdict:"One of the stronger contractor-specific options when missed calls, scheduling and quote follow-up matter more than generic content creation."
  },
  {
    slug:"quoteiq", name:"QuoteIQ", category:"Estimating", score:4.6,
    professions:["Contractors"],
    best:"AI-assisted estimates & field-service workflow",
    description:"Contractor-focused CRM and estimating software with AI Estimator, AI CoPilot and related automation features powered by monthly AI credits.",
    useCases:["Create draft estimates","Turn job details into quote structure","Manage customer and job records","Use AI-assisted field-service workflows"],
    pros:["Contractor-specific workflow","AI estimating is part of the product","Multiple plan levels for small to larger teams"],
    cons:["AI usage is credit-based","Generated estimates still require human verification of prices, scope and local conditions"],
    website:"https://myquoteiq.com/",
    pricingNote:"Verified Sep 2026: QuoteIQ lists Essentials at $29.99/month with 500 AI credits; higher tiers increase users, features and credit allowances.",
    verdict:"Worth testing for contractors who want AI closer to quoting and estimating rather than a general-purpose writing assistant."
  },
  {
    slug:"housecall-pro", name:"Housecall Pro", category:"Operations", score:4.6,
    professions:["Contractors","Local Businesses"],
    best:"Field service operations with built-in AI team",
    description:"Field-service management software for scheduling, dispatch, estimates and customer workflows, with AI teammates for support, analytics and guidance.",
    useCases:["Run scheduling and dispatch","Summarize customer context","Use AI guidance inside operations","Handle customer calls with optional CSR AI"],
    pros:["AI is integrated into field-service workflows","Broad operational feature set","Good fit for established home-service businesses"],
    cons:["Can be heavier than a simple point solution","CSR AI and some capabilities may have separate availability or costs"],
    website:"https://www.housecallpro.com/",
    pricingNote:"Verified Sep 2026: Housecall Pro lists annual-billing rates from $59/month for Basic, with higher plans for larger teams. Core AI teammates are included; CSR AI is an optional add-on.",
    verdict:"A strong candidate when the business needs an operating system for field service, not just an isolated AI tool."
  },
  {
    slug:"companycam", name:"CompanyCam", category:"Documentation", score:4.5,
    professions:["Contractors"],
    best:"Job-site photo documentation & AI reports",
    description:"Photo-first field documentation software with AI summaries, reports, checklists, captions, translations and project recaps.",
    useCases:["Create reports from job-site photos","Generate daily logs and recaps","Turn voice/photo context into documentation","Keep crews and customers aligned"],
    pros:["Designed for field work","AI works with project photos and notes","Useful for documentation-heavy trades"],
    cons:["Best value comes when teams already document jobs consistently","AI feature availability depends on plan"],
    website:"https://companycam.com/",
    pricingNote:"Verified Sep 2026: CompanyCam offers a trial and AI features on select plans; unlimited AI is promoted on its Scale plan. Verify current plan pricing before purchase.",
    verdict:"Especially useful for contractors whose biggest admin burden is documenting jobs, producing updates and organizing field photos."
  },
  {
  slug:"elevenlabs",
  name:"ElevenLabs",
  category:"Content Creation",
  score:4.7,
  professions:["Agencies","Ecommerce","Consultants","Local Businesses"],
  best:"AI voice generation & text-to-speech",
  description:"AI voice platform for generating natural-sounding speech, voiceovers and audio content from text.",
  useCases:["Create marketing voiceovers","Turn written content into audio","Produce narration for videos","Generate multilingual speech"],
  pros:["Natural-sounding AI voices","Useful for video and audio content","Supports multiple languages"],
  cons:["Not every small business needs AI voice generation","Usage limits depend on the selected plan"],
  website:"https://try.elevenlabs.io/d40ov9pmbed3",
  pricingNote:"Check ElevenLabs' current pricing page for the latest plans and usage limits.",
  verdict:"A strong option for small businesses and creators that regularly need professional-sounding voiceovers and audio content."
},

];

export const businesses = [
  {
    slug:"real-estate", name:"Real Estate", icon:"🏠",
    title:"Best AI tools for real estate businesses",
    description:"Tools for property marketing, lead follow-up, meetings, research and repetitive admin.",
    needs:["Create listing and social content","Respond to leads faster","Summarize calls and viewings","Organize customer follow-up"],
    recommended:["chatgpt","canva","hubspot","otter-ai","descript"]
  },
  {
    slug:"ecommerce", name:"Ecommerce", icon:"🛒",
    title:"Best AI tools for ecommerce",
    description:"Tools for product content, customer support, marketing and store operations.",
    needs:["Create product and campaign content","Handle repetitive customer questions","Automate order-related workflows","Produce visual marketing"],
    recommended:["chatgpt","canva","zapier","tidio","jasper"]
  },
  {
    slug:"contractors", name:"Contractors", icon:"🔧",
    title:"Best AI tools for contractors",
    description:"Practical software for quotes, lead follow-up, marketing and reducing office admin.",
    needs:["Respond to quote requests","Keep track of leads","Create local marketing content","Reduce repetitive admin"],
    recommended:["jobber","quoteiq","chatgpt","companycam","canva"]
  },
  {
    slug:"restaurants", name:"Restaurants", icon:"🍽️",
    title:"Best AI tools for restaurants",
    description:"Tools for social content, customer messaging, visual marketing and local promotion.",
    needs:["Publish social content consistently","Answer customer questions","Create menus and promotions","Reduce repetitive messaging"],
    recommended:["canva","buffer","tidio","chatgpt"]
  },
  {
    slug:"consultants", name:"Consultants", icon:"💼",
    title:"Best AI tools for consultants",
    description:"Tools for research, proposals, meetings, documentation and client delivery.",
    needs:["Research client problems","Draft proposals and reports","Capture meeting notes","Create repeatable workflows"],
    recommended:["chatgpt","claude","otter-ai","notion-ai","perplexity"]
  },
  {
    slug:"agencies", name:"Agencies", icon:"🎯",
    title:"Best AI tools for agencies",
    description:"Tools for content production, research, automation, client work and team knowledge.",
    needs:["Produce content efficiently","Automate repetitive client work","Research quickly","Document processes"],
    recommended:["chatgpt","claude","zapier","canva","jasper","descript"]
  },
  {
    slug:"local-business", name:"Local Business", icon:"📍",
    title:"Best AI tools for local businesses",
    description:"A practical starter stack for small teams that need marketing, admin and customer communication help.",
    needs:["Create local marketing content","Respond to customers faster","Automate simple admin","Research and plan"],
    recommended:["chatgpt","canva","buffer","zapier","tidio"]
  }
];

export const comparisons = [
  {
    slug:"chatgpt-vs-claude",
    a:"chatgpt", b:"claude",
    title:"ChatGPT vs Claude for small business",
    intro:"Both are flexible AI assistants. The better choice depends on the work you do most often rather than a single universal winner.",
    rows:[
      ["Best starting point","Broad everyday workflows","Document-heavy knowledge work"],
      ["Writing","Strong","Strong"],
      ["Long documents","Strong","Especially useful"],
      ["Automation ecosystem","Broad surrounding ecosystem","Depends on workflow"],
      ["Who should test first?","Most small businesses","Consultants and document-heavy teams"]
    ],
    conclusion:"If you are buying your first general AI assistant, test both on three real weekly tasks and keep the one that saves more time with less correction."
  },
  {
    slug:"zapier-vs-chatgpt",
    a:"zapier", b:"chatgpt",
    title:"Zapier vs ChatGPT: different jobs, often better together",
    intro:"This is not a direct substitute comparison. ChatGPT helps think and create; Zapier connects systems and executes repeatable workflows.",
    rows:[
      ["Primary job","Automation between apps","AI assistant"],
      ["Best for","Repeatable processes","Writing, analysis, research"],
      ["Requires workflow design","Yes","Sometimes"],
      ["Can replace the other?","Usually no","Usually no"]
    ],
    conclusion:"A common small-business stack is to use an AI assistant for reasoning and drafting, then automation software for moving information between apps."
  }
];

export const getTool = slug => tools.find(t => t.slug === slug);
export const getBusiness = slug => businesses.find(b => b.slug === slug);
export const getComparison = slug => comparisons.find(c => c.slug === slug);
