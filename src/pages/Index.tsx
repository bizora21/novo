import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Bem-vindo ao <span className="text-blue-600">Meu App</span>
              </h1>
              
              {user ? (
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Olá, <span className="font-semibold text-blue-600">{user.email}</span>! 
                    Você está logado e pronto para usar todas as funcionalidades.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-lg px-8 py-3">
                      <Link to="/profile">
                        Gerenciar Perfil
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="text-lg px-8 py-3"
                      onClick={() => supabase.auth.signOut()}
                    >
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Uma plataforma moderna e segura para gerenciar suas informações. 
                    Faça login ou crie uma conta para começar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-lg px-8 py-3">
                      <Link to="/login">
                        Começar Agora
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por que escolher nosso app?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Oferecemos as melhores funcionalidades para uma experiência completa
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Segurança</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Seus dados estão protegidos com as melhores práticas de segurança
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Rapidez</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Interface rápida e responsiva para uma experiência fluida
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Facilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Design intuitivo pensado para facilitar o uso diário
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;