"use client";

import { useState, useEffect, useRef,useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { User, Mail, Github, Linkedin, Globe, Target, Bookmark, FileText, Plus, X, Download, Edit2, Save, ExternalLink, Trash2, Camera, Upload, Calendar, CheckCircle2, Circle, Clock, Star, Archive, Filter, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "../globals.css"

interface SocialLinks {
    github: string;
    linkedin: string;
    portfolio: string;
}

interface LearningGoal {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    priority: 'low' | 'medium' | 'high';
    category: string;
    dueDate?: Date;
    notes?: string;
}

interface BookmarkedResource {
    id: string;
    title: string;
    url: string;
    description: string;
    category: string;
    addedAt: Date;
}

interface UserProfile {
    name: string;
    email: string;
    profilePicture: string;
}

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: "",
        email: "",
        profilePicture: ""
    });
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [socialLinks, setSocialLinks] = useState<SocialLinks>({
        github: "",
        linkedin: "",
        portfolio: ""
    });
    const hasCustomPhoto =
        userProfile.profilePicture &&
        userProfile.profilePicture !== user?.picture &&
        userProfile.profilePicture !== "";

    const [isEditingSocial, setIsEditingSocial] = useState(false);
    const [learningGoals, setLearningGoals] = useState<LearningGoal[]>([]);
    const [newGoal, setNewGoal] = useState("");
    const [newGoalPriority, setNewGoalPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [newGoalCategory, setNewGoalCategory] = useState("");
    const [newGoalDueDate, setNewGoalDueDate] = useState("");
    const [goalFilter, setGoalFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [goalSearch, setGoalSearch] = useState("");
    const [bookmarks, setBookmarks] = useState<BookmarkedResource[]>([]);
    const [resumeUrl, setResumeUrl] = useState("");
    const [isEditingResume, setIsEditingResume] = useState(false);
    const [tempResumeUrl, setTempResumeUrl] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const saveToLocalStorage = useCallback((key: string, data: any) => {
        if (user?.sub) {
            localStorage.setItem(`${key}_${user.sub}`, JSON.stringify(data));
        }
    },[user?.sub]);
    useEffect(() => {
        if (isAuthenticated && user) {
            const userId = user.sub;
            const savedProfile = localStorage.getItem(`userProfile_${userId}`);
            if (savedProfile) {
                setUserProfile(JSON.parse(savedProfile));
            } else {
                const initialProfile = {
                    name: user.name || "",
                    email: user.email || "",
                    profilePicture: ""
                };
                setUserProfile(initialProfile);
                saveToLocalStorage("userProfile", initialProfile);
            }

            const savedSocialLinks = localStorage.getItem(`socialLinks_${userId}`);
            if (savedSocialLinks) {
                setSocialLinks(JSON.parse(savedSocialLinks));
            }

            const savedGoals = localStorage.getItem(`learningGoals_${userId}`);
            if (savedGoals) {
                const parsedGoals = JSON.parse(savedGoals).map((goal: any) => ({
                    ...goal,
                    createdAt: new Date(goal.createdAt),
                    dueDate: goal.dueDate ? new Date(goal.dueDate) : undefined
                }));
                setLearningGoals(parsedGoals);
            }
            const savedBookmarks = localStorage.getItem(`bookmarks_${userId}`);
            if (savedBookmarks) {
                setBookmarks(JSON.parse(savedBookmarks));
            }


            const savedResumeUrl = localStorage.getItem(`resumeUrl_${userId}`);
            if (savedResumeUrl) {
                setResumeUrl(savedResumeUrl);
                setTempResumeUrl(savedResumeUrl);
            }
        }
    }, [isAuthenticated, user,saveToLocalStorage]);

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please select an image smaller than 5MB.",
                    variant: "destructive"
                });
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast({
                    title: "Invalid file type",
                    description: "Please select an image file.",
                    variant: "destructive"
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const updatedProfile = { ...userProfile, profilePicture: result };
                setUserProfile(updatedProfile);
                saveToLocalStorage("userProfile", updatedProfile);
                toast({
                    title: "Photo updated!",
                    description: "Your profile photo has been updated successfully.",
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        const updatedProfile = { ...userProfile, profilePicture: "" };
        setUserProfile(updatedProfile);
        saveToLocalStorage("userProfile", updatedProfile);
        toast({
            title: "Photo removed!",
            description: "Your profile photo has been removed.",
        });
    };

    const handleSaveProfile = () => {
        saveToLocalStorage("userProfile", userProfile);
        setIsEditingProfile(false);
        toast({
            title: "Profile updated!",
            description: "Your profile information has been saved successfully.",
        });
    };

    const handleSaveSocialLinks = () => {
        saveToLocalStorage("socialLinks", socialLinks);
        setIsEditingSocial(false);
        toast({
            title: "Social links updated!",
            description: "Your social links have been saved successfully.",
        });
    };

    const addLearningGoal = () => {
        if (newGoal.trim()) {
            const goal: LearningGoal = {
                id: Date.now().toString(),
                text: newGoal.trim(),
                completed: false,
                createdAt: new Date(),
                priority: newGoalPriority,
                category: newGoalCategory.trim() || 'General',
                dueDate: newGoalDueDate ? new Date(newGoalDueDate) : undefined,
                notes: ""
            };
            const updatedGoals = [...learningGoals, goal];
            setLearningGoals(updatedGoals);
            saveToLocalStorage("learningGoals", updatedGoals);
            setNewGoal("");
            setNewGoalPriority('medium');
            setNewGoalCategory("");
            setNewGoalDueDate("");

            toast({
                title: "Goal added!",
                description: "New learning goal has been added to your list.",
            });
        }
    };

    const removeLearningGoal = (id: string) => {
        const updatedGoals = learningGoals.filter(goal => goal.id !== id);
        setLearningGoals(updatedGoals);
        saveToLocalStorage("learningGoals", updatedGoals);
        toast({
            title: "Goal removed!",
            description: "Learning goal has been removed from your list.",
        });
    };

    const toggleGoalCompletion = (id: string) => {
        const updatedGoals = learningGoals.map(goal =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        );
        setLearningGoals(updatedGoals);
        saveToLocalStorage("learningGoals", updatedGoals);
    };

    const updateGoalNotes = (id: string, notes: string) => {
        const updatedGoals = learningGoals.map(goal =>
            goal.id === id ? { ...goal, notes } : goal
        );
        setLearningGoals(updatedGoals);
        saveToLocalStorage("learningGoals", updatedGoals);
    };

    const filteredGoals = learningGoals.filter(goal => {
        const matchesFilter = goalFilter === 'all' ||
            (goalFilter === 'active' && !goal.completed) ||
            (goalFilter === 'completed' && goal.completed);

        const matchesSearch = goalSearch === '' ||
            goal.text.toLowerCase().includes(goalSearch.toLowerCase()) ||
            goal.category.toLowerCase().includes(goalSearch.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const handleSaveResumeUrl = () => {
        setResumeUrl(tempResumeUrl);
        localStorage.setItem(`resumeUrl_${user?.sub}`, tempResumeUrl);
        setIsEditingResume(false);
        toast({
            title: "Resume link updated!",
            description: "Your resume link has been saved successfully.",
        });
    };

    const handleDownloadResume = () => {
        if (resumeUrl) {
            const link = document.createElement('a');
            link.href = resumeUrl;

            if (resumeUrl.includes("drive.google.com")) {
                const fileIdMatch = resumeUrl.match(/\/d\/(.*?)\//);
                const fileId = fileIdMatch ? fileIdMatch[1] : null;
                if (fileId) {
                    link.href = `https://drive.google.com/uc?export=download&id=${fileId}`;
                }
            }

            link.download = `${userProfile.name || "User"}_Resume.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: "Resume download started!",
                description: "Your resume is being downloaded.",
            });
        }
    };


    const handleViewResume = () => {
        if (resumeUrl) {
            window.open(resumeUrl, '_blank');
        }
    };

    useEffect(() => {
        if (isAuthenticated && user && bookmarks.length === 0) {
            const sampleBookmarks: BookmarkedResource[] = [
                {
                    id: "1",
                    title: "React Documentation",
                    url: "https://react.dev",
                    description: "Official React documentation and guides",
                    category: "Web Development",
                    addedAt: new Date()
                },
                {
                    id: "2",
                    title: "LeetCode",
                    url: "https://leetcode.com",
                    description: "Practice coding problems and algorithms",
                    category: "DSA",
                    addedAt: new Date()
                },
                {
                    id: "3",
                    title: "MDN Web Docs",
                    url: "https://developer.mozilla.org",
                    description: "Comprehensive web development documentation",
                    category: "Web Development",
                    addedAt: new Date()
                }
            ];
            setBookmarks(sampleBookmarks);
            saveToLocalStorage("bookmarks", sampleBookmarks);
        }
    }, [isAuthenticated, user, bookmarks.length,saveToLocalStorage]);

    const removeBookmark = (id: string) => {
        const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
        setBookmarks(updatedBookmarks);
        saveToLocalStorage("bookmarks", updatedBookmarks);
        toast({
            title: "Bookmark removed!",
            description: "Resource has been removed from your bookmarks.",
        });
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'text-red-500 border-red-200 bg-red-50';
            case 'medium': return 'text-yellow-500 border-yellow-200 bg-yellow-50';
            case 'low': return 'text-green-500 border-green-200 bg-green-50';
            default: return 'text-gray-500 border-gray-200 bg-gray-50';
        }
    };

    const getPriorityIcon = (priority: string) => {
        switch (priority) {
            case 'high': return <Star className="w-3 h-3 fill-current" />;
            case 'medium': return <Clock className="w-3 h-3" />;
            case 'low': return <Circle className="w-3 h-3" />;
            default: return <Circle className="w-3 h-3" />;
        }
    };

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-background">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                        <p className="text-muted-foreground">Please log in to view your profile.</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar userProfile={userProfile} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
                        <p className="text-lg text-muted-foreground">
                            Manage your learning journey and preferences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 space-y-6">
                            <Card>
                                <CardHeader className="text-center items-center">
                                    <div className="flex flex-col items-center">
                                        <div className="relative mx-auto mb-4">
                                            <Avatar className="w-24 h-24">
                                                <AvatarImage
                                                    src={userProfile.profilePicture || undefined}
                                                    alt={userProfile.name}
                                                />
                                                <AvatarFallback className="text-3xl font-semibold bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white rounded-full">
                                                    {userProfile.email?.[0]?.toUpperCase() || <User className="w-10 h-10" />}
                                                </AvatarFallback>

                                            </Avatar>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                                                onClick={() => fileInputRef.current?.click()}
                                            >
                                                <Camera className="w-4 h-4" />
                                            </Button>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoUpload}
                                                className="hidden"
                                            />
                                        </div>

                                        {userProfile.profilePicture && (
                                            <button
                                                onClick={handleRemovePhoto}
                                                className="text-sm text-red-600 hover:underline flex items-center gap-1 mb-4"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Remove Photo
                                            </button>

                                        )}
                                    </div>

                                    {isEditingProfile ? (
                                        <div className="space-y-4 -mt-2">
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={userProfile.name}
                                                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    value={userProfile.email}
                                                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                                                    placeholder="Enter your email"
                                                    type="email"
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={handleSaveProfile} className="flex-1">
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setIsEditingProfile(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <CardTitle className="flex items-center justify-center gap-2">
                                                <User className="w-5 h-5" />
                                                {userProfile.name || "User"}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setIsEditingProfile(true)}
                                                    className="ml-2 h-6 w-6 p-0"
                                                >
                                                    <Edit2 className="w-3 h-3" />
                                                </Button>
                                            </CardTitle>
                                            <CardDescription className="flex items-center justify-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                {userProfile.email}
                                            </CardDescription>
                                        </>
                                    )}
                                </CardHeader>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Globe className="w-5 h-5" />
                                            Social Links
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditingSocial(!isEditingSocial)}
                                        >
                                            {isEditingSocial ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isEditingSocial ? (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="github">GitHub</Label>
                                                <Input
                                                    id="github"
                                                    placeholder="https://github.com/username"
                                                    value={socialLinks.github}
                                                    onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="linkedin">LinkedIn</Label>
                                                <Input
                                                    id="linkedin"
                                                    placeholder="https://linkedin.com/in/username"
                                                    value={socialLinks.linkedin}
                                                    onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="portfolio">Portfolio</Label>
                                                <Input
                                                    id="portfolio"
                                                    placeholder="https://yourportfolio.com"
                                                    value={socialLinks.portfolio}
                                                    onChange={(e) => setSocialLinks({ ...socialLinks, portfolio: e.target.value })}
                                                />
                                            </div>
                                            <Button onClick={handleSaveSocialLinks} className="w-full">
                                                Save Links
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {socialLinks.github && (
                                                <a
                                                    href={socialLinks.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    GitHub
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                            {socialLinks.linkedin && (
                                                <a
                                                    href={socialLinks.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                    LinkedIn
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                            {socialLinks.portfolio && (
                                                <a
                                                    href={socialLinks.portfolio}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Portfolio
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            )}
                                            {!socialLinks.github && !socialLinks.linkedin && !socialLinks.portfolio && (
                                                <p className="text-sm text-muted-foreground">No social links added yet.</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            Resume
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsEditingResume(true)}
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                    </CardTitle>

                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {isEditingResume ? (
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="resume">Resume URL</Label>
                                                <Input
                                                    id="resume"
                                                    placeholder="https://drive.google.com/file/d/your-resume"
                                                    value={tempResumeUrl}
                                                    onChange={(e) => setTempResumeUrl(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={handleSaveResumeUrl} className="flex-1">
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setIsEditingResume(false);
                                                        setTempResumeUrl(resumeUrl);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {resumeUrl ? (
                                                <div className="space-y-2">
                                                    <Button
                                                        onClick={handleViewResume}
                                                        className="w-full"
                                                        variant="outline"
                                                    >
                                                        <ExternalLink className="w-4 h-4 mr-2" />
                                                        View Resume
                                                    </Button>
                                                    <Button
                                                        onClick={handleDownloadResume}
                                                        className="w-full"
                                                        variant="default"
                                                    >
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Download Resume
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={() => setIsEditingResume(true)}
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add Resume Link
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            {/* Enhanced Learning Goals Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="w-5 h-5" />
                                        Learning Goals
                                    </CardTitle>
                                    <CardDescription>
                                        Track your learning objectives and progress with priorities and categories
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Add new goal form */}
                                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <Label htmlFor="newGoal">Goal Description</Label>
                                                <Input
                                                    id="newGoal"
                                                    placeholder="Add a new learning goal..."
                                                    value={newGoal}
                                                    onChange={(e) => setNewGoal(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && addLearningGoal()}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="priority">Priority</Label>
                                                <Select value={newGoalPriority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewGoalPriority(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="low">Low</SelectItem>
                                                        <SelectItem value="medium">Medium</SelectItem>
                                                        <SelectItem value="high">High</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="category">Category</Label>
                                                <Input
                                                    id="category"
                                                    placeholder="e.g., Web Development, DSA"
                                                    value={newGoalCategory}
                                                    onChange={(e) => setNewGoalCategory(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                                                <Input
                                                    id="dueDate"
                                                    type="date"
                                                    value={newGoalDueDate}
                                                    onChange={(e) => setNewGoalDueDate(e.target.value)}
                                                />
                                            </div>
                                            <div className="flex items-end">
                                                <Button onClick={addLearningGoal} className="w-full">
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add Goal
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Filters and Search */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                                <Input
                                                    placeholder="Search goals..."
                                                    value={goalSearch}
                                                    onChange={(e) => setGoalSearch(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        <Select value={goalFilter} onValueChange={(value: 'all' | 'active' | 'completed') => setGoalFilter(value)}>
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                                <Filter className="w-4 h-4 mr-2" />
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Goals</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Separator />

                                    {/* Goals list */}
                                    <div className="goals-scroll-container space-y-4" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
                                        {filteredGoals.length > 0 ? (
                                            filteredGoals.map((goal) => (
                                                <Card key={goal.id} className={`transition-all duration-200 ${goal.completed ? 'opacity-75' : ''}`}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <div className="flex items-start gap-3 flex-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleGoalCompletion(goal.id)}
                                                                    className="mt-0.5 h-6 w-6 p-0"
                                                                >
                                                                    {goal.completed ? (
                                                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                                    ) : (
                                                                        <Circle className="w-5 h-5" />
                                                                    )}
                                                                </Button>
                                                                <div className="flex-1 space-y-2">
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        <span className={`font-medium ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                                            {goal.text}
                                                                        </span>
                                                                        <Badge variant="outline" className={`text-xs ${getPriorityColor(goal.priority)}`}>
                                                                            {getPriorityIcon(goal.priority)}
                                                                            <span className="ml-1 capitalize">{goal.priority}</span>
                                                                        </Badge>
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            {goal.category}
                                                                        </Badge>
                                                                    </div>

                                                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                                        <span className="flex items-center gap-1">
                                                                            <Calendar className="w-3 h-3" />
                                                                            Created: {goal.createdAt.toLocaleDateString()}
                                                                        </span>
                                                                        {goal.dueDate && (
                                                                            <span className="flex items-center gap-1">
                                                                                <Clock className="w-3 h-3" />
                                                                                Due: {goal.dueDate.toLocaleDateString()}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {/* Notes section */}
                                                                    <div className="mt-2">
                                                                        <Textarea
                                                                            placeholder="Add notes..."
                                                                            value={goal.notes || ''}
                                                                            onChange={(e) => updateGoalNotes(goal.id, e.target.value)}
                                                                            className="min-h-[60px] text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeLearningGoal(goal.id)}
                                                                className="text-destructive hover:text-destructive"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <div className="text-center py-12">
                                                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">
                                                    {goalSearch || goalFilter !== 'all'
                                                        ? "No goals match your current filters."
                                                        : "No learning goals yet. Add one above to get started!"
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Goals Statistics */}
                                    {learningGoals.length > 0 && (
                                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-500">{learningGoals.length}</div>
                                                <div className="text-xs text-muted-foreground">Total Goals</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-green-500">
                                                    {learningGoals.filter(g => g.completed).length}
                                                </div>
                                                <div className="text-xs text-muted-foreground">Completed</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-orange-500">
                                                    {learningGoals.filter(g => !g.completed).length}
                                                </div>
                                                <div className="text-xs text-muted-foreground">Active</div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Bookmarks Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bookmark className="w-5 h-5" />
                                        Bookmarked Resources
                                    </CardTitle>
                                    <CardDescription>
                                        Your saved learning resources and references
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {bookmarks.length > 0 ? (
                                            bookmarks.map((bookmark) => (
                                                <Card key={bookmark.id} className="relative">
                                                    <CardHeader className="pb-2">
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <CardTitle className="text-sm font-medium">
                                                                    <a
                                                                        href={bookmark.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="hover:text-primary transition-colors"
                                                                    >
                                                                        {bookmark.title}
                                                                    </a>
                                                                </CardTitle>
                                                                <Badge variant="secondary" className="mt-1 text-xs">
                                                                    {bookmark.category}
                                                                </Badge>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeBookmark(bookmark.id)}
                                                                className="h-8 w-8 p-0"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        <p className="text-xs text-muted-foreground">
                                                            {bookmark.description}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <div className="col-span-2 text-center py-8">
                                                <p className="text-muted-foreground">
                                                    No bookmarked resources yet. Start exploring and save your favorites!
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
