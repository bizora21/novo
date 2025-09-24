import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Bem-vindo ao <span className="text-blue-600">MeuApp</span>
              </h1>
              
              {user ? (
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Olá, <span className="font-semibold text-gray-900">{user.email}</span>! 
                    Você está conectado e pronto para usar todas as funcionalidades.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/profile" className="flex items-center">
                        Gerenciar Perfil
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => supabase.auth.signOut()}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Sair da Conta
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Uma plataforma moderna e segura para gerenciar suas informações. 
                    Crie sua conta ou faça login para começar.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <Link to="/login" className="flex items-center">
                        Começar Agora
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-gray-300 hover:bg-gray-50">
                      <Link to="/login">Já tenho conta</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        {!user && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Por que escolher o MeuApp?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Oferecemos as melhores funcionalidades para uma experiência completa e segura.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Segurança</h3>
                  <p className="text-gray-600">
                    Seus dados estão protegidos com as melhores práticas de segurança.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Rapidez</h3>
                  <p className="text-gray-600">
                    Interface moderna e responsiva para uma experiência fluida.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidade</h3>
                  <p className="text-gray-600">
                    Faça parte de uma comunidade ativa e engajada.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 MeuApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;