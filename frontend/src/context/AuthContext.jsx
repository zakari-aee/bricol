import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import useTranslation from '../hook/useTranslation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchUserData(session.user.id);
      } else {
        setUser(null);
        setUserData(null);
        setUserType(null);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
          await fetchUserData(session.user.id);
        } else {
          setUser(null);
          setUserData(null);
          setUserType(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    try {
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      setUserData(profile);
      setUserType(profile.role);

      // Fetch additional data based on role
      if (profile.role === 'customer') {
        const { data: customerData } = await supabase
          .from('customers')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (customerData) {
          setUserData(prev => ({ ...prev, ...customerData }));
        }
      } else if (profile.role === 'worker') {
        const { data: workerData } = await supabase
          .from('workers')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (workerData) {
          setUserData(prev => ({ ...prev, ...workerData }));
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const signUp = async (email, password, userData, type = 'customer') => {
    try {
      setLoading(true);
      
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: type,
            full_name: userData.fullName,
            phone: userData.phone
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email,
              role: type,
              full_name: userData.fullName,
              phone: userData.phone
            }
          ]);

        if (profileError) throw profileError;

        // Create role-specific profile
        if (type === 'customer') {
          await supabase.from('customers').insert([
            {
              id: authData.user.id,
              city: userData.city,
              address: userData.address
            }
          ]);
        } else if (type === 'worker') {
          await supabase.from('workers').insert([
            {
              id: authData.user.id,
              city: userData.city,
              professional_title: userData.professionalTitle,
              experience_years: userData.experienceYears,
              hourly_rate: userData.hourlyRate,
              categories: userData.categories,
              skills: userData.skills
            }
          ]);
        }

        // Send verification email (optional)
        await supabase.auth.signInWithPassword({ email, password });
        
        return { success: true, user: authData.user };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        await fetchUserData(data.user.id);
        return { success: true, user: data.user };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Google sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserData(null);
      setUserType(null);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Refetch user data
      await fetchUserData(user.id);
      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    userData,
    userType,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};