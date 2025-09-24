import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header simples */}
      <header className="p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span>MeuApp</span>
          </Link>
          <Button asChild variant="ghost" className="flex items-center">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
              <p className="text-gray-600 mt-2">Entre na sua conta ou crie uma nova</p>
            </div>

            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#2563eb',
                      brandAccent: '#1d4ed8',
                      brandButtonText: 'white',
                      defaultButtonBackground: '#f8fafc',
                      defaultButtonBackgroundHover: '#f1f5f9',
                      inputBackground: 'white',
                      inputBorder: '#e2e8f0',
                      inputBorderHover: '#cbd5e1',
                      inputBorderFocus: '#2563eb',
                    },
                    space: {
                      buttonPadding: '12px 16px',
                      inputPadding: '12px 16px',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                  },
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full font-medium transition-colors',
                  input: 'w-full transition-colors',
                  label: 'block text-sm font-medium text-gray-700 mb-2',
                  message: 'text-sm',
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Entrar',
                    loading_button_label: 'Entrando...',
                    link_text: 'Já tem uma conta? Entre aqui',
                    password_input_placeholder: 'Digite sua senha',
                    email_input_placeholder: 'Digite seu email',
                  },
                  sign_up: {
                    email_label: 'Email',
                    password_label: 'Senha',
                    button_label: 'Criar conta',
                    loading_button_label: 'Criando conta...',
                    link_text: 'Não tem uma conta? Cadastre-se',
                    password_input_placeholder: 'Crie uma senha',
                    email_input_placeholder: 'Digite seu email',
                    confirmation_text: 'Verifique seu email para confirmar a conta',
                  },
                  forgotten_password: {
                    email_label: 'Email',
                    button_label: 'Recuperar senha',
                    loading_button_label: 'Enviando...',
                    link_text: 'Esqueceu sua senha?',
                    confirmation_text: 'Verifique seu email para o link de recuperação',
                  },
                },
              }}
              theme="light"
              providers={[]}
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Ao continuar, você concorda com nossos{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;