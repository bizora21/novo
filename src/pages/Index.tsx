import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Meu App</h1>
        
        {user ? (
          <div className="space-y-6">
            <p className="text-lg text-gray-600 mb-8">
              Você está logado como <span className="font-medium">{user.email}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/profile">Gerenciar Perfil</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => supabase.auth.signOut()}
              >
                Sair
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg text-gray-600 mb-8">
              Faça login ou crie uma conta para começar a usar o aplicativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/login">Entrar / Cadastrar</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;