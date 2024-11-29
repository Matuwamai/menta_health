import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the GoogleGenerativeAI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDLe-TZxyfBUwfMCOxZtZCrYae-9susrlY"); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Define mental health-related keywords
const mentalHealthKeywords = [
  "anxiety", "anxious", "depression", "depressed", "sadness", "hopeless",
  "hopelessness", "grief", "loss", "mourning", "loneliness", "isolation",
  "emptiness", "frustration", "irritability", "anger", "guilt", "shame",
  "fear", "worry", "tearful", "crying", "helplessness", "despair", "rejection",
  "confusion", "vulnerability", "heartache", "hello", "good morning", "hi", "good evening",
  "can you hear me", "talk to you", "jokes", "fun",// Stress and Pressure
  "stress", "stressed", "panic", "panic attack", "overwhelmed", "burnout", "exhausted", 
  "distress", "pressure", "tension", "fatigue", "nervous", "restless", "on edge",
  "overworked", "under pressure", "drowning in stress", "frazzled", "uptight", "tense", "provoked", "mental issue", "agitated", "irritated",

  // Therapy and Counseling
  "therapy", "therapist", "counseling", "counselor", "mental health", "psychologist", 
  "psychiatrist", "treatment", "diagnosis", "support group", "self-care", "mindfulness",
  "mental wellness", "mental fitness", "emotional support", "life coach", "meditation",
  "coping mechanisms", "mental health resources", "seeking help", "group therapy",

  // Self-harm and Crisis
  "self-harm", "self harm", "suicidal", "suicide", "end my life", "kill myself", 
  "cutting", "hurting myself", "can't go on", "giving up", "crisis", "helpless", 
  "worthless", "no purpose", "broken", "unfixable", "self-doubt", "painful thoughts",
  "dark thoughts", "emotional breakdown", "giving up on life", "cry for help",
  "self-injury", "self-inflicted wounds", "self-destructive",

  // Well-being and Coping
  "coping", "healing", "recovery", "support", "emotional", "emotions", "well-being", 
  "wellbeing", "self-love", "resilience", "breathe", "take a break", "relax", 
  "progress", "growth", "calm", "hope", "inner peace", "reflection", "gratitude",
  "journaling", "positive mindset", "self-awareness", "acceptance", "boundaries",
  "self-compassion", "taking time for myself", "grounding techniques", "balance",
  "peace of mind", "personal growth", "inner strength",

  // Trauma and Abuse
  "trauma", "traumatic", "abuse", "ptsd", "flashbacks", "nightmares", 
  "domestic violence", "assault", "harassment", "bullying", "emotional abuse", 
  "physical abuse", "sexual abuse", "neglect", "survivor", "childhood trauma", 
  "toxic relationships", "manipulation", "gaslighting", "abandonment", "betrayal",
  "trauma recovery", "healing from abuse", "past trauma",

  // Modern and Colloquial Terms
  "breakdown", "meltdown", "spiraling", "shut down", "can't deal", "losing it", 
  "drowning", "hitting rock bottom", "low point", "drained", "suffocating", 
  "not okay", "need help", "help me", "struggling", "empty", "done with life",
  "emotionally numb", "checked out", "zoned out", "disconnected", "can't focus",
  "mentally drained", "tired of everything", "nothing feels real", "burned out",
  "out of sorts", "falling apart", "can't cope",

  // Positive Encouragement (Optional for Contextual Responses)
  "hope", "inner strength", "you are not alone", "things will get better", 
  "reaching out", "taking the first step", "finding peace", "keep going",
  "you matter", "it's okay to feel this way", "you are enough", "stay strong",
  "we're in this together", "one step at a time", "brighter days ahead",
  "you are valued", "never give up", "you've got this", "stay positive",

  // Additional Terms
  "burnout", "overwhelmed", "overloaded", "mental load", "chronic stress", "emotional exhaustion",
  "anxious thoughts", "mental fog", "nervous breakdown", "sleep deprivation", "mood swings",
  "feeling stuck", "brain fog", "self-worth", "feeling small", "lack of motivation", "detached",
  "apathetic", "dissociation", "insecurity", "feeling lost", "lost in thought", "dissociation", "withdrawn",
  "disconnected from reality", "not feeling like myself", "frustrated with myself", "lack of energy", "feeling unfulfilled",

  // Additional Emotional and Psychological Struggles
  "abandoned", "defeated", "empty inside", "feeling trapped", "feeling small", "rejected",
  "out of control", "unsettled", "panic mode", "overthinking", "hypervigilant", "social anxiety",
  "compulsive behavior", "addiction", "substance abuse", "fear of failure", "self-sabotage",
  "self-criticism", "imposter syndrome", "perfectionism", "constant worry", "paranoia", 
  "feeling judged", "isolated", "paralyzed by fear", "trust issues", "negative self-talk",
  "low self-esteem", "feeling misunderstood", "feeling weak", "cognitive distortions",
  "burnout syndrome", "unmotivated", "lack of hope", "mental overload", "losing hope",
  "surrender", "rejection sensitivity", "intrusive thoughts",
  // Emotional and Psychological Struggles (Continued)
  "numbness", "dissociation", "exhaustion", "guilt-ridden", "helplessness", "isolation",
  "intrusive thoughts", "shameful", "regret", "feeling inadequate", "stigma", "sensitivity",
  "detachment", "hopelessness", "feeling abandoned", "lack of support", "triggered", "vulnerability",
  "self-loathing", "disempowered", "empty shell", "lost sense of purpose", "feeling misaligned", 
  "loss of control", "emotional instability", "chronic fatigue", "anxiety spiral", "fearing the worst", 
  "unworthy", "feeling judged", "alienation", "restlessness", "discomfort", "overthinking everything", 
  "sensitivity to criticism", "mentally overwhelmed", "self-isolation", "racing thoughts", "fear of rejection", 
  "unpredictability", "anxiety-induced", "unreliable thoughts", "uncontrollable emotions", "panic mode", 
  "constant pressure", "burdened", "unrealistic expectations", "perceived failure", "unrelenting thoughts", 
  "overburdened", "apprehension", "impulsiveness", "cognitive distortion", "emotionally drained", "feeling empty",
  "withdrawal symptoms", "mental block", "feeling ignored", "constantly anxious", "constant guilt", "ruminating thoughts",

  // Behavioral Struggles
  "addiction recovery", "substance dependency", "compulsive disorder", "obsessive thoughts", 
  "depression relapse", "behavioral issues", "irritability triggers", "habit-breaking", "self-sabotage", 
  "uncontrollable urges", "impulsive behaviors", "poor self-image", "acting out", "unpredictable mood swings", 
  "insomnia", "chronic worry", "perfectionist tendencies", "distorted self-image", "self-criticism loop", 
  "disturbed sleep patterns", "excessive guilt", "emotionally reactive", "distrust of others", "struggling with change", 
  "low self-worth", "fear of judgment", "frequent emotional shifts", "habitual procrastination", 
  "self-destructive behaviors", "behavioral inconsistencies", "addictive tendencies", "struggling to cope with loss", 
  "unwanted memories", "ritualistic behaviors",

  // Relationship and Social Struggles
  "codependency", "abusive relationships", "toxic friendships", "unhealthy attachments", 
  "emotional unavailability", "lonely in a crowd", "betrayal trauma", "partner abuse", "emotional manipulation", 
  "alienation", "rejected by peers", "disconnection from loved ones", "unspoken expectations", "relationship breakdown", 
  "toxic work environment", "family dysfunction", "neglect", "broken relationships", "misunderstandings", 
  "lacking empathy", "estrangement", "toxic positivity", "lack of boundaries", "unmet emotional needs", 
  "struggling with intimacy", "attachment anxiety", "fear of abandonment", "strained relationships",

  // Existential and Identity Struggles
  "identity crisis", "existential dread", "feeling lost in life", "questioning life purpose", 
  "mid-life crisis", "fear of the future", "existential angst", "unsure of self", "lack of self-awareness", 
  "uncertainty about life choices", "self-discovery journey", "meaninglessness", "searching for purpose", 
  "existential loneliness", "searching for belonging", "feeling of insignificance", "uncertain future", 
  "self-doubt in decisions", "conflicted self-image", "feeling invisible", "losing my sense of self", 
  "struggling with who I am", "personal transformation", "facing fears", "life-altering decisions",

  // Mental Wellness (Positive)
  "inner calm", "positive affirmations", "self-reflection", "personal development", "gratitude practice", 
  "mindful living", "peaceful mind", "self-discovery", "emotional regulation", "self-awareness journey", 
  "meditative state", "healing journey", "acceptance of self", "love yourself first", "finding purpose", 
  "positive habits", "self-care routine", "mental clarity", "nourishing the soul", "mental peace", 
  "self-compassionate thoughts", "grounding practices", "embracing change", "stress relief activities", 
  "reconnecting with self", "emotional intelligence", "personal growth mindset", "building confidence", 
  "positive self-talk", "being present", "feeling fulfilled", "mental rest", "gaining clarity", "resilience building",
  "progressive healing", "creating boundaries", "feeling empowered", "self-love journey",
  // Deep Emotional Struggles
  "inner turmoil", "feeling broken inside", "constant anxiety", "nervous tension", "fear of failure", 
  "low self-esteem", "self-doubt", "repetitive thoughts", "emotional numbness", "feeling abandoned", 
  "personal defeat", "fear of rejection", "insecurities", "disconnected from others", "feeling trapped", 
  "loss of control", "mental paralysis", "discomfort with emotions", "self-disrespect", "burning out", 
  "mentally overwhelmed", "feeling misunderstood", "emotional exhaustion", "mental exhaustion", "out of touch with self",
  
  // Social Anxiety and Isolation
  "social withdrawal", "social anxiety", "fear of crowds", "shyness", "avoidance", "lonely", "reclusive", 
  "embarrassment", "avoidance behavior", "feeling self-conscious", "afraid of socializing", "unable to connect", 
  "being judged", "feeling small in a crowd", "unable to speak up", "public speaking fear", "social discomfort", 
  "fear of judgment", "always on guard", "feeling awkward in social settings", "unable to trust others",

  // Cognitive Struggles and Thinking Patterns
  "cognitive distortion", "negative self-talk", "overanalyzing", "rumination", "black-and-white thinking", 
  "catastrophizing", "perfectionism", "all-or-nothing thinking", "reality distortion", "mental fog", 
  "disorganized thoughts", "negative spiral", "paranoia", "feeling confused", "lack of focus", "memory issues",
  "cognitive overload", "self-criticism", "mental blocks", "ruminating thoughts", "uncontrollable thoughts", 
  "thinking traps", "difficulty concentrating", "trouble focusing", "thought spirals", "overthinking everything",

  // Recovery and Hope
  "self-healing", "inner growth", "recovery process", "personal development", "healing from trauma", 
  "recovering from burnout", "finding peace within", "starting over", "letting go", "moving forward", 
  "mental healing", "taking it one day at a time", "healing from grief", "journey to recovery", "building resilience", 
  "overcoming trauma", "self-empowerment", "rediscovery of self", "growing stronger", "emotional rebirth",
  "embracing new beginnings", "building emotional strength", "learning from pain", "taking charge of my life",
  
  // Relationships and Communication Struggles
  "communication breakdown", "emotional disconnect", "lacking empathy", "difficulty expressing emotions", 
  "feeling unheard", "suppressing emotions", "miscommunication", "relational conflict", "emotional avoidance", 
  "difficulty trusting", "relationship challenges", "love-hate relationship", "emotional baggage", "broken trust", 
  "struggling with vulnerability", "fearing intimacy", "communication issues", "conflict resolution", "strained communication",

  // Self-Improvement and Emotional Health
  "healing practices", "embracing vulnerability", "taking responsibility for healing", "mental clarity", 
  "positive affirmations", "embracing emotions", "emotional intelligence", "finding your center", "personal reflection", 
  "mental space", "rebuilding confidence", "transforming negativity", "inner peace journey", "mental growth", 
  "transformative practices", "self-empowerment journey", "letting go of negativity", "embracing positive change", 
  "boosting self-worth", "challenging negative thoughts", "self-compassion", "acceptance over perfection", 
  "healing through self-love", "discovering self-worth", "practicing forgiveness", "accepting yourself fully",
  
  // Life Challenges and Existential Thoughts
  "life meaning", "existential crisis", "purpose in life", "life struggles", "survival mode", "questioning existence", 
  "overcoming adversity", "deep reflection", "lack of fulfillment", "unsure of my purpose", "struggling with choices", 
  "looking for direction", "losing sight of goals", "identity questioning", "unanswered questions", "life challenges", 
  "overcoming fear of the unknown", "finding balance", "emotional growth through struggle", "life-altering decisions", 
  "feeling unprepared for life", "struggling with priorities", "feeling lost in life",

  // Impact of Technology and Media
  "social media pressure", "comparison culture", "information overload", "digital detox", "internet addiction", 
  "feeling overwhelmed by technology", "technology dependency", "media consumption anxiety", "pressure to perform", 
  "feeling disconnected from reality", "disconnection from real-life interactions", "cyberbullying", "toxic online spaces",
  "screen fatigue", "addiction to social validation", "fear of missing out (FOMO)", "pervasive anxiety from media", 
  "mental health and technology", "media influence on self-image", "excessive screen time", "disconnect from self",

  // Personal Growth and Mindfulness
  "self-awareness", "personal growth", "mindful living", "mindfulness practices", "inner awareness", "being present", 
  "meditation practices", "taking time for self", "focus on the present", "mental reset", "finding peace of mind", 
  "mental clarity practices", "mental strength building", "reflecting on progress", "embracing new experiences", 
  "personal transformation", "awareness of feelings", "achieving mental balance", "emotional mindfulness", "deep relaxation",
  "listening to your body", "reconnecting with your soul", "mental empowerment", "grounding yourself", "releasing tension", 
  "embracing inner peace", "finding balance in chaos",

  // More Common Terms and Struggles
  "negative mindset", "loss of motivation", "feelings of hopelessness", "drained by life", "emotional rollercoaster", 
  "feeling suffocated", "triggered memories", "self-doubt creeping in", "lack of motivation", "feeling stuck in place",
  "feeling out of sync", "exhaustion from overthinking", "lack of direction", "questioning reality", "too much to handle",
  "feeling invisible", "emotionally off-balance", "feeling overwhelmed by emotions", "mentally fragile", "constant worry", 
  "not feeling good enough", "lacking self-motivation", "negative emotions clouding judgment", "feeling too sensitive",

  // Additional Mental Health Concepts
  "psychological resilience", "emotional agility", "mental strength", "cognitive resilience", 
  "emotional intelligence", "emotional health", "cognitive flexibility", "mindset shift", "thought reframing", 
  "mental load management", "psychosomatic symptoms", "self-esteem boost", "emotional awareness", 
  "mental self-care", "trauma-informed care", "healing trauma", "mental clarity techniques", "staying grounded", 
  "calming techniques", "emotional regulation tools", "stress management tools", "grief recovery", "accepting help",
  "fear of success", "mental clutter", "unhealthy coping mechanisms", "gaining control over anxiety", 
  "emotional blockages", "conscious living", "change acceptance", "feeling at peace", "self-empowerment", 
  "mental and emotional balance", "stress-free living", "mind-body connection",
  // Emotional and Psychological Challenges
  "anxious thoughts", "fear of the future", "paranoia", "self-blame", "insecure", "self-criticism", "overwhelming thoughts",
  "self-consciousness", "nervous tension", "feeling out of place", "emotional distress", "denial", "regret", 
  "resentment", "sorrow", "emptiness inside", "feeling misunderstood", "feeling fragile", "inner conflict", 
  "distrust", "negative emotions", "avoiding emotions", "feeling paranoid", "intrusive thoughts", "rationalizing emotions", 
  "emotional exhaustion", "trapped in my mind", "feeling stuck in the past", "ruminating on mistakes", "helplessness", 
  "hopelessness in situations", "emotional numbness", "frustration with life", "dissatisfaction with life", "feeling stuck", 
  "anxiety disorders", "low mood", "uncontrollable fear", "overactive mind", "troubled thoughts", 

  // Coping and Managing Mental Health
  "mental self-care", "self-care routine", "grounding exercises", "acceptance of self", "healing journey", 
  "emotionally draining", "coping strategies", "finding comfort", "mental clarity", "reclaiming my life", 
  "taking control", "mental well-being", "self-compassion practices", "finding balance", "building resilience", 
  "emotional resilience", "healing from within", "learning to cope", "reaching out for support", "mental exercises", 
  "balancing mental health", "finding coping mechanisms", "healthy coping strategies", "emotional release", 
  "mental reset", "taking care of my mind", "positive reinforcement", "seeking emotional peace", "healthy boundaries", 
  "rebuilding self-esteem", "strengthening mental fortitude", "breaking the cycle of negative thoughts", 

  // Relationship and Social Struggles
  "emotional vulnerability", "fear of intimacy", "feeling unimportant", "lonely in relationships", 
  "distrust in relationships", "emotional distance", "feeling unappreciated", "feeling neglected", 
  "feeling distant from others", "distrustful of others", "fear of abandonment", "struggling with trust", 
  "relationship turmoil", "lack of support", "feeling disconnected in relationships", "fear of being hurt", 
  "emotional manipulation", "toxic relationships", "feeling left out", "strained family relationships", 
  "difficulty with communication", "emotional exhaustion from others", "detaching from others", 
  "feeling betrayed by others", "unresolved conflicts", "lack of emotional support", 

  // Negative Thought Patterns and Cognitive Distortions
  "negative self-talk", "cognitive dissonance", "thought distortions", "black-and-white thinking", "mind-reading", 
  "overgeneralization", "catastrophizing", "blaming others", "personalization", "ignoring positives", "filtering", 
  "self-sabotage", "feeling helpless in situations", "victim mentality", "always thinking the worst", "irrational fears", 
  "irrational thinking", "constant self-criticism", "unrealistic expectations", "unfounded worries", "imposter syndrome", 
  "comparing myself to others", "constant guilt", "self-doubt in every decision", "second-guessing", "thought rumination", 
  "mental paralysis", "feeling overwhelmed by decisions", "lack of mental clarity", 

  // Body and Physical Effects of Mental Health Struggles
  "physical exhaustion", "mental fatigue", "chronic fatigue", "muscle tension", "tightness in chest", 
  "feeling physically drained", "physical symptoms of anxiety", "nausea from stress", "headaches from anxiety", 
  "stomach issues", "body aches from stress", "insomnia", "disrupted sleep patterns", "chronic pain", "shaky hands", 
  "heart racing", "rapid breathing", "nervous stomach", "feeling cold all the time", "physical exhaustion from depression", 
  "feeling sick from stress", "difficulty breathing", "nervous sweating", "elevated heart rate", "nauseous thoughts", 
  "restlessness", "feeling dizzy", "shaking uncontrollably", "feeling faint", 

  // Substance Abuse and Addictive Behaviors
  "substance abuse", "addiction", "drug dependence", "alcoholism", "overuse", "self-medication", "escaping reality", 
  "numbing the pain", "overindulgence", "dependency on substances", "escapism through alcohol", "numbing through drugs", 
  "substance dependence", "addictive behaviors", "feeling dependent on substances", "getting high to cope", 
  "substance abuse recovery", "facing addiction", "feeling lost in addiction", "substance abuse disorder", 
  "denial about addiction", "dependency issues", "facing withdrawal", "substance abuse treatment", "substance-related crisis", 

  // Stress, Burnout, and Overwork
  "mental breakdown", "workplace stress", "workplace burnout", "pressure to perform", "feeling overworked", 
  "constant pressure", "work overload", "mental burnout", "exhausted from work", "feeling underappreciated at work", 
  "workaholism", "emotional burnout", "working through exhaustion", "over-scheduled", "burnout recovery", 
  "stress at work", "too many responsibilities", "overwhelmed by tasks", "dreading work", "feeling undervalued at work", 
  "feeling overburdened", "unable to keep up with work", "feeling lost at work", "too many expectations", 
  "failing to meet work demands", "work-life imbalance", 

  // Existential and Life Purpose Questions
  "questioning life's purpose", "searching for meaning", "struggling with life's purpose", "existential despair", 
  "not knowing my path", "feeling directionless", "life feels pointless", "feeling disconnected from purpose", 
  "life feels meaningless", "questioning existence", "no sense of direction", "feeling unfulfilled in life", 
  "questioning my choices", "not knowing what I want", "questioning my beliefs", "seeking life's meaning", 
  "struggling with the idea of death", "existential questioning", "facing my mortality", "searching for something more", 
  "life feels empty", "feeling lost without a purpose", 

  // Self-Expression and Communication
  "difficulty expressing emotions", "difficulty opening up", "keeping emotions bottled up", "fear of vulnerability", 
  "lack of emotional expression", "not being able to speak my truth", "struggling to communicate my feelings", 
  "shutting down emotionally", "emotional repression", "feeling misunderstood when speaking", "feeling unheard", 
  "difficulty sharing my feelings", "difficulty showing affection", "feeling isolated when talking", "unable to express myself", 
  "fear of being judged for my feelings", "feeling emotionally invalidated", "unable to articulate thoughts clearly", 

  // Other Emotional Struggles
  "feeling lost inside", "feeling trapped in my mind", "constant emotional rollercoaster", "mental overload", 
  "feeling disconnected from reality", "trouble managing emotions", "constant doubt", "emotional ups and downs", 
  "flooded with emotions", "loss of sense of self", "mental instability", "unable to trust my own thoughts", 
  "self-hatred", "self-rejection", "self-neglect", "feeling like an outsider", "feeling like a failure", 
  "feeling unloved", "fear of being alone", "feeling isolated from others", "mentally distant", "feeling uncertain", 
  "difficulty finding stability", "constant mental struggle", "feeling torn between choices", "emotional collapse", 
  "feeling emotionally drained", "hopeless about the future", "always on edge", "feeling like I can't handle life", 
  "feeling disconnected from everyone", "unable to find comfort anywhere"
];
 
// Define high-risk escalation keywords
const highRiskKeywords = [
  "feeling empty", "kill", "killing", "worthless", "no hope", "nothing matters", 
  "alone", "isolated", "can't go on", "giving up", "trapped", "losing control",
  "self-harm", "suicidal", "end my life", "kill myself", "hurt myself",
  "no reason to live", "I want to die", "life is meaningless", "overwhelmed", 
  "want to disappear", "I'm done", "give up", "hopeless", "unloved", "nobody cares", "I'm broken", 
    "cutting", "cut myself", "slit my wrists", "jump off", "hang myself", "take my life", 
    "end it all", "can't take it", "I'm drowning", "nothing matters", "alone forever", 
    "nobody loves me", "I hate myself", "life is too hard", "life is pointless", 
    "I'm a burden", "better off dead", "dark thoughts", "death feels better", "no escape", 
    "suffocating", "constant pain", "tired of everything", "end this pain", "can't breathe", 
    "dying inside", "cry for help", "I'm lost", "I feel empty", "I can't cope", "I'm fading", 
    "I'm slipping", "everything is falling apart", "there's no way out", "I'm not worth it", 
    "no one understands", "I feel numb", "there's no hope", "it's too late", "I just want peace", 
    "I can't keep going", "everything hurts", "I can't handle it", "feel like giving up", 
    "I'm scared of everything", "I wish I was never born", "no one will miss me", 
    "I’m invisible", "I’m just tired", "I feel hopeless", "I'm trapped", "I just want to sleep forever", 
    "why am I even here?", "I want to disappear forever", "I'm a waste of space", 
    "the pain never ends", "I want to end the suffering", "I'm not strong enough", 
    "I don't deserve to live", "I can't stop thinking about dying", "I'm ready to go", 
    "everything feels pointless", "I can't escape this pain", "no one will care", 
    "I'm too broken to fix", "nobody wants me here", "I'm too tired to keep fighting", 
    "this pain is unbearable", "I'm not good enough", "I wish I could vanish", 
    "no one will help me", "I don’t see the point anymore", "I don't have the strength", 
    "I feel so alone", "I can't find a way out", "nothing ever changes", 
    "I can't face another day", "the world is better without me", "I’m ready to leave this world", 
    "my life is a mess", "I can't keep pretending", "I don't want to feel anymore", 
    "I feel like I'm fading away", "hanging in there"
];

// Compile regex patterns for keyword detection
const mentalHealthPattern = new RegExp(
  mentalHealthKeywords.map(keyword => `\\b${keyword}\\b`).join("|"),
  "i"
);

const highRiskPattern = new RegExp(
  highRiskKeywords.map(keyword => `\\b${keyword}\\b`).join("|"),
  "i"
);

// Normalize and clean input messages
function normalizeMessage(message: string): string {
  return message
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

// Check if a message contains mental health-related keywords
function isMentalHealthConcern(message: string): boolean {
  const normalizedMessage = normalizeMessage(message);
  return mentalHealthPattern.test(normalizedMessage);
}

// Check if a message indicates a high-risk escalation
function isHighRisk(message: string): boolean {
  const normalizedMessage = normalizeMessage(message);
  return highRiskPattern.test(normalizedMessage);
}

// Fetch a response from the AI model
export async function fetchAIResponse(userMessage: string): Promise<string> {
  try {
    const normalizedMessage = normalizeMessage(userMessage);

    // Check for mental health concerns
    if (!isMentalHealthConcern(normalizedMessage)) {
      return "I specialize in providing support for mental health topics. Please share any concerns about your emotional well-being.";
    }

    // Check for high-risk cases
    if (isHighRisk(normalizedMessage)) {
      return "It seems you're going through a very challenging time. Please reach out to a trusted professional, family member, or crisis hotline for immediate support. You're not alone, and help is available.";
    }

    // Build the AI prompt
    const prompt = `
You are a compassionate mental health assistant, dedicated to supporting individuals through emotional challenges. Provide empathetic, thoughtful responses, prioritizing user well-being.

User: "${userMessage}"
Assistant:
`;

    // Generate a response using the Gemini model
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm having trouble processing your request right now. Please try again later.";
  }
}

// Log interactions for monitoring purposes
function logInteraction(userMessage: string, aiResponse: string): void {
  console.log(`User: ${userMessage}`);
  console.log(`AI: ${aiResponse}`);
}

// Main handler function
export async function handleUserMessage(userMessage: string): Promise<string> {
  const aiResponse = await fetchAIResponse(userMessage);
  logInteraction(userMessage, aiResponse);
  return aiResponse;
}
