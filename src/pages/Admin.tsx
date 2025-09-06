import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navigation/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Search,
  Shield,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock admin data
interface AdminUser {
  id: string;
  name: string;
  email: string;
  location: string;
  joinedAt: string;
  isVerified: boolean;
  totalJobs: number;
  totalBids: number;
  rating: number;
}

const mockUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    location: 'New York, NY',
    joinedAt: '2024-01-15',
    isVerified: true,
    totalJobs: 12,
    totalBids: 45,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    location: 'Los Angeles, CA',
    joinedAt: '2024-02-20',
    isVerified: false,
    totalJobs: 8,
    totalBids: 23,
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    location: 'Chicago, IL',
    joinedAt: '2024-03-10',
    isVerified: true,
    totalJobs: 15,
    totalBids: 67,
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    location: 'Miami, FL',
    joinedAt: '2024-03-25',
    isVerified: false,
    totalJobs: 3,
    totalBids: 12,
    rating: 4.2,
  },
];

const Admin = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all');

  const handleVerifyUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isVerified: true } : user
    ));
    
    toast({
      title: "User verified",
      description: "User has been successfully verified.",
    });
  };

  const handleRejectUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isVerified: false } : user
    ));
    
    toast({
      title: "User verification rejected",
      description: "User verification has been rejected.",
      variant: "destructive",
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'verified' && user.isVerified) ||
                         (filter === 'pending' && !user.isVerified);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalUsers: users.length,
    verifiedUsers: users.filter(u => u.isVerified).length,
    pendingUsers: users.filter(u => !u.isVerified).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-8">
        <div className="container-mobile">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">
                  Admin <span className="text-primary">Dashboard</span>
                </h1>
                <p className="text-muted-foreground">
                  Manage users and platform verification
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Verified Users</p>
                    <p className="text-3xl font-bold text-green-600">{stats.verifiedUsers}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Verification</p>
                    <p className="text-3xl font-bold text-orange-600">{stats.pendingUsers}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'all' ? 'hero' : 'outline'}
                    onClick={() => setFilter('all')}
                    size="sm"
                  >
                    All Users
                  </Button>
                  <Button
                    variant={filter === 'verified' ? 'hero' : 'outline'}
                    onClick={() => setFilter('verified')}
                    size="sm"
                  >
                    Verified
                  </Button>
                  <Button
                    variant={filter === 'pending' ? 'hero' : 'outline'}
                    onClick={() => setFilter('pending')}
                    size="sm"
                  >
                    Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{user.location}</p>
                        <p className="text-xs text-muted-foreground">
                          Joined {new Date(user.joinedAt).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{user.totalJobs} jobs posted</p>
                          <p>{user.totalBids} bids placed</p>
                          <p>⭐ {user.rating} rating</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isVerified ? "default" : "secondary"}>
                          {user.isVerified ? 'Verified' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!user.isVerified ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleVerifyUser(user.id)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRejectUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Revoke
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;