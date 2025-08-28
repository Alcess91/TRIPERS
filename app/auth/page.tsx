'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const { user, login, register } = useAuth();

  // Test avec un compte connu
  useEffect(() => {
    setEmail('test91@gmail.com');
    setPassword('password123');
  }, []);

  useEffect(() => {
    // NE PAS rediriger automatiquement sur la page d'auth
    // L'utilisateur veut peut-être se connecter avec un autre compte
    // if (user) {
    //   console.log('✅ Utilisateur connecté, redirection vers /explore');
    //   window.location.href = '/explore'; // Force redirection without middleware
    // }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔄 Tentative de connexion...');
      const success = await login(email, password);
      if (success) {
        console.log('✅ Connexion réussie');
        toast({
          title: "Connexion réussie",
          description: "Redirection en cours...",
        });
        // Force redirection après connexion réussie
        window.location.href = '/explore';
      } else {
        throw new Error('Échec de la connexion');
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('🔄 Tentative d\'inscription...');
      await register(email, password, name);
      console.log('✅ Inscription réussie');
      toast({
        title: "Inscription réussie",
        description: "Redirection en cours...",
      });
      window.location.href = '/explore';
    } catch (error) {
      console.error('❌ Erreur d\'inscription:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Impossible de créer le compte",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const forceLogout = async () => {
    // Nettoyer localStorage
    localStorage.removeItem('auth-token');
    
    // Appeler l'API de déconnexion
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Erreur logout:', error);
    }
    
    // Recharger la page
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-2">
              TRIPERS
            </CardTitle>
            <CardDescription className="text-gray-600">Connectez-vous ou créez un compte</CardDescription>
            {user && (
              <div className="bg-green-50 border border-green-200 rounded p-2 mt-2">
                <p className="text-sm text-green-700">✅ Vous êtes déjà connecté en tant que: {user.email}</p>
                <p className="text-xs text-green-600">Vous pouvez vous connecter avec un autre compte ou aller à l'accueil</p>
              </div>
            )}
            {/* Bouton de debug pour forcer la déconnexion */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={forceLogout}
              className="text-xs text-red-500 hover:text-red-700 mt-2"
            >
              🔒 Forcer la déconnexion (Debug)
            </Button>
          </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={isLoading}>
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" disabled={isLoading}>
                  {isLoading ? 'Inscription...' : 'S\'inscrire'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Section pour les guides */}
      <Card className="shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-orange-900">Vous êtes un guide local ?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Partagez votre passion et vos connaissances locales avec des voyageurs du monde entier.
          </p>
          <Link href="/signup/guide">
            <Button 
              variant="outline" 
              className="w-full border-2 border-orange-300 hover:bg-orange-100 text-orange-700 hover:text-orange-800"
            >
              <span className="font-semibold">Devenir Guide Local</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
