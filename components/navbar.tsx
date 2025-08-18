"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Lightbulb, User, Trash2 } from 'lucide-react';
import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfile {
  name: string;
  email: string;
  profilePicture: string;
}

interface NavbarProps {
  userProfile?: UserProfile;
}

export function Navbar({ userProfile }: NavbarProps = {}) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [localUserProfile, setLocalUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      const savedProfile = localStorage.getItem(`userProfile_${user.sub}`);
      if (savedProfile) {
        setLocalUserProfile(JSON.parse(savedProfile));
      }
    }
  }, [isAuthenticated, user]);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const currentProfile = localUserProfile || userProfile;
  const currentProfilePicture = currentProfile?.profilePicture;
  const currentName = currentProfile?.name || user?.name;
  const currentEmail = currentProfile?.email || user?.email;
  const hasCustomPhoto =
    currentProfile?.profilePicture &&
    currentProfile.profilePicture !== user?.picture;

  const ThemeToggle = () => {
    if (!mounted) {
      return (
        <Button variant="ghost" size="icon">
          <span className="h-5 w-5" />
        </Button>
      );
    }

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    );
  };

  const MobileThemeToggle = () => {
    if (!mounted) return null;

    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-full justify-start px-3"
      >
        {theme === "dark" ? (
          <>
            <Sun className="h-5 w-5 mr-2" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 mr-2" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    );
  };

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Lightbulb className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">Bodhika</span>
            </Link>
          </div>

          {isAuthenticated ? (
            <Fragment>
              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                <Link
                  href="/roadmaps"
                  className="text-foreground/80 hover:text-foreground px-3 py-2"
                >
                  Roadmaps
                </Link>
                <Link
                  href="/resources"
                  className="text-foreground/80 hover:text-foreground px-3 py-2"
                >
                  Resources
                </Link>
                <Link
                  href="/courses"
                  className="text-foreground/80 hover:text-foreground px-3 py-2"
                >
                  Courses
                </Link>
                <Link
                  href="/interviews"
                  className="text-foreground/80 hover:text-foreground px-3 py-2"
                >
                  Interviews
                </Link>

                <ThemeToggle />

                {/* User Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={currentProfilePicture || undefined}
                          alt={currentName}
                        />
                        <AvatarFallback className="flex items-center justify-center rounded-full bg-white text-black border border-black dark:bg-black dark:text-white dark:border-white text-sm font-medium">
                          {currentEmail?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                        </AvatarFallback>


                      </Avatar>

                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {currentName && <p className="font-medium">{currentName}</p>}
                        {currentEmail && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {currentEmail}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
                      onClick={() => logout()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </Fragment>
          ) : (
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" onClick={() => loginWithRedirect()}>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && isAuthenticated && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/roadmaps"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Roadmaps
            </Link>
            <Link
              href="/resources"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Resources
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Courses
            </Link>
            <Link
              href="/interviews"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Interviews
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 text-foreground/80 hover:text-foreground"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <div className="px-3 py-2">
              <MobileThemeToggle />
            </div>
            <div className="px-3 py-2">
              <Button variant="outline" onClick={() => logout()} className="w-full">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
