import { User } from '../store/slices/authSlice';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    location: 'New York, NY',
    skills: ['Plumbing', 'Electrical'],
    isVerified: true,
    role: 'user',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@hirenearby.com',
    password: 'admin123',
    location: 'San Francisco, CA',
    skills: ['Management'],
    isVerified: true,
    role: 'admin',
  },
];

let userIdCounter = 3;

export const authService = {
  async login(credentials: { email: string; password: string }) {
    await delay(1000);
    
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: `mock-token-${user.id}`,
    };
  },

  async signup(userData: { 
    name: string; 
    email: string; 
    password: string; 
    location: string; 
    skills: string[] 
  }) {
    await delay(1000);
    
    // Check if user already exists
    if (mockUsers.find(u => u.email === userData.email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User & { password: string } = {
      id: userIdCounter.toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      location: userData.location,
      skills: userData.skills,
      isVerified: false,
      role: 'user',
    };
    
    mockUsers.push(newUser);
    userIdCounter++;
    
    const { password, ...userWithoutPassword } = newUser;
    
    return {
      user: userWithoutPassword,
      token: `mock-token-${newUser.id}`,
    };
  },

  async getCurrentUser(token: string) {
    await delay(500);
    
    const userId = token.replace('mock-token-', '');
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
      throw new Error('Invalid token');
    }
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};