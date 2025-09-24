import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirecionar para a página inicial se o usuário já estiver logado
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Bem-vindo</h1>
          <p className="text-gray-600 mt-2">Faça login ou crie uma conta</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#404040',
                  brandAccent: '#22c55e',
                }
              }
            },
            className: {
              button: 'w-full px-4 py-2 text-white rounded-md',
              input: 'w-full px-3 py-2 border rounded-md',
              label: 'block text-sm font-medium text-gray-700 mb-1',
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Senha',
                button_label: 'Entrar',
                loading_button_label: 'Entrando...',
                link_text: 'Já tem uma conta? Entre',
                password_input_placeholder: 'Sua senha',
                email_input_placeholder: 'Seu email',
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Senha',
                button_label: 'Cadastrar',
                loading_button_label: 'Cadastrando...',
                link_text: 'Não tem uma conta? Cadastre-se',
                password_input_placeholder: 'Sua senha',
                email_input_placeholder: 'Seu email',
              },
              forgotten_password: {
                email_label: 'Email',
                password_label: 'Senha',
                button_label: 'Recuperar senha',
                loading_button_label: 'Enviando instruções...',
                link_text: 'Esqueceu sua senha?',
                confirmation_text: 'Verifique seu email para o link de recuperação',
              },
            }
          }}
          theme="light"
          providers={[]}
        />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Login;