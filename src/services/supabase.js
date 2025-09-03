/**
 * Supabase API service for MemeMaster AI
 * Handles database operations, authentication, and storage
 */

// Mock user data for development
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    subscriptionTier: 'Pro',
    generationsLeft: 42,
    totalGenerations: 50,
    createdAt: new Date('2024-01-15').toISOString()
  }
];

// Mock memes data for development
const MOCK_MEMES = [];

/**
 * Initialize Supabase client
 * In a real implementation, this would initialize the Supabase client
 */
const initSupabase = () => {
  // In a real implementation, this would initialize the Supabase client
  // For now, we'll just return a mock client
  return {
    auth: {
      signUp: mockSignUp,
      signIn: mockSignIn,
      signOut: mockSignOut,
      getUser: mockGetUser
    },
    from: (table) => ({
      select: () => mockSelect(table),
      insert: (data) => mockInsert(table, data),
      update: (data) => mockUpdate(table, data),
      delete: () => mockDelete(table)
    }),
    storage: {
      from: (bucket) => ({
        upload: (path, file) => mockUpload(bucket, path, file),
        getPublicUrl: (path) => mockGetPublicUrl(bucket, path)
      })
    }
  };
};

/**
 * Sign up a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data
 */
const mockSignUp = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(user => user.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Create new user
  const newUser = {
    id: String(MOCK_USERS.length + 1),
    email,
    subscriptionTier: 'Free',
    generationsLeft: 5,
    totalGenerations: 5,
    createdAt: new Date().toISOString()
  };
  
  MOCK_USERS.push(newUser);
  
  return { user: newUser };
};

/**
 * Sign in a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data
 */
const mockSignIn = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user
  const user = MOCK_USERS.find(user => user.email === email);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  return { user };
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
const mockSignOut = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { error: null };
};

/**
 * Get the current user
 * @returns {Promise<Object>} - User data
 */
const mockGetUser = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { user: MOCK_USERS[0] };
};

/**
 * Select data from a table
 * @param {string} table - Table name
 * @returns {Promise<Array>} - Selected data
 */
const mockSelect = (table) => {
  return {
    eq: (column, value) => ({
      order: () => ({
        limit: (limit) => new Promise(resolve => {
          setTimeout(() => {
            if (table === 'memes') {
              resolve({ data: MOCK_MEMES.filter(meme => meme[column] === value).slice(0, limit) });
            } else if (table === 'users') {
              resolve({ data: MOCK_USERS.filter(user => user[column] === value).slice(0, limit) });
            }
          }, 500);
        })
      })
    })
  };
};

/**
 * Insert data into a table
 * @param {string} table - Table name
 * @param {Object} data - Data to insert
 * @returns {Promise<Object>} - Inserted data
 */
const mockInsert = (table, data) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (table === 'memes') {
        const newMeme = {
          id: String(MOCK_MEMES.length + 1),
          ...data,
          createdAt: new Date().toISOString()
        };
        MOCK_MEMES.push(newMeme);
        resolve({ data: newMeme });
      }
    }, 500);
  });
};

/**
 * Update data in a table
 * @param {string} table - Table name
 * @param {Object} data - Data to update
 * @returns {Promise<Object>} - Updated data
 */
const mockUpdate = (table, data) => {
  return {
    eq: (column, value) => new Promise(resolve => {
      setTimeout(() => {
        if (table === 'users') {
          const userIndex = MOCK_USERS.findIndex(user => user[column] === value);
          if (userIndex !== -1) {
            MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data };
            resolve({ data: MOCK_USERS[userIndex] });
          }
        } else if (table === 'memes') {
          const memeIndex = MOCK_MEMES.findIndex(meme => meme[column] === value);
          if (memeIndex !== -1) {
            MOCK_MEMES[memeIndex] = { ...MOCK_MEMES[memeIndex], ...data };
            resolve({ data: MOCK_MEMES[memeIndex] });
          }
        }
      }, 500);
    })
  };
};

/**
 * Delete data from a table
 * @param {string} table - Table name
 * @returns {Promise<void>}
 */
const mockDelete = (table) => {
  return {
    eq: (column, value) => new Promise(resolve => {
      setTimeout(() => {
        if (table === 'memes') {
          const memeIndex = MOCK_MEMES.findIndex(meme => meme[column] === value);
          if (memeIndex !== -1) {
            MOCK_MEMES.splice(memeIndex, 1);
          }
        }
        resolve({ error: null });
      }, 500);
    })
  };
};

/**
 * Upload a file to storage
 * @param {string} bucket - Storage bucket
 * @param {string} path - File path
 * @param {File} file - File to upload
 * @returns {Promise<Object>} - Upload result
 */
const mockUpload = async (bucket, path, file) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { data: { path } };
};

/**
 * Get public URL for a file
 * @param {string} bucket - Storage bucket
 * @param {string} path - File path
 * @returns {Object} - Public URL
 */
const mockGetPublicUrl = (bucket, path) => {
  return { publicUrl: `https://mock-storage.com/${bucket}/${path}` };
};

/**
 * Get user data
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User data
 */
export const getUserData = async (userId) => {
  try {
    const supabase = initSupabase();
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .limit(1);
      
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error getting user data:', error);
    throw new Error('Failed to get user data');
  }
};

/**
 * Update user data
 * @param {string} userId - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise<Object>} - Updated user data
 */
export const updateUserData = async (userId, userData) => {
  try {
    const supabase = initSupabase();
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', userId);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw new Error('Failed to update user data');
  }
};

/**
 * Save a generated meme
 * @param {Object} meme - Meme data
 * @returns {Promise<Object>} - Saved meme data
 */
export const saveMeme = async (meme) => {
  try {
    const supabase = initSupabase();
    const { data, error } = await supabase
      .from('memes')
      .insert(meme);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving meme:', error);
    throw new Error('Failed to save meme');
  }
};

/**
 * Get user's memes
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - User's memes
 */
export const getUserMemes = async (userId) => {
  try {
    const supabase = initSupabase();
    const { data, error } = await supabase
      .from('memes')
      .select()
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user memes:', error);
    throw new Error('Failed to get user memes');
  }
};

/**
 * Upload meme image
 * @param {File} file - Image file
 * @param {string} userId - User ID
 * @returns {Promise<string>} - Image URL
 */
export const uploadMemeImage = async (file, userId) => {
  try {
    const supabase = initSupabase();
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase
      .storage
      .from('memes')
      .upload(fileName, file);
      
    if (error) throw error;
    
    const { publicUrl } = supabase
      .storage
      .from('memes')
      .getPublicUrl(data.path);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading meme image:', error);
    throw new Error('Failed to upload meme image');
  }
};

