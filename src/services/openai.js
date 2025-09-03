/**
 * OpenAI API service for MemeMaster AI
 * Handles interactions with OpenAI API for meme caption generation and humor tuning
 */

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1';
const DEFAULT_MODEL = 'gpt-4o';

/**
 * Generate meme captions based on prompt and humor style
 * @param {string} prompt - User's meme description or context
 * @param {string} humorStyle - Selected humor style (witty, absurd, dry, wholesome)
 * @param {string} imageUrl - Optional URL of uploaded image for context
 * @returns {Promise<{topText: string, bottomText: string}>} - Generated meme captions
 */
export const generateMemeCaption = async (prompt, humorStyle, imageUrl = null) => {
  try {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll simulate the API call with a delay and mock response
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response based on humor style
    const captions = getMockCaptionsByStyle(humorStyle, prompt);
    
    return {
      topText: captions.top,
      bottomText: captions.bottom
    };
  } catch (error) {
    console.error('Error generating meme caption:', error);
    throw new Error('Failed to generate meme caption. Please try again.');
  }
};

/**
 * Generate meme captions with OpenAI API
 * @param {string} prompt - User's meme description
 * @param {string} humorStyle - Selected humor style
 * @returns {Promise<{topText: string, bottomText: string}>} - Generated captions
 */
export const generateCaptionsWithAI = async (prompt, humorStyle, apiKey) => {
  // This would be the actual implementation using the OpenAI API
  // For now, we're using mock data
  
  const systemPrompt = getSystemPromptForHumorStyle(humorStyle);
  const userPrompt = `Create a meme caption for: "${prompt}". Return ONLY a JSON object with "topText" and "bottomText" properties.`;
  
  // In a real implementation, this would be an actual API call
  // const response = await fetch(`${OPENAI_API_URL}/chat/completions`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`
  //   },
  //   body: JSON.stringify({
  //     model: DEFAULT_MODEL,
  //     messages: [
  //       { role: 'system', content: systemPrompt },
  //       { role: 'user', content: userPrompt }
  //     ],
  //     temperature: 0.7,
  //     response_format: { type: 'json_object' }
  //   })
  // });
  
  // const data = await response.json();
  // const captionText = data.choices[0].message.content;
  // return JSON.parse(captionText);
  
  // Mock response for development
  return getMockCaptionsByStyle(humorStyle, prompt);
};

/**
 * Get system prompt for different humor styles
 * @param {string} humorStyle - Selected humor style
 * @returns {string} - System prompt for OpenAI
 */
const getSystemPromptForHumorStyle = (humorStyle) => {
  const prompts = {
    witty: 'You are a witty meme caption generator. Create clever, sharp, and intelligent humor that requires a bit of thinking to get the joke. Use wordplay, puns, and cultural references.',
    absurd: 'You are an absurdist meme caption generator. Create random, unexpected, and surreal humor that defies logic and conventional expectations. The more bizarre and nonsensical, the better.',
    dry: 'You are a dry humor meme caption generator. Create deadpan, sarcastic, and understated humor delivered with a straight face. Use irony and subtle wit without obvious punchlines.',
    wholesome: 'You are a wholesome meme caption generator. Create positive, uplifting, and feel-good humor that makes people smile. Focus on kindness, positivity, and universal experiences.'
  };
  
  return prompts[humorStyle] || prompts.witty;
};

/**
 * Get mock captions based on humor style for development
 * @param {string} humorStyle - Selected humor style
 * @param {string} prompt - User's meme description
 * @returns {{top: string, bottom: string}} - Mock captions
 */
const getMockCaptionsByStyle = (humorStyle, prompt) => {
  const captions = {
    witty: {
      top: ['WHEN YOU REALIZE', 'THAT MOMENT WHEN', 'ME TRYING TO'],
      bottom: ['AND IT ACTUALLY WORKS', 'EVERY SINGLE TIME', 'NAILED IT']
    },
    absurd: {
      top: ['BANANA PHILOSOPHY', 'QUANTUM CONFUSION', 'SPAGHETTI LOGIC'],
      bottom: ['BECAUSE REASONS', 'OBVIOUSLY', 'MAKES TOTAL SENSE']
    },
    dry: {
      top: ['OH GREAT', 'FANTASTIC', 'WONDERFUL'],
      bottom: ['EXACTLY WHAT I NEEDED', 'PERFECT TIMING', 'JUST PERFECT']
    },
    wholesome: {
      top: ['YOU\'RE DOING AMAZING', 'KEEP GOING', 'BELIEVE IN YOURSELF'],
      bottom: ['AND THAT\'S BEAUTIFUL', 'YOU GOT THIS', 'PROUD OF YOU']
    }
  };
  
  const styleData = captions[humorStyle] || captions.witty;
  const topOptions = styleData.top;
  const bottomOptions = styleData.bottom;
  
  return {
    top: topOptions[Math.floor(Math.random() * topOptions.length)],
    bottom: bottomOptions[Math.floor(Math.random() * bottomOptions.length)]
  };
};

/**
 * Analyze meme for engagement prediction
 * @param {Object} meme - Meme object with image and captions
 * @returns {Promise<Object>} - Engagement prediction data
 */
export const analyzeMemeEngagement = async (meme) => {
  try {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll simulate the API call with a delay and mock response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random score between 60 and 100
    const score = Math.floor(Math.random() * 40) + 60;
    
    // Determine virality level based on score
    let viralityLevel = 'Low';
    if (score >= 90) viralityLevel = 'Viral';
    else if (score >= 75) viralityLevel = 'High';
    else if (score >= 60) viralityLevel = 'Medium';
    
    // Generate random factors
    const factors = [
      { factor: 'Visual Appeal', score: Math.floor(Math.random() * 30) + 70, description: 'Strong composition and clear text' },
      { factor: 'Humor Timing', score: Math.floor(Math.random() * 30) + 70, description: 'Well-timed comedic elements' },
      { factor: 'Trend Relevance', score: Math.floor(Math.random() * 30) + 70, description: 'Matches current viral patterns' },
      { factor: 'Shareability', score: Math.floor(Math.random() * 30) + 70, description: 'High potential for social sharing' },
      { factor: 'Emotional Impact', score: Math.floor(Math.random() * 30) + 70, description: 'Evokes strong emotional response' }
    ];
    
    return {
      engagementScore: score,
      viralityPrediction: viralityLevel,
      factors: factors,
      expectedLikes: Math.floor(score * 50),
      expectedShares: Math.floor(score * 12)
    };
  } catch (error) {
    console.error('Error analyzing meme engagement:', error);
    throw new Error('Failed to analyze meme engagement. Please try again.');
  }
};

