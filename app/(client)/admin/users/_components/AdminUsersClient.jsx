'use client';

import { useState } from "react";
import { format } from "date-fns";
import { Shield, GraduationCap, User as UserIcon, Plus, X, Search } from "lucide-react";
import { updateUserRole, removeTeacherFromBatch } from "@/actions/admin/userActions";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AssignBatchModal from "./AssignBatchModal";

export default function AdminUsersClient({ initialUsers, activeBatches }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { execute: changeRole } = useFetch(updateUserRole);
  const { execute: removeBatch } = useFetch(removeTeacherFromBatch);

  // Simple client-side search filter
  const filteredUsers = initialUsers.filter(user => 
    user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleChange = async (userId, newRole) => {
    await changeRole(userId, newRole);
  };

  const getRoleIcon = (role) => {
    if (role === "ADMIN") return <Shield className="h-4 w-4 text-emerald-400" />;
    if (role === "TEACHER") return <UserIcon className="h-4 w-4 text-amber-400" />;
    return <GraduationCap className="h-4 w-4 text-blue-400" />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
          <p className="text-zinc-400 mt-1">Manage staff roles and assign teachers to active batches.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Search users..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-black/40 border-b border-white/10">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-zinc-400 font-medium">User</TableHead>
              <TableHead className="text-zinc-400 font-medium">System Role</TableHead>
              <TableHead className="text-zinc-400 font-medium">Batch Assignments</TableHead>
              <TableHead className="text-zinc-400 font-medium text-right">Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-zinc-500">
                  No users found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback className="bg-blue-500/20 text-blue-400 font-bold">
                          {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-zinc-400">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Select defaultValue={user.role} onValueChange={(val) => handleRoleChange(user.id, val)}>
                      <SelectTrigger className="w-[140px] h-8 bg-black/40 border-white/10 text-xs">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-white/10 text-white">
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TEACHER">Teacher</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    {user.role === "TEACHER" ? (
                      <div className="flex flex-wrap items-center gap-2 max-w-md">
                        {user.teacherBatches.map((tb) => (
                          <Badge key={tb.batch.id} variant="secondary" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 flex items-center gap-1 pr-1">
                            <span className="truncate max-w-[120px]">{tb.batch.name}</span>
                            <button 
                              onClick={() => removeBatch(user.id, tb.batch.id)}
                              className="p-0.5 rounded-full hover:bg-amber-500/30 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs px-2 border border-dashed border-white/20 text-zinc-400 hover:text-white hover:border-white/40"
                          onClick={() => setSelectedTeacher(user)}
                        >
                          <Plus className="h-3 w-3 mr-1" /> Assign Batch
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-600 italic">Not applicable</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right text-sm text-zinc-400">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedTeacher && (
        <AssignBatchModal 
          teacher={selectedTeacher} 
          activeBatches={activeBatches} 
          isOpen={!!selectedTeacher} 
          onClose={() => setSelectedTeacher(null)} 
        />
      )}
    </div>
  );
}